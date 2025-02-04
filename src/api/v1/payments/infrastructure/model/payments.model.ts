
import { Model, DataTypes, NOW } from 'sequelize';
import { getDbInstance } from '@app/app/database';

const sequelizeInstance = getDbInstance();

export class PaymentsModel extends Model {
    declare payment_id: number;
    declare customer_id: number;
    declare amount: number;
    declare token: string;
    declare generated_at: Date
    declare status: 'pending'|'confirmed'|'failed';
}

PaymentsModel.init(
    {
        payment_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        customer_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        amount:{
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        token:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        generated_at:{
            type: DataTypes.NOW,
            allowNull: false,
        },
        status:{
            type: DataTypes.ENUM('pending','confirmed','failed'),
            allowNull: false,
        },
    },
    {
        sequelize: sequelizeInstance,
        tableName: 'payments',
    }
);