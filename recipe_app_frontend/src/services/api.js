import { mockRecipes, simulateDelay } from "./mockData";

const API_BASE = process.env.REACT_APP_API_BASE;

async function fetchJson(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Request failed (${res.status}): ${text || res.statusText}`);
  }
  return res.json();
}

// PUBLIC_INTERFACE
export async function getRecipes(params = {}) {
  /**
   * Fetch recipes list from backend if REACT_APP_API_BASE is defined,
   * otherwise use mock data with simple in-memory filtering.
   */
  const { search = "", category, cuisine, time, difficulty } = params;

  // Try API first if configured
  if (API_BASE) {
    try {
      const qs = new URLSearchParams();
      if (search) qs.set("q", search);
      if (category) qs.set("category", category);
      if (cuisine) qs.set("cuisine", cuisine);
      if (time) qs.set("time", String(time));
      if (difficulty) qs.set("difficulty", difficulty);

      const url = `${API_BASE.replace(/\/$/, "")}/recipes${qs.toString() ? `?${qs.toString()}` : ""}`;
      return await fetchJson(url);
    } catch (e) {
      // fallback to mock
      console.warn("API unreachable, falling back to mock data.", e);
    }
  }

  // Mock filtering
  await simulateDelay();
  let data = [...mockRecipes];

  const text = String(search).trim().toLowerCase();
  if (text) {
    data = data.filter(
      (r) =>
        r.title.toLowerCase().includes(text) ||
        r.tags?.some((t) => t.toLowerCase().includes(text)) ||
        r.cuisine?.toLowerCase().includes(text) ||
        r.category?.toLowerCase().includes(text)
    );
  }
  if (category) data = data.filter((r) => r.category === category);
  if (cuisine) data = data.filter((r) => r.cuisine === cuisine);
  if (difficulty) data = data.filter((r) => r.difficulty === difficulty);
  if (time) data = data.filter((r) => r.time <= Number(time));

  return data;
}

// PUBLIC_INTERFACE
export async function getRecipeById(id) {
  /**
   * Fetch a single recipe by id from backend if configured, else mock.
   */
  if (API_BASE) {
    try {
      const url = `${API_BASE.replace(/\/$/, "")}/recipes/${encodeURIComponent(id)}`;
      return await fetchJson(url);
    } catch (e) {
      console.warn("API unreachable, falling back to mock data.", e);
    }
  }
  await simulateDelay();
  const found = mockRecipes.find((r) => r.id === String(id));
  if (!found) {
    throw new Error("Recipe not found");
  }
  return found;
}
