import { buscarUsuario } from "../services/githubService.js";
import { showDevGithub, showTeam } from "../views/terminalView.js";
import {
  salvarUsuario,
  removerUsuarioDaBase,
} from "../services/databaseService.js";
import { Interface } from "readline/promises";

export async function menuController(
  interfaceConsole: Interface,
): Promise<boolean> {
  let running = true;

  while (running) {
    console.log("\n________________________\n ");
    console.log("=========================");
    console.log("           MENU         ");
    console.log("=========================");
    console.log(" INSTRUÇÕES DE USO:");
    console.log(" Busque desenvolvedores no GitHub e crie sua prória equipe:");
    console.log(" 1. Buscar Dev ");
    console.log(" 2. Ver Equipe");
    console.log(" 3. Remover Dev");
    console.log(" 4. Sair");
    console.log("==========================\n");

    const respostaOperação = await interfaceConsole.question(
      "Digite a opção escolhida:\n",
    );

    switch (respostaOperação) {
      case "1":
        const usernameToSearch = await interfaceConsole.question(
          "Digite o nome do usuário do GitHub: \n",
        );
        const usuario = await buscarUsuario(usernameToSearch);

        showDevGithub(usuario);

        let respostaUser;

        if (usuario) {
          respostaUser = await interfaceConsole.question(
            "Deseja adicionar esse desenvolvedor à equipe? (S/N)\:\n",
          );
          do {
            if (respostaUser.toUpperCase() === "S") {
              let resposta: any = await salvarUsuario(usuario);
              if (resposta instanceof Error) {
                if (resposta.name === "ArquivoNaoEncontradoError") {
                  const createFile = await interfaceConsole.question(
                    "Database não encontrado. Deseja criar uma nova base de dados? (S/N)\n",
                  );
                  if (createFile.toUpperCase() === "S") {
                    await salvarUsuario(usuario, true);
                  }
                  await interfaceConsole.question(
                    "Pressione enter para prosseguir...",
                  );
                }

                if (resposta.name === "ArquivoCorrompidoError") {
                  const createFile = await interfaceConsole.question(
                    "Database corrompido. Deseja criar uma nova base de dados? (S/N)\n",
                  );
                  if (createFile.toUpperCase() === "S") {
                    await salvarUsuario(usuario, true);
                  }
                  await interfaceConsole.question(
                    "Pressione enter para prosseguir...",
                  );
                }

                console.log(
                  "Erro não identificado. Algo de errado não está certo...",
                );

                await interfaceConsole.question(
                  "Pressione enter para prosseguir...",
                );
                break;
              }
              break;
            }
            if (respostaUser.toUpperCase() === "N") {
              break;
            }
            respostaUser = await interfaceConsole.question(
              "Resposta inválida. Deseja adicionar esse desenvolvedor à equipe? (S/N)\:\n",
            );
          } while (!["S", "N"].includes(respostaUser.toUpperCase()));
          break;
        }
        await interfaceConsole.question("Pressione enter para prosseguir...");
        break;
      case "2":
        await showTeam();
        await interfaceConsole.question("Pressione enter para prosseguir...");
        break;
      case "3":
        const usernameToDelete = await interfaceConsole.question(
          "Digite o nome do usuário que deseja remover: \n",
        );
        await removerUsuarioDaBase(usernameToDelete);
        await interfaceConsole.question("Pressione enter para prosseguir...");
        break;
      case "4":
        console.log("Saindo...");
        running = false;
        break;
      default:
        break;
    }
  }
  return running;
}
