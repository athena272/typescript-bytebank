let saldo = 3000
const elementoSaldo = document.querySelector(".saldo-valor .valor")
elementoSaldo ? elementoSaldo.textContent = `R$ ${saldo}` : null
