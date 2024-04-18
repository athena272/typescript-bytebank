import { TipoTransacao } from "./Transacao.js";
let saldo = 3000;
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
            saldo += valorToUse;
        }
        else if (tipoTransacaoToUse === TipoTransacao.TRANSFERENCIA || tipoTransacaoToUse === TipoTransacao.PAGAMENTO_BOLETO) {
            saldo -= valorToUse;
        }
        else {
            alert("Tipo de Transação é inválido!");
            return;
        }
        console.log("🚀 ~ registrarTransacao ~ novaTransacao:", novaTransacao);
    }
};
export default Conta;