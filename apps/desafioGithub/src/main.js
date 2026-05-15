import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "process"; //standardIn E standardOut -> entrada padrão e saída padrão
import { menuController } from "./controllers/desafioControllr.js";

async function main() {
  let running = true;
  const interfaceConsole = createInterface(stdin, stdout);

  // INTERFACE DE USUÁRIO (CLI): Cabeçalho informativo
  while (running) {
    running = await menuController(interfaceConsole);
  }

  interfaceConsole.close();
}

// O programa deve pedir um usuário
// Caso o usuário Não exista, ou a requisição de busca falhe, o programa deve tratar os erros corretamente e mostrar ao usuário a mensagem adequada
// Se o usuário for encontrado, deve ser mostrado na tela (terminal), o nome e o username
// Perguntar ao usuário se deseja salvar
// Não poderá salvar usuários repetidos
// Não deverá sobrescrever usuários já existentes
main();
