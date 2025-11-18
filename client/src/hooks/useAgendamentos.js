// Importa a url da api do aquivo .env
const url = import.meta.env.VITE_API_URL;

// Importando os hooks pra controar o states e useEffect
import { useState, useEffect } from "react";

// Cria o hook para listar os Agendamentos, puxando os dados da api
export function useListaAgendamentos() {
  //Lista com Agendamentos
  const [agendamentos, setAgendamentos] = useState([]);

  // UseEffect para puxar os dados assim que o componente é montado
  useEffect(() => {
    // Função pra buscar os dados da API
    async function fetchData() {
      try {
        const req = await fetch(`${url}/agendamentos`);
        const agendamentos = await req.json();
        console.log(agendamentos);
        setAgendamentos(agendamentos);
      } catch (erro) {
        console.log(erro.message);
      }
    }
    fetchData();
  }, []);

  // Retorna a lista de Agendamentos
  return agendamentos;
}

// Cria o hook para excluir um Agendamentos
export function useDeletaAgendamento() {
  // Recebe o id do Agendamentos a ser deletado e faz a requisição para a Api
  // com o método DELETE
  const deletarAgendamento = async (idAgendamento) => {
    // mudei aqui
    const req = await fetch(`${url}/agendamentos/${idAgendamento}`, {
      method: "DELETE",
    });
    const res = await req.json();
    // Retorna o Agendamentos deletado
    return res;
  };
  return { deletarAgendamento };
}

// Cria o hook para inserir um Agendamentos
export function useInserirAgendamento() {
  // Recebe os dados do Agendamentos e faz a requisição para a API
  // com o método POST
  const inserirAgendamento = async (data) => {
    const req = await fetch(`${url}/agendamentos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await req.json();
    console.log("Agendamento inserido:", res);
    // Retorna o Agendamento inserido
    return res;
  };

  return { inserirAgendamento };
}

// Cria o hook para bucar um Agendamentos por id
export function useBuscarAgendamentoPorId() {
  // Receb o id do Agendamentos e faz a requisição para a api
  // com o método GET
  const buscarAgendamentoPorId = async (idAgendamento) => {
    const req = await fetch(`${url}/agendamentos/${idAgendamento}`);
    const res = await req.json();
    console.log("Agendamento encontrado:", res);
    return res;
  };
  return { buscarAgendamentoPorId };
}

// Cria o hook para atualizar um Agendamentos
export function useAtualizaAgendamento() {
  // Envia os dados do Agendamentos recebido via data, para o Agendamentos específico que recebeu via id Agendamentos,
  // e faz a requisição para a ai, com o método PUT
  const atualizaAgendamento = async (data, idAgendamento) => {
    const req = await fetch(`${url}/agendamentos/${idAgendamento}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await req.json();
    console.log("Agendamento atualizado:", res);
    // Retorna o Agendamentos atualizado
    return res;
  };
  return { atualizaAgendamento };
}

// Cria o hook para atualizar um Agendamentos
export function useCancelaAgendamento() {
  // Envia os dados do Agendamentos recebido via data, para o Agendamentos específico que recebeu via id Agendamentos,
  // e faz a requisição para a ai, com o método PUT
  const cancelarAgendamento = async (idAgendamento) => {
    const req = await fetch(`${url}/agendamentos/${idAgendamento}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"status": "Cancelado"}),
    });
    const res = await req.json();
    console.log("Agendamento cancelado:", res);
    // Retorna o Agendamentos atualizado
    return res;
  };
  return { cancelarAgendamento };
}

// Cria o hook para atualizar um Agendamentos
export function useRelizaAgendamento() {
  // Envia os dados do Agendamentos recebido via data, para o Agendamentos específico que recebeu via id Agendamentos,
  // e faz a requisição para a ai, com o método PUT
  const realizarAgendamento = async (idAgendamento) => {
    const req = await fetch(`${url}/agendamentos/${idAgendamento}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"status": "Feito"}),
    });
    const res = await req.json();
    console.log("Agendamento realizado:", res);
    // Retorna o Agendamentos atualizado
    return res;
  };
  return { realizarAgendamento };
}