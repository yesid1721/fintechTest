import { listen } from "soap";
import express from "express";
import { readFileSync, existsSync } from "fs";
import { WalletSoapUseCase } from "@api/wallet/infrastructure/soap/wallet.soapUseCase";
import { WalletModel } from "@api/wallet/infrastructure/model/wallet.model";
import { walletServiceSoap } from "@api/wallet/infrastructure/services/wallet.services";


const wsdlPath = 'src/api/v1/wallet/infrastructure/soap/walletService.wsdl';
if (!existsSync(wsdlPath)) {
    console.error(`File not found: ${wsdlPath}`);
    process.exit(1);
};

const xml = readFileSync(wsdlPath, 'utf8');

export class WalletService {
    constructor (private readonly walletSoapUseCase: WalletSoapUseCase) { }

    async createWallet(walletData: Partial<WalletModel>): Promise<any> {
        try {
            return await this.walletSoapUseCase.createWallet(walletData);
        } catch (error) {
            return error;
        }
    }
    
    async updateWallet(id: number, walletData: Partial<WalletModel>): Promise<any | null> {
        try {
            return await this.walletSoapUseCase.updateWallet(id,walletData);
        } catch (error) {
            return error;
        }
    };

    async findWallet(params: Partial<WalletModel>): Promise<any | null> {
        try {
            return await this.walletSoapUseCase.findWallet(params);
        } catch (error) {
            return error;
        }
            
    };
};

const app = express();

export const WalletServiceSoap = {
    WalletService: {
        WalletServicePort: {
            createWallet: async (walletData: Partial<WalletModel>): Promise<any> => {
                return await walletServiceSoap.createWallet(walletData);
            }
        }
    }
};

app.listen(8803, () => {
    listen(app, '/wsdl', WalletServiceSoap, xml, () => {
        console.log('SOAP service listening on port 8003')
    });
});
