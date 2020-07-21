import React, { useEffect } from "react";
import { isEmpty } from "lodash";
import "./DropdownView.css";

const DropdownView = ({ userRole, countryList, countriesToShow, filteredCountryList, handleSelectCountry, handleClearCountry, selectedCountry, toggleDropdownList, openDropdown, handleShowAllCountries, handleSearchChange, wordToSearch, handleAddSelectCountry }) => {
  useEffect(() => {
    if (!countryList || isEmpty(countryList)) return;
      console.log("View -- countryList", countryList);
    return () => {}
  }, [countryList])

  useEffect(() => {
    if (!countriesToShow || isEmpty(countriesToShow)) return;
    console.log("View -- countriesToShow", countriesToShow);
    return () => {}
  }, [countriesToShow])

  useEffect(() => {
    if (!selectedCountry) return;
      console.log("View -- selectedCountry:", selectedCountry);
    return () => {}
  }, [selectedCountry])

  useEffect(() => {
    // if (!filteredCountryList || isEmpty(filteredCountryList)) return;
      console.log("View -- filteredCountryList:", filteredCountryList);
    return () => {}
  }, [filteredCountryList])

  return (
    <div>
      <div className="dropdownWrap">
        <div className="inputBoxWrap" onClick={toggleDropdownList}>
          <div className={`inputBox ${selectedCountry ? "" : "placeholder"}`}>{selectedCountry ? selectedCountry : "Select a location..."}</div>
          <div className="dropdownButtonWrap">
            <span id="dropdownButton">
              <div className={`iconArrowWrap ${openDropdown ? "dropdownOpened" : ""}`}>
                <div className="iconArrow" id="leftPart"></div>
                <div className="iconArrow" id="rightPart"></div>
              </div>
              
            </span>
          </div>
        </div>
        
        {openDropdown && <div className="countryListWrap">
          <div className="searchBoxWrap">
            <input className="searchBox" placeholder="Search..." onChange={handleSearchChange}></input>
            {isEmpty(filteredCountryList) && wordToSearch !== "" && <div className="notFoundInfoWrap">
              <div className={`notFoundInfo ${userRole !== "admin" ? "fullWidth" : ""}`}>{`"${wordToSearch}" not found`}</div>
              {userRole === "admin" && <button className="addSelectButton" onClick={() => handleAddSelectCountry(wordToSearch)}>{`Add & Select`}</button>}
            </div>}
          </div>
          {(wordToSearch === "" && !isEmpty(countriesToShow)) && <ul>
            <li onClick={handleClearCountry}>------</li>
            {countriesToShow.map(item => <li key={item.id} value={item.country} onClick={handleSelectCountry}>{item.country}</li>)}
            {countriesToShow.length !== countryList.length && <li className="showMoreButton" onClick={handleShowAllCountries}>{`${countryList.length - countriesToShow.length} more...`}</li>}
          </ul>}
          {wordToSearch !== "" && <ul>
            <li onClick={handleClearCountry}>--- Reset ---</li>
            {filteredCountryList.map(item => <li key={item.id} value={item.country} onClick={handleSelectCountry}>{item.country}</li>)}
          </ul>}
        </div>}
      </div>
    </div>
  )
}

export default DropdownView;
