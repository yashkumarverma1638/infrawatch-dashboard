import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import MonitorDetails from "./pages/MonitorDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes with Sidebar */}
          <Route
            path="/"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />

          <Route
            path="/monitor/:id"
            element={
              <Layout>
                <MonitorDetails />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
