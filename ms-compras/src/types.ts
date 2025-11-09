export interface Compra {
    id: string;
    compraId: string;
    monto: number;
    status: 'COMPLETED' | 'COMPENSATED';
}

export type NewCompraData = Omit<Compra, 'id' | 'status'>;