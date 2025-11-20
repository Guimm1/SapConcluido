import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

// Importando o icone de login
import { BsSearch } from "react-icons/bs";

// importacao do hook para buscar os clientes
import { useListaAnimais, useDeletaAnimal } from "../../hooks/useAnimais";

import { Link } from "react-router-dom";

import { useState } from "react";

const VerAnimais = () => {
 
// variavel para armazenar os clientes, que veio do hook
  const animais = useListaAnimais();

  // Estados para filtros
  const [buscaNome, setBuscaNome] = useState("");
  const [buscaTipo, setBuscaTipo] = useState("");

  // Filtragem combinada
  const animaisFiltrados = animais.filter((tut) => {
    const nomeCorresponde = tut.nome.toLowerCase().includes(buscaNome.toLowerCase());

    const tipoCorresponde = buscaTipo
      ? tut.tipo?.toLowerCase() === buscaTipo.toLowerCase()
      : true;

    return nomeCorresponde && tipoCorresponde;
  });

  // importanto a funcao de deletar cliente
  const { deletarAnimal } = useDeletaAnimal();

  // Funcao para requisitar a exclusao do cliente
  const handleDelete = async (idAnimal) => {
    // Deletando cliente utilizando o hook de deletar cliente
    // passando o id do cliente específico
    const deletado = await deletarAnimal(idAnimal);
    console.log(deletado);
    alert(`Animal deletado com sucesso!`);

    window.location.reload(); // Atualiza a página após a exclusão
  };

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-start p-3 ">
      <h1 className="text-center"> Ver Produtos </h1>
      {/* Filtro de busca */}
      <div className="w-75 mx-auto d-flex justify-content-center gap-2 flex-wrap">
        <InputGroup className="mb-3" style={{ maxWidth: "400px" }}>
          <Form.Control
            placeholder="Procure um Produto"
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
            <th>id</th>
            <th>Nome</th>
            <th>Código</th>
            <th>Categoria </th>
            <th>Descrição</th>
            <th/>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {animaisFiltrados.length > 0 ? (
            animaisFiltrados.map((tut) => (
              <tr key={tut.id}>
                <td>{tut.id}</td>
                <td>{tut.nome}</td>
                <td>{tut.especie}</td>
                <td>{tut.raca}</td>
                <td>{tut.sexo}</td>
                <td>{tut.tutor}</td>
                <td>
                  <Button
                    as={Link}
                    to={`/animais/editar/${tut.id}`}
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
              <td colSpan={9} className="text-center text-muted">Nenhum Animal encontrado.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default VerAnimais;
