import { Transacao, TipoTransacao } from "./Transacao.js";

let saldo = 3000

function debitar(valor: number): void {
    if (valor <= 0) {
        throw new Error("O valor a ser debitado deve ser maior que zero!");
    }
    if (valor > saldo) {
        throw new Error("Saldo insuficiente!");
    }

    saldo -= valor;
}

function depositar(valor: number): void {
    if (valor <= 0) {
        throw new Error("O valor a ser depositado deve ser maior que zero!");
    }

    saldo += valor;
}

const Conta = {
    getSaldo() {
        return saldo;
    },
    getDataAcesso(): Date {
        return new Date();
    },
    registrarTransacao(novaTransacao: Transacao): void {
        const tipoTransacaoToUse = novaTransacao.tipoTransacao
        const valorToUse = novaTransacao.valor
        // Obtenha o saldo atual usando getSaldo()
        if (tipoTransacaoToUse == "Depósito") {
            saldo += valorToUse
        } else if (tipoTransacaoToUse === TipoTransacao.TRANSFERENCIA || tipoTransacaoToUse === TipoTransacao.PAGAMENTO_BOLETO) {
            saldo -= valorToUse
        } else {
            throw new Error("Tipo de Transação é inválido!");
        }

        console.log("🚀 ~ registrarTransacao ~ novaTransacao:", novaTransacao)
        console.log("🚀 ~ registrarTransacao ~ novoSaldo:", saldo)
    }
}

export default Conta