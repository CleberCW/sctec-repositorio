import { writeFile, readFile } from "node:fs/promises"; // file-system

export async function lerArquivo() {
  try {
    const usuariosText = await readFile("../database.json", {
      encoding: "utf-8",
    });
    return JSON.parse(usuariosText);
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    } else {
      console.log("ERRO AO LER DATABASE:", error);
      return [];
    }
  }
}

export async function salvarUsuario(usuario) {
  const usuarios = (await lerArquivo()) ?? [];

  const checarUsuarioExistente = usuarios.some((user) => {
    return user.login === usuario.login;
  });

  if (checarUsuarioExistente) {
    console.log("Usuário já existe na equipe");
    return;
  }

  usuarios.push(usuario);

  await writeFile(`../database.json`, JSON.stringify(usuarios), {
    encoding: "utf-8",
  });

  console.log("Desenvolvedor adicionado com sucesso!");
  return;
}

export async function removerUsuarioDaBase(username) {
  const usuarios = await lerArquivo();
  if (usuarios) {
    const index = usuarios.findIndex((usuario) => {
      return usuario.login.toUpperCase() === username.toUpperCase();
    });

    if (index !== -1) {
      usuarios.splice(index, 1);
      await writeFile(`../database.json`, JSON.stringify(usuarios), {
        encoding: "utf-8",
      });
      console.log("Usuário removido com sucesso!");
      return;
    }
    console.log("Usuário não encontrado");
    return;
  }
}
