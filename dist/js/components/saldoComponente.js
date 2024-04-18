import { formatarMoeda } from "../utils/formatter.js";
import Conta from "../types/Conta.js";
const elementoSaldo = document.querySelector(".saldo-valor .valor");
function renderSaldo() {
    const saldo = Conta.getSaldo();
    elementoSaldo.textContent = formatarMoeda(saldo);
}
const SaldoComponent = {
    updateInfo() {
        renderSaldo();
    }
};
export default SaldoComponent;
