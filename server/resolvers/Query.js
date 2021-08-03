import bcrypt from "bcrypt";
import { GameCardModel as GameCard } from "../schemas/GameCard";

export const resolvers = {
   
        hello: () => "Hello world!",
        getGameCards: async () => {
                let res;
                
                await GameCard.find({}).then(
                  (data) => {
                    res = data;
                  },
                  (err) => {
                  }
                );
                return res;
              },

    
}




