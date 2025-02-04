import { Wallet, ICustomersRepository } from "@api/wallet/domain/wallet.entity";

export class WalletSoapUseCase {
    constructor(private readonly WalletSoapRepository: ICustomersRepository) { }

    async createWallet(walletData: Partial<Wallet>): Promise<Wallet> {
        return await this.WalletSoapRepository.createWallet(walletData);
    };

    async updateWallet(id: number, walletData: Partial<Wallet>): Promise<Wallet | null> {
        return await this.WalletSoapRepository.updateWallet(id,walletData);
    };

    async findWallet(params: Partial<Wallet>): Promise<Wallet | null> {
        return await this.WalletSoapRepository.findWallet(params);
    };
}