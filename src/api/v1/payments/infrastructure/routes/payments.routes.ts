import { Router } from "express";
import { paymentsController } from "@api/payments/infrastructure/services/payments.services";

export const routesPayment = Router();

routesPayment.post("/sendPayment", paymentsController.sendPayment);
routesPayment.put("/confirmPayment", paymentsController.confirmPayment);