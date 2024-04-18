//Enum
export enum TipoTransacao {
    DEPOSITO = "Depósito",
    TRANSFERENCIA = "Transferência",
    PAGAMENTO_BOLETO = "Pagamento de Boleto"
}

// Type Alias
export type Transacao = {
    tipoTransacao: TipoTransacao,
    data: Date,
    valor: number,
}