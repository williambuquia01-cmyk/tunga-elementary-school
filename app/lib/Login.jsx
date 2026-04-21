/**
 * New LoginPage — authenticates against the backend instead of hardcoded creds.
 *
 * REPLACES the old LoginPage in page.jsx.
 * Same UI design, new auth flow.
 */

import { useState } from 'react';
import api, { getToken, getCachedUser } from './api';

const LOGO = "/logo.png"; // or keep the base64 LOGO constant from page.jsx

export function LoginPage({ onLogin }) {
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  const go = async () => {
    if (!u || !p) {
      setErr('Please enter both username and password');
      return;
    }
    setErr('');
    setBusy(true);
    try {
      const user = await api.login(u.trim(), p);
      onLogin({
        role: user.role,
        name: user.name,
        id: user.id,
        username: user.username,
        position: user.position,
        assignedSections: user.assignedSections || [],
        coordinatorOf: user.coordinatorOf || [],
      });
    } catch (e) {
      setErr(e.message || 'Login failed');
    } finally {
      setBusy(false);
    }
  };

  const onKey = (e) => {
    if (e.key === 'Enter') go();
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg,#0E2240,#1B4D7E 50%,#2E6B4F)',
      padding: 16,
    }}>
      <div style={{
        background: '#fff', borderRadius: 20, padding: 32,
        width: '100%', maxWidth: 380,
        boxShadow: '0 20px 60px rgba(0,0,0,.3)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: '#1B4D7E', margin: '0 auto',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 32, fontWeight: 700,
          }}>
            T
          </div>
          <h1 style={{ fontSize: 20, fontWeight: 700, margin: '10px 0 2px', color: '#0E2240' }}>
            Tunga Elementary School
          </h1>
          <div style={{ fontSize: 12, color: '#999' }}>
            School Management System v4.0 · Cloud
          </div>
        </div>

        {err && (
          <div style={{
            background: '#fde8e8', color: '#c0392b',
            padding: '8px 12px', borderRadius: 8,
            fontSize: 13, marginBottom: 12,
          }}>
            {err}
          </div>
        )}

        <div style={{ marginBottom: 12 }}>
          <label style={{
            display: 'block', fontSize: 13, fontWeight: 500,
            color: '#666', marginBottom: 3,
          }}>
            Username
          </label>
          <input
            style={{
              width: '100%', padding: '9px 12px',
              border: '1.5px solid #e4e7ec', borderRadius: 8,
              fontSize: 14, outline: 'none', boxSizing: 'border-box',
            }}
            value={u}
            onChange={(e) => { setU(e.target.value); setErr(''); }}
            onKeyDown={onKey}
            placeholder="Enter username"
            autoComplete="username"
            disabled={busy}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{
            display: 'block', fontSize: 13, fontWeight: 500,
            color: '#666', marginBottom: 3,
          }}>
            Password
          </label>
          <input
            type="password"
            style={{
              width: '100%', padding: '9px 12px',
              border: '1.5px solid #e4e7ec', borderRadius: 8,
              fontSize: 14, outline: 'none', boxSizing: 'border-box',
            }}
            value={p}
            onChange={(e) => { setP(e.target.value); setErr(''); }}
            onKeyDown={onKey}
            placeholder="Enter password"
            autoComplete="current-password"
            disabled={busy}
          />
        </div>

        <button
          onClick={go}
          disabled={busy}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 5, padding: '9px 16px', width: '100%',
            background: '#1B4D7E', color: '#fff',
            border: 'none', borderRadius: 8,
            fontSize: 13, fontWeight: 600,
            cursor: busy ? 'wait' : 'pointer',
            opacity: busy ? 0.7 : 1,
          }}
        >
          {busy ? 'Signing in…' : 'Sign in'}
        </button>

        <div style={{ fontSize: 11, color: '#bbb', textAlign: 'center', marginTop: 12 }}>
          Tunga ES · Moalboal, Cebu · School ID 119502
        </div>
      </div>
    </div>
  );
}

/**
 * Helper to auto-restore session on app load.
 * Call this in your root component's useEffect:
 *
 *   useEffect(() => {
 *     restoreSession().then(user => user && setAuth(user));
 *   }, []);
 */
export async function restoreSession() {
  if (!getToken()) return null;
  try {
    const user = await api.me();
    return {
      role: user.role,
      name: user.name,
      id: user.id,
      username: user.username,
      position: user.position,
      assignedSections: user.assignedSections || [],
      coordinatorOf: user.coordinatorOf || [],
    };
  } catch {
    return null;
  }
}
