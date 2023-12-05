import { config } from "dotenv";
import * as path from "path";

config({ path: path.join(__dirname, "../.env") });

export default abstract class Config {
    public static readonly MONGODB_URI: string = process.env.MONGODB_URI!;

    public static readonly PORT: number = Number(process.env.PORT) || 3000;

    public static readonly DISCORD_BOT_TOKEN: string = process.env.DISCORD_BOT_TOKEN!;

    public static readonly MAIL_HOST: string = process.env.MAIL_HOST!;

    public static readonly MAIL_PORT: number = Number(process.env.MAIL_PORT!);

    public static readonly MAIL_USER: string = process.env.MAIL_USER!;
}
