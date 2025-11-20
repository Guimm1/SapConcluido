import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Home = () => {
  return (
    <div>
      <h1>Bem vindo ao BrasilFix</h1>
      <Row className="g-4 d-flex flex-wrap flex-row">
        <Col xs={12} md={3}>
          <Card>
            <Card.Img
              variant="top"
              height="300px"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2dcVtsFAjEB33Omu_c8M2YG3e8zvfnldlCA&s"
            />
            <Card.Body>
              <Card.Title>Cadastrar Produto </Card.Title>
              <Card.Text>Cadastre seu produto</Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQavDrZupnWcuhBNJZVqywj_8HsaTJFLd7VZw&s" />
            <Card.Body>
              <Card.Title>Verifique seu estoque</Card.Title>
              <Card.Text>
                Por onde andam seus produtos,e do que precisa
              </Card.Text>
            </Card.Body>
          </Card>
         
        </Col>
      </Row>
    </div>
  );
};

export default Home;
