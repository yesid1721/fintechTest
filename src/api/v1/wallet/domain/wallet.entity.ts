export class Wallet {
    constructor(
        public wallet_id: number,
        public customer_id: number,
        public balance: number,
        public last_update: Date,
    ) { }
}

export interface ICustomersRepository {
    createWallet(walletData: Partial<Wallet>): Promise<Wallet>;
    updateWallet(id: number, walletData: Partial<Wallet>): Promise<Wallet | null>;
    findWallet(params: Partial<Wallet>): Promise<Wallet | null>;
}