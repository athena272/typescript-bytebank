import { TipoTransacao } from "./Transacao.js";
let saldo = 3000;
function debitar(valor) {
    if (valor <= 0) {
        throw new Error("O valor a ser debitado deve ser maior que zero!");
    }
    if (valor > saldo) {
        throw new Error("Saldo insuficiente!");
    }
    saldo -= valor;
}
function depositar(valor) {
    if (valor <= 0) {
        throw new Error("O valor a ser depositado deve ser maior que zero!");
    }
    saldo += valor;
}
const Conta = {
    getSaldo() {
        return saldo;
    },
    getDataAcesso() {
        return new Date();
    },
    registrarTransacao(novaTransacao) {
        const tipoTransacaoToUse = novaTransacao.tipoTransacao;
        const valorToUse = novaTransacao.valor;
        // Obtenha o saldo atual usando getSaldo()
        if (tipoTransacaoToUse == "Depósito") {
            depositar(valorToUse);
        }
        else if (tipoTransacaoToUse === TipoTransacao.TRANSFERENCIA || tipoTransacaoToUse === TipoTransacao.PAGAMENTO_BOLETO) {
            debitar(valorToUse);
        }
        else {
            throw new Error("Tipo de Transação é inválido!");
        }
        console.log("🚀 ~ registrarTransacao ~ novaTransacao:", novaTransacao);
        console.log("🚀 ~ registrarTransacao ~ novoSaldo:", saldo);
    }
};
export default Conta;
