import { WalletService } from "@api/wallet/infrastructure/soap/wallet.soapService";
import { WalletModel } from "@api/wallet/infrastructure/model/wallet.model";

export class WalletUseCase {
    constructor (private readonly WalletServiceSoap: WalletService) { }
    
    async createWallet(walletData: Partial<WalletModel>): Promise<WalletModel> {
        try {
            return await this.WalletServiceSoap.createWallet(walletData);
        } catch (error) {
            console.error('Error creating wallet:', error);
            throw error;
        }
    };
    
    async updateWallet(id: number, walletData: Partial<WalletModel>): Promise<WalletModel | null> {
        try {
            return await this.WalletServiceSoap.updateWallet(id,walletData);
        } catch (error) {
            console.error('Error updating wallet:', error);
            throw error;
        }
    };

    async findWallet(params: Partial<WalletModel>): Promise<WalletModel | null> {
        try {
            return await this.WalletServiceSoap.findWallet(params);
        } catch (error) {
            console.error('Error updating wallet:', error);
            throw error;
        }
            
    };

};