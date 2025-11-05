import React, { useState } from "react";
import "./App.css";
import { TopNav, Container } from "./components/Layout";
import RecipeListPage from "./pages/RecipeListPage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import SignInPage from "./pages/SignInPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// PUBLIC_INTERFACE
function App() {
  /** Root app with top navigation and client-side routing */
  const [search, setSearch] = useState("");

  return (
    <BrowserRouter>
      <TopNav title="Recipe Explorer" search={search} onSearchChange={setSearch} />
      {/* Routes are split so that /sign-in renders without the padded Container for pixel-perfect parity */}
      <Routes>
        {/* Initial route points to /sign-in for this task */}
        <Route path="/" element={<Navigate to="/sign-in" replace />} />

        {/* Pixel-perfect Sign In screen (iframe isolated) - no Container wrapper */}
        <Route path="/sign-in" element={<SignInPage />} />

        {/* All other routes use the padded Container layout */}
        <Route
          path="/recipes"
          element={
            <Container>
              <RecipeListPage searchText={search} />
            </Container>
          }
        />
        <Route
          path="/recipes/:id"
          element={
            <Container>
              <RecipeDetailPage />
            </Container>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<div style={{ padding: 24 }}>Not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
