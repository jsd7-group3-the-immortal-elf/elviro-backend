import express from "express";

import {
	getAllProduct,
	getProductById,
	deleteProduct,
} from "../controller/productController.js";

// import adminAuthMiddleware from "../middleware/adminAuthMiddleware";

const router = express.Router();

router.get("/", getAllProduct);

router.get("/:productId", getProductById);

router.get("/browse", async (req, res, next) => {});

// router.post("/", adminAuthMiddleware, async (req, res, next) => {});

// router.patch("/:productId", adminAuthMiddleware, async (req, res, next) => {});

// adminAuthMiddleware
router.delete("/:productId", deleteProduct);

export default router;
