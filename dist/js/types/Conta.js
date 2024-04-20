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
}
const conta = new Conta({
    nome: "Joana da Silva Oliveira",
    saldo: 3000,
});
