import bcrypt from "bcrypt";
import { UserModel as User} from "../schemas/User";

export const resolvers = {
   
        signup: async (parent, {username, password}) =>{
            const hash = await bcrypt.hash(password, 10);
            const newUser = new User({username: username, password: hash})
            newUser.save((err) => {
                if(err) console.log(err)
            })
            return hash

        },
        login: async (parent, {username, password}) =>{
            
        }
    
}




