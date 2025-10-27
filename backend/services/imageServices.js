import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGE_DIR = process.env.IMAGE_DIR || "images";

function sanitizeFilename(name) {
    return name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
}

async function uploadImage({ buffer, originalname, mimetype }) {
    try {
        const timeStamp = Date.now();
        const random = Math.random().toString(36).slice(2, 8);
        const ext = path.extname(originalname) || ".jpg"; // fallback
        const baseName = path.basename(originalname, ext);
        const safeBase = sanitizeFilename(baseName);
        const newName = `${safeBase}-${timeStamp}-${random}${ext}`;

        const saveDir = path.join(__dirname, "..", IMAGE_DIR);
        await fs.mkdir(saveDir, { recursive: true });

        const filePath = path.join(saveDir, newName);
        await fs.writeFile(filePath, buffer);

        return `/images/${newName}`;
    } catch (error) {
        throw new Error(`Error while saving image: ${error.message}`);
    }
}

export { uploadImage };
