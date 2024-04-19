import { formatarMoeda, formatarData } from "../utils/formatter.js"
import Conta from "../types/Conta.js"

function getBlurValue(): string {
    const saldo = formatarMoeda(Conta.getSaldo())
    console.log("🚀 ~ getBlurValue ~ saldo:", saldo)
    const blurSaldo = saldo.replace(/\d/g, 'X')
    console.log("🚀 ~ getBlurValue ~ blurSaldo:", blurSaldo)

    return blurSaldo
}

const elementoSaldo = document.querySelector(".saldo-valor .valor") as HTMLElement
const visualizarSaldo = document.querySelector(".saldo-valor strong img") as HTMLImageElement

renderSaldo()
function renderSaldo(): void {
    const saldo = Conta.getSaldo()
    elementoSaldo.textContent = formatarMoeda(saldo)
}

visualizarSaldo.addEventListener("click", () => {
    elementoSaldo.classList.toggle("blurSaldo")
    renderSaldo()

    if (elementoSaldo.classList.contains("blurSaldo")) {
        elementoSaldo.textContent = `${getBlurValue()}`
    }
})

const SaldoComponent = {
    updateInfo() {
        renderSaldo()
    }
}

export default SaldoComponent