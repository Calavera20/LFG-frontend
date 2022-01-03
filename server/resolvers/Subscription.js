import { PubSub, withFilter } from "graphql-subscriptions";

const pubsub = new PubSub();
export const resolvers = {

  addMessage: (root, { message }) => {
    const channel = channels.find(channel => channel.id ===
  message.channelId);
    if(!channel)
      throw new Error("Channel does not exist");  
    const newMessage = { text: message.text, creator: message.creator, creationDate: message.creationDate, channelId: message.channelId };
    channel.messages.push(newMessage);  
    pubsub.publish('messageAdded', { messageAdded: newMessage, channelId: message.channelId });  
    return newMessage;
  },

  Subscription: {
messageAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('messageAdded'),
        (payload, variables) => {
          return payload.channelId === variables.channelId;
        }
      )
    }
  }
};
