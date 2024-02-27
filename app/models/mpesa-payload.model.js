import sequelize from '../utils/database-connection';
import { DataTypes } from 'sequelize';

const MpesaPayload = sequelize.define('mpesa_payload', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    merchant_request_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    checkout_request_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    business_short_code: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    client_phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    paybill_reference_number: {
        type: DataTypes.STRING,
        allowNull: true
    },
    transaction_reference_number: {
        type: DataTypes.STRING,
        allowNull: true
    },
    datetime: {
        type: DataTypes.STRING,
        allowNull: true
    },
    mpesa_payload: {
        type: DataTypes.STRING,
        allowNull: true
    }
});
export default MpesaPayload;