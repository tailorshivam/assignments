import React, { useState } from "react";
import { useFinance } from "../context/FinanceContext";

const Settings = () => {
  const { userSettings, setUserSettings } = useFinance();
  const [currency, setCurrency] = useState(userSettings.currency || "USD");
  const [email, setEmail] = useState(userSettings.email || "");
  const [notifications, setNotifications] = useState(
    userSettings.notifications || false
  );

  const handleCurrencyChange = (e) => setCurrency(e.target.value);

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleNotificationsChange = (e) => setNotifications(e.target.checked);

  const handleSaveSettings = () => {
    setUserSettings({
      currency,
      email,
      notifications,
    });
    alert("Settings saved!");
  };

  return (
    <div>
      <h2>Settings</h2>

      <div className="mb-4">
        <h5>Profile Information</h5>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
          />
        </div>
      </div>

      <div className="mb-4">
        <h5>Currency</h5>
        <div className="form-group">
          <label htmlFor="currency">Select Currency</label>
          <select
            id="currency"
            className="form-control"
            value={currency}
            onChange={handleCurrencyChange}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="INR">INR</option>
            <option value="AUD">AUD</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <h5>Notification Preferences</h5>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="notifications"
            checked={notifications}
            onChange={handleNotificationsChange}
          />
          <label className="form-check-label" htmlFor="notifications">
            Enable notifications for overspending
          </label>
        </div>
      </div>

      <button onClick={handleSaveSettings} className="btn btn-primary">
        Save Settings
      </button>
    </div>
  );
};

export default Settings;
