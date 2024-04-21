import { Transacao } from "./Transacao.js"

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
}

export const conta = new Conta({
    nome: "Joana da Silva Oliveira",
    saldo: 3000,
})
