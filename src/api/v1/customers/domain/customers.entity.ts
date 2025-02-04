
export class Customers {
    constructor(
        public customer_id: number,
        public document: string,
        public full_name:string,
        public email:string, 
        public phone:string,
        public registration_date: Date
    ) { }
};

export interface ICustomersRepository {
    registerCustomer(customerData: Partial<Customers>):Promise<Customers>;
    findCustomer(parmas: Partial<Customers>): Promise<Customers | null>;
}