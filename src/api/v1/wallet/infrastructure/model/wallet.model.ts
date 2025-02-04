
import { Model, DataTypes, NOW } from 'sequelize';
import { getDbInstance } from '@app/app/database';

const sequelizeInstance = getDbInstance();

export class WalletModel extends Model {
    declare wallet_id: number;
    declare customer_id: number;
    declare balance: number;
    declare last_update: Date;
};

WalletModel.init(
    {
        wallet_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        customer_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        balance:{
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        last_update:{
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize: sequelizeInstance,
        tableName: 'wallet',
    }
)