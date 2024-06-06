import axios from "axios";
import FormData from "form-data";
import { Storage } from "@google-cloud/storage";
import {
    postPredictModel,
    getPlantId,
    getDiseaseId,
} from "../models/predictModel.js";
import { nanoid } from "nanoid";

const storage = new Storage({
    projectId: "agronect-api",
});

const predictionPlant = async (req, res, plant) => {
    try {
        const user_id = req.user_id;
        const prediction_id = nanoid(16);
        const dates = new Date();

        if (!req.file) {
            return res.status(400).json({
                status: "failed",
                message: "Image not found",
            });
        }
        const { buffer, mimetype } = req.file;

        const formData = new FormData();
        formData.append("file", buffer, {
            filename: "file",
            contentType: mimetype,
        });

        const config = {
            headers: {
                "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            },
        };

        const response = await axios.post(
            `http://localhost:3000/predict/potato`, // Ensure the URL uses http
            formData,
            config
        );

        const predict = response.data;

        const [plant_id] = await getPlantId(plant);
        const [disease_id] = await getDiseaseId(predict.prediction);

        if (response.status === 200 && predict.prediction !== "Non Potato") {
            const extension = mimetype.split("/")[1];
            const imageName = `${nanoid()}.${extension}`;
            const bucketName = "agronect-prediction";
            const bucket = storage.bucket(bucketName);
            const file = bucket.file(imageName);
            await file.save(buffer, {
                metadata: {
                    contentType: mimetype,
                },
            });

            await file.makePublic();

            const imageUrl = `https://storage.googleapis.com/${bucketName}/${imageName}`;

            const [data] = await postPredictModel(
                prediction_id,
                dates,
                predict,
                plant_id,
                disease_id,
                user_id,
                imageUrl
            );
            res.json({
                code: 200,
                status: "OK",
                message: "add predict success",
                data: {
                    id: prediction_id,
                    confidence: predict.confidence,
                    prediction: predict.prediction,
                },
            });
        } else {
            res.json({
                code: 200,
                status: "OK",
                message: "add predict success",
                data: {
                    confidence: predict.confidence,
                    prediction: predict.prediction,
                },
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            status: "INTERNAL SERVER ERROR",
            message: error.message,
            data: req.body,
        });
    }
};

export default predictionPlant;
