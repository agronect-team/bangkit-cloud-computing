import { Storage } from "@google-cloud/storage";
import multer from "multer";
import dotenv from "dotenv";
import { nanoid } from "nanoid";

dotenv.config();

let storage;

if (process.env.NODE_ENV === "production") {
    storage = new Storage();
} else {
    storage = new Storage({
        projectId: process.env.PROJECT_ID,
        keyFilename: process.env.KEY_FILENAME,
    });
}

const bucketName = process.env.BUCKET_NAME;
const bucket = storage.bucket(bucketName);

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

const uploadImageToGCS = (file) => {
    return new Promise((resolve, reject) => {
        const uniqueCode = nanoid(4);
        const fileName = `sharing-image-${uniqueCode}`;
        const blob = bucket.file(`Sharing_Image/${fileName}`);
        const blobStream = blob.createWriteStream({
            resumable: false,
        });

        blobStream.on("finish", () => {
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            resolve(publicUrl);
        });

        blobStream.on("error", (err) => {
            reject(err);
        });

        blobStream.end(file.buffer);
    });
};

const uploadProfilePhotoToGCS = (file) => {
    return new Promise((resolve, reject) => {
        const uniqueCode = nanoid(4);
        const fileName = `profile-photo-${uniqueCode}`;
        const blob = bucket.file(`Photo-Profile_Image/${fileName}`);
        const blobStream = blob.createWriteStream({
            resumable: false,
        });

        blobStream.on("finish", () => {
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            resolve(publicUrl);
        });

        blobStream.on("error", (err) => {
            reject(err);
        });

        blobStream.end(file.buffer);
    });
};

export { upload, uploadImageToGCS, uploadProfilePhotoToGCS };
