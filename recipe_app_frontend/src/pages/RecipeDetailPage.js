import React, { useEffect, useState } from "react";
import { Container } from "../components/Layout";
import { getRecipeById } from "../services/api";
import { theme } from "../theme";
import { useNavigate, useParams } from "react-router-dom";

// PUBLIC_INTERFACE
export default function RecipeDetailPage() {
  /** Recipe detail page with hero, ingredients checklist, steps, and meta */
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setErr("");
    getRecipeById(id)
      .then((res) => setRecipe(res))
      .catch((e) => setErr(e.message || "Failed to load recipe"))
      .finally(() => setLoading(false));
  }, [id]);

  const toggleCheck = (idx) => {
    setRecipe((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ingredients: prev.ingredients?.map((ing, i) => (i === idx ? { ...ing, checked: !ing.checked } : ing)) };
      return next;
    });
  };

  return (
    <Container>
      {loading ? (
        <div style={styles.stateBox}>Loading recipe...</div>
      ) : err ? (
        <div style={{ ...styles.stateBox, color: theme.colors.error }}>{err}</div>
      ) : !recipe ? (
        <div style={styles.stateBox}>Recipe not found.</div>
      ) : (
        <article style={styles.article}>
          <button style={styles.backBtn} onClick={() => navigate(-1)}>&larr; Back</button>
          <div style={styles.hero}>
            <img src={recipe.image} alt={recipe.title} style={styles.heroImg} />
            <div style={styles.heroBadgeBar}>
              <span style={{ ...styles.badge, background: theme.colors.secondary, color: "#111827" }}>
                {recipe.time}m
              </span>
              <span style={{ ...styles.badge, background: theme.colors.primary, color: "#fff" }}>
                {recipe.difficulty}
              </span>
              <span style={{ ...styles.badge, background: theme.colors.background, color: theme.colors.text }}>
                {recipe.servings} servings
              </span>
            </div>
          </div>
          <h1 style={styles.title}>{recipe.title}</h1>
          <div style={styles.meta}>
            <span>{recipe.cuisine}</span> • <span>{recipe.category}</span>
          </div>

          <div style={styles.contentGrid}>
            <section style={styles.ingredients}>
              <h2 style={styles.sectionTitle}>Ingredients</h2>
              <ul style={styles.ingList}>
                {(recipe.ingredients || []).map((ing, i) => (
                  <li key={i} style={styles.ingItem}>
                    <label style={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={!!ing.checked}
                        onChange={() => toggleCheck(i)}
                        style={styles.checkbox}
                      />
                      <span style={{ ...(ing.checked ? styles.ingChecked : null) }}>{ing.text}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </section>

            <section style={styles.steps}>
              <h2 style={styles.sectionTitle}>Steps</h2>
              <ol style={styles.stepList}>
                {(recipe.steps || []).map((s, i) => (
                  <li key={i} style={styles.stepItem}>
                    <span style={styles.stepIndex}>{i + 1}</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </article>
      )}
    </Container>
  );
}

const styles = {
  stateBox: {
    background: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radii.lg,
    padding: 24,
    color: theme.colors.textMuted,
    boxShadow: theme.shadows.sm,
  },
  article: {
    display: "block",
  },
  backBtn: {
    border: "none",
    background: theme.colors.background,
    borderRadius: theme.radii.pill,
    padding: "8px 12px",
    cursor: "pointer",
    color: theme.colors.text,
    borderBottom: `1px solid ${theme.colors.border}`,
    marginBottom: 12,
  },
  hero: {
    position: "relative",
    overflow: "hidden",
    borderRadius: theme.radii.lg,
    border: `1px solid ${theme.colors.border}`,
    boxShadow: theme.shadows.md,
    aspectRatio: "16 / 7",
    background: theme.colors.surface,
  },
  heroImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  heroBadgeBar: {
    position: "absolute",
    bottom: 12,
    left: 12,
    display: "flex",
    gap: 8,
  },
  badge: {
    fontSize: 12,
    padding: "6px 10px",
    borderRadius: theme.radii.pill,
    boxShadow: theme.shadows.sm,
  },
  title: {
    marginTop: 16,
    fontSize: 28,
    color: theme.colors.text,
  },
  meta: {
    color: theme.colors.textMuted,
    marginBottom: 16,
  },
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    color: theme.colors.text,
    marginBottom: 8,
  },
  ingredients: {
    background: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radii.lg,
    padding: 16,
    boxShadow: theme.shadows.sm,
  },
  steps: {
    background: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radii.lg,
    padding: 16,
    boxShadow: theme.shadows.sm,
  },
  ingList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  ingItem: {
    padding: "8px 0",
    borderBottom: `1px dashed ${theme.colors.border}`,
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    cursor: "pointer",
  },
  checkbox: {
    width: 16,
    height: 16,
  },
  ingChecked: {
    textDecoration: "line-through",
    color: theme.colors.textMuted,
  },
  stepList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    counterReset: "steps",
  },
  stepItem: {
    display: "flex",
    gap: 12,
    padding: "10px 0",
    borderBottom: `1px dashed ${theme.colors.border}`,
  },
  stepIndex: {
    display: "inline-grid",
    placeItems: "center",
    width: 28,
    height: 28,
    borderRadius: theme.radii.pill,
    background: theme.colors.primary,
    color: "#fff",
    fontWeight: 700,
    boxShadow: theme.shadows.sm,
    flex: "0 0 auto",
  },
};

// Responsive tweak for content grid
if (typeof window !== "undefined") {
  const mql = window.matchMedia("(max-width: 900px)");
  const update = () => {
    styles.contentGrid.gridTemplateColumns = mql.matches ? "1fr" : "1fr 1fr";
  };
  update();
  mql.addEventListener?.("change", update);
}
