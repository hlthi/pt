import express from "express";
import v1_auth_mw from "./v1_auth";
import { login_handler } from "./login_handler";
import { fish_post_handler } from "./fish_post_handler";
import { fish_get_all_handler } from "./fish_get_all_handler";
import { fish_put_handler } from "./fish_put_handler";
import { fish_delete_handler } from "./fish_delete_handler";
import { stock_get_handler } from "./stock_get_handler";
import { order_post_handler } from "./order_post_handler";
import { fish_get_handler } from "./fish_get_handler";

// create router
const router = express.Router();

//non-secure middleware
router.post("/login", login_handler);

// router
router.use(v1_auth_mw);

// write here for secured middleware

router.get("/ping", (req, res) => {
  res.sendStatus(200);
});

router.post("/fish", fish_post_handler);
router.get("/fish", fish_get_all_handler);
router.get("/fish/:id", fish_get_handler);
router.put("/fish/:id", fish_put_handler);
router.delete("/fish/:id", fish_delete_handler);

router.get("/stock", stock_get_handler);
router.post("/order", order_post_handler);

export default router;
