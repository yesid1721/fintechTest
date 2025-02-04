import { Router } from "express";
import { customersController } from "@api/customers/infrastructure/services/customers.services";

export const routesCustomers = Router();

routesCustomers.post("/create", customersController.customerRegister);