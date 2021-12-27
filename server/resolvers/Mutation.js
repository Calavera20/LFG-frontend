import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel as User } from "../schemas/User";

import { GroupModel as Group } from "../schemas/Group";
import {ChatModel as Chat } from "../schemas/Chat"
import { db } from "../dbConnector";
import { UserInputError } from "apollo-server-express";
import AuthPayload from "../classes/authPayload";
import UserClass from "../classes/user";

export const resolvers = {
  signup: async (parent, { username, email, password }) => {
    const hash = await bcrypt.hash(password, 10);
    let res;
    await new User({ username: username, email: email, password: hash }).save().then(
      () => {
        console.log(username)
        res = username;
      },
      (err) => {
        console.log(err)
        res = err.code;
      }
    );

    if (res == username) {
      return res;
    } else {
      if (res == 11000) return new UserInputError("username is not available");
    }
  },
  login: async (parent, { username, password }) => {
    let res;
    await User.findOne({ username: username }).then(
      async (user) => {
        const match = await bcrypt.compare(password, user.password);
        console.log(match);
        console.log(user.password)
        if (match) {
          res = new AuthPayload(
            jwt.sign({ "http://localhost:4200/": { user } }, "TODO", {
              algorithm: "HS256",
            }),
            user
          );
        } else {
          res = new UserInputError("password is incorrect");
        }
      },
      (err) => {
        res = new UserInputError(err.code);
      }
    );

    if (res.user) {
      return res;
    } else {
      return new UserInputError("username not found");
    }
  },
  createGroup: async (parent, { description, creator, playerLimit, gameId }) => {
    let res, err;
    //todo tworzenie nowego chatu po stronie mongo i połączenie id
    let creationDate= Date.now().toString();
    await new Group({ description: description, creator: creator, playerLimit: playerLimit, gameId: gameId, members: [creator], isOpen: true, currentSize: 1, creationDate:creationDate}).save().then(
      async (newGroup) => {
        console.log(newGroup)
        res = newGroup.id;
        await new Chat({groupId: res}).save();
      },
      (err) => {
        err = err;
        console.log(err)
        res = err.code;
      }
    );

    if (err) {
      return new UserInputError(res)
    } else {
      return res
    }

  }
};
