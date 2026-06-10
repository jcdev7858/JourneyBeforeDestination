import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Oaths from "./pages/Oaths";
import Journal from "./pages/Journal";
import RadiantDex from "./pages/RadiantDex";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="oaths" element={<Oaths />} />
        <Route path="journal" element={<Journal />} />
        <Route path="radiantdex" element={<RadiantDex />} />
        <Route path="profile" element={<Profile />} />
        <Route index element={<Navigate to="dashboard" />} />
      </Route>
    </Routes>
  );
}

export default App;
