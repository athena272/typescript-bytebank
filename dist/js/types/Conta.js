import { TipoTransacao } from "./Transacao.js";
let saldo = JSON.parse(localStorage.getItem("saldo")) || 0;
const transacoes = JSON.parse(localStorage.getItem("transacoes"), (key, value) => {
    console.log("🚀 ~ consttransacoes:Transacao[]=JSON.parse ~ key: string, value: string:", { key, value });
    if (key === 'data') {
        return new Date(value);
    }
    return value;
}) || [];
function debitar(valor) {
    if (valor <= 0) {
        throw new Error("O valor a ser debitado deve ser maior que zero!");
    }
    if (valor > saldo) {
        throw new Error("Saldo insuficiente!");
    }
    saldo -= valor;
    localStorage.setItem("saldo", saldo.toString());
}
function depositar(valor) {
    if (valor <= 0) {
        throw new Error("O valor a ser depositado deve ser maior que zero!");
    }
    saldo += valor;
    localStorage.setItem("saldo", saldo.toString());
}
const Conta = {
    getSaldo() {
        return saldo;
    },
    getDataAcesso() {
        return new Date();
    },
    getGruposTransacoes() {
        const gruposTransacoes = [];
        const listaTransacoes = structuredClone(transacoes);
        return gruposTransacoes;
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
        // console.log("🚀 ~ registrarTransacao ~ novaTransacao:", novaTransacao)
        // console.log("🚀 ~ registrarTransacao ~ novoSaldo:", saldo)
        transacoes.push(novaTransacao);
        localStorage.setItem("transacoes", JSON.stringify(transacoes));
        // console.log("🚀 ~ registrarTransacao ~ transacoes:", transacoes)
    }
};
export default Conta;
