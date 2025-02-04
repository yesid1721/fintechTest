export class Payments {
    constructor(
        public payment_id: number,
        public customer_id: number,
        public amount: number,
        public session_id: string,
        public token: string,
        public generated_at: Date,
        public status: 'pending'|'confirmed'|'failed',
    ) { }
};
