"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var firebase_1 = require("./firebase");
var graphql_subscriptions_1 = require("graphql-subscriptions");
// @ts-ignore
var graphql_type_long_1 = __importDefault(require("graphql-type-long"));
// @ts-ignore
var graphql_type_json_1 = __importDefault(require("graphql-type-json"));
var withUnsubscribe_1 = require("./withUnsubscribe");
var apollo_server_1 = require("apollo-server");
var pubsub = new graphql_subscriptions_1.PubSub();
exports.resolvers = {
    JSON: graphql_type_json_1.default,
    Long: graphql_type_long_1.default,
    Mutation: {
        setLastMessageRead: function (_, _a, _b) {
            var recipientId = _a.recipientId, authorId = _a.authorId;
            var user = _b.user;
            return __awaiter(this, void 0, void 0, function () {
                var message;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (recipientId !== user.uid)
                                throw new Error("setLastMessageRead, Not authorized request");
                            return [4 /*yield*/, firebase_1.getLastMessage(recipientId, authorId)];
                        case 1:
                            message = (_c.sent());
                            console.log("message: ", message);
                            return [4 /*yield*/, firebase_1.updateMessage(message.id, {
                                    lastReadTime: Date.now()
                                })];
                        case 2:
                            if (!(_c.sent()))
                                throw Error("setLastMessageRead, writing error");
                            return [4 /*yield*/, firebase_1.getLastMessageById(message.id)];
                        case 3: return [2 /*return*/, _c.sent()];
                    }
                });
            });
        }
    },
    Query: {
        getLastMessages: function (_, _a, context) {
            var recipientId = _a.recipientId;
            return __awaiter(this, void 0, void 0, function () {
                var user, objects, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            user = context.user;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            if (recipientId !== user.uid)
                                throw new apollo_server_1.AuthenticationError("LastMessages: Not authorized request");
                            return [4 /*yield*/, firebase_1.getLastMessages(recipientId)];
                        case 2:
                            objects = _b.sent();
                            return [2 /*return*/, objects];
                        case 3:
                            error_1 = _b.sent();
                            console.log("error: ", error_1);
                            throw new apollo_server_1.ApolloError(error_1);
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
    },
    LastMessage: {
        recipient: function (lastMessage) {
            return __awaiter(this, void 0, void 0, function () {
                var recipient;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, firebase_1.getProfile(lastMessage.recipientId)];
                        case 1:
                            recipient = _a.sent();
                            return [2 /*return*/, (recipient || new apollo_server_1.ValidationError("User ID not found"))];
                    }
                });
            });
        },
        author: function (lastMessage) {
            return __awaiter(this, void 0, void 0, function () {
                var author;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, firebase_1.getProfile(lastMessage.authorId)];
                        case 1:
                            author = _a.sent();
                            return [2 /*return*/, author || new apollo_server_1.ValidationError("User ID not found")];
                    }
                });
            });
        }
    },
    Subscription: {
        getLastMessagesSync: {
            subscribe: function (payload, args, context) {
                try {
                    var recipientId_1 = args.recipientId;
                    if (recipientId_1 !== context.user.uid)
                        throw new apollo_server_1.AuthenticationError("getLastMessagesSync: Not authorized request");
                    var unsubscriber = firebase_1.firestore
                        .collection("lastMessages")
                        .where("recipientId", "==", recipientId_1)
                        .onSnapshot(function (querySnapshot) {
                        var lastMessages = [];
                        querySnapshot.forEach(function (doc) {
                            lastMessages.push(doc.data());
                        });
                        console.log("onSnapshot, lastMessages: ", lastMessages);
                        pubsub.publish("getLastMessagesSync." + recipientId_1, {
                            getLastMessagesSync: lastMessages
                        });
                    });
                    return withUnsubscribe_1.withUnsubscribe(pubsub.asyncIterator("getLastMessagesSync." + recipientId_1), unsubscriber);
                }
                catch (error) {
                    console.log("error: ", error);
                    throw new apollo_server_1.ApolloError(error);
                }
            }
        }
    }
};
