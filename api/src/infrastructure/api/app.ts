import fastify, { FastifyInstance } from "fastify";
import { Sequelize } from "sequelize-typescript";
import { userRoutesPublic, userRoutesPrivate } from "../routes/user.route"
import UserModel from "../../modules/user/model/user.model"

export const app: FastifyInstance = fastify();

app.register(userRoutesPublic);
app.register(userRoutesPrivate);

export let sequelize: Sequelize;

async function setupDb() {
    sequelize = new Sequelize({
        dialect: "mysql",
        host: process.env.HOST_DB,
        database: "skeelo",
        port: 3306,
        username: process.env.USERNAME_DB,
        password: process.env.PASSWORD_DB,
        logging: false
    });
    sequelize.addModels([UserModel]);
    await sequelize.sync();
}

setupDb();


