let saldo = 3000
const elementoSaldo = document.querySelector(".saldo-valor .valor")
elementoSaldo ? elementoSaldo.textContent = `R$ ${saldo}` : null

const elementoFormulario = document.querySelector(".block-nova-transacao form") as HTMLFormElement
elementoFormulario ? elementoFormulario.addEventListener("submit", function (event) {
    event.preventDefault()
    if (!elementoFormulario.checkValidity()) {
        alert("Por favor, preencha todos os campos")
        return
    }

    const inputTipoTransacao = elementoFormulario.querySelector("#tipoTransacao") as HTMLSelectElement
    const inputValor = elementoFormulario.querySelector("#valor") as HTMLInputElement
    const inputData = elementoFormulario.querySelector("#data") as HTMLInputElement
    let tipoTransacao: string = inputTipoTransacao.value
    let valor: number = inputValor.valueAsNumber
    let data: Date = new Date(inputData.value)
    
    if (tipoTransacao == "Depósito") {
        saldo += valor
    } else if (tipoTransacao == "Transferência" || tipoTransacao == "Pagamento de Boleto") {
        saldo -= valor
    } else {
        alert("Tipo de Transação é inválido!")
        return
    }

    elementoSaldo ? elementoSaldo.textContent = `R$ ${saldo}` : null

    const novaTransacao = {
        tipoTransacao,
        valor,
        data
    }
    console.log("🚀 ~ novaTransacao:", novaTransacao)
    elementoFormulario.reset()
}) : null

