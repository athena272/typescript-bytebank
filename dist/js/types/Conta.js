import { formatarData } from "../utils/formatter.js";
import { FormatoData } from "./Data.js";
export class Conta {
    nome;
    saldo = JSON.parse(localStorage.getItem("saldo")) || 0;
    transacoes = JSON.parse(localStorage.getItem("transacoes"), (key, value) => {
        if (key === 'data') {
            return new Date(value);
        }
        return value;
    }) || [];
    constructor({ nome, saldo }) {
        this.nome = nome;
        this.saldo = saldo;
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
}
export const conta = new Conta({
    nome: "Joana da Silva Oliveira",
    saldo: 3000,
});
