import { config } from "dotenv";
import * as path from "path";

config({ path: path.join(__dirname, "../.env") });

export default abstract class Config {
    public static readonly MONGODB_URI: string = process.env.MONGO_URI!;

    public static readonly PORT: number = Number(process.env.PORT) || 3000;

    public static readonly DISCORD_BOT_TOKEN: string = process.env.DISCORD_BOT_TOKEN!;
}
