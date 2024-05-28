import dbPool from "../config/connection.js";

const getPlantId = (plant) => {
    const SQLQuery = "SELECT plant_id FROM plant WHERE name = ?";
    const values = [plant];
    return dbPool.execute(SQLQuery, values);
};

const getDiseaseId = (disease) => {
    const SQLQuery = "SELECT disease_id FROM disease WHERE name = ?";
    const values = [disease];
    return dbPool.execute(SQLQuery, values);
};

const postPredictModel = (
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
        plant_id[0].plant_id,
        disease_id[0].disease_id,
        imageUrl,
        predict.confidence,
        dates,
    ];

    return dbPool.execute(SQLQuery, values);
};

export { getPlantId, getDiseaseId, postPredictModel };
