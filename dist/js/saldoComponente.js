let saldo = 3000;
const elementoSaldo = document.querySelector(".saldo-valor .valor");
const elementoDataAcesso = document.querySelector(".block-saldo time");
const dataAcesso = new Date();
elementoSaldo ? elementoSaldo.textContent = formatarMoeda(saldo) : null;
elementoDataAcesso.textContent = formatarData(dataAcesso);
