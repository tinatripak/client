import { Route, Routes } from "react-router-dom";
import { About, Contact, Home, Portfolio, Price, PortfolioOneShoot, Login, AdminAccount } from "./pages";
import AdminPanel from "./pages/AdminPanel/AdminPanel";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/price" element={<Price />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolioOneShoot" element={<PortfolioOneShoot />} />
        <Route path="/adminDashboard" element={<AdminAccount />} />
        <Route path="/adminDashboard/*" element={<AdminPanel />} />
      </Routes>
    </div>
  );
}

export default App;