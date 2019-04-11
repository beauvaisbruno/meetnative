"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var native_base_1 = require("native-base");
var Loading = /** @class */ (function (_super) {
    __extends(Loading, _super);
    function Loading(props) {
        var _this = _super.call(this, props) || this;
        _this.enableMessage = _this.enableMessage.bind(_this);
        _this.state = {
            displayMessage: false
        };
        _this.timer = setTimeout(_this.enableMessage, 250);
        _this.begin = Date.now();
        return _this;
        // console.log("Spinner start: ", this.begin);
    }
    Loading.prototype.componentWillUnmount = function () {
        clearTimeout(this.timer);
    };
    Loading.prototype.enableMessage = function () {
        this.setState({ displayMessage: true });
    };
    Loading.prototype.render = function () {
        var displayMessage = this.state.displayMessage;
        if (!displayMessage) {
            return null;
        }
        // console.log("Spinner: ", Date.now() - this.begin, " ", this.begin);
        return <native_base_1.Spinner />;
    };
    return Loading;
}(React.Component));
exports.default = Loading;
