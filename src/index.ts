import App from "./app";
import { connection } from "./db/connection";

async function main() {
  connection();
  const app = new App();
  await app.listen();
}

main();
