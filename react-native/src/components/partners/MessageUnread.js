"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Mutation_1 = __importDefault(require("react-apollo/Mutation"));
const utilsUi_1 = require("../../utils/utilsUi");
const native_base_1 = require("native-base");
const react_1 = __importDefault(require("react"));
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const partnersTypes_1 = require("./partnersTypes");
const PartnersList_1 = require("./PartnersList");
const lang_1 = __importDefault(require("./lang"));
const custom_1 = __importDefault(require("../../config/native-base-theme/variables/custom"));
exports.setLastMessageRead = graphql_tag_1.default `
  mutation setLastMessageRead($recipientId: ID!, $authorId: ID!) {
    setLastMessageRead(recipientId: $recipientId, authorId: $authorId) {
      ...lastMessagesFields
    }
  }
  ${partnersTypes_1.lastMessagesFields}
`;
exports.MessageUnread = ({ size, userProfile, contactProfile, message, testID, stories }) => (react_1.default.createElement(Mutation_1.default, { mutation: exports.setLastMessageRead, 
    // Unnecessary, for reference only, ui is automatically updated because:
    // (1) old and new ids are matching, so update is auto
    // (2) getLastMessage use subscription
    update: (cache, { data: { setLastMessageRead: { lastReadTime } } }) => {
        cache.writeFragment({
            id: contactProfile.id + "-" + userProfile.id,
            fragment: graphql_tag_1.default `
          fragment _ on LastMessage {
            lastReadTime
          }
        `,
            data: { lastReadTime }
        });
    }, refetchQueries: () => [
        {
            query: PartnersList_1.getLastMessages,
            variables: {
                userId: userProfile.id
            }
        }
    ] }, (setLastMessageRead, { data, error, loading }) => {
    if (stories && stories.loading)
        loading = stories.loading;
    return (react_1.default.createElement(native_base_1.View, { style: Object.assign({ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }, utilsUi_1.noMarPad) },
        react_1.default.createElement(native_base_1.Text, { style: { color: custom_1.default.brandDanger, fontSize: size } }, lang_1.default("Unread message")),
        react_1.default.createElement(native_base_1.Button, { block: true, transparent: true, onPress: () => {
                setLastMessageRead({
                    variables: {
                        recipientId: userProfile.id,
                        authorId: contactProfile.id
                    },
                    optimisticResponse: {
                        setLastMessageRead: Object.assign({}, message, { lastReadTime: Date.now() })
                    }
                });
            }, testID: "setLastMessageReadBtn", style: Object.assign({}, utilsUi_1.noMarPad, { height: size + 5, marginRight: 5 }) },
            loading || (react_1.default.createElement(native_base_1.Icon, { name: "close-circle-outline", type: "MaterialCommunityIcons", style: Object.assign({}, utilsUi_1.noMarPad, { fontSize: size }) })),
            loading && (react_1.default.createElement(native_base_1.Icon, { name: "spinner", type: "EvilIcons", style: Object.assign({}, utilsUi_1.noMarPad, { fontSize: size }) })))));
}));
