export interface Pago {
    id: string;
    pagoId: string; 
    userId: string;
    amount: number;
    status: 'COMPLETADO' | 'COMPENSADO';
}

export type NewPagoData = Omit<Pago, 'id' | 'pagoId' | 'status'>;