import { formatarMoeda } from "../utils/formatter.js";
import Conta from "../types/Conta.js";
function getBlurValue() {
    const saldo = formatarMoeda(Conta.getSaldo());
    console.log("🚀 ~ getBlurValue ~ saldo:", saldo);
    const blurSaldo = saldo.replace(/\d/g, 'X');
    console.log("🚀 ~ getBlurValue ~ blurSaldo:", blurSaldo);
    return blurSaldo;
}
const elementoSaldo = document.querySelector(".saldo-valor .valor");
const visualizarSaldo = document.querySelector(".saldo-valor strong img");
renderSaldo();
function renderSaldo() {
    const saldo = Conta.getSaldo();
    elementoSaldo.textContent = formatarMoeda(saldo);
}
visualizarSaldo.addEventListener("click", () => {
    elementoSaldo.classList.toggle("blurSaldo");
    renderSaldo();
    if (elementoSaldo.classList.contains("blurSaldo")) {
        elementoSaldo.textContent = `${getBlurValue()}`;
    }
});
const SaldoComponent = {
    updateInfo() {
        renderSaldo();
    }
};
export default SaldoComponent;
