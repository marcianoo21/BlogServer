export async function apiFetch(
  url: string,
  options: RequestInit = {}
) {
  const token = localStorage.getItem('token');
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> || {}),
    Authorization: `Bearer ${token}`,
  };
  if (options.body) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(url, { ...options, headers });
  const data = await response.json();

  if (data?.message?.includes('jwt expired')) {
    localStorage.removeItem('token');
    window.location.href = '/';
    throw new Error('Sesja wygasła. Zaloguj się ponownie.');
  }

  if (!response.ok) throw new Error(data.message || 'Błąd API');
  return data;
}