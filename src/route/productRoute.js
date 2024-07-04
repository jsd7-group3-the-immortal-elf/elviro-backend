import express from "express";
import adminAuthMiddleware from "../middleware/adminAuthMiddleware";

const router = express.Router();

router.get("/", async (req, res, next) => {});

router.get("/:productId", async (req, res, next) => {});

router.get("/browse", async (req, res, next) => {});

router.post("/", adminAuthMiddleware, async (req, res, next) => {});

router.patch("/:productId", adminAuthMiddleware, async (req, res, next) => {});

router.delete("/:productId", adminAuthMiddleware, async (req, res, next) => {});

export default router;
