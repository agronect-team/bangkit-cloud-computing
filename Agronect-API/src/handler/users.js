import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import {
    collection,
    doc,
    getDocs,
    getDoc,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import { db, auth } from "../../db/firebase-config.js";
import { sendPasswordResetEmail } from "firebase/auth";
import { Storage } from "@google-cloud/storage";
import dotenv from "dotenv";

dotenv.config();

const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    keyFilename: "/db/serviceAccount.json",
});

export const register = async (req, res) => {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !phone || !password) {
        return res.status(400).json({ message: "Fields cannot be empty" });
    }
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;
        const userDoc = doc(db, "users", user.uid);
        await setDoc(userDoc, {
            name,
            email,
            phone,
            uid: user.uid,
            imgUrl: "",
            profilePicture: "",
        });
        res.status(200).json({
            success: true,
            message: "Register Success",
        });
    } catch (error) {
        if (error.code === "auth/email-already-in-use") {
            return res.status(400).json({
                succes: false,
                message: "Email already in use",
            });
        }
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Fields cannot be empty" });
    }
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;
        res.status(200).json({
            success: true,
            message: "Login Success",
            data: {
                uid: user.uid,
                email: user.email,
            },
        });
    } catch (error) {
        if (error.code === "auth/wrong-password") {
            return res.status(400).json({
                succes: false,
                message: "Wrong Password",
            });
        } else if (error.code === "auth/user-not-found") {
            return res.status(400).json({
                succes: false,
                message: "User Not Found",
            });
        } else if (error.code === "auth/too-many-requests") {
            return res.status(400).json({
                succes: false,
                message: "Too Many Requests",
            });
        } else {
            return res.status(404).json({
                succes: false,
                message: error.message,
            });
        }
    }
};

export const logout = async (req, res) => {
    try {
        await signOut(auth);
        return res.status(200).json({ msg: "Sign Out Success" });
    } catch (error) {
        console.log("Error Sign Out : ", error);
        return res.status(500).json({ msg: "Sign Out Failed" });
    }
};

export const resetPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Fields cannot be empty" });
    }
    try {
        await sendPasswordResetEmail(auth, email);
        res.status(200).json({
            success: true,
            message: "Reset Password Success",
        });
    } catch (error) {
        if (error.code === "auth/user-not-found") {
            return res.status(400).json({
                succes: false,
                message: "User Not Found",
            });
        }
    }
};

export const uploadProfilePicture = async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({ message: "No File Found" });
            return;
        }
        const imageFile = req.file;
        const bucket = storage.bucket("agronect-img-profile");
        const fileName = Date.now() + "-" + imageFile.originalname;
        const fileUpload = bucket.file(fileName);

        const stream = fileUpload.createWriteStream({
            metadata: {
                contentType: imageFile.mimetype,
            },
        });
        stream.on("error", (error) => {
            res.status(500).send("Internal Server Error");
        });

        stream.on("finish", async () => {
            const [url] = await fileUpload.getSignedUrl({
                action: "read",
                expires: "03-09-2025",
            });
            res.status(200).json({
                status: "Success",
                message: "Upload Success",
                fileName,
                url,
            });
        });
        stream.end(imageFile.buffer);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};

export const uploadProfilePictureById = async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({ message: "No File Found" });
            return;
        }
        const { uid } = req.body;
        const imageFile = req.file;
        const bucket = storage.bucket("agronect-img-profile");
        const fileName = Date.now() + "-" + imageFile.originalname;
        const fileUpload = bucket.file(fileName);

        const stream = fileUpload.createWriteStream({
            metadata: {
                contentType: imageFile.mimetype,
            },
        });
        stream.on("error", (error) => {
            res.status(500).send("Internal Server Error");
        });

        stream.on("finish", async () => {
            const [url] = await fileUpload.getSignedUrl({
                action: "read",
                expires: "03-09-2025",
            });

            try {
                console.log("uid", uid);
                const userDoc = doc(db, "users", uid);

                await updateDoc(userDoc, { imgUrl: url, profilePicture: url });
                console.log("Profile picture URL updated in the database");
            } catch (error) {
                console.error(
                    "Error updating profile picture URL in the database:",
                    error
                );
            }

            res.status(200).json({
                status: "Success",
                message: "Upload Success",
                fileName,
                url,
            });
        });
        stream.end(imageFile.buffer);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};

export const updateProfile = async (req, res) => {
    const { uid, name, email, phone, imgUrl } = req.body;
    if (!uid || !name || !email || !phone) {
        return res.status(400).json({ message: "Fields cannot be empty" });
    }
    try {
        const userDoc = doc(db, "users", uid);
        await updateDoc(userDoc, {
            name,
            email,
            phone,
            imgUrl,
        });
        res.status(200).json({
            success: true,
            message: "Update Success",
        });
    } catch (error) {
        console.log(error);
    }
};

export const getUsers = async (req, res) => {
    try {
        const UsersCollection = collection(db, "users");
        const userSnapshot = await getDocs(UsersCollection);
        const users = [];

        userSnapshot.forEach((doc) => {
            const usersData = doc.data();
            users.push({ ...usersData });
        });

        res.status(200).json({
            success: true,
            message: "Get Users Success",
            data: users,
        });
    } catch (error) {
        console.log("Error getting users", error);
        res.status(500).json({
            success: false,
            message: "Get Users Failed",
        });
    }
};

export const getUserUid = async (req, res) => {
    const { uid } = req.params;
    try {
        const userDoc = doc(db, "users", uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
            const data = docSnap.data();
            return res.status(200).json({
                success: true,
                msg: "Get User Success",
                data,
            });
        }
        return res.status(404).json({
            success: false,
            msg: "Users Not Found",
        });
    } catch (error) {
        console.log("Error mendapatkan data user:", error);
        return res.status(500).json({
            success: false,
            msg: "Internal Server Error",
        });
    }
};
