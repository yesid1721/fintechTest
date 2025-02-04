export class Payments {
    constructor(
        public payment_id: number,
        public customer_id: number,
        public amount: number,
        public token: string,
        public generated_at: Date,
        public status: 'pending'|'confirmed'|'failed',
    ) { }
};

export interface IPaymentsRepository {
    sendPayment(payData: Partial<Payments>): Promise<Payments>;
    findPayment(params: Partial<Payments>): Promise<Payments | null>;
    updatePayment(id: number, paymentData: Partial<Payments>): Promise<Payments | null>;
}