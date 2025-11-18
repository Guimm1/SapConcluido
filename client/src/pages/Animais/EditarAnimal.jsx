// importando components do bootstrap
import Container from "react-bootstrap/Container";


// Importando o componente de formulário
import FormularioAnimal from "../../components/FormularioAnimal/FormularioAnimal";

const EditarAnimal = () => {

  return (
    <div >
      <Container>
        <h1>Editar Animal</h1>
        <FormularioAnimal page="editar" />
      </Container>
    </div>
  );
};

export default EditarAnimal;
