
export async function login(username: string, password: string) {
  const response = await fetch('http://127.0.0.1:3000/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  if (response.ok && data.token) {
    localStorage.setItem('token', data.token);
    return { success: true, token: data.token };
  } else {
    return { success: false, message: data.message || 'Błąd logowania' };
  }
}