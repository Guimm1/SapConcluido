// importando components do bootstrap
import Container from "react-bootstrap/Container";


// Importando o componente de formulário
import FormularioAgendamento from "../../components/FormularioAgendamento/FormularioAgendamento";

const EditarAgendamento = () => {

  return (
    <div >
      <Container>
        <h1>Editar Agendamento</h1>
        <FormularioAgendamento page="editar" />
      </Container>
    </div>
  );
};

export default EditarAgendamento;
