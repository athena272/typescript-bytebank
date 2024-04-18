import { formatarMoeda, formatarData } from "../utils/formatter.js"
import Conta from "../types/Conta.js"

const elementoSaldo = document.querySelector(".saldo-valor .valor") as HTMLElement

renderSaldo()
function renderSaldo(): void {
    const saldo = Conta.getSaldo()
    elementoSaldo.textContent = formatarMoeda(saldo)
}

const SaldoComponent = {
    updateInfo() {
        renderSaldo()
    }
}

export default SaldoComponent