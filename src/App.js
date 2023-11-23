import { Route, Routes } from "react-router-dom";
import {
  About,
  Booking,
  Home,
  Portfolio,
  TypesOfShooting,
  TypeOfShooting,
  PortfolioOneShoot,
  Login,
  AdminAccount,
  VerifyBooking,
  ContactUs,
} from "./pages";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import {
  aboutLink,
  adminDashboardLink,
  bookingLink,
  contactUsLink,
  emptyLink,
  loginLink,
  portfolioLink,
  typeLink,
  typesLink,
  verifyBookingLink,
} from "./constants";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={emptyLink} element={<Home />} />
        <Route path={aboutLink} element={<About />} />
        <Route path={loginLink} element={<Login />} />
        <Route path={typesLink} element={<TypesOfShooting />} />
        <Route path={contactUsLink} element={<ContactUs />} />
        <Route
          path={`${verifyBookingLink}/:uniqueString`}
          element={<VerifyBooking />}
        />
        <Route path={`${typeLink}/:name`} element={<TypeOfShooting />} />
        <Route path={bookingLink} element={<Booking />} />
        <Route path={portfolioLink} element={<Portfolio />} />
        <Route
          path={`${portfolioLink}/:name`}
          element={<PortfolioOneShoot />}
        />
        <Route path={adminDashboardLink} element={<AdminAccount />} />
        <Route path={`${adminDashboardLink}/*`} element={<AdminPanel />} />
      </Routes>
    </div>
  );
}

export default App;
