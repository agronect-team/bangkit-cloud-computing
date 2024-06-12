import { nanoid } from "nanoid";
import {
    postSharingModel,
    getAllSharingModel,
    deleteSharingModel,
    getSharingByIdModel,
    updateSharingModel,
} from "../models/discussionModel.js";
import { uploadImageToGCS } from "../middleware/upload.js";
import jwt from "jsonwebtoken";

const postSharing = async (req, res) => {
    const { body } = req;
    const authHeader =
        req.headers["authorization"] || req.headers["Authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
            .status(401)
            .json({ message: "Harap autentikasi terlebih dahulu" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const name = decoded.name;
    const sharing_id = "sharing-" + nanoid(4);
    try {
        let imgUrl = null;
        if (req.file) {
            imgUrl = await uploadImageToGCS(req.file);
        }

        await postSharingModel(sharing_id, body.content, userId, name, imgUrl);

        res.status(201).json({
            status: "success",
            message: "Content shared successfully",
            dataPost: {
                sharing_id,
                name,
                content: body.content,
                imgUrl: imgUrl || null,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "failed",
            message: "Internal server error",
            dataPost: null,
        });
    }
};

const getAllSharing = async (req, res) => {
    try {
        // Mengambil parameter page dan size dari query string
        const page = parseInt(req.query.page);
        const size = parseInt(req.query.size);
        const offset = (page - 1) * size;

        // Memanggil model dengan parameter offset dan size
        const { rows, totalItems } = await getAllSharingModel(offset, size);
        const totalPages = Math.ceil(totalItems / size);

        res.status(200).json({
            status: "success",
            message: "Sharing content found",
            dataGetAll: rows,
            pagination: {
                totalItems,
                totalPages,
                currentPage: page,
                itemsPerPage: size,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "failed",
            message: "Internal server error",
            data: null,
        });
    }
};

const getSharingById = async (req, res) => {
    const sharing_id = req.params.id;
    try {
        const rows = await getSharingByIdModel(sharing_id);

        if (rows.length === 0) {
            return res.status(404).json({
                status: "failed",
                message: "Sharing not found",
                dataById: null,
            });
        }

        const sharing = rows[0];

        res.status(200).json({
            status: "success",
            message: "Sharing found",
            dataById: sharing,
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message,
            dataById: null,
        });
    }
};

const updateSharing = async (req, res) => {
    const sharing_id = req.params.id;
    const { content, imgUrl } = req.body;
    try {
        const result = await updateSharingModel(sharing_id, content, imgUrl);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: "failed",
                message: "Sharing not found or no update performed",
                dataUpdate: null,
            });
        }

        res.status(200).json({
            status: "success",
            message: "Sharing updated successfully",
            dataUpdate: {
                sharing_id,
                content,
                imgUrl,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message,
            dataUpdate: null,
        });
    }
};

const deleteSharing = async (req, res) => {
    const sharing_id = req.params.id;
    try {
        const result = await deleteSharingModel(sharing_id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: "failed",
                message: "Sharing not found or no delete performed",
                dataDelete: null,
            });
        }

        res.status(200).json({
            status: "success",
            message: "Sharing deleted successfully",
            dataDelete: {
                sharing_id,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message,
            dataDelete: null,
        });
    }
};

export {
    postSharing,
    getAllSharing,
    getSharingById,
    updateSharing,
    deleteSharing,
};
