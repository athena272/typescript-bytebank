let saldo = 3000
const elementoSaldo = document.querySelector(".saldo-valor .valor") as HTMLElement
const elementoDataAcesso = document.querySelector(".block-saldo time") as HTMLElement
const dataAcesso: Date = new Date()
elementoSaldo ? elementoSaldo.textContent = saldo.toLocaleString("pt-br", { currency: "BRL", style: "currency" }) : null

elementoDataAcesso.textContent = dataAcesso.toLocaleDateString("pt-br", {
    weekday: "long", day: "2-digit", month: "2-digit", year: "numeric"
})