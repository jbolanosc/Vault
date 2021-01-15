import { createConnection } from "typeorm";

export const connection = () =>
  createConnection()
    .then(async (connection) => {
      console.log("Database connected");
    })
    .catch((error) => console.log(error));
