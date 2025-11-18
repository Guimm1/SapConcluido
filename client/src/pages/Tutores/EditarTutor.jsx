// importando components do bootstrap
import Container from "react-bootstrap/Container";


// Importando o componente de formulário
import FormularioTutor from "../../components/FormularioTutor/FormularioTutor";

const EditarTutor = () => {

  return (
    <div >
      <Container>
        <h1>Editar Perfil</h1>
        <FormularioTutor page="editar" />
      </Container>
    </div>
  );
};

export default EditarTutor;
