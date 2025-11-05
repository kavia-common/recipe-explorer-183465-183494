import React, { useEffect, useMemo, useState } from "react";
import { Container, Sidebar } from "../components/Layout.jsx";
import { RecipeGrid } from "../components/RecipeCard.jsx";
import { getRecipes } from "../services/api";
import { theme } from "../theme";
import { useNavigate, useSearchParams } from "react-router-dom";

// PUBLIC_INTERFACE
export default function RecipeListPage({ searchText }) {
  /** Recipe list page with sidebar filters and search */
  const [filters, setFilters] = useState({});
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const mergedParams = useMemo(() => {
    const params = {
      search: searchText || searchParams.get("q") || "",
      category: searchParams.get("category") || undefined,
      cuisine: searchParams.get("cuisine") || undefined,
      time: searchParams.get("time") ? Number(searchParams.get("time")) : undefined,
      difficulty: searchParams.get("difficulty") || undefined,
      ...filters,
    };
    return params;
  }, [searchText, searchParams, filters]);

  useEffect(() => {
    setLoading(true);
    setErr("");
    getRecipes(mergedParams)
      .then((res) => setItems(res))
      .catch((e) => setErr(e.message || "Failed to load recipes"))
      .finally(() => setLoading(false));
  }, [mergedParams]);

  const onFiltersChange = (next) => {
    setFilters(next);
    const p = new URLSearchParams();
    if (searchText) p.set("q", searchText);
    if (next.category) p.set("category", next.category);
    if (next.cuisine) p.set("cuisine", next.cuisine);
    if (next.time) p.set("time", String(next.time));
    if (next.difficulty) p.set("difficulty", next.difficulty);
    setSearchParams(p);
  };

  const clearFilters = () => {
    setFilters({});
    const p = new URLSearchParams();
    if (searchText) p.set("q", searchText);
    setSearchParams(p);
  };

  return (
    <Container>
      <div style={styles.layout}>
        <div style={styles.sidebarWrap}>
          <Sidebar filters={filters} onChange={onFiltersChange} onClear={clearFilters} />
        </div>
        <main style={styles.main}>
          {loading ? (
            <div className="panel" style={styles.stateBox}>Loading recipes...</div>
          ) : err ? (
            <div className="panel" style={{ ...styles.stateBox, color: theme.colors.error }}>{err}</div>
          ) : items.length === 0 ? (
            <div className="panel" style={styles.stateBox}>No recipes found.</div>
          ) : (
            <RecipeGrid
              items={items}
              onItemClick={(r) => navigate(`/recipes/${encodeURIComponent(r.id)}`)}
            />
          )}
        </main>
      </div>
    </Container>
  );
}

const styles = {
  layout: {
    display: "grid",
    gridTemplateColumns: "280px 1fr",
    gap: 16,
  },
  sidebarWrap: {
    display: "none",
  },
  main: {
    minHeight: 320,
  },
  stateBox: {
    padding: 24,
    color: theme.colors.textMuted,
  },
};

// Responsive tweak using inline style approach via window width would be heavy;
// CSS is inlined; to keep minimal, slightly adjust at runtime:
if (typeof window !== "undefined") {
  const mql = window.matchMedia("(min-width: 900px)");
  const update = () => {
    styles.sidebarWrap.display = mql.matches ? "block" : "none";
    styles.layout.gridTemplateColumns = mql.matches ? "280px 1fr" : "1fr";
  };
  update();
  mql.addEventListener?.("change", update);
}
