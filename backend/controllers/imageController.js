import { uploadImage } from "../services/imageServices.js";

async function saveImage(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No image uploaded" });
        }

        const { originalname, mimetype, buffer } = req.file;

        const imagePath = await uploadImage({ buffer, originalname, mimetype });

        return res.status(200).json({
            message: "Image uploaded successfully",
            image: imagePath,
        });
    } catch (error) {
        console.error("Image upload failed:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export { saveImage };
