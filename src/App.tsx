import Dashboard from "./pages/Dashboard";
import MonitorDetails from "./pages/MonitorDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/monitor/:id" element={<MonitorDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
