import Message from "../classes/message"

var mongoose = require("mongoose");

//Define a schema
var Schema = mongoose.Schema;

var ChatModelSchema = new Schema({ groupId: String, messages: [Message] });

export const GroupModel = mongoose.model("ChatModel", ChatModelSchema, "Chats");