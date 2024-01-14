import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchNotGood = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Row className="">
        <Col className="d-flex flex-column align-items-center text-center">
          <div className="image-div">
            <img
              className="w-100 not-found-img ms-4"
              src="https://media3.giphy.com/media/p3JjEQngctfCU6OTk6/giphy.gif?cid=6c09b952h2up0fi9fw42pc8p2wn6lq1x3mr4r19uv7l11b5w&ep=v1_stickers_related&rid=giphy.gif&ct=s"
              alt="sad cloud"
            />
          </div>
          <h1 className="bg-error text-white display-4 p-2">
            Errore "Sad Coud". La città che stai Cercando non si trova in Italia
          </h1>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <button
            className="btn btn-return"
            onClick={() => {
              navigate("/");
            }}
          >
            Torna alla ricerca
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchNotGood;
