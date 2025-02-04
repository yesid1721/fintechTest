import { WalletController } from "@api/wallet/infrastructure/controllers/wallet.controller";
import { WalletUseCase } from "@api/wallet/application/wallet.usecase";
import { WalletRepository } from "@api/wallet/infrastructure/repository/wallet.repository";
import { WalletService } from "@api/wallet/infrastructure/soap/wallet.soapService";
import { WalletSoapUseCase } from "@api/wallet/infrastructure/soap/wallet.soapUseCase";

export const walletRepository = new WalletRepository();
export const walletSoapUseCase = new WalletSoapUseCase(walletRepository);
export const walletServiceSoap = new WalletService(walletSoapUseCase);
export const walletUseCase = new WalletUseCase(walletServiceSoap);
export const walletController = new WalletController(walletUseCase);