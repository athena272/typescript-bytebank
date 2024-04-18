import { Transacao, TipoTransacao } from "../types/Transacao.js"
import { updateSaldo, getSaldo } from "./saldoComponente.js"

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
    let tipoTransacao: TipoTransacao = inputTipoTransacao.value as TipoTransacao
    let valor: number = inputValor.valueAsNumber
    let data: Date = new Date(inputData.value)
    let saldo = getSaldo()

    // Obtenha o saldo atual usando getSaldo()
    if (tipoTransacao == "Depósito") {
        saldo += valor
    } else if (tipoTransacao === TipoTransacao.TRANSFERENCIA || tipoTransacao === TipoTransacao.PAGAMENTO_BOLETO) {
        saldo -= valor
    } else {
        alert("Tipo de Transação é inválido!")
        return
    }

    updateSaldo(saldo)

    const novaTransacao: Transacao = {
        tipoTransacao,
        valor,
        data
    }
    console.log("🚀 ~ novaTransacao:", novaTransacao)
    elementoFormulario.reset()
}) : null