import { Router } from "express";
import processMpesaTransaction from "../services/process-transctions.service";

const router = Router();

router.post("/confirmation-url", (req, res) => {
  processMpesaTransaction(req.body);
  return res.status(200).json({ message: "Transaction message received for processing" });
});

export default router;
