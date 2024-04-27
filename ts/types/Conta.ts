import { Transacao, TipoTransacao } from "./Transacao.js"
import { GrupoTransacao } from "./GrupoTransacao.js";
import { formatarData } from "../utils/formatter.js";
import { FormatoData } from "./Data.js";
import { Armazenador } from "../utils/Armazeandor.js";
import { ValidaDebito, ValidaDeposito } from "./Decoratos.js";

interface IConta {
    nome: string;
}

export class Conta {
    protected nome: string
    // private saldo: number = JSON.parse(localStorage.getItem("saldo")) || 0
    private saldo: number = JSON.parse(localStorage.getItem("saldo")) || 0
    private transacoes: Transacao[] = JSON.parse(localStorage.getItem("transacoes"), (key: string, value: string) => {
        if (key === 'data') {
            return new Date(value)
        }

        return value
    }) || []

    constructor({ nome }: IConta) {
        this.nome = nome
    }

    public getTitular() {
        return this.nome
    }

    public getSaldo() {
        return this.saldo
    }

    public getDataAcesso(): Date {
        return new Date()
    }

    @ValidaDebito
    debitar(valor: number): void {
        // if (valor <= 0) {
        //     throw new Error("O valor a ser debitado deve ser maior que zero!")
        // }
        // if (valor > this.saldo) {
        //     throw new Error("Saldo insuficiente!")
        // }

        this.saldo -= valor
        localStorage.setItem("saldo", this.saldo.toString())
    }

    @ValidaDeposito
    depositar(valor: number): void {
        // if (valor <= 0) {
        //     throw new Error("O valor a ser depositado deve ser maior que zero!")
        // }

        this.saldo += valor
        localStorage.setItem("saldo", this.saldo.toString())
    }

    public getGruposTransacoes(): GrupoTransacao[] {
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

    public registrarTransacao(novaTransacao: Transacao): void {
        const tipoTransacaoToUse = novaTransacao.tipoTransacao
        let valorToUse = novaTransacao.valor
        // Obtenha o saldo atual usando getSaldo()
        if (tipoTransacaoToUse == "Depósito") {
            this.depositar(valorToUse)

        } else if (tipoTransacaoToUse === TipoTransacao.TRANSFERENCIA || tipoTransacaoToUse === TipoTransacao.PAGAMENTO_BOLETO) {
            this.debitar(valorToUse)
            novaTransacao.valor *= -1

        } else {
            throw new Error("Tipo de Transação é inválido!")
        }

        this.transacoes.push(novaTransacao)
        localStorage.setItem("transacoes", JSON.stringify(this.transacoes))
    }
}

export class ContaPremium extends Conta {
    registrarTransacao(transacao: Transacao): void {
        if (transacao.tipoTransacao === TipoTransacao.DEPOSITO) {
            console.log("ganhou um bônus de 0.50 centavos");
            transacao.valor += 0.5
        }

        super.registrarTransacao(transacao)
    }
}

export const conta = new Conta({
    nome: "Joana da Silva Oliveira",
})

export const contaPremium = new ContaPremium({
    nome: "Guilherme",
})
