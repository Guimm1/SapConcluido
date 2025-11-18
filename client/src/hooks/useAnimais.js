// Importa a url da api do aquivo .env
const url = import.meta.env.VITE_API_URL;

// Importando os hooks pra controar o states e useEffect
import { useState, useEffect } from "react";

// Cria o hook para listar os Animais, puxando os dados da api
export function useListaAnimais() {
  //Lista com Animais
  const [animais, setAnimais] = useState([]);

  // UseEffect para puxar os dados assim que o componente é montado
  useEffect(() => {
    // Função pra buscar os dados da API
    async function fetchData() {
      try {
        const req = await fetch(`${url}/animais`);
        const animais = await req.json();
        console.log(animais);
        setAnimais(animais);
      } catch (erro) {
        console.log(erro.message);
      }
    }
    fetchData();
  }, []);

  // Retorna a lista de Animais
  return animais;
}

// Cria o hook para excluir um Animais
export function useDeletaAnimal() {
  // Recebe o id do Animais a ser deletado e faz a requisição para a Api
  // com o método DELETE
  const deletarAnimal = async (idAnimal) => {
    // mudei aqui
    const req = await fetch(`${url}/animais/${idAnimal}`, {
      method: "DELETE",
    });
    const res = await req.json();
    // Retorna o Animais deletado
    return res;
  };
  return { deletarAnimal };
}

// Cria o hook para inserir um Animais
export function useInserirAnimal() {
  // Recebe os dados do Animais e faz a requisição para a API
  // com o método POST
  const inserirAnimal = async (data) => {
    const req = await fetch(`${url}/animais`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await req.json();
    console.log("Animal inserido:", res);
    // Retorna o Animal inserido
    return res;
  };

  return { inserirAnimal };
}

// Cria o hook para bucar um Animais por id
export function useBuscarAnimalPorId() {
  // Receb o id do Animais e faz a requisição para a api
  // com o método GET
  const buscarAnimalPorId = async (idAnimal) => {
    const req = await fetch(`${url}/animais/${idAnimal}`);
    const res = await req.json();
    console.log("Animal encontrado:", res);
    return res;
  };
  return { buscarAnimalPorId };
}

// Cria o hook para atualizar um Animais
export function useAtualizaAnimal() {
  // Envia os dados do Animais recebido via data, para o Animais específico que recebeu via id Animais,
  // e faz a requisição para a ai, com o método PUT
  const atualizaAnimal = async (data, idAnimal) => {
    const req = await fetch(`${url}/animais/${idAnimal}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await req.json();
    console.log("Animal atualizado:", res);
    // Retorna o Animais atualizado
    return res;
  };
  return { atualizaAnimal };
}
