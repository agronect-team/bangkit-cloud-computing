import dbPool from "../config/connection.js"


const getPlantModel = () => {
    const SQLQuery = "SELECT * FROM plant"

    return dbPool.execute(SQLQuery)
}

const getByIdPlantModel = (plant_id) => {
    const SQLQuery = "SELECT * From plant WHERE plant_id=?"
    const values = [plant_id]

    return dbPool.execute(SQLQuery, values)
}

const postPlantModel = (body, plant_id) => { //tambahi dates
    const SQLQuery = "INSERT INTO plant (plant_id, name, `desc`) VALUES (?, ?, ?)"
    const values = [plant_id, body.name, body.desc] //untuk create_at dan update_at tambahi dates 2

    console.log(SQLQuery)
    return dbPool.execute(SQLQuery, values)
}

const updatePlantModel = (body, plant_id) => { //tambahi update_at
    const SQLQuery = "UPDATE plant SET name=?, `desc`=? WHERE plant_id=?" //cukup updated_at
    const values = [body.name, body.desc, plant_id] //tambahi updated_at

    return dbPool.execute(SQLQuery, values)
}

const deletePlantModel = (plant_id) => {
    const SQLQuery = "Delete From plant WHERE plant_id=?"
    const values = [plant_id]

    return dbPool.execute(SQLQuery, values)
}
export {
    getPlantModel,
    getByIdPlantModel,
    postPlantModel,
    updatePlantModel,
    deletePlantModel
}