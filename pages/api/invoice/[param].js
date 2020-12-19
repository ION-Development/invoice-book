// api/user/[id].js
import mongoose from "mongoose"
import mongoMiddleware from "../../../lib/api/mongo-middleware";
import apiHandler from "../../../lib/api/api-handler";

export default mongoMiddleware(async (req, res, connection, models) => {
  const {
    query: { invoiceID,clientID,name,description,logo,number,purchaseOrderNumber,date,dueDate,customerID,services,subtotal,total,isPaid,footerNote },
    method,
  } = req;  
  apiHandler(res, method, {
    GET: (response) => {
      models.Invoice.find({invoiceID:invoiceID}, (error, client) => {
        if (error) {
          connection.close();
          response.status(500).json({ error });
        } else {
          response.status(200).json(client);
          connection.close();
        }
      });
    },
    POST: (response) => {
      models.Invoice.findOneAndUpdate({invoiceID:invoiceID}, { clientID,name,description,logo,number,purchaseOrderNumber,date,dueDate,customerID,services,subtotal,total,isPaid,footerNote }, {}).exec((error, client) => {
        if (error) {
          console.log(error)
          connection.close();
          response.status(500).json({ error });
        } else {
          response.status(200).json(client);
          connection.close();
        }
      });
    },
  });
});