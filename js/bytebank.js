let saldo = 3000
const elementoSaldo = document.querySelector(".saldo-valor .valor")
elementoSaldo.textContent = `R$ ${saldo}`

const elementoFormulario = document.querySelector(".block-nova-transacao form")
elementoFormulario.addEventListener("submit", function (event) {
    event.preventDefault()
    if (!elementoFormulario.checkValidity()) {
        alert("Por favor, preencha todos os campos")
        return
    }

    const inputTipoTransacao = elementoFormulario.querySelector("#tipoTransacao")
    const inputValor = elementoFormulario.querySelector("#valor")
    const inputData = elementoFormulario.querySelector("#data")
    let tipoTransacao = inputTipoTransacao.value
    let valor = inputValor.value
    let data = inputData.value

    if (tipoTransacao == "Depósito") {
        saldo += valor
    } else if (tipoTransacao == "Transferência" || tipoTransacao == "Pagamento de Boleto") {
        saldo -= valor
    } else {
        alert("Tipo de Transação é inválido!")
        return
    }

    elementoSaldo.textContent = `R$ ${saldo}`

    const novaTransacao = {
        tipoTransacao,
        valor,
        data
    }
    console.log("🚀 ~ novaTransacao:", novaTransacao)
    elementoFormulario.reset()
})

