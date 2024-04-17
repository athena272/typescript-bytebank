let saldo = 3000;
const elementoSaldo = document.querySelector(".saldo-valor .valor");
const elementoDataAcesso = document.querySelector(".block-saldo time");
const dataAcesso = new Date();
elementoSaldo ? elementoSaldo.textContent = saldo.toLocaleString("pt-br", { currency: "BRL", style: "currency" }) : null;
elementoDataAcesso.textContent = dataAcesso.toLocaleDateString("pt-br", {
    weekday: "long", day: "2-digit", month: "2-digit", year: "numeric"
});
