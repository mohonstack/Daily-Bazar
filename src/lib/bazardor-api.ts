import { cacheLife } from "next/cache";

const apiBaseUrl = "https://api.api-store.workers.dev";

export async function fetchBazardorData<T>(path: string): Promise<T> {
  "use cache";
  cacheLife("minutes");

  const url = new URL(path, apiBaseUrl);
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Bazardor API request failed (${response.status} ${response.statusText}): ${url}`);
  }

  const contentType = response.headers.get("content-type");
  if (!contentType?.includes("json")) {
    throw new Error(`Expected JSON from Bazardor API ${url}, received ${contentType ?? "unknown content type"}`);
  }

  return response.json();
}
