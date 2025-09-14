"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const data_source_1 = require("../typeORM/data-source");
const user_1 = require("../entities/user");
const newspost_1 = require("../entities/newspost");
const faker_1 = require("@faker-js/faker");
async function seed() {
    await data_source_1.AppDataSource.initialize();
    const userRepo = data_source_1.AppDataSource.getRepository(user_1.User);
    const postRepo = data_source_1.AppDataSource.getRepository(newspost_1.Newspost);
    const user = userRepo.create({
        email: "testuser@example.com",
        password: "password",
    });
    await userRepo.save(user);
    const posts = [];
    for (let i = 0; i < 20; i++) {
        const post = postRepo.create({
            header: faker_1.faker.lorem.sentence(5),
            text: faker_1.faker.lorem.paragraphs(2),
            genre: faker_1.faker.helpers.arrayElement([
                newspost_1.Genre.Politic,
                newspost_1.Genre.Business,
                newspost_1.Genre.Sport,
                newspost_1.Genre.Other,
            ]),
            isPrivate: faker_1.faker.datatype.boolean(),
            author: user,
        });
        posts.push(post);
    }
    await postRepo.save(posts);
    console.log("Seed finished: 1 user + 20 news added");
    await data_source_1.AppDataSource.destroy();
}
seed().catch((err) => console.error(err));
