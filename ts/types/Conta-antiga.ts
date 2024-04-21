import { Transacao, TipoTransacao } from "./Transacao.js"
import { GrupoTransacao } from "./GrupoTransacao.js"
import { formatarData } from "../utils/formatter.js"
import { FormatoData } from "./Data.js"
import { ResumoTransacoes } from "./ResumoTransacoes.js"

let saldo: number = JSON.parse(localStorage.getItem("saldo")) || 0

const transacoes: Transacao[] = JSON.parse(localStorage.getItem("transacoes"), (key: string, value: string) => {
    // console.log("🚀 ~ consttransacoes:Transacao[]=JSON.parse ~ key: string, value: string:", { key, value })
    if (key === 'data') {
        return new Date(value)
    }

    return value
}) || []

function debitar(valor: number): void {
    if (valor <= 0) {
        throw new Error("O valor a ser debitado deve ser maior que zero!")
    }
    if (valor > saldo) {
        throw new Error("Saldo insuficiente!")
    }

    saldo -= valor
    localStorage.setItem("saldo", saldo.toString())
}

function depositar(valor: number): void {
    if (valor <= 0) {
        throw new Error("O valor a ser depositado deve ser maior que zero!")
    }

    saldo += valor
    localStorage.setItem("saldo", saldo.toString())
}

const Conta = {
    getSaldo() {
        return saldo
    },
    getDataAcesso(): Date {
        return new Date()
    },
    getGruposTransacoes(): GrupoTransacao[] {
        const gruposTransacoes: GrupoTransacao[] = []
        // cria uma copia, ao inves de fazer uma referencia na memoria
        const listaTransacoes: Transacao[] = structuredClone(transacoes)
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
    },
    registrarTransacao(novaTransacao: Transacao): void {
        const tipoTransacaoToUse = novaTransacao.tipoTransacao
        let valorToUse = novaTransacao.valor
        // Obtenha o saldo atual usando getSaldo()
        if (tipoTransacaoToUse == "Depósito") {
            depositar(valorToUse)

        } else if (tipoTransacaoToUse === TipoTransacao.TRANSFERENCIA || tipoTransacaoToUse === TipoTransacao.PAGAMENTO_BOLETO) {
            debitar(valorToUse)
            valorToUse = valorToUse * -1

        } else {
            throw new Error("Tipo de Transação é inválido!")
        }

        // console.log("🚀 ~ registrarTransacao ~ novaTransacao:", novaTransacao)
        // console.log("🚀 ~ registrarTransacao ~ novoSaldo:", saldo)
        transacoes.push(novaTransacao)
        localStorage.setItem("transacoes", JSON.stringify(transacoes))
        // console.log("🚀 ~ registrarTransacao ~ transacoes:", transacoes)
        // console.log("🚀 ~ registrarTransacao ~ this.getGruposTransacoes():", this.getGruposTransacoes())
    },
    agruparTransacoes(): ResumoTransacoes {
        const resumo: ResumoTransacoes = {
            totalDepositos: 0,
            totalTransferencias: 0,
            totalPagamentosBoleto: 0
        }

        this.transacoes.forEach(transacao => {
            switch (transacao.tipoTransacao) {
                case TipoTransacao.DEPOSITO:
                    resumo.totalDepositos += transacao.valor
                    break

                case TipoTransacao.TRANSFERENCIA:
                    resumo.totalTransferencias += transacao.valor
                    break

                case TipoTransacao.PAGAMENTO_BOLETO:
                    resumo.totalPagamentosBoleto += transacao.valor
                    break
            }
        })

        return resumo
    }

}

export default Conta