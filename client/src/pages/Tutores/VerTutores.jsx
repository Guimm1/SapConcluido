import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

// Importando o icone de login
import { BsSearch } from "react-icons/bs";

// importacao do hook para buscar os clientes
import { useListaTutores, useDeletaTutor } from "../../hooks/useTutores";

import { Link } from "react-router-dom";

import { useState } from "react";

const VerTutores = () => {
 
// variavel para armazenar os clientes, que veio do hook
  const tutores = useListaTutores();

  // Estados para filtros
  const [buscaNome, setBuscaNome] = useState("");
  const [buscaTipo, setBuscaTipo] = useState("");

  // Filtragem combinada
  const tutoresFiltrados = tutores.filter((tut) => {
    const nomeCorresponde = tut.nome.toLowerCase().includes(buscaNome.toLowerCase());

    const tipoCorresponde = buscaTipo
      ? tut.tipo?.toLowerCase() === buscaTipo.toLowerCase()
      : true;

    return nomeCorresponde && tipoCorresponde;
  });

  // importanto a funcao de deletar cliente
  const { deletarTutor } = useDeletaTutor();

  // Funcao para requisitar a exclusao do cliente
  const handleDelete = async (idTutor) => {
    // Deletando cliente utilizando o hook de deletar cliente
    // passando o id do cliente específico
    const deletado = await deletarTutor(idTutor);
    console.log(deletado);
    alert(`Tutor deletado com sucesso!`);

    window.location.reload(); // Atualiza a página após a exclusão
  };

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-start p-3 ">
      <h1 className="text-center"> Ver Produtos em estoque </h1>
      {/* Filtro de busca */}
      <div className="w-75 mx-auto d-flex justify-content-center gap-2 flex-wrap">
        <InputGroup className="mb-3" style={{ maxWidth: "400px" }}>
          <Form.Control
            placeholder="Procure um produto no estoque"
            value={buscaNome}
            onChange={(e) => setBuscaNome(e.target.value)}
          />
          <Button variant="primary" id="botao-filtrar">
            <BsSearch /> Pesquisar
          </Button>
        </InputGroup>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            
            <th>Nome </th>
            <th>código</th>
            <th>categoria </th>
            <th>descrição</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tutoresFiltrados.length > 0 ? (
            tutoresFiltrados.map((tut) => (
              <tr key={tut.id}>
                <td>{tut.id}</td>
                <td>{tut.nome}</td>
                <td>{tut.email}</td>
                <td>{tut.cpf}</td>
                <td>{tut.telefone}</td>
                <td>
                  <Button
                    as={Link}
                    to={`/tutores/editar/${tut.id}`}
                    size="sm"
                    variant="warning"
                    className="mx-2"
                  >
                    Editar
                  </Button>

                  <Button
                    size="sm"
                    variant="danger"
                    className="mx-2"
                    onClick={() => handleDelete(tut.id)}
                  >
                    Excluir
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} className="text-center text-muted">Nenhum tutor encontrado.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default VerTutores;
