import express from "express";

import { getMessage } from "../controllers/apiController";

const router = express.Router();

router.get("/", getMessage);

export default router;