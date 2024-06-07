import { Storage } from "@google-cloud/storage";
import dotenv from "dotenv";

dotenv.config();

const storage = new Storage({
    projectId: process.env.PROJECT_ID,
});

const bucket = storage.bucket(process.env.BUCKET_NAME);
export default bucket;
