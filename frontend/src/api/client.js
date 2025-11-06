const BASE_URL = "http://localhost:8000/api";

async function refreshToken() {
  const refresh = localStorage.getItem("refresh");
  if (!refresh) return null;

  const response = await fetch(`${BASE_URL}/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });

  if (!response.ok) return null;

  const data = await response.json();
  localStorage.setItem("access", data.access);
  return data.access;
}

export async function apiRequest(
  endpoint,
  method = "GET",
  body = null,
  token = null,
  onUnauthorized = null,
  retry = true
) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);

  const response = await fetch(`${BASE_URL}/${endpoint}`, options);

  if (response.status === 401 && retry) {
    const newToken = await refreshToken();
    if (newToken) {
      return apiRequest(
        endpoint,
        method,
        body,
        newToken,
        onUnauthorized,
        false
      );
    } else {
      if (onUnauthorized) onUnauthorized();
      throw new Error("Unauthorized - token expired");
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Request failed");
  }

  return response.status === 204 ? null : response.json();
}
