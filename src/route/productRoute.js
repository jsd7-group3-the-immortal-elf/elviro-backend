import express from "express";
import {
	getAllProduct,
	getProductById,
	browseProduct,
	createProduct,
	updateProduct,
	deleteProduct,
} from "../controller/productController.js";
import adminAuthMiddleware from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

router.get("/", browseProduct, getAllProduct);

router.get("/:productId", getProductById);

router.post("/", adminAuthMiddleware, createProduct);

router.patch("/:productId", adminAuthMiddleware, updateProduct);

router.delete("/:productId", adminAuthMiddleware, deleteProduct);

export default router;
