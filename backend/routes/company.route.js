import express from "express"
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controllers.js";
import {singleUpload} from "../middlewares/multer.js"

const router = express.Router();

router.post("/register",isAuthenticated ,registerCompany);
router.get("/get",isAuthenticated ,getCompany);
router.get("/get/:id",isAuthenticated ,getCompanyById)
router.put("/update/:id",isAuthenticated, singleUpload ,updateCompany);


export default router;