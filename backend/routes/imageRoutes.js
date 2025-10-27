import { Router } from "express";
import multer from "multer";
import authorize from "../middleware/authorize.js";
import isSeller from "../middleware/roles/isSeller.js";
import { saveImage } from "../controllers/imageController.js";

//Receiving the multipart image
const upload = multer({ storage: multer.memoryStorage() });

//

const router = Router();

router.post("/", authorize, isSeller, upload.single("image"), saveImage);

export default router;
