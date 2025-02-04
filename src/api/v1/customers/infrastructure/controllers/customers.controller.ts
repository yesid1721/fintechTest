import { Request, Response } from 'express';
import { CustomerUseCase } from "@api/customers/application/customers.usecase";
import { walletUseCase } from "@api/wallet/infrastructure/services/wallet.services";

export class CustomersController {
    constructor(private readonly costumersUseCase: CustomerUseCase) { }
    
    public customerRegister = async ({body}: Request, res: Response) => {
        try {
            if (!body.document || !body.full_name || !body.email || !body.phone) {
                res.status(500).json(
                    { 
                        success: false, 
                        cod_error: '13', 
                        message_error: 'Envia todos los datos para crear cliente (document, full_name, email, phone)', 
                        data: "error" 
                    }
                );
            } else {
                const newCustomer = await this.costumersUseCase.registerCustomer(body);
                if (!newCustomer) {
                    res.status(500).json(
                        { 
                            success: false, 
                            cod_error: '01', 
                            message_error: 'Error al registrar cliente', 
                            data: "error" 
                        }
                    );
                };
                const newWallet = await walletUseCase.createWallet(
                    {
                        customer_id: newCustomer.customer_id,
                        balance: 0
                    }
                );
                if (!newWallet) {
                    res.status(500).json(
                        { 
                            success: false, 
                            cod_error: '02', 
                            message_error: 'Error al crear la billetera', 
                            data: "error" 
                        }
                    );
                };
                res.status(200).json(
                    { 
                        success: true, 
                        cod_error: '00', 
                        data: 
                        {
                            newCustomer,
                            newWallet
                        }
                    }
                );
            }
        } catch (error) {
            const errorAsError = error as Error;
            res.status(500).json(
                { 
                    success: false, 
                    cod_error: '01', 
                    message_error: 'Error al registrar el cliente', 
                    data: errorAsError 
                }
            );
        }
    }
}