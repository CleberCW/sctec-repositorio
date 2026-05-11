async function main() {
  const rl = readlinePromises.createInterface(stdin, stdout);

  const nome = await rl.question("Qual é a sua nome?\n");

  const fetchPromise = fetch(`https://api.github.com/users/${nome}`);

  const interval = setInterval(() => {
    console.log("Carregando...");
  }, 50);

  const response = await fetchPromise;

  clearInterval(interval);

  rl.close();
}

main();
