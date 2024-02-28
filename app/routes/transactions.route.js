import { Router } from "express";
import processMpesaTransaction from "../services/transctions.service";
import { fetchCompletedTransactions } from "../services/transctions.service";

const router = Router();

router.post("/confirmation-url", (req, res) => {
  processMpesaTransaction(req.body);
  return res.status(200).json({ message: "Transaction message received for processing" });
});

router.get("/pull-mpesa-transactions", async (req,res) => {
  const result = await fetchCompletedTransactions(req.query.paymentRequests, req.query.invoiceNumbers, req.query.businessShortCode)
  return res.status(result.status).json({results: result.result})
})

export default router;
