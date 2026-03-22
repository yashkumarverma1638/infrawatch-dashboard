import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import MonitorDetails from "./pages/MonitorDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { fetchUser } from "./features/user/userSlice";
import { useDispatch } from "react-redux";
import Subscription from "./pages/Subscription";
import Alerts from "./pages/Alerts";
import { socket } from "../src/socket/socket.js";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  useEffect(() => {
    socket.on("alert:new", (alert) => {
      console.log("Alert received:", alert);

      // 🔥 Show toast
      if (alert.status === "DOWN") {
        toast.error(alert.message);
      } else {
        toast.success(alert.message);
      }
    });

    return () => {
      socket.off("alert:new");
    };
  }, []);
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
          <Route
            path="/subscription"
            element={
              <Layout>
                <Subscription />
              </Layout>
            }
          />
          <Route
            path="/alerts"
            element={
              <Layout>
                <Alerts />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
