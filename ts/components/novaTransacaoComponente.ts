import { Transacao, TipoTransacao } from "../types/Transacao.js"
import Conta from "../types/Conta.js"
import SaldoComponent from "./saldoComponente.js"

const elementoFormulario = document.querySelector(".block-nova-transacao form") as HTMLFormElement
elementoFormulario ? elementoFormulario.addEventListener("submit", function (event) {
    try {
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

        const novaTransacao: Transacao = {
            tipoTransacao,
            valor,
            data
        }

        Conta.registrarTransacao(novaTransacao)

        SaldoComponent.updateInfo()
        elementoFormulario.reset()
    } catch (error) {
        alert(error.message)
    }
}) : null