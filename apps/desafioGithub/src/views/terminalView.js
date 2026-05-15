import { lerArquivo } from "../services/databaseService.js";

export async function showTeam() {
  console.log("=========================");
  console.log("          EQUIPE         ");
  console.log("=========================");
  const usuarios = await lerArquivo();
  if (usuarios && usuarios.length > 0) {
    usuarios.forEach((usuario) => {
      console.log("Nome: " + usuario.name ?? "");
      console.log("Username: " + usuario.login ?? "");
      console.log("Bio: " + usuario.bio ?? "");
      console.log("Nº de Repositórios: " + usuario.public_repos ?? "");
      console.log("==========================");
    });
    return;
  }
  console.log("\nNenhum integrante na equipe\n");
}

export function showDevGithub(usuario) {
  if (usuario) {
    console.log("==========================");
    console.log("Nome: " + usuario.name ?? "");
    console.log("Username: " + usuario.login ?? "");
    console.log("Bio: " + usuario.bio ?? "");
    console.log("Nº de Repositórios: " + usuario.public_repos ?? "");
    console.log("==========================\n");
    return;
  }

  console.log("\nUsuário não encontrado");
}
