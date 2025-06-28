import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./layouts/home/Home";
import Dashboard from "./layouts/dashboard/Dashboard";
import Login from "./layouts/auth/Login";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProjectForm from "./layouts/dashboard/components/ProjectForm";
import WorkplaceForm from "./layouts/dashboard/components/WorkplaceForm";

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

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       Loading...
  //     </div>
  //   );
  // }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      /> */}
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
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
