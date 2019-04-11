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
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const native_base_1 = require("native-base");
class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.enableMessage = this.enableMessage.bind(this);
    this.state = {
      displayMessage: false
    };
    this.timer = setTimeout(this.enableMessage, 250);
    this.begin = Date.now();
    // console.log("Spinner start: ", this.begin);
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  enableMessage() {
    this.setState({ displayMessage: true });
  }
  render() {
    const { displayMessage } = this.state;
    if (!displayMessage) {
      return null;
    }
    // console.log("Spinner: ", Date.now() - this.begin, " ", this.begin);
    return React.createElement(native_base_1.Spinner, null);
  }
}
exports.default = Loading;
//# sourceMappingURL=Loading.js.map
