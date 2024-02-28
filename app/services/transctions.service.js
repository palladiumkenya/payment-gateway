import db from "../models";
import MpesaPayload from "../models/mpesa-payload.model";

const processMpesaTransaction = async (payload) => {
  console.log("payload ", JSON.stringify(payload));
  if (payload.Body.stkCallback.CallbackMetadata.Item) {
    const transactionMetadata = payload.Body.stkCallback.CallbackMetadata.Item;
    db.sequelize
      .sync()
      .then(() => {
        MpesaPayload.create({
          merchant_request_id: payload.Body.stkCallback.MerchantRequestID,
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
  }
};

const filterData = (data, key) => {
  const filteredResults = data.filter((element) => element.Name === keyItem);
  return filteredResults.length > 0 ? filteredResults[0].Value : undefined;
};

export const fetchCompletedTransactions = async (requestIDs) => {
  var requests = atob(requestIDs);
  let queryParam = "";
  if (requests) {
    const programs = requests.split(",");
    queryParam = programs.map((item) => `'${item}'`).join(",");
  }

  return db.sequelize
    .authenticate()
    .then(() => {
      return db.sequelize
        .query(
          `SELECT * FROM mpesa_transactions WHERE merchant_request_id in (${queryParam})`,
          {
            type: db.sequelize.QueryTypes.SELECT,
          }
        )
        .then((result) => {
          const response = {
            status: 200,
            result: result,
          };
          return response;
        })
        .catch((error) => {
          const response = {
            status: 500,
            result: "Error fetching transaction",
          };
          return response;
        });
    })
    .catch((error) => {
      const response = {
        status: 500,
        result: "Error fetching transaction",
      };
      return response;
    });
};

export default processMpesaTransaction;
