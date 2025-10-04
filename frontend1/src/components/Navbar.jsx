import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="font-bold text-xl">Expense Dashboard</h1>
      <div className="flex gap-4">
        <Link className={location.pathname === "/" ? "underline" : ""} to="/">Dashboard</Link>
        <Link className={location.pathname === "/profile" ? "underline" : ""} to="/profile">Profile</Link>
      </div>
    </nav>
  );
}
