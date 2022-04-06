"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HeadersMiddlware = void 0;
var common_1 = require("@nestjs/common");
var HeadersMiddlware = /** @class */ (function () {
    function HeadersMiddlware() {
    }
    HeadersMiddlware.prototype.use = function (req, res, next) {
        var _a;
        var appBasic = "" + process.env.apiSecret;
        var buff = Buffer.from(appBasic);
        var base64data = buff.toString('base64');
        console.log('coming from middle ware');
        var data = {
            headers: (_a = {},
                _a['Content-Type'] = 'application/json',
                _a.Authorization = "Basic " + base64data,
                _a['x-api-Key'] = process.env.apiKey,
                _a.mode = process.env.mode,
                _a)
        };
        console.log(data);
        next();
        return data;
    };
    HeadersMiddlware = __decorate([
        common_1.Injectable()
    ], HeadersMiddlware);
    return HeadersMiddlware;
}());
exports.HeadersMiddlware = HeadersMiddlware;
