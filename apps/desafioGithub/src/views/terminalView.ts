import { lerArquivo } from "../services/databaseService.js";
import { Usuario } from "../types/Usuario.js";

export async function showTeam() {
  try {
    console.log("=========================");
    console.log("          EQUIPE         ");
    console.log("=========================");

    const usuarios = await lerArquivo();

    if (usuarios.length === 0) {
      console.log("\nNenhum integrante na equipe\n");
      return;
    }

    usuarios.forEach((usuario) => {
      console.log(`Nome: ${usuario.name ?? ""}`);
      console.log(`Username: ${usuario.login ?? ""}`);
      console.log(`Bio: ${usuario.bio ?? ""}`);
      console.log(`Nº de Repositórios: ${usuario.public_repos ?? 0}`);
      console.log("==========================");
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("Erro desconhecido");
    }
  }
}

export function showDevGithub(usuario: Usuario) {
  if (usuario) {
    console.log("==========================");
    console.log(`Nome: ${usuario.name ?? ""}`);
    console.log(`Username: ${usuario.login ?? ""}`);
    console.log(`Bio: ${usuario.bio ?? ""}`);
    console.log(`Nº de Repositórios: ${usuario.public_repos ?? 0}`);
    console.log("==========================\n");
    return;
  }

  console.log("\nUsuário não encontrado");
}
