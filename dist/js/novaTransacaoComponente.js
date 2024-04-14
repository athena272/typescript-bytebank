const elementoFormulario = document.querySelector(".block-nova-transacao form");
elementoFormulario ? elementoFormulario.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!elementoFormulario.checkValidity()) {
        alert("Por favor, preencha todos os campos");
        return;
    }
    const inputTipoTransacao = elementoFormulario.querySelector("#tipoTransacao");
    const inputValor = elementoFormulario.querySelector("#valor");
    const inputData = elementoFormulario.querySelector("#data");
    let tipoTransacao = inputTipoTransacao.value;
    let valor = inputValor.valueAsNumber;
    let data = new Date(inputData.value);
    // Obtenha o saldo atual usando getSaldo()
    if (tipoTransacao == "Depósito") {
        saldo += valor;
    }
    else if (tipoTransacao == "Transferência" || tipoTransacao == "Pagamento de Boleto") {
        saldo -= valor;
    }
    else {
        alert("Tipo de Transação é inválido!");
        return;
    }
    elementoSaldo ? elementoSaldo.textContent = `R$ ${saldo}` : null;
    const novaTransacao = {
        tipoTransacao,
        valor,
        data
    };
    console.log("🚀 ~ novaTransacao:", novaTransacao);
    elementoFormulario.reset();
}) : null;
