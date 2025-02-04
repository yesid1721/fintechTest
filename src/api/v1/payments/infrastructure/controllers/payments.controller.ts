import { Request, Response } from 'express';
import { PaymentsUseCase } from "@api/payments/application/payments.usecase";
import { walletUseCase } from "@api/wallet/infrastructure/services/wallet.services";
import { customerUseCase } from "@api/customers/infrastructure/services/customers.services";
const randomize = require('randomatic');
export class PaymentsController {
    constructor (private readonly paymentsUseCase: PaymentsUseCase) { }

    public sendPayment = async ({body}:Request, res:Response) => {
        try {
            const customer = await customerUseCase.findCustomer(
                {
                    document: body.document,
                    phone: body.phone
                }
            );
            
            if (!customer) {
                res.status(500).json(
                    { 
                        success: false, 
                        cod_error: '01', 
                        message_error: 'Error al encontrar al cliente', 
                        data: "error" 
                    }
                );
            } else {
                const wallet = await walletUseCase.findWallet(
                    {
                        customer_id: customer.customer_id
                    }
                );
                if (!wallet) {
                    res.status(500).json(
                        { 
                            success: false, 
                            cod_error: '02', 
                            message_error: 'Error al validar la billetera', 
                            data: "error" 
                        }
                    );
                } else {
                    if (wallet.balance < body.payment) {
                        res.status(500).json(
                            { 
                                success: false, 
                                cod_error: '07', 
                                message_error: 'Saldo insuficiente para la compra', 
                                data: "error" 
                            }
                        );
                    } else {
                        const token = randomize('0Aa', 6);
                        const payment = await this.paymentsUseCase.sendPayment(
                            {
                                customer_id: customer.customer_id,
                                amount: body.payment,
                                token: token,
                                status: 'pending',
                                generated_at: new Date(),
                            }
                        );
                        if (!payment) {
                            res.status(500).json(
                                { 
                                    success: false, 
                                    cod_error: '07', 
                                    message_error: 'Error al hacer al enviar el pago', 
                                    data: "error" 
                                }
                            );
                        } else {
                            res.status(200).json(
                                { 
                                    success: true, 
                                    cod_error: '00', 
                                    data: {
                                        session_id: payment.payment_id,
                                        token: token
                                    }
                                }
                            );
                        }
                    }
                }
            }
        } catch (error) {
            const errorAsError = error as Error;
            res.status(500).json(
                { 
                    success: false, 
                    cod_error: '08', 
                    message_error: 'Error en el pago', 
                    data: errorAsError 
                }
            );
        }
    };

    public confirmPayment = async ({body}:Request, res:Response) => {
        try {
            const customer = await customerUseCase.findCustomer(
                {
                    document: body.document,
                    phone: body.phone
                }
            );
            
            if (!customer) {
                res.status(500).json(
                    { 
                        success: false, 
                        cod_error: '01', 
                        message_error: 'No existe el cliente', 
                        data: "error" 
                    }
                );
            } else {
                const payment = await this.paymentsUseCase.findPayment({payment_id: body.session_id});
                if (!payment) {
                    res.status(500).json(
                        { 
                            success: false, 
                            cod_error: '10', 
                            message_error: 'Pago no encontrado', 
                            data: "error" 
                        }
                    );
                } else {
                    if (payment.status === 'confirmed') {
                        res.status(500).json(
                            { 
                                success: false, 
                                cod_error: '10', 
                                message_error: 'Pago ya confirmado', 
                                data: "error" 
                            }
                        );
                    } else {
                        const wallet = await walletUseCase.findWallet(
                            {
                                customer_id: customer.customer_id
                            }
                        );
                        if (!wallet) {
                            res.status(500).json(
                                { 
                                    success: false, 
                                    cod_error: '02', 
                                    message_error: 'Error al validar la billetera', 
                                    data: "error" 
                                }
                            );
                        } else {
                            if (Number(wallet.balance) < Number(payment.amount)) {
                                res.status(500).json(
                                    { 
                                        success: false, 
                                        cod_error: '11', 
                                        message_error: 'Saldo actual insuficiente para realizar el pago', 
                                        data: "error" 
                                    }
                                );
                            } else {
                                if (payment.token !== body.token) {
                                    res.status(500).json(
                                        { 
                                            success: false, 
                                            cod_error: '12', 
                                            message_error: 'Token invalido', 
                                            data: "error" 
                                        }
                                    );
                                } else {
                                    const newBalance = Number(wallet?.balance) - Number(payment.amount);
                                    const updateWallet = await walletUseCase.updateWallet(wallet.wallet_id,{balance: newBalance});
                                    const updatePayment = await this.paymentsUseCase.updatePayment(body.session_id,{status:'confirmed'})
                                    res.status(200).json(
                                        { 
                                            success: true, 
                                            cod_error: '00', 
                                            data: "Pago realizado correctamente"
                                        }
                                    );
                                }
                            }
                        }
                    }
                }
            }
        } catch (error) {
            const errorAsError = error as Error;
            res.status(500).json(
                { 
                    success: false, 
                    cod_error: '09', 
                    message_error: 'Error en confirmar pago', 
                    data: errorAsError 
                }
            );
        }
    }

     
}