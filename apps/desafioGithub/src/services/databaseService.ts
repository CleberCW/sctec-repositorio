import { writeFile, readFile } from "node:fs/promises"; // file-system
import { Usuario } from "../types/Usuario.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const databasePath = path.resolve(__dirname, "../../database.json");

class ArquivoNaoEncontradoError extends Error {
  constructor(message: string, cause?: unknown) {
    super(message, { cause });

    this.name = "ArquivoNaoEncontradoError";
    this.cause = cause;
  }
}

class ArquivoCorrompidoError extends Error {
  constructor(message: string, cause?: unknown) {
    super(message, { cause });

    this.name = "ArquivoCorrompidoError";
    this.cause = cause;
  }
}

export async function lerArquivo(): Promise<Usuario[]> {
  let usuariosText: string;

  try {
    usuariosText = await readFile(databasePath, {
      encoding: "utf-8",
    });
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      throw new ArquivoNaoEncontradoError("Arquivo não encontrado", error);
    }

    throw error;
  }

  try {
    return JSON.parse(usuariosText);
  } catch {
    throw new ArquivoCorrompidoError("Arquivo corrompido");
  }
}

export async function salvarUsuario(usuario: Usuario, overwrite = false) {
  let usuarios: Usuario[] = [];

  try {
    usuarios = await lerArquivo();
  } catch (error) {
    if (error instanceof ArquivoNaoEncontradoError) {
      if (overwrite) {
        usuarios = [];
      } else {
        throw error;
      }
    } else if (error instanceof ArquivoCorrompidoError) {
      throw error;
    } else {
      throw new Error("Erro desconhecido");
    }
  }
  const checarUsuarioExistente = usuarios.some((user) => {
    return user.login === usuario.login;
  });

  if (checarUsuarioExistente) {
    console.log("Usuário já existe na equipe");
    return;
  }

  usuarios.push(usuario);

  await writeFile(databasePath, JSON.stringify(usuarios), {
    encoding: "utf-8",
  });

  console.log("Desenvolvedor adicionado com sucesso!");
  return;
}

export async function removerUsuarioDaBase(username: string) {
  let usuarios: Usuario[] = [];
  try {
    usuarios = await lerArquivo();
  } catch (error) {
    if (error instanceof ArquivoNaoEncontradoError) {
      throw error;
    } else if (error instanceof ArquivoCorrompidoError) {
      throw error;
    } else {
      throw new Error("Erro desconhecido");
    }
  }
  if (usuarios) {
    const index = usuarios.findIndex((usuario) => {
      return usuario.login.toUpperCase() === username.toUpperCase();
    });

    if (index !== -1) {
      usuarios.splice(index, 1);
      await writeFile(databasePath, JSON.stringify(usuarios), {
        encoding: "utf-8",
      });
      console.log("Usuário removido com sucesso!");
      return;
    }
    console.log("Usuário não encontrado");
    return;
  }
}
