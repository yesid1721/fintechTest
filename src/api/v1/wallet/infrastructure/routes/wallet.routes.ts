import { Router } from "express";
import { walletController } from "@api/wallet/infrastructure/services/wallet.services";

export const routesWallet = Router();

routesWallet.put("/recharge", walletController.rechargeWallet);
routesWallet.get("/checkBalance", walletController.checkBalance);