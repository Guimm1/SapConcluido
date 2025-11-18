// Importa a url da api do aquivo .env
const url = import.meta.env.VITE_API_URL;

// Importando os hooks pra controar o states e useEffect
import { useState, useEffect } from "react";

// Cria o hook para listar os Tutores, puxando os dados da api
export function useListaTutores() {
  //Lista com Tutores
  const [tutores, setTutores] = useState([]);

  // UseEffect para puxar os dados assim que o componente é montado
  useEffect(() => {
    // Função pra buscar os dados da API
    async function fetchData() {
      try {
        const req = await fetch(`${url}/tutores`);
        const tutores = await req.json();
        console.log(tutores);
        setTutores(tutores);
      } catch (erro) {
        console.log(erro.message);
      }
    }
    fetchData();
  }, []);

  // Retorna a lista de Tutores
  return tutores;
}

// Cria o hook para excluir um Tutores
export function useDeletaTutor() {
  // Recebe o id do Tutores a ser deletado e faz a requisição para a Api
  // com o método DELETE
  const deletarTutor = async (idTutor) => {
    // mudei aqui
    const req = await fetch(`${url}/tutores/${idTutor}`, {
      method: "DELETE",
    });
    const res = await req.json();
    // Retorna o Tutores deletado
    return res;
  };
  return { deletarTutor };
}

// Cria o hook para inserir um Tutores
export function useInserirTutor() {
  // Recebe os dados do Tutores e faz a requisição para a API
  // com o método POST
  const inserirTutor = async (data) => {
    const req = await fetch(`${url}/tutores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await req.json();
    console.log("Tutor inserido:", res);
    // Retorna o Tutor inserido
    return res;
  };

  return { inserirTutor };
}

// Cria o hook para bucar um Tutores por id
export function useBuscarTutorPorId() {
  // Receb o id do Tutores e faz a requisição para a api
  // com o método GET
  const buscarTutorPorId = async (idTutor) => {
    const req = await fetch(`${url}/tutores/${idTutor}`);
    const res = await req.json();
    console.log("Tutor encontrado:", res);
    return res;
  };
  return { buscarTutorPorId };
}

// Cria o hook para atualizar um Tutores
export function useAtualizaTutor() {
  // Envia os dados do Tutores recebido via data, para o Tutores específico que recebeu via id Tutores,
  // e faz a requisição para a ai, com o método PUT
  const atualizaTutor = async (data, idTutor) => {
    const req = await fetch(`${url}/tutores/${idTutor}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await req.json();
    console.log("Tutor atualizado:", res);
    // Retorna o Tutores atualizado
    return res;
  };
  return { atualizaTutor };
}
