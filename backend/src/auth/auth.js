import express from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import crypto from "crypto";
import { Mongo } from "../database/mongo.js";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

const collectionName = "users";

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, callback) => {
      const user = await Mongo.db
        .collection(collectionName)
        .findOne({ email: email });

      if (!user) {
        return callback(null, false);
      }

      const saltBuffer = user.salt.saltBuffer;
      crypto.pbkdf2(
        password,
        saltBuffer,
        310000, //padrão para criptografia
        16, //padrão para criptografia
        "sha256",
        (err, hashedPassword) => {
          if (err) {
            //se der erro, callback
            return callback(null, false);
          }
          //caso não de erro, continua
          const userPasswsordBuffer = Buffer.from(user.password.Buffer);

          if (!crypto.timingSafeEqual(userPasswsordBuffer, hashedPassword)) {
            //se não for igual as senhas, callback erro
            return callback(null, false);
          }

          const { password, salt, ...rest } = user;

          return callback(null, rest);
        },
      );
    },
  ),
);

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  const checkUser = await Mongo.db
    .collection(collectionName)
    .findOne({ email: req.body.email });

  if (checkUser) {
    //se já existir o usuário com este email, retorna msg de erro
    return res.status(500).send({
      success: false,
      statusCode: 500,
      body: {
        text: "User already exist on database",
      },
    });
  }

  const salt = crypto.randomBytes(16);
  crypto.pbkdf2(
    req.body.password,
    salt,
    310000,
    16,
    "sha256",
    async (err, hashedPassword) => {
      if (err) {
        return res.status(500).send({
          success: false,
          statusCode: 500,
          body: {
            text: "Error on Crypto Password!!",
          },
        });
      }

      //insere no mongodb o usuário com email e senha criptografada
      const result = await Mongo.db.collection(collectionName).insertOne({
        email: req.body.email,
        password: hashedPassword,
      });

      if (result.insertedId) {
        const user = await Mongo.db
          .collection(collectionName)
          .findOne({ _id: new ObjectId(result.insertedId) });

        const token = jwt.sign(user, "secret"); //gera token jwt

        //Usuário registrado com sucesso
        return res.send({
          body: {
            success: true,
            statusCode: 200,
            text: "User registred with success!",
            token,
            user,
            logged: true,
          },
        });
      }
    },
  );
  //fim criptografia novo usuário
});

export default authRouter;
