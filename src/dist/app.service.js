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
        this.getIninitial = [];
        this.transaction = [];
        this.allPsp = [];
        this.payment = [];
        this.baseUrl = process.env.baseUrl;
    }
    AppService.prototype.postApi = function (total_amount, transaction_id, currency, return_url) {
        return __awaiter(this, void 0, void 0, function () {
            var newTransaction, appBasic, buff, base64data;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new transaction_model_1.TransactionModel(total_amount, transaction_id, currency, return_url)];
                    case 1:
                        newTransaction = _a.sent();
                        transaction_id = 100000 + Math.floor(Math.random() * 900000);
                        currency = 'USD';
                        return_url = 'http://localhost:3000';
                        appBasic = "" + process.env.apiSecret;
                        buff = Buffer.from(appBasic);
                        base64data = buff.toString('base64');
                        return [4 /*yield*/, axios_1["default"]
                                .post(this.baseUrl + "/gateway/initialize", {
                                total_amount: newTransaction.total_amount,
                                transaction_id: transaction_id,
                                currency: currency,
                                return_url: return_url
                            }, 
                            // axios.defaults.headers.common,
                            {
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: "Basic " + base64data,
                                    'x-api-Key': process.env.apiKey,
                                    mode: process.env.mode
                                }
                            })
                                .then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            // let storeProduct = request.data.data;
                                            // storeProduct = new this.getTransactionModel({
                                            //   t_id: request.data.data.t_id,
                                            //   t_sum: request.data.data.t_sum,
                                            //   t_url: request.data.data.t_url,
                                            //   transaction_url: request.data.data.transaction_url,
                                            //   transaction_id: request.data.data.transaction_id,
                                            // });
                                            // console.log(request.headers);
                                            // console.log(request.data);
                                            // storeProduct.save();
                                            console.log(response.data.data.transaction_url);
                                            return [4 /*yield*/, axios_1["default"].get("" + response.data.data.transaction_url).then()];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })["catch"](function (error) {
                                console.log(error);
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AppService.prototype.getTransact = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            var transaction, appBasic, buff, base64data;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTransactionModel.findById(_id)];
                    case 1:
                        transaction = _a.sent();
                        console.log('transaction here', transaction);
                        appBasic = "" + process.env.apiSecret;
                        buff = Buffer.from(appBasic);
                        base64data = buff.toString('base64');
                        console.log(base64data);
                        return [4 /*yield*/, axios_1["default"]
                                .get(this.baseUrl + "/gateway/gateways?t_url=\"" + transaction.t_url + "\"&t_id=\"" + transaction.t_id + "\"&t_sum=\"" + transaction.t_sum + "\"", {
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: "Basic " + base64data,
                                    'x-api-Key': process.env.apiKey,
                                    mode: process.env.mode
                                }
                            })
                                .then(function (request) {
                                request.data.data.map(function (all) {
                                    all = new _this.getPspModel({
                                        create_time: all.create_time,
                                        update_time: all.update_time,
                                        provider_id: all.provider_id,
                                        provider_name: all.provider_id,
                                        provider_logo: all.provider_logo,
                                        gateway: all.provider_short_tag,
                                        provider_status: all.provider_status,
                                        delete_time: all.delete_time,
                                        service_accounts_account_id: all.service_accounts_account_id,
                                        service_accounts_users_user_id: all.service_accounts_users_user_id,
                                        providers_provider_id: all.providers_provider_id
                                    });
                                    console.log(all);
                                    all.save();
                                });
                            })["catch"](function (error) {
                                console.log(error);
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //make payment
    // @Cron(CronExpression.EVERY_50_SECONDS)
    // @Interval(10000)
    // @Timeout(20000)
    AppService.prototype.makePayment = function (t_id, gateway, amount, transaction_id, phone_number, currency, paymentType) {
        return __awaiter(this, void 0, void 0, function () {
            var transaction, _id, allPsp, newPayment, appBasic, buff, base64data, res;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTransactionModel.findById(transaction_id)];
                    case 1:
                        transaction = _a.sent();
                        console.log('transaction here', transaction);
                        return [4 /*yield*/, this.getPspModel.findById(_id)];
                    case 2:
                        allPsp = _a.sent();
                        newPayment = new transaction_model_1.Payment(gateway, amount, t_id, phone_number, currency, paymentType);
                        this.payment.push(newPayment);
                        appBasic = "" + process.env.apiSecret;
                        buff = Buffer.from(appBasic);
                        base64data = buff.toString('base64');
                        console.log(base64data);
                        return [4 /*yield*/, axios_1["default"]
                                .post(this.baseUrl + "/gateway/makepayment", {
                                gateway: newPayment.gateway,
                                amount: newPayment.amount,
                                transaction_id: newPayment.transaction_id,
                                phone_number: newPayment.phone_number,
                                currency: newPayment.currency,
                                paymentType: newPayment.paymentType
                            }, {
                                headers: {
                                    Authorization: "Basic " + base64data,
                                    'Content-Type': 'application/json',
                                    'x-api-Key': process.env.apiKey,
                                    mode: process.env.mode
                                }
                            })
                                .then(function (request) { return __awaiter(_this, void 0, void 0, function () {
                                var tokens, newToken;
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            tokens = request.data.data;
                                            tokens = new this.getTokenModel((_a = {},
                                                _a['auth-token'] = request.data.data['auth-token'],
                                                _a['x-token'] = request.data.data['x-token'],
                                                _a.transaction_id = request.data.data.transaction_id,
                                                _a.pay_token = request.data.data.pay_token,
                                                _a.payment_ref = request.data.data.payment_ref,
                                                _a.gateway = request.data.data.gateway,
                                                _a));
                                            tokens.save();
                                            return [4 /*yield*/, this.getTransactionModel.findById(tokens._id)];
                                        case 1:
                                            newToken = _b.sent();
                                            console.log(newToken);
                                            return [4 /*yield*/, axios_1["default"]
                                                    .get(this.baseUrl + "/gateway/paymentstatus/mtnmomo/\n      transaction_id=" + tokens.transaction_id + "&\n      pay_token=" + tokens.pay_token + "&\n      payment_ref=" + tokens.payment_ref, {
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        Authorization: "Basic " + base64data,
                                                        'x-api-Key': process.env.apiKey,
                                                        mode: process.env.mode
                                                    }
                                                })
                                                    .then(function (request) {
                                                    console.log(request.data);
                                                    return request.data;
                                                })["catch"](function (error) {
                                                    console.log(error);
                                                })];
                                        case 2:
                                            _b.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })["catch"](function (error) {
                                console.log(error);
                            })];
                    case 3:
                        res = _a.sent();
                        return [2 /*return*/];
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
