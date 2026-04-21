/**
 * API Client for Tunga ES Backend
 * Handles auth, store operations, file uploads, and user management.
 *
 * The token is persisted in localStorage under 'tes_token' — this is the ONLY
 * use of localStorage in the new system (cache + auth token only).
 */

// ── Configuration ──
// In production, set NEXT_PUBLIC_API_URL in Vercel env vars
// Fallback to localhost for development
export const API_URL =
  typeof window !== 'undefined' && window.__API_URL__
    ? window.__API_URL__
    : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const TOKEN_KEY = 'tes_token';
const USER_KEY = 'tes_user';

// ── Token management ──
export const getToken = () =>
  typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null;

export const setToken = (token) => {
  if (typeof window === 'undefined') return;
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
};

export const getCachedUser = () => {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(USER_KEY);
  try { return raw ? JSON.parse(raw) : null; } catch { return null; }
};

export const setCachedUser = (user) => {
  if (typeof window === 'undefined') return;
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
  else localStorage.removeItem(USER_KEY);
};

// ── Core fetch wrapper ──
async function apiFetch(path, options = {}) {
  const token = getToken();
  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  // Only set Content-Type if body is JSON (not FormData)
  if (options.body && !(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  let res;
  try {
    res = await fetch(`${API_URL}${path}`, { ...options, headers });
  } catch (err) {
    throw new ApiError('Network error — is the backend reachable?', 0);
  }

  // Handle 401 globally — token expired / invalid
  if (res.status === 401) {
    setToken(null);
    setCachedUser(null);
    // Only redirect on client — not during SSR
    if (typeof window !== 'undefined' && !path.includes('/auth/login')) {
      window.location.reload();
    }
    throw new ApiError('Session expired. Please log in again.', 401);
  }

  const text = await res.text();
  let data;
  try { data = text ? JSON.parse(text) : {}; } catch { data = { error: text }; }

  if (!res.ok) {
    throw new ApiError(data.error || `Request failed (${res.status})`, res.status);
  }
  return data;
}

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

// ── Auth ──
export const api = {
  async login(username, password) {
    const data = await apiFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    setToken(data.token);
    setCachedUser(data.user);
    return data.user;
  },

  logout() {
    setToken(null);
    setCachedUser(null);
  },

  async me() {
    return apiFetch('/api/auth/me');
  },

  async changePassword(oldPassword, newPassword) {
    return apiFetch('/api/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ oldPassword, newPassword }),
    });
  },

  // ── Store operations ──
  async storeGet(key) {
    try {
      const data = await apiFetch(`/api/store/${encodeURIComponent(key)}`);
      return data.value;
    } catch (err) {
      if (err.status === 404) return null;
      throw err;
    }
  },

  async storeSet(key, value) {
    return apiFetch(`/api/store/${encodeURIComponent(key)}`, {
      method: 'PUT',
      body: JSON.stringify({ value }),
    });
  },

  async storeDelete(key) {
    return apiFetch(`/api/store/${encodeURIComponent(key)}`, {
      method: 'DELETE',
    });
  },

  async storeList(prefix) {
    return apiFetch(`/api/store?prefix=${encodeURIComponent(prefix || '')}`);
  },

  // ── File uploads ──
  async uploadFile(file) {
    const fd = new FormData();
    fd.append('file', file);
    return apiFetch('/api/upload', { method: 'POST', body: fd });
  },

  async deleteFile(publicId) {
    return apiFetch(`/api/upload/${encodeURIComponent(publicId)}`, {
      method: 'DELETE',
    });
  },

  // ── User management ──
  async listUsers() {
    return apiFetch('/api/users');
  },

  async createUser(user) {
    return apiFetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(user),
    });
  },

  async updateUser(id, changes) {
    return apiFetch(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(changes),
    });
  },

  async deleteUser(id) {
    return apiFetch(`/api/users/${id}`, { method: 'DELETE' });
  },
};

export default api;
