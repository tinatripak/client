import { Route, Routes } from "react-router-dom";
import { About, Booking, Home, Portfolio, Price, PortfolioOneShoot, Login, AdminAccount } from "./pages";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import PriceById from "./pages/Price/PriceById";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/price" element={<Price />} />
        <Route path="/price/:name" element={<PriceById />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:name" element={<PortfolioOneShoot />} />
        <Route path="/adminDashboard" element={<AdminAccount />} />
        <Route path="/adminDashboard/*" element={<AdminPanel />} />
      </Routes>
    </div>
  );
}

export default App;