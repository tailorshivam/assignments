import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-primary text-white py-3">
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="h3">
          <Link to="/" className="text-white text-decoration-none">
            Personal Finance Tracker
          </Link>
        </h1>
        <nav>
          <ul className="list-unstyled d-flex mb-0">
            <li className="mx-3">
              <Link to="/" className="text-white">
                Dashboard
              </Link>
            </li>
            <li className="mx-3">
              <Link to="/add" className="text-white">
                Add Transaction
              </Link>
            </li>
            <li className="mx-3">
              <Link to="/history" className="text-white">
                Transaction History
              </Link>
            </li>
            <li className="mx-3">
              <Link to="/budgets" className="text-white">
                Budgets
              </Link>
            </li>
            <li className="mx-3">
              <Link to="/reports" className="text-white">
                Reports
              </Link>
            </li>
            <li className="mx-3">
              <Link to="/settings" className="text-white">
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
