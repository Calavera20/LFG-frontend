import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel as User } from "../schemas/User";
import { db } from "../dbConnector";

export const resolvers = {
  signup: async (parent, { username, password }) => {
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({ username: username, password: hash });
    newUser.save((err) => {
      if (err) console.log(err);
    });
    return hash;
  },
  login: async (parent, { username, password }) => {
    const user = await User.findOne({ username: username });

    return jwt.sign({ "http://localhost:4200/": { user } }, "TODO", {
      algorithm: "HS256"
    });
  },
};
