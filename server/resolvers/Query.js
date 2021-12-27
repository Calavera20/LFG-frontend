import bcrypt from "bcrypt";
import { GameCardModel as GameCard } from "../schemas/GameCard";
import { GroupModel as Group } from "../schemas/Group";

export const resolvers = {
  hello: () => "Hello world!",
  getGameCards: async () => {
    let res;

    await GameCard.find({}).then(
      (data) => {
        res = data;
      },
      (err) => {}
    );
    return res;
  },
  getGroupsForGameId: async (parent, { gameId }) => {
    let res;
    console.log(gameId);
    await Group.find({gameId: gameId}).sort({ creationDate: -1 }).then(
      (data) => {
        res = data;
        
      },
      (err) => {}
    );
    console.log(res);
    return res;
  },
};
