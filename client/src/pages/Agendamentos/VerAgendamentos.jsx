import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Badge from "react-bootstrap/Badge";

// Importando o icone de login
import { BsSearch } from "react-icons/bs";

// importacao do hook para buscar os Agendamentos
import {
  useListaAgendamentos,
  useDeletaAgendamento,
  useCancelaAgendamento,
  useRelizaAgendamento,
} from "../../hooks/useAgendamentos";

import { Link } from "react-router-dom";

import { useState } from "react";

const VerAgendamentos = () => {
  // variavel para armazenar os Agendamentos, que veio do hook
  const agendamentos = useListaAgendamentos();

  // Estados para filtros
  const [buscaNome, setBuscaNome] = useState("");
  const [buscaTipo, setBuscaTipo] = useState("");

  // Filtragem combinada
  const agendamentosFiltrados = agendamentos.filter((age) => {
    const nomeCorresponde = age.animal
      .toLowerCase()
      .includes(buscaNome.toLowerCase());

    const tipoCorresponde = buscaTipo
      ? age.status?.toLowerCase() === buscaTipo.toLowerCase()
      : true;

    return nomeCorresponde && tipoCorresponde;
  });

  // importanto a funcao de deletar Agendamento
  const { deletarAgendamento } = useDeletaAgendamento();
  // importanto a funcao de cancelar Agendamento
  const { cancelarAgendamento } = useCancelaAgendamento();
  // importanto a funcao de cancelar Agendamento
  const { realizarAgendamento } = useRelizaAgendamento();
  // Funcao para requisitar a exclusao do Agendamento
  const handleDelete = async (idAgendamento) => {
    // Deletando Agendamento utilizando o hook de deletar Agendamento
    // passando o id do Agendamento específico
    const deletado = await deletarAgendamento(idAgendamento);
    console.log(deletado);
    alert(`Agendamento deletado com sucesso!`);

    window.location.reload(); // Atualiza a página após a exclusão
  };

  // Funcao para requisitar a exclusao do Agendamento
  const handleCancelar = async (idAgendamento) => {
    // Deletando Agendamento utilizando o hook de deletar Agendamento
    // passando o id do Agendamento específico
    const cancelado = await cancelarAgendamento(idAgendamento);
    console.log(cancelado);
    alert(`Agendamento cancelado com sucesso!`);

    window.location.reload(); // Atualiza a página após a exclusão
  };

  // Funcao para requisitar a exclusao do Agendamento
  const handleRealizar = async (idAgendamento) => {
    // Deletando Agendamento utilizando o hook de deletar Agendamento
    // passando o id do Agendamento específico
    const realizado = await realizarAgendamento(idAgendamento);
    console.log(realizado);
    alert(`Agendamento realizado com sucesso!`);

    window.location.reload(); // Atualiza a página após a exclusão
  };

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-start p-3 ">
      <h1 className="text-center"> Ver Agendamentos </h1>
      {/* Filtro de busca */}
      <div className="w-75 mx-auto d-flex justify-content-center gap-2 flex-wrap">
        <InputGroup className="mb-3" style={{ maxWidth: "400px" }}>
          <Form.Control
            placeholder="Procure um Agendamento"
            value={buscaNome}
            onChange={(e) => setBuscaNome(e.target.value)}
          />
          <Button variant="primary" id="botao-filtrar">
            <BsSearch /> Pesquisar
          </Button>
        </InputGroup>
        {/* Filtro por tipo */}
        <DropdownButton
          id="dropdown-categoria"
          title={buscaTipo || "Todas as categorias"}
          variant="secondary"
          className="mb-3"
        >
          <Dropdown.Item onClick={() => setBuscaTipo("")}>Todas</Dropdown.Item>

          <Dropdown.Item onClick={() => setBuscaTipo("Agendado")}>
            Agendado
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setBuscaTipo("Cancelado")}>
            Cancelado
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setBuscaTipo("Feito")}>
            Feito
          </Dropdown.Item>
        </DropdownButton>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Tipo</th>
            <th>Data</th>
            <th>Hora</th>
            <th>Status</th>
            <th>Responsável</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {agendamentosFiltrados.length > 0 ? (
            agendamentosFiltrados.map((age) => (
              <tr key={age.id}>
                <td>{age.id}</td>
                <td>{age.tipo}</td>
                <td>{age.data}</td>
                <td>{age.hora}</td>
                <td>
                  {age.status === "Cancelado" ? (
                    <Badge bg="danger">Cancelado</Badge>
                  ) : age.status === "Agendado" ? (
                    <Badge bg="primary">Agendado</Badge>
                  ) : (
                    <Badge bg="success">Feito</Badge>
                  )}
                </td>
                <td>{age.responsavel}</td>
                <td>
                  <Button
                    as={Link}
                    to={`/agendamentos/editar/${age.id}`}
                    size="sm"
                    variant="warning"
                    className="mx-2"
                  >
                    Editar
                  </Button>
                  {age.status === "Agendado" && (
                    <>
                      <Button
                        size="sm"
                        variant="success"
                        className="mx-2"
                        onClick={() => handleRealizar(age.id)}
                      >
                        Realizar
                      </Button>

                      <Button
                        size="sm"
                        variant="danger"
                        className="mx-2"
                        onClick={() => handleCancelar(age.id)}
                      >
                        Cancelar
                      </Button>
                    </>
                  )}

                  {/* <Button
                    size="sm"
                    variant="danger"
                    className="mx-2"
                    onClick={() => handleDelete(age.id)}
                  >
                    Excluir
                  </Button> */}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} className="text-center text-muted">
                Nenhum Agendamento encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default VerAgendamentos;
