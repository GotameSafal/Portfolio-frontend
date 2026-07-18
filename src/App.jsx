import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import Home from "./layouts/home/Home";
import Dashboard from "./layouts/dashboard/Dashboard";
import Login from "./layouts/auth/Login";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProjectForm from "./layouts/dashboard/components/ProjectForm";
import WorkplaceForm from "./layouts/dashboard/components/WorkplaceForm";
import DevConsole from "./components/shared/DevConsole";
import SiteDiagnostics from "./components/shared/SiteDiagnostics";
import KeyboardShortcuts from "./components/shared/KeyboardShortcuts";
import Navbar from "./components/shared/Navbar";

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const PublicRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/projects/new"
        element={
          <ProtectedRoute>
            <ProjectForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/workplaces/new"
        element={
          <ProtectedRoute>
            <WorkplaceForm />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [isDiagnosticsOpen, setIsDiagnosticsOpen] = useState(false);

  const toggleConsole = () => setIsConsoleOpen((prev) => !prev);
  const toggleDiagnostics = () => setIsDiagnosticsOpen((prev) => !prev);

  return (
    <AuthProvider>
      <Navbar onToggleConsole={import.meta.env.DEV ? toggleConsole : undefined} />
      {import.meta.env.DEV && (
        <>
          <DevConsole
            isOpen={isConsoleOpen}
            onClose={() => setIsConsoleOpen(false)}
            onOpenDiagnostics={() => {
              setIsConsoleOpen(false);
              setIsDiagnosticsOpen(true);
            }}
          />
          <SiteDiagnostics
            isOpen={isDiagnosticsOpen}
            onClose={() => setIsDiagnosticsOpen(false)}
          />
          <KeyboardShortcuts
            onToggleConsole={toggleConsole}
            onToggleDiagnostics={toggleDiagnostics}
          />
        </>
      )}
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;

