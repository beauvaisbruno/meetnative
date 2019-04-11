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
var HeaderApp_1 = require("./HeaderApp");
var custom_1 = require("../config/native-base-theme/variables/custom");
function PageTemplate(Screen, headerTitle, padding, noScroll) {
    if (padding === void 0) { padding = true; }
    if (noScroll === void 0) { noScroll = false; }
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.render = function () {
            return (<native_base_1.Container style={{ backgroundColor: custom_1.default.backgroundApp }}>
          <HeaderApp_1.default headerTitle={headerTitle}/>
          {noScroll || (<native_base_1.Content padder={padding}>
              <Screen {...this.props}/>
            </native_base_1.Content>)}
          {noScroll && <Screen {...this.props}/>}
        </native_base_1.Container>);
        };
        return class_1;
    }(React.Component));
}
exports.default = PageTemplate;
