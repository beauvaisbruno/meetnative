"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.profileFields = graphql_tag_1.default`
  fragment profileFields on Profile {
    id
    age
    pseudo
    profession
    city
    avatar
    isMale
    lat
    lon
    langsToLearn
    langsToTeach
  }
`;
exports.lastMessagesFields = graphql_tag_1.default`
  fragment lastMessagesFields on LastMessage {
    id
    author {
      ...profileFields
    }
    recipient {
      id
    }
    lastReadTime
    lastMsgReceived
    lastMsgReceivedTime
  }
  ${exports.profileFields}
`;
//# sourceMappingURL=partnersTypes.js.map
