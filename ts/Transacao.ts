//Enum
enum TipoTransacao {
    DEPOSITO = "Depósito",
    TRANSFERENCIA = "Transferência",
    PAGAMENTO_BOLETO = "Pagamento de Boleto"
}

// Type Alias
type Transacao = {
    tipoTransacao: TipoTransacao,
    data: Date,
    valor: number,
}