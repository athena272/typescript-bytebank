import { Transacao } from "./Transacao.js"
import { GrupoTransacao } from "./GrupoTransacao.js";
import { formatarData } from "../utils/formatter.js";
import { FormatoData } from "./Data.js";

interface IConta {
    nome: string;
    saldo: number;
}

export class Conta {
    nome: string
    saldo: number = JSON.parse(localStorage.getItem("saldo")) || 0
    transacoes: Transacao[] = JSON.parse(localStorage.getItem("transacoes"), (key: string, value: string) => {
        if (key === 'data') {
            return new Date(value)
        }

        return value
    }) || []

    constructor({ nome, saldo }: IConta) {
        this.nome = nome
        this.saldo = saldo
    }

    getGruposTransacoes(): GrupoTransacao[] {
        const gruposTransacoes: GrupoTransacao[] = []
        // cria uma copia, ao inves de fazer uma referencia na memoria
        const listaTransacoes: Transacao[] = structuredClone(this.transacoes)
        const transacoesOrdenadas: Transacao[] = listaTransacoes.sort((t1, t2) => t2.data.getTime() - t1.data.getTime())
        let labelAtualGrupoTransacao: string = ''

        for (let transacao of transacoesOrdenadas) {
            let labelGrupoTransacao: string = formatarData(transacao.data, FormatoData.MES_ANO)
            if (labelAtualGrupoTransacao !== labelGrupoTransacao) {
                labelAtualGrupoTransacao = labelGrupoTransacao
                gruposTransacoes.push({
                    label: labelGrupoTransacao,
                    transacoes: []
                })
            }
            gruposTransacoes.at(-1).transacoes.push(transacao)
        }

        return gruposTransacoes
    }
}

export const conta = new Conta({
    nome: "Joana da Silva Oliveira",
    saldo: 3000,
})
