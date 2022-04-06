"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var config_1 = require("@nestjs/config");
var Configuration_1 = require("./lib/Configuration");
var Validation_1 = require("./lib/Validation");
var mongoose_1 = require("@nestjs/mongoose");
var transaction_model_1 = require("./transaction.model");
var schedule_1 = require("@nestjs/schedule");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        common_1.Module({
            imports: [
                common_1.HttpModule,
                schedule_1.ScheduleModule.forRoot(),
                config_1.ConfigModule.forRoot({
                    isGlobal: true,
                    load: [Configuration_1.configurations],
                    validationSchema: Validation_1.validationSchema
                }),
                mongoose_1.MongooseModule.forRoot('mongodb://localhost:27017/transactions'),
                mongoose_1.MongooseModule.forFeature([
                    { name: 'getTransaction ', schema: transaction_model_1.getTransactionSchema },
                    { name: 'getPsp', schema: transaction_model_1.getPspSchema },
                    { name: 'gettokens', schema: transaction_model_1.getTokenSchema },
                ]),
            ],
            controllers: [app_controller_1.AppController],
            providers: [
                app_service_1.AppService,
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
