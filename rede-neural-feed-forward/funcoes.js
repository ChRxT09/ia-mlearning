// reduz os valores de entrada para um unico valor
function somatoria(arr = []) {
	return arr.reduce((anterior, posterior) => anterior + posterior);
}

// calcula a diferenca do valor obtido com o valor esperado
// verifica o erro do valor obtido em relacao ao valor esperado
// otimizacao dos valores dos pesos das iteracoes das proximas propagacoes
function descidaGradiente(entrada = 0) {
	return entrada * (1 - entrada);
}

// calcula os pesos da feed Forward no comeco
const randPesos = () => Math.random();

// calcula a tangente hiperbolica de um valor
const tangHiperbolica = (value) => Math.tanh(value);

const valorAbsoluto = (value) => Math.abs(value);

function feedForward(entradas = [], alvo = 0, epoca = 1) {
	if (alvo <= 0) {
		alvo = 0.1;
	} else if (alvo > 1) {
		alvo = 1;
	}

	let pesos = [];

	for (let i; i < entradas.length; i++) {
		pesos.push(randPesos());
	}

	for (i = 1; i <= epoca; i++) {
		let valoresMultiplicados = [];
		for (let j = 0; j < entradas.length; j++) {
			if (entradas[j] <= 0) {
				inputs[j] = 0.1;
			}
			valoresMultiplicados.push(entradas[j] * pesos[j]);
		}

		let sum = somatoria(valoresMultiplicados);

		// tangente hiperbólica: vai formatar os dados dentro de um intervalo ]-1, 1 [
		let saida = tangHiperbolica(sum);

		// vai arredondar o valor para 4 casas decimais
		//motivos estéticos
		saida = parseFloat(saida).toFixed(4);

		let erro = valorAbsoluto(alvo - saida);
		erro = parseFloat(erro).toFixed(4);

		for(let j = 0; j < entradas.length; j ++){
			pesos[j] += entradas[j] * descidaGradiente(erro)
		}

		let _epoca = i.toString().padStart(7, '0');

		console.log(`
			\nepoca: ${epoca},
			\ntaxa de erro: ${erro},
			\nsaida: ${saida}
		`)

	}
}

export default { feedForward };
