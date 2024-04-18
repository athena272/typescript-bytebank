let saldo = 3000
const elementoSaldo = document.querySelector(".saldo-valor .valor") as HTMLElement
const elementoDataAcesso = document.querySelector(".block-saldo time") as HTMLElement
const dataAcesso: Date = new Date()

elementoSaldo ? elementoSaldo.textContent = formatarMoeda(saldo) : null
elementoDataAcesso.textContent = formatarData(dataAcesso, FormatoData.DIA_SEMANA_DIA_MES_ANO)