import { connectDatabase } from "./database";
import Server from "./server";
import Bot from "./bot";

(async () => {
    await connectDatabase();
    console.log("Connected to database!");

    const server = new Server();
    await server.start();
    console.log("Server is ready!");

    await Bot();
    console.log("Bot is ready!");
})();