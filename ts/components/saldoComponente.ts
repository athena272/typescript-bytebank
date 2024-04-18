import { formatarMoeda, formatarData } from "../utils/formatter.js"
import { FormatoData } from "../types/Data.js"
import Conta from "../types/Conta.js"

const elementoSaldo = document.querySelector(".saldo-valor .valor") as HTMLElement
const elementoDataAcesso = document.querySelector(".block-saldo time") as HTMLElement
const dataAcesso: Date = Conta.getDataAcesso()
const saldo = Conta.getSaldo()

elementoDataAcesso.textContent = formatarData(dataAcesso, FormatoData.DIA_SEMANA_DIA_MES_ANO)

renderSaldo()
function renderSaldo(): void {
    elementoSaldo ? elementoSaldo.textContent = formatarMoeda(saldo) : null
}

const SaldoComponent = {
    updateInfo() {
        renderSaldo()
    }
}

export default SaldoComponent