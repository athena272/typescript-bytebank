let saldo = 3000;
const elementoSaldo = document.querySelector(".saldo-valor .valor");
elementoSaldo ? elementoSaldo.textContent = saldo.toLocaleString("pt-br", { currency: "BRL", style: "currency" }) : null;
