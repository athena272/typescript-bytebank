import { formatarMoeda, formatarData } from "../utils/formatter.js";
import { FormatoData } from "../types/Data.js";
import Conta from "../types/Conta.js";
const elementoSaldo = document.querySelector(".saldo-valor .valor");
const elementoDataAcesso = document.querySelector(".block-saldo time");
const dataAcesso = Conta.getDataAcesso();
elementoDataAcesso.textContent = formatarData(dataAcesso, FormatoData.DIA_SEMANA_DIA_MES_ANO);
renderSaldo();
function renderSaldo() {
    const saldo = Conta.getSaldo();
    console.log("🚀 ~ renderSaldo(): void", saldo);
    elementoSaldo.textContent = formatarMoeda(saldo);
}
const SaldoComponent = {
    updateInfo() {
        renderSaldo();
    }
};
export default SaldoComponent;
