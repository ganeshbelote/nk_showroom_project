export async function apiFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  let data;

  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    throw new Error(data?.message || "Something went wrong");
  }

  return data as T;
}