import React, { useState, useEffect } from "react";
import "./App.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
  makeStyles,
} from "@material-ui/core";
import InfoBox from "./components/InfoBox/InfoBox";
import LineGraph from "./LineGraph";
import Table from "./components/Table/Table";
import { sortData, prettyPrintStat } from "./components/Util/util.js";
import numeral from "numeral";
import Map from "./components/Map/Map.js";
import "leaflet/dist/leaflet.css";
import ThemeWrapper from "./theming/ThemeWrapper.js";

const useStyles = makeStyles({
  menuItem: {
    backgroundColor: "#1a1a1a",
    color: "#6a5d5d",
    "&:hover": {
      backgroundColor: "#ffa500",
    },
    "&::active": {
      backgroundColor: "#ffa500",
    },
  },
  select: {
    backgroundColor: "#262626",
    color: "#6a5d5d",
    padding: ".5rem 1rem",
    borderRadius: "4px",
  },
});

const App = () => {
  const classes = useStyles();
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [dataName, setDataName] = useState("Cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          let sortedData = sortData(data);
          setCountries(countries);
          setMapCountries(data);
          setTableData(sortedData);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryCode);
        setCountryInfo(data);
        if (!data) setMapCenter([34.80746, -40.4796]);
        if (document.documentElement.clientWidth < 370) {
          setMapCenter([78.9629, 20.5937]);
        } else {
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        }
        setMapZoom(4);
      });
  };
  return (
    <ThemeWrapper>
      <div className="app">
        <div className="app__left">
          <div className="app__header">
            <h1>CovTrack</h1>
            <FormControl className="app__dropdown">
              <Select
                value={country}
                onChange={onCountryChange}
                className={classes.select}
              >
                <MenuItem value="worldwide" className={classes.menuItem}>
                  Worldwide
                </MenuItem>
                {countries.map((country) => (
                  <MenuItem value={country.value} className={classes.menuItem}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="app__stats">
            <InfoBox
              onClick={(e) => {
                setCasesType("cases");
                setDataName("Cases");
              }}
              title="Coronavirus Cases"
              isRed
              active={casesType === "cases"}
              cases={prettyPrintStat(countryInfo.todayCases)}
              total={numeral(countryInfo.cases).format("0.0a")}
            />
            <InfoBox
              onClick={(e) => {
                setCasesType("recovered");
                setDataName("Recoveries");
              }}
              title="Recoveries"
              active={casesType === "recovered"}
              cases={prettyPrintStat(countryInfo.todayRecovered)}
              total={numeral(countryInfo.recovered).format("0.0a")}
            />
            <InfoBox
              onClick={(e) => {
                setCasesType("deaths");
                setDataName("Deaths");
              }}
              title="Deaths"
              isRed
              active={casesType === "deaths"}
              cases={prettyPrintStat(countryInfo.todayDeaths)}
              total={numeral(countryInfo.deaths).format("0.0a")}
            />
          </div>
          <Map
            countries={mapCountries}
            casesType={casesType}
            center={mapCenter}
            zoom={mapZoom}
          />
        </div>
        <Card className="app__right">
          <CardContent>
            <div className="app__information">
              <h3>Worldwide New {dataName}</h3>
              <LineGraph casesType={casesType} />
              <h3>Live Cases by Country</h3>
              <Table countries={tableData} />
            </div>
          </CardContent>
        </Card>
      </div>
    </ThemeWrapper>
  );
};

export default App;
