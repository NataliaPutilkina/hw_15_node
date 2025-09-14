
import "reflect-metadata";
import { AppDataSource } from "../typeORM/data-source";
import { User } from "../entities/user";
import { Newspost, Genre } from "../entities/newspost";
import { faker } from "@faker-js/faker";

async function seed() {
  await AppDataSource.initialize();

  const userRepo = AppDataSource.getRepository(User);
  const postRepo = AppDataSource.getRepository(Newspost);

  
  const user = userRepo.create({
    email: "testuser@example.com",
    password: "password", 
  });
  await userRepo.save(user);

  
  const posts: Newspost[] = [];
  for (let i = 0; i < 20; i++) {
    const post = postRepo.create({
      header: faker.lorem.sentence(5), 
      text: faker.lorem.paragraphs(2),
      genre: faker.helpers.arrayElement([
        Genre.Politic,
        Genre.Business,
        Genre.Sport,
        Genre.Other,
      ]),
      isPrivate: faker.datatype.boolean(),
      author: user,
    });
    posts.push(post);
  }

  await postRepo.save(posts);

  console.log("Seed finished: 1 user + 20 news added");
  await AppDataSource.destroy();
}

seed().catch((err) => console.error(err));
