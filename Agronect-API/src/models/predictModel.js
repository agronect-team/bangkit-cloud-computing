import dbPool from "../config/connection.js";

const getPlantId = async (plant) => {
    const SQLQuery = "SELECT plant_id FROM plant WHERE name = ?";
    const [rows] = await dbPool.execute(SQLQuery, [plant]);
    return rows;
};

const getDiseaseId = async (disease) => {
    const SQLQuery = "SELECT disease_id FROM disease WHERE name = ?";
    const [rows] = await dbPool.execute(SQLQuery, [disease]);
    return rows;
};

const postPredictModel = async (
    prediction_id,
    dates,
    predict,
    plant_id,
    disease_id,
    user_id,
    imageUrl
) => {
    const SQLQuery =
        "INSERT INTO prediction (prediction_id, user_id, plant_id, disease_id, img_url, accuration, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [
        prediction_id,
        user_id,
        plant_id.plant_id,
        disease_id.disease_id,
        imageUrl,
        predict.confidence,
        dates,
    ];
    const [result] = await dbPool.execute(SQLQuery, values);
    return result;
};

export { getPlantId, getDiseaseId, postPredictModel };
