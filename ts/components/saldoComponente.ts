import { formatarMoeda, formatarData } from "../utils/formatter.js"
import { FormatoData } from "../types/Data.js"
import Conta from "../types/Conta.js"

const elementoSaldo = document.querySelector(".saldo-valor .valor") as HTMLElement
const elementoDataAcesso = document.querySelector(".block-saldo time") as HTMLElement
const dataAcesso: Date = Conta.getDataAcesso()

elementoDataAcesso.textContent = formatarData(dataAcesso, FormatoData.DIA_SEMANA_DIA_MES_ANO)

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