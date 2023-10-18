import { Route, Routes } from "react-router-dom";
import { About, Booking, Home, Portfolio, TypesOfShooting, TypeOfShooting, PortfolioOneShoot, Login, AdminAccount, VerifyBooking } from "./pages";
import AdminPanel from "./pages/AdminPanel/AdminPanel";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/types" element={<TypesOfShooting />} />
        <Route path="/verifyBooking/:uniqueString" element={<VerifyBooking />} />
        <Route path="/type/:name" element={<TypeOfShooting />} />
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