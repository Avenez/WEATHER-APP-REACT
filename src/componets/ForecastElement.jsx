import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Collapse } from "react-bootstrap";
import SubForecastElement from "./SubForecastElement";

// Definisci il componente ForecastElement
const ForecastElement = (props) => {
  // Funzione per ottenere l'URL dell'icona del tempo
  const getWeatherIconUrl = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}.png`;
  };

  // Converti le temperature in formato stringa con una cifra decimale
  const temperatureMax = props.maxTemp.toFixed(1);
  const temperatureMin = props.minTemp.toFixed(1);

  // Converte la stringa della data in un oggetto Date
  const dateObject = new Date(props.date);

  // Estrae il nome del giorno della settimana dalla data
  const options = { weekday: "long" };
  const dayOfWeek = dateObject.toLocaleDateString("it-IT", options);

  // Utilizza lo stato locale per gestire la visibilità del pannello di collasso
  const [isVisible, setVisibility] = useState(false);

  // Funzione per attivare/diattivare il pannello di collasso
  const invokeCollapse = () => {
    setVisibility(!isVisible);
  };

  // Ritorna la struttura del componente JSX
  return (
    <>
      {/* Riga contenente le informazioni principali sulla previsione del tempo */}
      <Row xs={4} className="cursor border-1 border border-primary rounded-4  mb-2 pt-2" onClick={invokeCollapse}>
        <Col>
          <p>{dayOfWeek}</p>
        </Col>
        <Col>
          <img src={getWeatherIconUrl(props.iconCodes)} alt="Icona meteo" style={{ width: "35px" }} />
        </Col>
        <Col>
          <p>{temperatureMax}°C</p>
        </Col>
        <Col>
          <p>{temperatureMin}°C</p>
        </Col>
      </Row>

      <Collapse in={isVisible}>
        <div>
          <Container className="border-bottom border-2 border-primary mb-3">
            {props.forecastDayData.elementi.map((elemento, index) => (
              <SubForecastElement
                key={`sub-id-${index}`}
                ora={elemento.dt_txt}
                tempMin={elemento.main.temp_min}
                tempMax={elemento.main.temp_max}
                icon={elemento.weather[0].icon}
              />
            ))}
          </Container>
        </div>
      </Collapse>
    </>
  );
};

// Esporta il componente ForecastElement per poterlo utilizzare in altri file
export default ForecastElement;
