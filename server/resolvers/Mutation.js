import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel as User } from "../schemas/User";

import { GroupModel as Group } from "../schemas/Group";
import {ChatModel as Chat } from "../schemas/Chat"
import { UserInputError } from "apollo-server-express";
import AuthPayload from "../classes/authPayload";
import { FriendsListModel as FriendsList } from "../schemas/FriendsList";

const nodemailer = require('nodemailer');

export const resolvers = {
  signup: async (parent, { username, email, password }) => {
    const hash = await bcrypt.hash(password, 10);
    let res;
    await new User({ username: username, email: email, password: hash }).save().then(
      async (user) => {
        console.log(username)
        res = username;
        await new FriendsList({userId: user.id}).save().then(()=>{},
        (err)=>{
          res = err.code;
        })
      },
      (err) => {
        console.log(err)
        res = err.code;
      }
    );
//dodaj friendsliste
//dodaj sprawdzanie emaila
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
          //dokończenie jwt
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

  },
  friendInvite: async  (parent, { userData, inviteeData}) =>{
    //wsadz usera do pending invitee
    //wsadz invitee do invited usera
    console.log(userData)
    
    await FriendsList.updateOne({userId: userData.userId}, {$push: {invited: inviteeData}}).then(
      async () => {
        await FriendsList.updateOne({userId: inviteeData.userId}, {$push: {pending: userData}})
      }
    );

  },
  acceptFriendInvite: async  (parent, { userData, inviteeData }) =>{
    //wsadz invitee do friends usera i na odwrót
    console.log(userData)
    console.log(inviteeData)
    await FriendsList.updateOne({userId: userData.userId}, {$pull: {pending: {userId: inviteeData.userId}}}).then( 
      async (d) => {
        console.log(d)
        await FriendsList.updateOne({userId: userData.userId}, {$push: {friends: inviteeData}}).then(
          async (d) => {console.log(d)
            await FriendsList.updateOne({userId: inviteeData.userId}, {$pull: {invited: {userId: userData.userId}}}).then(
              async (d) => {console.log(d)
                await FriendsList.updateOne({userId: inviteeData.userId}, {$push: {userData}})
      })})}
    );
  },
  emailInvite: async (parent,  { userData, inviteeData }) =>{
    //nodemailer 
    //wyślij zapro na maila w danych invitee że user go zaprasza
    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      ${userData}
    </ul>
    <h3>Message</h3>
    <p>${inviteeData}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    name: 'spencer.kemmer38@ethereal.email',
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
        user: 'spencer.kemmer38@ethereal.email',
        pass: 'RHjZwje2PGJ62zWXXG'
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Nodemailer Contact" <spencer.kemmer38@ethereal.email>', // sender address
      to: `${inviteeData.email}`, // list of receivers
      subject: 'Node Contact Request', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      
  });
    
  }
};
