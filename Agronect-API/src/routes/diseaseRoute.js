import express from "express";
import { diseaseValidate } from "../validation/plantdiseaseValidate.js";
import { validate } from "../middleware/validate.js";
import auth from "../middleware/authentication.js";
import {
    getByIdDisease,
    getDisease,
    updateDisease,
    deleteDisease,
    postDisease,
} from "../controller/diseaseController.js";

const router = express.Router();

router.get("/disease", auth, getDisease);

// GET DATA BY ID
router.get("/disease/:disease_id", auth, getByIdDisease);

// POST DATA
router.post("/disease", auth, validate(diseaseValidate), postDisease);

// UPDATE DATA
router.put(
    "/disease/:disease_id",
    auth,
    validate(diseaseValidate),
    updateDisease
);

// DELETE DATA
router.delete("/disease/:disease_id", auth, deleteDisease);

export default router;
