export interface Pago {
    id: string;
    pagoId: string; 
    userId: string;
    amount: number;
    status: 'COMPLETED' | 'COMPENSATED';
}

export type NewPagoData = Omit<Pago, 'id' | 'pagoId' | 'status'>;