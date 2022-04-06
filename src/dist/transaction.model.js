"use strict";
var _a;
exports.__esModule = true;
exports.Payment = exports.getPspSchema = exports.getTokenSchema = exports.getTransactionSchema = exports.TransactionModel = void 0;
var mongoose = require("mongoose");
var TransactionModel = /** @class */ (function () {
    function TransactionModel(total_amount, transaction_id, currency, return_url) {
        this.total_amount = total_amount;
        this.transaction_id = transaction_id;
        this.currency = currency;
        this.return_url = return_url;
    }
    return TransactionModel;
}());
exports.TransactionModel = TransactionModel;
exports.getTransactionSchema = new mongoose.Schema({
    t_id: {
        type: String
    },
    t_sum: {
        type: String
    },
    t_url: {
        type: String
    },
    transaction_url: {
        type: String
    },
    transaction_id: {
        type: String
    }
});
exports.getTokenSchema = new mongoose.Schema((_a = {},
    _a['auth-token'] = {
        type: String
    },
    _a['x-token'] = {
        type: String
    },
    _a.transaction_id = {
        type: String
    },
    _a.pay_token = {
        type: String
    },
    _a.payment_ref = {
        type: String
    },
    _a.gateway = {
        type: String
    },
    _a));
exports.getPspSchema = new mongoose.Schema({
    create_time: {
        type: String
    },
    update_time: {
        type: String
    },
    provider_id: {
        type: String
    },
    provider_name: {
        type: String
    },
    provider_logo: {
        type: String
    },
    gateway: {
        type: String
    },
    provider_status: {
        type: String
    },
    delete_time: {
        type: String
    },
    service_accounts_account_id: {
        type: String
    },
    service_accounts_users_user_id: {
        type: String
    },
    providers_provider_id: {
        type: String
    }
});
var Payment = /** @class */ (function () {
    function Payment(gateway, amount, transaction_id, phone_number, currency, paymentType) {
        this.gateway = gateway;
        this.amount = amount;
        this.transaction_id = transaction_id;
        this.phone_number = phone_number;
        this.currency = currency;
        this.paymentType = paymentType;
    }
    return Payment;
}());
exports.Payment = Payment;
