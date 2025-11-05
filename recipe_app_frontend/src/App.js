import React, { useState } from "react";
import "./App.css";
import { TopNav, Container } from "./components/Layout";
import RecipeListPage from "./pages/RecipeListPage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// PUBLIC_INTERFACE
function App() {
  /** Root app with top navigation and client-side routing */
  const [search, setSearch] = useState("");

  return (
    <BrowserRouter>
      <TopNav title="Recipe Explorer" search={search} onSearchChange={setSearch} />
      <Container>
        <Routes>
          <Route path="/" element={<Navigate to="/recipes" replace />} />
          <Route path="/recipes" element={<RecipeListPage searchText={search} />} />
          <Route path="/recipes/:id" element={<RecipeDetailPage />} />
          <Route path="*" element={<div style={{ padding: 24 }}>Not found</div>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
