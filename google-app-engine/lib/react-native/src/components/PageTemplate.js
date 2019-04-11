"use strict";
var __importStar =
  (this && this.__importStar) ||
  function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const native_base_1 = require("native-base");
const HeaderApp_1 = __importDefault(require("./HeaderApp"));
const custom_1 = __importDefault(
  require("../config/native-base-theme/variables/custom")
);
function PageTemplate(Screen, headerTitle, padding = true, noScroll = false) {
  return class extends React.Component {
    render() {
      return React.createElement(
        native_base_1.Container,
        { style: { backgroundColor: custom_1.default.backgroundApp } },
        React.createElement(HeaderApp_1.default, { headerTitle: headerTitle }),
        noScroll ||
          React.createElement(
            native_base_1.Content,
            { padder: padding },
            React.createElement(Screen, Object.assign({}, this.props))
          ),
        noScroll && React.createElement(Screen, Object.assign({}, this.props))
      );
    }
  };
}
exports.default = PageTemplate;
//# sourceMappingURL=PageTemplate.js.map
