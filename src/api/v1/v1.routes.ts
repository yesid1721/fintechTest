import { routesCustomers } from "@api/customers/infrastructure/routes/customers.routes";
import { routesWallet } from "@api/wallet/infrastructure/routes/wallet.routes";
import { routesPayment } from "@api/payments/infrastructure/routes/payments.routes";

export {
    routesCustomers as customers,
    routesWallet as wallet,
    routesPayment as payment
};