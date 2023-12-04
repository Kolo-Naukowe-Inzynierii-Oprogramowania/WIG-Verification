import { connect } from "mongoose";
import Config from "./config";

export const connectDatabase = async () => {
    await connect(Config.MONGODB_URI);
}