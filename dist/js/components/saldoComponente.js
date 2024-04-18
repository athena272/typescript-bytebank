import { formatarMoeda, formatarData } from "../utils/formatter.js";
import { FormatoData } from "../types/Data.js";
let saldo = 3000;
const elementoSaldo = document.querySelector(".saldo-valor .valor");
const elementoDataAcesso = document.querySelector(".block-saldo time");
const dataAcesso = new Date();
elementoDataAcesso.textContent = formatarData(dataAcesso, FormatoData.DIA_SEMANA_DIA_MES_ANO);
updateSaldo(saldo);
export function getSaldo() {
    return saldo;
}
export function updateSaldo(novoSaldo) {
    saldo = novoSaldo;
    elementoSaldo ? elementoSaldo.textContent = formatarMoeda(saldo) : null;
}
