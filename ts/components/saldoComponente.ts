import { formatarMoeda, formatarData } from "../utils/formatter.js"
import { FormatoData } from "../types/Data.js"

let saldo = 3000
const elementoSaldo = document.querySelector(".saldo-valor .valor") as HTMLElement
const elementoDataAcesso = document.querySelector(".block-saldo time") as HTMLElement
const dataAcesso: Date = new Date()

elementoDataAcesso.textContent = formatarData(dataAcesso, FormatoData.DIA_SEMANA_DIA_MES_ANO)
updateSaldo(saldo)

export function getSaldo(): number {
    return saldo
}

export function updateSaldo(novoSaldo: number): void {
    saldo = novoSaldo
    elementoSaldo ? elementoSaldo.textContent = formatarMoeda(saldo) : null
}