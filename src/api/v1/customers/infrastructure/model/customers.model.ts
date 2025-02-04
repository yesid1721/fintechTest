
import { Model, DataTypes, NOW } from 'sequelize';
import { getDbInstance } from '@app/app/database';

const sequelizeInstance = getDbInstance();

export class CustomersModel extends Model{
    declare customer_id: number;
    declare document: string
    declare full_name:string 
    declare email:string 
    declare phone:string 
    declare registration_date: Date
}

CustomersModel.init(
    {
        customer_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        document:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        full_name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        registration_date:{
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: NOW,
        },

       
    },
    {
        sequelize: sequelizeInstance,
        tableName: 'customers',
    }
);