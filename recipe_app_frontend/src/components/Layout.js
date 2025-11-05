import React from "react";
import { theme } from "../theme";

// PUBLIC_INTERFACE
export function Container({ children }) {
  /** Main page container with responsive grid for sidebar + content */
  return (
    <div style={styles.page}>
      <div style={styles.pageInner}>{children}</div>
    </div>
  );
}

// PUBLIC_INTERFACE
export function TopNav({ title, search, onSearchChange }) {
  /** Top navigation with title and search input */
  return (
    <header style={styles.header}>
      <div style={styles.headerInner}>
        <div style={styles.brand}>
          <div style={styles.brandLogo}>🍳</div>
          <div>
            <div style={styles.brandTitle}>{title}</div>
            <div style={styles.brandSubtitle}>Explore, cook, enjoy</div>
          </div>
        </div>
        <div style={styles.searchWrap}>
          <input
            type="text"
            placeholder="Search recipes, cuisines, tags..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search recipes"
            style={styles.search}
          />
        </div>
      </div>
      <div style={styles.headerGradient} />
    </header>
  );
}

// PUBLIC_INTERFACE
export function Sidebar({ filters, onChange, onClear }) {
  /** Sidebar filters with category, cuisine, time and difficulty */
  const Field = ({ label, children }) => (
    <div style={styles.field}>
      <label style={styles.label}>{label}</label>
      {children}
    </div>
  );

  const categories = ["Breakfast", "Main", "Dessert", "Snack"];
  const cuisines = ["American", "Italian", "Fusion"];
  const difficulties = ["Easy", "Medium", "Hard"];

  return (
    <aside style={styles.sidebar}>
      <div style={styles.sidebarHeader}>Filters</div>
      <Field label="Category">
        <select
          value={filters.category || ""}
          onChange={(e) => onChange({ ...filters, category: e.target.value || undefined })}
          style={styles.select}
        >
          <option value="">All</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Cuisine">
        <select
          value={filters.cuisine || ""}
          onChange={(e) => onChange({ ...filters, cuisine: e.target.value || undefined })}
          style={styles.select}
        >
          <option value="">All</option>
          {cuisines.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Max Time (mins)">
        <input
          type="number"
          min="0"
          placeholder="e.g., 30"
          value={filters.time ?? ""}
          onChange={(e) =>
            onChange({ ...filters, time: e.target.value ? Number(e.target.value) : undefined })
          }
          style={styles.input}
        />
      </Field>
      <Field label="Difficulty">
        <select
          value={filters.difficulty || ""}
          onChange={(e) => onChange({ ...filters, difficulty: e.target.value || undefined })}
          style={styles.select}
        >
          <option value="">All</option>
          {difficulties.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </Field>
      <button onClick={onClear} style={styles.clearBtn} aria-label="Clear filters">
        Clear filters
      </button>
    </aside>
  );
}

const styles = {
  page: {
    background: theme.colors.background,
    minHeight: "100vh",
  },
  pageInner: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "24px 16px 48px",
  },
  header: {
    position: "sticky",
    top: 0,
    zIndex: 10,
    background: theme.colors.surface,
    borderBottom: `1px solid ${theme.colors.border}`,
  },
  headerInner: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "16px",
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  headerGradient: {
    height: 6,
    background: `linear-gradient(90deg, ${theme.colors.gradientFrom}, ${theme.colors.gradientTo})`,
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  brandLogo: {
    width: 40,
    height: 40,
    borderRadius: theme.radii.pill,
    display: "grid",
    placeItems: "center",
    background: theme.colors.primary,
    color: "white",
    boxShadow: theme.shadows.sm,
  },
  brandTitle: {
    fontWeight: 700,
    color: theme.colors.text,
    fontSize: 18,
  },
  brandSubtitle: {
    color: theme.colors.textMuted,
    fontSize: 12,
  },
  searchWrap: {
    marginLeft: "auto",
    width: "min(520px, 100%)",
  },
  search: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: theme.radii.pill,
    border: `1px solid ${theme.colors.border}`,
    outline: "none",
    background: theme.colors.background,
    transition: theme.transitions.base,
    boxShadow: theme.shadows.sm,
  },
  sidebar: {
    position: "sticky",
    top: 72,
    alignSelf: "start",
    background: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radii.lg,
    boxShadow: theme.shadows.sm,
    padding: 16,
    minWidth: 260,
    height: "fit-content",
  },
  sidebarHeader: {
    fontWeight: 600,
    marginBottom: 12,
    color: theme.colors.text,
  },
  field: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    color: theme.colors.textMuted,
    display: "block",
    marginBottom: 6,
  },
  select: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: theme.radii.sm,
    border: `1px solid ${theme.colors.border}`,
    background: theme.colors.background,
    outline: "none",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: theme.radii.sm,
    border: `1px solid ${theme.colors.border}`,
    background: theme.colors.background,
    outline: "none",
  },
  clearBtn: {
    marginTop: 8,
    width: "100%",
    padding: "10px 12px",
    borderRadius: theme.radii.sm,
    border: "none",
    color: "#fff",
    background: theme.colors.primary,
    cursor: "pointer",
    transition: theme.transitions.base,
    boxShadow: theme.shadows.sm,
  },
};
