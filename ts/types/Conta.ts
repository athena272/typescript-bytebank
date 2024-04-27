import { Transacao, TipoTransacao } from "./Transacao.js"
import { GrupoTransacao } from "./GrupoTransacao.js";
import { formatarData } from "../utils/formatter.js";
import { FormatoData } from "./Data.js";
import { Armazenador } from "./Armazeandor.js";

interface IConta {
    nome: string;
    saldo: number;
}

export class Conta {
    protected nome: string
    // private saldo: number = JSON.parse(localStorage.getItem("saldo")) || 0
    private saldo: number = Armazenador.obter("saldo") || 0
    private transacoes: Transacao[] = Armazenador.obter(("transacoes"), (key: string, value: string) => {
        if (key === 'data') {
            return new Date(value)
        }

        return value
    }) || []

    constructor({ nome, saldo }: IConta) {
        this.nome = nome
        this.saldo = saldo
    }

    public getTitular() {
        return this.nome
    }

    getSaldo() {
        return this.saldo
    }

    getDataAcesso(): Date {
        return new Date()
    }

    debitar(valor: number): void {
        if (valor <= 0) {
            throw new Error("O valor a ser debitado deve ser maior que zero!")
        }
        if (valor > this.saldo) {
            throw new Error("Saldo insuficiente!")
        }

        this.saldo -= valor
        Armazenador.salvar({ chave: "saldo", valor: this.saldo.toString() })
    }

    depositar(valor: number): void {
        if (valor <= 0) {
            throw new Error("O valor a ser depositado deve ser maior que zero!")
        }

        this.saldo += valor
        Armazenador.salvar({ chave: "saldo", valor: this.saldo.toString() })
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

    registrarTransacao(novaTransacao: Transacao): void {
        const tipoTransacaoToUse = novaTransacao.tipoTransacao
        let valorToUse = novaTransacao.valor
        // Obtenha o saldo atual usando getSaldo()
        if (tipoTransacaoToUse == "Depósito") {
            this.depositar(valorToUse)

        } else if (tipoTransacaoToUse === TipoTransacao.TRANSFERENCIA || tipoTransacaoToUse === TipoTransacao.PAGAMENTO_BOLETO) {
            this.debitar(valorToUse)
            valorToUse = valorToUse * -1

        } else {
            throw new Error("Tipo de Transação é inválido!")
        }

        this.transacoes.push(novaTransacao)
        Armazenador.salvar({ chave: "transacoes", valor: JSON.stringify(this.transacoes) })
    }
}

export const conta = new Conta({
    nome: "Joana da Silva Oliveira",
    saldo: 3000,
})
