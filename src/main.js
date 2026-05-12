import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "process";
import { soma } from "./services/soma.js";
import { subtração } from "./services/subtração.js";
import { multiplicação } from "./services/multiplicação.js";
import { divisão } from "./services/divisão.js";

async function main() {
  // 1- Fazer a transformação para número -> Caso o usuário não digite um número, jogue um erro
  // 2- Criar as outras operações uma em cada arquivo e importar
  // BÔNUS: Resolver o problema do console preso quando a aplicação dá erro.

  const interfaceConsole = createInterface(stdin, stdout);
  try {
    const respostaOperacao = await interfaceConsole.question(
      `Calculadora

1 - Soma (+)
2 - Subtração (-)
3 - Multiplicação (*)
4 - Divisão (/)
      
      
Digite o número da operação desejada: \n`,
    );

    while (
      !["1", "2", "3", "4", "+", "-", "*", "/"].includes(respostaOperacao)
    ) {
      throw new Error("OPERAÇÃO INVÁLIDA");
    }

    let primeiroNumero = await interfaceConsole.question(
      "Digite o primeiro número: \n",
    );

    primeiroNumero = Number(primeiroNumero);

    while (isNaN(primeiroNumero)) {
      primeiroNumero = await interfaceConsole.question(
        "Input válido. Digite o primeiro número: \n",
      );
      primeiroNumero = Number(primeiroNumero);
    }

    let segundoNumero = await interfaceConsole.question(
      "Digite o segundo número: \n",
    );
    segundoNumero = Number(segundoNumero);

    while (isNaN(segundoNumero)) {
      segundoNumero = await interfaceConsole.question(
        "Input válido. Digite o segundo número: \n",
      );
      segundoNumero = Number(segundoNumero);
    }

    switch (respostaOperacao) {
      case "+":
      case "1":
        console.log("O resultado é: " + soma(primeiroNumero, segundoNumero));
        break;
      case "-":
      case "2":
        console.log(
          "O resultado é: " + subtração(primeiroNumero, segundoNumero),
        );
        break;
      case "*":
      case "3":
        console.log(
          "O resultado é: " + multiplicação(primeiroNumero, segundoNumero),
        );
        break;
      case "/":
      case "4":
        console.log("O resultado é: " + divisão(primeiroNumero, segundoNumero));
        break;
      default:
        throw new Error("OPERAÇÃO INVÁLIDA");
        interfaceConsole.close();
        break;
    }
  } catch (error) {
    console.log(error.message);
    interfaceConsole.close();
    return;
  }

  interfaceConsole.close();
}

main().catch(console.error);
