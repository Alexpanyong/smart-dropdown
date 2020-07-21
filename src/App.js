import React, { useState, useEffect } from "react";
import "./App.css";
import Dropdown from "./components/Dropdown/Dropdown";

function App() {
  const [userRole, setUserRole] = useState("admin");
  const [howManyCountriesToShowSetting, setHowManyCountriesToShowSetting] = useState(5);
  const [countryPicked, setCountryPicked] = useState(null);

  const handleLoginSetting = (e) => {
    setUserRole(e.target.value);
  };

  const handleNumOfCountriesToShowSetting = (e) => {
    setHowManyCountriesToShowSetting(e.target.value);
  };

  const getResult = (country = null) => {
    if (country) {
      setCountryPicked(country);
    } else {
      setCountryPicked(null);
    }
  };

  useEffect(() => {
    if (!howManyCountriesToShowSetting) return;
      console.log(howManyCountriesToShowSetting);
    return () => {}
  }, [howManyCountriesToShowSetting])

  useEffect(() => {
      console.log("countryPicked:", countryPicked);
    return () => {}
  }, [countryPicked])

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
      <Dropdown userRole={userRole} howManyCountriesToShowSetting={howManyCountriesToShowSetting} getResult={getResult} />
      {countryPicked && <div className="resultPanelWrap">
        <div className="resultPanel">
          <div className="resultId">Id: {countryPicked[0].id}</div>
          <div className="resultCountry">Country: {countryPicked[0].country}</div>
          <div className="resultRegion">Region: {countryPicked[0].region}</div>
        </div>
      </div>}
    </div>
  );
}

export default App;
