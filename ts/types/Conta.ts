import { Transacao, TipoTransacao } from "./Transacao.js";

let saldo = 3000
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
            alert("Tipo de Transação é inválido!")
            return
        }

        console.log("🚀 ~ registrarTransacao ~ novaTransacao:", novaTransacao)
        console.log("🚀 ~ registrarTransacao ~ novoSaldo:", saldo)
    }
}

export default Conta