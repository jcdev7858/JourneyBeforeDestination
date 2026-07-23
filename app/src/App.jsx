import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Oaths from "./pages/Oaths";
import Journal from "./pages/Journal";
import RadiantDex from "./pages/RadiantDex";
import Profile from "./pages/Profile";
import CharacterDetail from "./pages/CharacterDetail";
import OrderDetail from "./pages/OrderDetail";
import { AppDataProvider } from "./context/AppDataProvider";

function App() {
  return (
    <AppDataProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="oaths" element={<Oaths />} />
          <Route path="journal" element={<Journal />} />
          <Route path="dex" element={<RadiantDex />} />
          <Route path="dex/:characterId" element={<CharacterDetail />} />
          <Route path="dex/order/:orderId" element={<OrderDetail />} />
          <Route path="profile" element={<Profile />} />
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </AppDataProvider>
  );
}

export default App;
