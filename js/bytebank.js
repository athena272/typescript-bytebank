var saldo = 3000;
var elementoSaldo = document.querySelector(".saldo-valor .valor");
elementoSaldo ? elementoSaldo.textContent = "R$ ".concat(saldo) : null;
var elementoFormulario = document.querySelector(".block-nova-transacao form");
elementoFormulario ? elementoFormulario.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!elementoFormulario.checkValidity()) {
        alert("Por favor, preencha todos os campos");
        return;
    }
    var inputTipoTransacao = elementoFormulario.querySelector("#tipoTransacao");
    var inputValor = elementoFormulario.querySelector("#valor");
    var inputData = elementoFormulario.querySelector("#data");
    var tipoTransacao = inputTipoTransacao.value;
    var valor = inputValor.valueAsNumber;
    var data = new Date(inputData.value);
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
    elementoSaldo ? elementoSaldo.textContent = "R$ ".concat(saldo) : null;
    var novaTransacao = {
        tipoTransacao: tipoTransacao,
        valor: valor,
        data: data
    };
    console.log("🚀 ~ novaTransacao:", novaTransacao);
    elementoFormulario.reset();
}) : null;
