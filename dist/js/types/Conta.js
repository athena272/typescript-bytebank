import { TipoTransacao } from "./Transacao.js";
import { formatarData } from "../utils/formatter.js";
import { FormatoData } from "./Data.js";
import { Armazenador } from "../utils/Armazeandor.js";
export class Conta {
    nome;
    // private saldo: number = JSON.parse(localStorage.getItem("saldo")) || 0
    saldo = Armazenador.obter("saldo") || 0;
    transacoes = Armazenador.obter(("transacoes"), (key, value) => {
        if (key === 'data') {
            return new Date(value);
        }
        return value;
    }) || [];
    constructor({ nome, saldo }) {
        this.nome = nome;
        this.saldo = saldo;
    }
    getTitular() {
        return this.nome;
    }
    getSaldo() {
        return this.saldo;
    }
    getDataAcesso() {
        return new Date();
    }
    debitar(valor) {
        if (valor <= 0) {
            throw new Error("O valor a ser debitado deve ser maior que zero!");
        }
        if (valor > this.saldo) {
            throw new Error("Saldo insuficiente!");
        }
        this.saldo -= valor;
        Armazenador.salvar({ chave: "saldo", valor: this.saldo.toString() });
    }
    depositar(valor) {
        if (valor <= 0) {
            throw new Error("O valor a ser depositado deve ser maior que zero!");
        }
        this.saldo += valor;
        Armazenador.salvar({ chave: "saldo", valor: this.saldo.toString() });
    }
    getGruposTransacoes() {
        const gruposTransacoes = [];
        // cria uma copia, ao inves de fazer uma referencia na memoria
        const listaTransacoes = structuredClone(this.transacoes);
        const transacoesOrdenadas = listaTransacoes.sort((t1, t2) => t2.data.getTime() - t1.data.getTime());
        let labelAtualGrupoTransacao = '';
        for (let transacao of transacoesOrdenadas) {
            let labelGrupoTransacao = formatarData(transacao.data, FormatoData.MES_ANO);
            if (labelAtualGrupoTransacao !== labelGrupoTransacao) {
                labelAtualGrupoTransacao = labelGrupoTransacao;
                gruposTransacoes.push({
                    label: labelGrupoTransacao,
                    transacoes: []
                });
            }
            gruposTransacoes.at(-1).transacoes.push(transacao);
        }
        return gruposTransacoes;
    }
    registrarTransacao(novaTransacao) {
        const tipoTransacaoToUse = novaTransacao.tipoTransacao;
        let valorToUse = novaTransacao.valor;
        // Obtenha o saldo atual usando getSaldo()
        if (tipoTransacaoToUse == "Depósito") {
            this.depositar(valorToUse);
        }
        else if (tipoTransacaoToUse === TipoTransacao.TRANSFERENCIA || tipoTransacaoToUse === TipoTransacao.PAGAMENTO_BOLETO) {
            this.debitar(valorToUse);
            valorToUse = valorToUse * -1;
        }
        else {
            throw new Error("Tipo de Transação é inválido!");
        }
        this.transacoes.push(novaTransacao);
        Armazenador.salvar({ chave: "transacoes", valor: JSON.stringify(this.transacoes) });
    }
}
export const conta = new Conta({
    nome: "Joana da Silva Oliveira",
    saldo: 3000,
});
