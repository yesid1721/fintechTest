import { Request, Response } from 'express';
import { WalletUseCase } from "@api/wallet/application/wallet.usecase";
import { customerUseCase } from "@api/customers/infrastructure/services/customers.services";

export class WalletController {
    constructor (private readonly WalletUseCase: WalletUseCase) { }

    public rechargeWallet = async ({body}:Request, res:Response) => {
        try {
            const customer = await customerUseCase.findCustomer(
                {
                    phone: body.phone,
                    document: body.document
                }
            );
            if (!customer) {
                res.status(500).json(
                    { 
                        success: false, 
                        cod_error: '04', 
                        message_error: 'Error cliente no existe', 
                        data: "error" 
                    }
                );
            };
            const wallet = await this.WalletUseCase.findWallet({customer_id: customer?.customer_id})
            if (!wallet || wallet?.wallet_id === undefined) {
                res.status(500).json(
                    { 
                        success: false, 
                        cod_error: '05', 
                        message_error: 'Error en la billetera', 
                        data: "error" 
                    }
                );
            } else {
                const balance = Number(wallet?.balance) + Number(body.amount);
                const rechargeWallet = await this.WalletUseCase.updateWallet(wallet?.wallet_id, {balance: balance});
                res.status(200).json(
                    { 
                        success: true, 
                        cod_error: '00', 
                        data: rechargeWallet
                    }
                );
            }
            
            
        } catch (error) {
            const errorAsError = error as Error;
            res.status(500).json(
                { 
                    success: false, 
                    cod_error: '06', 
                    message_error: 'Error al recargar la billetera', 
                    data: errorAsError 
                }
            ); 
        }
    };

    public checkBalance = async ({body}:Request, res: Response) => {
        try {
            const customer = await customerUseCase.findCustomer(
                {
                    phone: body.phone,
                    document: body.document
                }
            );
            if (!customer) {
                res.status(500).json(
                    { 
                        success: false, 
                        cod_error: '04', 
                        message_error: 'Error cliente no existe', 
                        data: "error" 
                    }
                );
            };
            const wallet = await this.WalletUseCase.findWallet({customer_id: customer?.customer_id})
            if (!wallet || wallet?.wallet_id === undefined) {
                res.status(500).json(
                    { 
                        success: false, 
                        cod_error: '05', 
                        message_error: 'Error en la billetera', 
                        data: "error" 
                    }
                );
            } else {
                res.status(200).json(
                    { 
                        success: true, 
                        cod_error: '00', 
                        data: { "check balance": wallet?.balance}
                    }
                );
            }
        } catch (error) {
            const errorAsError = error as Error;
            res.status(500).json(
                { 
                    success: false, 
                    cod_error: '07', 
                    message_error: 'Error al consultar saldo', 
                    data: errorAsError 
                }
            ); 
        }
    }
};