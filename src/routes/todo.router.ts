import { Router } from "express";
import controller from "../controllers/todo.controller";

const router: Router = Router();

// Basic routing
router.get("/todo", controller.getAll);
router.get("/todo/:id",  controller.getById);
router.post("/todo",  controller.add);
router.put("/todo",  controller.update);
router.delete("/todo/:id",  controller.delete);

// Custom routing
router.delete("/todo/removeTasksByUser/:user",  controller.deleteByUserName);

export default router;