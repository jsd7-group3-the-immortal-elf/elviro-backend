import express from "express";
import {
	getAllProduct,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
} from "../controller/productController.js";

// import adminAuthMiddleware from "../middleware/adminAuthMiddleware";

const router = express.Router();

router.get("/", getAllProduct);

router.get("/:productId", getProductById);

router.get("/browse", async (req, res, next) => {});

// adminAuthMiddleware
router.post("/", createProduct);

// adminAuthMiddleware
router.patch("/:productId", updateProduct);

// adminAuthMiddleware
router.delete("/:productId", deleteProduct);

export default router;
