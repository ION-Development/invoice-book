// api/Client/index.js
import mongoose from "mongoose";
import mongoMiddleware from '../../../lib/api/mongo-middleware'
import apiHandler from '../../../lib/api/api-handler'



export default mongoMiddleware(async (req, res, connection, models) => {
  console.log(req.query)
  const {
    query: { invoiceID,clientID,name,description,logo,number,purchaseOrderNumber,date,dueDate,customerID,services,subtotal,total,isPaid,footerNote },
    method,
  } = req;
  apiHandler(res, method, {
    POST: (response) => {
      models.Invoice.create({ invoiceID,clientID,name,description,logo,number,purchaseOrderNumber,date,dueDate,customerID,services,subtotal,total,isPaid,footerNote }, (error, invoice) => {
        if (error) {
          connection.close();
          response.status(500).json({ error });
        } else {
          response.status(200).json(invoice);
          connection.close();
        }
      });
    },
  });
});


