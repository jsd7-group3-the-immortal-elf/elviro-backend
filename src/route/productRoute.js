import express from "express";
import {
	getAllProduct,
	getProductById,
	browseProduct,
	createProduct,
	updateProduct,
	deleteProduct,
} from "../controller/productController.js";

// import adminAuthMiddleware from "../middleware/adminAuthMiddleware";

const router = express.Router();

router.get("/", browseProduct, getAllProduct);

router.get("/:productId", getProductById);

// router.get("/:id/browse", browseProduct);

// adminAuthMiddleware
router.post("/", createProduct);

// adminAuthMiddleware
router.patch("/:productId", updateProduct);

// adminAuthMiddleware
router.delete("/:productId", deleteProduct);

export default router;
