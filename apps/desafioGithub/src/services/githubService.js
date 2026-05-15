export async function buscarUsuario(username) {
  const urlBase = "https://api.github.com/users/";

  try {
    const response = await fetch(`${urlBase}${username}`);

    if (!response.ok) {
      throw new Error("Deu errado");
    }

    const body = await response.json();

    return body;
  } catch (error) {
    return;
  }
}
