import dbPool from "../config/connection.js";

const getDiseaseModel = () => {
    const SQLQuery = "SELECT * FROM disease";

    return dbPool.execute(SQLQuery);
};

const getByIdDiseaseModel = (disease_id) => {
    const SQLQuery = "SELECT * From disease WHERE disease_id=?";
    const values = [disease_id];

    return dbPool.execute(SQLQuery, values);
};

// post Data
const postDiseaseModel = (body, disease_id) => {
    const SQLQuery =
        "INSERT INTO disease (disease_id, name, `desc`, solution) VALUES (?, ?, ?, ?)";
    const values = [disease_id, body.name, body.desc, body.solution];

    console.log(SQLQuery);
    return dbPool.execute(SQLQuery, values);
};

const updateDiseaseModel = (body, disease_id) => {
    const SQLQuery =
        "UPDATE disease SET name=?, `desc`=?, solution=? WHERE disease_id=?";
    const values = [body.name, body.desc, body.solution, disease_id];

    return dbPool.execute(SQLQuery, values);
};

const deleteDiseaseModel = (disease_id) => {
    const SQLQuery = "Delete From disease WHERE disease_id=?";
    const values = [disease_id];

    return dbPool.execute(SQLQuery, values);
};
export {
    getDiseaseModel,
    getByIdDiseaseModel,
    postDiseaseModel,
    updateDiseaseModel,
    deleteDiseaseModel,
};
