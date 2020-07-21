import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { isEmpty } from "lodash";
import DropdownView from "./view/DropdownView";
import countries from "../../data/countries.json";
import "./Dropdown.css";

const Dropdown = ({ userRole, howManyCountriesToShowSetting }) => {
  const countryListApi = "https://api.first.org/data/v1/countries";

  const [countryDataSet, setCountryDataSet] = useState();
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [numberOfCountriesToShow, setNumberOfCountriesToShow] = useState(5);
  const [countriesToShow, setCountriesToShow] = useState([]);
  const [wordToSearch, setWordToSearch] = useState("");
  const [filteredCountryList, setFilteredCountryList] = useState([]);

  const fetchCountryData = () => {
    axios.get(countryListApi)
      .then(res => setCountryDataSet(res.data))
      .catch(err => {
        console.log("Fetch data failed, use local sample data:", err);
        setCountryDataSet(countries);
      });
  };

  const handleSelectCountry = (e) => {
    setSelectedCountry(e.target.innerHTML);
    toggleDropdownList();
  };

  const handleSetCountryToShow = useCallback(
    () => {
      if (numberOfCountriesToShow < countryList.length) {
        const _countriesToShow = countryList.filter(country => countryList.indexOf(country) < numberOfCountriesToShow);
        setCountriesToShow(_countriesToShow);
      } else {
        setCountriesToShow(countryList);
      }
    },
    [countryList, numberOfCountriesToShow]
  );

  const handleClearCountry = () => {
    setSelectedCountry(null);
    setWordToSearch("");
    toggleDropdownList();
  };

  const toggleDropdownList = () => {
    setOpenDropdown(!openDropdown);
  };

  const handleShowAllCountries = () => {
    setNumberOfCountriesToShow(countryList.length);
  };

  const handleSearchChange = (e) => {
    setWordToSearch(e.target.value);
  };

  const handleAddSelectCountry = (country) => {
    setCountryList([{id: Date.now().toString(), country, region: ""}, ...countryList]);
    setSelectedCountry(country);
    setWordToSearch("");
    toggleDropdownList();
  }

  useEffect(() => {
    fetchCountryData();
    return () => {}
  }, [])

  useEffect(() => {
    setNumberOfCountriesToShow(howManyCountriesToShowSetting);
    return () => {}
  }, [howManyCountriesToShowSetting])

  useEffect(() => {
    if (!countryDataSet) return;
    if (countryDataSet.data) {
      let _countryList = [];
      const _arr = Object.entries(countryDataSet.data);
      _arr.forEach(([key, value]) => {
        _countryList.push({id: key, ...value});
      });
      setCountryList(_countryList);
    }
    return () => {}
  }, [countryDataSet])

  useEffect(() => {
    if (!countryList || isEmpty(countryList)) return;
      handleSetCountryToShow();
    return () => {}
  }, [countryList, handleSetCountryToShow])

  useEffect(() => {
      setFilteredCountryList(countryList.filter(country => country.country.toLowerCase().indexOf(wordToSearch.toLowerCase()) > -1));
    return () => {}
  }, [countryList, wordToSearch])

  return (
    <div>
      <DropdownView 
        userRole={userRole}
        countryList={countryList}
        countriesToShow={countriesToShow}
        filteredCountryList={filteredCountryList}
        handleSelectCountry={handleSelectCountry}
        handleClearCountry={handleClearCountry}
        selectedCountry={selectedCountry}
        toggleDropdownList={toggleDropdownList}
        openDropdown={openDropdown}
        handleShowAllCountries={handleShowAllCountries}
        handleSearchChange={handleSearchChange}
        wordToSearch={wordToSearch}
        handleAddSelectCountry={handleAddSelectCountry}
      />
    </div>
  )
}

export default Dropdown;
