export class Conta {
    nome;
    saldo = JSON.parse(localStorage.getItem("saldo")) || 0;
    transacoes = JSON.parse(localStorage.getItem("transacoes"), (key, value) => {
        // console.log("🚀 ~ consttransacoes:Transacao[]=JSON.parse ~ key: string, value: string:", { key, value })
        if (key === 'data') {
            return new Date(value);
        }
        return value;
    }) || [];
    constructor({ nome, saldo, transacoes }) {
        this.nome = nome;
        this.saldo = saldo;
        this.transacoes = transacoes;
    }
}
