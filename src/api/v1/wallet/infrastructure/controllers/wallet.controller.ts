import { Request, Response } from 'express';
import { WalletUseCase } from "@api/wallet/application/wallet.usecase";
import { customerUseCase } from "@api/customers/infrastructure/services/customers.services";

export class WalletController {
    constructor (private readonly WalletUseCase: WalletUseCase) { }

    public rechargeWallet = async ({body}:Request, res:Response) => {
        try {
            if (!body.phone || !body.document || !body.amount) {
                res.status(500).json(
                    { 
                        success: false, 
                        cod_error: '12', 
                        message_error: 'Envia todos los datos por favor, documento, telefono y valor de la recarga', 
                        data: "error" 
                    }
                );
            } else {
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

    public checkBalance = async ({query}:Request, res: Response) => {
        try {
            const phone = String(query.phone);
            const document = String(query.document);
            if (!phone || !document) {
                res.status(500).json(
                    { 
                        success: false, 
                        cod_error: '13', 
                        message_error: 'Envia todos los datos para consultar saldo (document, phone)', 
                        data: "error" 
                    }
                );
            } else {
                const customer = await customerUseCase.findCustomer(
                    {
                        phone: phone,
                        document: document
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
                } else {
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
                }
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