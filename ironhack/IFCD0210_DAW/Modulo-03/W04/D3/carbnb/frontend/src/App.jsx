import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { HealthProvider } from "./contexts/HealthContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { ItemListPage } from "./pages/ItemListPage";
import { ItemDetailPage } from "./pages/ItemDetailPage";
import { ItemFormPage } from "./pages/ItemFormPage";
import { NotFoundPage } from "./pages/NotFoundPage";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <HealthProvider>
          <Router>
            <div className="app">
              <Header />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/items" element={<ItemListPage />} />
                  <Route path="/items/:id" element={<ItemDetailPage />} />
                  <Route path="/items/:id/edit" element={<ItemFormPage />} />
                  <Route path="/create" element={<ItemFormPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </HealthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
