"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AppService = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
var common_1 = require("@nestjs/common");
var transaction_model_1 = require("./transaction.model");
var axios_1 = require("axios");
var mongoose_1 = require("@nestjs/mongoose");
var AppService = /** @class */ (function () {
    function AppService(getTransactionModel, getPspModel, getTokenModel, httpService, configService, schedulerRegistry) {
        this.getTransactionModel = getTransactionModel;
        this.getPspModel = getPspModel;
        this.getTokenModel = getTokenModel;
        this.httpService = httpService;
        this.configService = configService;
        this.schedulerRegistry = schedulerRegistry;
        this.baseUrl = process.env.baseUrl;
    }
    AppService.prototype.postApi = function (total_amount, transaction_id, currency, return_url) {
        return __awaiter(this, void 0, void 0, function () {
            var newTransaction, res;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new transaction_model_1.TransactionModel(total_amount, transaction_id, currency, return_url)];
                    case 1:
                        newTransaction = _a.sent();
                        transaction_id = 100000 + Math.floor(Math.random() * 9000000000000);
                        return_url = 'https://react-ecommerce2-eta.vercel.app/';
                        console.log('the currency is ', currency);
                        return [4 /*yield*/, axios_1["default"]
                                .post(this.baseUrl + "/gateway/initialize", {
                                total_amount: newTransaction.total_amount,
                                transaction_id: transaction_id,
                                currency: newTransaction.currency,
                                return_url: return_url
                            }, {
                                headers: axios_1["default"].defaults.headers.head
                            })
                                .then(function (request) { return __awaiter(_this, void 0, void 0, function () {
                                var storeProduct;
                                return __generator(this, function (_a) {
                                    storeProduct = request.data.data;
                                    storeProduct = new this.getTransactionModel({
                                        t_id: request.data.data.t_id,
                                        t_sum: request.data.data.t_sum,
                                        t_url: request.data.data.t_url,
                                        transaction_url: request.data.data.transaction_url,
                                        transaction_id: request.data.data.transaction_id
                                    });
                                    storeProduct.save();
                                    console.log(storeProduct);
                                    return [2 /*return*/, storeProduct];
                                });
                            }); })["catch"](function (error) {
                                return error.response.data;
                            })];
                    case 2:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    AppService.prototype.getTransact = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            var transaction, psps;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTransactionModel.findById(_id)];
                    case 1:
                        transaction = _a.sent();
                        console.log("transaction_id goes here" + transaction.transaction_id);
                        console.log('transaction here', transaction);
                        return [4 /*yield*/, axios_1["default"]
                                .get(this.baseUrl + "/gateway/gateways?t_url=\"" + transaction.t_url + "\"&t_id=\"" + transaction.t_id + "\"&t_sum=\"" + transaction.t_sum + "\"", {
                                headers: axios_1["default"].defaults.headers.head
                            })
                                .then(function (request) {
                                // request.data.data.map((all) => {
                                var all = new _this.getPspModel({
                                    create_time: request.data.data.create_time,
                                    update_time: request.data.data.update_time,
                                    provider_id: request.data.data.provider_id,
                                    provider_name: request.data.data.provider_id,
                                    provider_logo: request.data.data.provider_logo,
                                    gateway: request.data.data.provider_short_tag,
                                    provider_status: request.data.data.provider_status,
                                    delete_time: request.data.data.delete_time,
                                    service_accounts_account_id: request.data.data.service_accounts_account_id,
                                    service_accounts_users_user_id: request.data.data.service_accounts_users_user_id,
                                    providers_provider_id: request.data.data.providers_provider_id,
                                    transaction_id: request.data.data.transaction_id
                                });
                                console.log(request.data.data.provider_id);
                                all.save();
                                return request.data;
                                // });
                                return request.data.data;
                            })["catch"](function (error) {
                                return error.response.data;
                            })];
                    case 2:
                        psps = _a.sent();
                        return [2 /*return*/, psps];
                }
            });
        });
    };
    AppService.prototype.makePayment = function (_id, gateway, amount, transaction_id, phone_number, currency, paymentType) {
        return __awaiter(this, void 0, void 0, function () {
            var transaction, allPsp, newPayment, res;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTransactionModel.findById(_id)];
                    case 1:
                        transaction = _a.sent();
                        return [4 /*yield*/, this.getPspModel.findById(_id)];
                    case 2:
                        allPsp = _a.sent();
                        console.log('transaction here', transaction);
                        paymentType = 'button';
                        newPayment = new transaction_model_1.Payment(gateway, amount, _id, phone_number, currency, paymentType);
                        return [4 /*yield*/, axios_1["default"]
                                .post(this.baseUrl + "/gateway/makepayment", {
                                gateway: newPayment.gateway,
                                amount: newPayment.amount,
                                transaction_id: transaction.transaction_id,
                                phone_number: newPayment.phone_number,
                                currency: currency,
                                paymentType: paymentType
                            }, {
                                headers: axios_1["default"].defaults.headers.head
                            })
                                .then(function (request) { return __awaiter(_this, void 0, void 0, function () {
                                var tokens;
                                var _a;
                                return __generator(this, function (_b) {
                                    tokens = request.data;
                                    tokens = new this.getTokenModel((_a = {
                                            transaction_id: request.data.data.transaction_id,
                                            pay_token: request.data.data.pay_token,
                                            payment_ref: request.data.data.payment_ref,
                                            gateway: newPayment.gateway
                                        },
                                        _a['auth-token'] = request.data.data['auth-token'],
                                        _a['x-token'] = request.data.data['x-token'],
                                        _a.message = request.data.message,
                                        _a));
                                    return [2 /*return*/, tokens.save()];
                                });
                            }); })["catch"](function (error) {
                                return error.response.data;
                            })];
                    case 3:
                        res = _a.sent();
                        // this.getStatus(_id)
                        return [2 /*return*/, res];
                }
            });
        });
    };
    // @Interval(2000)
    AppService.prototype.getStatus = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            var tokens, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTokenModel.findById(_id)];
                    case 1:
                        tokens = _a.sent();
                        return [4 /*yield*/, axios_1["default"]
                                .get(this.baseUrl + "/gateway/paymentstatus/" + tokens.gateway + "/" + tokens.transaction_id + "?\n      pay_token=\"" + tokens.pay_token + "\"&\n      payment_ref=\"" + tokens.payment_ref + "\"", {
                                headers: axios_1["default"].defaults.headers.head
                            })
                                .then(function (request) {
                                return request.data;
                            })["catch"](function (error) {
                                return error.response.data;
                            })];
                    case 2:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    AppService = __decorate([
        common_1.Injectable(),
        __param(0, mongoose_1.InjectModel('getTransaction ')),
        __param(1, mongoose_1.InjectModel('getPsp')),
        __param(2, mongoose_1.InjectModel('gettokens'))
    ], AppService);
    return AppService;
}());
exports.AppService = AppService;
