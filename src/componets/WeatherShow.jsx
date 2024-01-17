import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ForecastElement from "../componets/ForecastElement";

const WeatherShow = () => {
  const [cityObj, setCityObj] = useState(null);
  const [cityWeatherData, setCityWeatherData] = useState(null);
  const [cityWeatherDataForecast, setCityWeatherDataForecast] = useState(null);
  const { cityName } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingForecast, setIsLoadingForecast] = useState(true);

  const navigate = useNavigate();

  //--------------------------------------

  const redirect = () => {
    navigate("/notFoud");
  };

  //--------------------------------------

  const capitalizedCityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
  const temperature = cityWeatherData?.main?.temp?.toFixed(1) || "";
  const temperaturePerc = cityWeatherData?.main?.feels_like?.toFixed(1) || "";

  const forecastArray = [];
  let giornoCorrente = null;

  cityWeatherDataForecast?.list?.forEach((elemento) => {
    const dataElemento = elemento?.dt_txt?.split(" ");
    const giornoElemento = dataElemento?.[0];
    const oraElemento = dataElemento?.[1];

    if (oraElemento === dataElemento[1] && giornoCorrente !== giornoElemento) {
      forecastArray.push(elemento);
      giornoCorrente = giornoElemento;
    }
  });

  //-----------------------------------------------------------

  const groupedForecastArray = [];

  cityWeatherDataForecast?.list?.forEach((elemento) => {
    const dataElemento = elemento?.dt_txt?.split(" ");
    const giornoElemento = dataElemento?.[0];

    // Trova l'oggetto corrispondente nella groupedForecastArray in base alla data
    let existingGroup = groupedForecastArray.find((group) => group.data === giornoElemento);

    // Se non esiste ancora un gruppo con questa data, crea un nuovo gruppo
    if (!existingGroup) {
      existingGroup = {
        data: giornoElemento,
        elementi: [],
      };
      groupedForecastArray.push(existingGroup);
    }

    existingGroup.elementi.push(elemento);
  });

  //------------------------------------------------------------

  const APIKey = "2693517c12647f45bc5c1d7466449299";

  // Funzione per ottenere l'URL dell'icona basata sul codice restituito da OpenWeatherMap
  const getWeatherIconUrl = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}.png`;
  };

  //   --------------------FETCH GEO DATA FROM NAME
  const fetchGeoData = async () => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},IT&limit=2&appid=${APIKey}`
      );

      if (!response.ok) {
        navigate("/notFoud");
        throw new Error("Errore nella richiesta API per le coordinate della città");
      }

      const data = await response.json();
      fetchWeatherData(data[0]);
      fetchForecastData(data[0]);

      const firstCity = data && data.length > 0 ? data[0] : null;

      setIsLoading(false);
    } catch (error) {
      console.error("Errore durante la richiesta API:", error);
    }
  };

  //   --------------------FETCH WEATHER DATA FROM CITY GEO DATA
  const fetchWeatherData = async (data) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&lang=it&units=metric&appid=${APIKey}`
      );

      if (!response.ok) {
        throw new Error("Errore nella richiesta API per i dati meteo");
      }

      const weatherData = await response.json();
      setCityWeatherData(weatherData);
      console.log(cityWeatherData);
    } catch (error) {
      navigate("/notFoud");
      console.error("Errore durante la richiesta API per i dati meteo:", error);
    }
  };

  //   --------------------FETCH WEATHER FORECAST DATA FROM GEO DATA
  const fetchForecastData = async (data) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${data.lat}&lon=${data.lon}&lang=it&units=metric&appid=${APIKey}`
      );

      if (!response.ok) {
        throw new Error("Errore nella richiesta API del meteo previsionale");
      }

      const forecastData = await response.json();
      setCityWeatherDataForecast(forecastData);
      setIsLoadingForecast(false);
      console.log(forecastData);
    } catch (error) {
      navigate("/notFoud");
      console.error("Errore durante la richiesta API del meteo previsionale:", error);
    }
  };

  const allMyFetch = async () => {
    try {
      console.log(cityName);

      await fetchGeoData();
      console.log(cityObj);
    } catch (error) {
      console.error("Errore durante le richieste API:", error);
    }
  };
  useEffect(() => {
    allMyFetch();
  }, []);

  return (
    <>
      {isLoadingForecast ? (
        <Container className="d-flex justify-content-center align-items-center vh-100 ">
          <img
            className="spinner mt-5"
            src="https://spotler.co.uk/wp-content/uploads/sites/8/2023/03/Weather-GIF-source.gif"
            alt="logo"
          />
        </Container>
      ) : (
        <Container>
          <Row>
            <Col></Col>
            <Col xs={8} md={5} className="text-center mt-5 weatherContainer">
              <Row className="">
                <h1 className="display-2">{capitalizedCityName}</h1>
              </Row>
              <Row>
                <h2 className="display-1 mt-2 ">{temperature}°C</h2>
                <p className="h3 mt-2 ">{`Percepita: ${temperaturePerc}°C`}</p>
              </Row>
              <Row className="d-flex align-items-center">
                <Col xs={12} className="d-flex justify-content-center align-items-center m-0  ">
                  {cityWeatherData && (
                    <>
                      <img
                        src={getWeatherIconUrl(cityWeatherData.weather[0].icon)}
                        alt={cityWeatherData.weather[0].description}
                        style={{ width: "35px" }}
                      />

                      <p className="mb-0 h6">{cityWeatherData.weather[0].description}</p>
                    </>
                  )}
                </Col>
              </Row>
            </Col>
            <Col></Col>
          </Row>

          <Row xs={4} className="mt-3 mb-0 ">
            <Col></Col>
            <Col></Col>
            <Col>
              <p className="fw-bold">MAX</p>
            </Col>
            <Col>
              <p className="fw-bold">MIN</p>
            </Col>
          </Row>
          <Row>
            <Col className="ps-4">
              {forecastArray.map((day, index) => (
                <ForecastElement
                  forecastDayData={groupedForecastArray[index]}
                  key={`day-id-${index}`}
                  date={day.dt_txt}
                  iconCodes={day.weather[0].icon}
                  maxTemp={day.main.temp_max}
                  minTemp={day.main.temp_min}
                />
              ))}
            </Col>
          </Row>
          <Row>
            <Col className="text-center mt-2">
              <button
                className="btn btn-primary"
                onClick={() => {
                  navigate("/");
                }}
              >
                <i class="bi bi-caret-left-fill me-1"></i>Home
              </button>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default WeatherShow;
