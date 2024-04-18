import Conta from "../types/Conta.js";
import SaldoComponent from "./saldoComponente.js";
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
    const novaTransacao = {
        tipoTransacao,
        valor,
        data
    };
    Conta.registrarTransacao(novaTransacao);
    SaldoComponent.updateInfo();
    elementoFormulario.reset();
}) : null;
