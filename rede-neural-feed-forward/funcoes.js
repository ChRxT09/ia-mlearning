// reduz os valores de entrada para um unico valor
function somatoria(arr = []) {
	return arr.reduce((a, b) => a + b);
}

// calcula a diferenca do valor obtido com o valor esperado
// verifica o erro do valor obtido em relacao ao valor esperado
// otimizacao dos valores dos pesos das iteracoes das proximas propagacoes
function descidaGradiente(input = 0) {
	return input * (1 - input);
}

function feedForward(inputs = [], target = 0, epochs = 1) {
	if (target <= 0) target = 0.1;
	else if (target > 1) target = 1;

	let weights = [];

	for (let _ of inputs) {
		weights.push(Math.random());
	}

	for (let i = 1; i <= epochs; i++) {
		let multiply = [];
		for (let j = 0; j < inputs.length; j++) {
			if (inputs[j] <= 0) inputs[j] = 0.1;
			multiply.push(inputs[j] * weights[j]);
		}
		let sum = somatoria(multiply);
		let output = parseFloat(Math.tanh(sum)).toFixed(4);

		let error = parseFloat(Math.abs(target - output)).toFixed(4);

		for (let j = 0; j < inputs.length; j++) {
			weights[j] += inputs[j] * descidaGradiente(error);
		}

		let epoch = i.toString().padStart(7, '0');

		console.log(`
		\n epoca: ${epoch}
		\n taxa de erro: ${error}
		\n saída: ${output}
		`)

	}
}

const resultado = feedForward([0], 0.1, 10);

console.log(resultado);
