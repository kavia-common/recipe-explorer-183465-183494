import React from "react";
import { theme } from "../theme";

// PUBLIC_INTERFACE
export function RecipeCard({ recipe, onClick }) {
  /** Card showing recipe image, title, tags, and meta. */
  return (
    <div style={styles.card} onClick={onClick} role="button" tabIndex={0} onKeyDown={(e)=>{ if(e.key==='Enter') onClick?.();}}>
      <div style={styles.imageWrap}>
        <img src={recipe.image} alt={recipe.title} style={styles.image} />
        <div style={styles.badgeBar}>
          <span style={{ ...styles.badge, background: theme.colors.secondary, color: "#111827" }}>
            {recipe.time}m
          </span>
          <span style={{ ...styles.badge, background: theme.colors.primary, color: "#fff" }}>
            {recipe.difficulty}
          </span>
        </div>
      </div>
      <div style={styles.content}>
        <div style={styles.title}>{recipe.title}</div>
        <div style={styles.tags}>
          {(recipe.tags || []).slice(0, 3).map((t) => (
            <span key={t} style={styles.tag}>
              {t}
            </span>
          ))}
        </div>
        <div style={styles.meta}>
          <span>{recipe.cuisine}</span> • <span>{recipe.category}</span> • <span>{recipe.servings} servings</span>
        </div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
export function RecipeGrid({ items, onItemClick }) {
  /** Responsive grid to arrange recipe cards */
  return (
    <div style={styles.grid}>
      {items.map((r) => (
        <RecipeCard key={r.id} recipe={r} onClick={() => onItemClick?.(r)} />
      ))}
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: 16,
  },
  card: {
    background: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radii.lg,
    boxShadow: theme.shadows.sm,
    overflow: "hidden",
    cursor: "pointer",
    transition: theme.transitions.base,
  },
  imageWrap: {
    position: "relative",
    aspectRatio: "16 / 9",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  badgeBar: {
    position: "absolute",
    top: 8,
    left: 8,
    display: "flex",
    gap: 8,
  },
  badge: {
    fontSize: 12,
    padding: "6px 10px",
    borderRadius: theme.radii.pill,
    boxShadow: theme.shadows.sm,
  },
  content: {
    padding: 12,
  },
  title: {
    fontWeight: 600,
    color: theme.colors.text,
    marginBottom: 6,
  },
  tags: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    marginBottom: 8,
  },
  tag: {
    padding: "4px 8px",
    borderRadius: theme.radii.pill,
    background: theme.colors.background,
    border: `1px solid ${theme.colors.border}`,
    fontSize: 12,
    color: theme.colors.textMuted,
  },
  meta: {
    fontSize: 12,
    color: theme.colors.textMuted,
  },
};
