/**
 * useStore(key, init) — the NEW version
 *
 * Drop-in replacement for the localStorage-based hook in page.jsx.
 * Same signature — returns [value, setValue] — but now reads/writes
 * through the Tunga ES backend API.
 *
 * Features:
 *  - Optimistic updates: UI changes instantly, then syncs to server
 *  - Write debouncing: rapid updates coalesced into one API call (saves bandwidth)
 *  - Loading state tracked per key
 *  - Offline-tolerant: errors logged but don't crash the UI
 *  - Functional updates supported: setValue(prev => ...)
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import api, { getToken } from './api';

// Debounce interval (ms) for batching rapid writes to the same key
const WRITE_DEBOUNCE = 500;

// Module-level cache so multiple components using the same key share data
const cache = new Map();
const pendingWrites = new Map(); // key -> timeout id

export function useStore(key, init) {
  const [val, setVal] = useState(() =>
    cache.has(key) ? cache.get(key) : init
  );
  const [loading, setLoading] = useState(!cache.has(key));
  const valRef = useRef(val);
  valRef.current = val;

  // ── Initial load from server ──
  useEffect(() => {
    if (!getToken()) {
      setLoading(false);
      return;
    }

    // If we already have a cached value from another mount, use it instantly
    if (cache.has(key)) {
      setVal(cache.get(key));
      setLoading(false);
      return;
    }

    let cancelled = false;
    api.storeGet(key)
      .then((value) => {
        if (cancelled) return;
        const finalValue = value !== null && value !== undefined ? value : init;
        cache.set(key, finalValue);
        setVal(finalValue);
        valRef.current = finalValue;
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        console.warn(`[useStore] Failed to load "${key}":`, err.message);
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Debounced writer ──
  const save = useCallback((updater) => {
    const newValue = typeof updater === 'function' ? updater(valRef.current) : updater;

    // Optimistic: update UI and cache immediately
    valRef.current = newValue;
    cache.set(key, newValue);
    setVal(newValue);

    // Debounce server write
    if (pendingWrites.has(key)) {
      clearTimeout(pendingWrites.get(key));
    }
    const timeoutId = setTimeout(() => {
      pendingWrites.delete(key);
      api.storeSet(key, newValue).catch((err) => {
        console.error(`[useStore] Failed to save "${key}":`, err.message);
      });
    }, WRITE_DEBOUNCE);
    pendingWrites.set(key, timeoutId);
  }, [key]);

  return [val, save, loading];
}

/**
 * Clears the in-memory cache — call on logout or SY change
 * to force fresh loads from the server.
 */
export function clearStoreCache() {
  cache.clear();
  pendingWrites.forEach((t) => clearTimeout(t));
  pendingWrites.clear();
}

/**
 * Manually flush all pending writes — useful before navigation/logout
 * to ensure no data is lost to the debounce window.
 */
export function flushPendingWrites() {
  const promises = [];
  pendingWrites.forEach((timeoutId, key) => {
    clearTimeout(timeoutId);
    const value = cache.get(key);
    if (value !== undefined) {
      promises.push(api.storeSet(key, value).catch(() => {}));
    }
  });
  pendingWrites.clear();
  return Promise.all(promises);
}
