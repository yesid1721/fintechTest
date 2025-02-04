import { WalletModel } from "@api/wallet/infrastructure/model/wallet.model";
import { ICustomersRepository } from "@api/wallet/domain/wallet.entity";

export class WalletRepository implements ICustomersRepository {

    async createWallet(walletData: Partial<WalletModel>): Promise<WalletModel>{
        return await WalletModel.create(walletData);
    };

    async updateWallet(id: number, walletData: Partial<WalletModel>): Promise<WalletModel | null>{
        const wallet = await WalletModel.findByPk(id);
        if (!wallet) throw new Error ('Wallet not found');
        return await wallet.update(walletData);
    };

    async findWallet(params: Partial<WalletModel>): Promise<WalletModel | null> {
        try {
            const wallet = await WalletModel.findOne({
                where:{...params},
            });
            if (!wallet) {
                return null
            };
            return wallet;
        } catch (error) {
            return Promise.reject(
                new Error(error instanceof Error ? error.message : "Unknown error")
            );
        }
    }
}