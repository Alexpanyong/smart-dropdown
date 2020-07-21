import React, { useState, useEffect } from "react";
import "./App.css";
import Dropdown from "./components/Dropdown/Dropdown";

function App() {
  const [userRole, setUserRole] = useState("admin");
  const [howManyCountriesToShowSetting, setHowManyCountriesToShowSetting] = useState(5);

  const handleLoginSetting = (e) => {
    setUserRole(e.target.value);
  };

  const handleNumOfCountriesToShowSetting = (e) => {
    setHowManyCountriesToShowSetting(e.target.value);
  };

  useEffect(() => {
    if (!howManyCountriesToShowSetting) return;
      console.log(howManyCountriesToShowSetting);
    return () => {}
  }, [howManyCountriesToShowSetting])

  return (
    <div className="App">
      <div className="settingsWrap">
        <div className="userRole">
          <label>Login as </label>
          <select name="userRole" id="userRoleSetting" onChange={handleLoginSetting}>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <div className="numOfCountriesToShow">
          <label>Number of countries to show </label>
          <input id="numOfCountriesToShowSetting" defaultValue="5" onChange={handleNumOfCountriesToShowSetting}></input>
        </div>
      </div>
      <Dropdown userRole={userRole} howManyCountriesToShowSetting={howManyCountriesToShowSetting} />
    </div>
  );
}

export default App;
