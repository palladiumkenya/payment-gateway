import db from "../models";
import MpesaPayload from "../models/mpesa-payload.model";

const processMpesaTransaction = async (payload) => {
  console.log("payload ", payload.Body.stkCallback.CallbackMetadata);
  const transactionMetadata = payload.Body.stkCallback.CallbackMetadata.Item;
  db.sequelize
    .sync()
    .then(() => {
      MpesaPayload.create({
        checkout_request_id: payload.Body.stkCallback.CheckoutRequestID,
        business_short_code: "1234",
        amount: filterData(transactionMetadata, "Amount"),
        client_phone: filterData(transactionMetadata, "PhoneNumber"),
        // this should be the receipt number
        paybill_reference_number: filterData(
          transactionMetadata,
          "MpesaReceiptNumber"
        ),
        transaction_reference_number: filterData(
          transactionMetadata,
          "MpesaReceiptNumber"
        ),
        datetime: filterData(transactionMetadata, "TransactionDate"),
        mpesa_payload: filterData(transactionMetadata, "test"),
      })
        .then((res) => {
          console.log("Transaction persisted created successfully!");
        })
        .catch((error) => {
          console.error("Failed to create a new record : ", error);
        });
    })
    .catch((error) => {
      console.error("Unable to create table : ", error);
    });
};

const filterData = (data, key) => {
    const filteredResults = data.filter((element) => element.Name === key);
    return filteredResults.length > 0 ? filteredResults[0].Value : undefined;
  };

export default processMpesaTransaction;
