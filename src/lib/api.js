const API_BASE = '/api'

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('cicd-token')

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  }

  const res = await fetch(`${API_BASE}${endpoint}`, config)
  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || 'Terjadi kesalahan')
  }

  return data
}

export const api = {
  register: (body) => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  me: () => request('/auth/me'),
}
