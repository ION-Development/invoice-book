// api/user/[id].js
import mongoose from "mongoose"
import mongoMiddleware from "../../../lib/api/mongo-middleware";
import apiHandler from "../../../lib/api/api-handler";

export default mongoMiddleware(async (req, res, connection, models) => {
  const {
    query: { name, surname, email, password },
    method,
  } = req;  
  apiHandler(res, method, {
    GET: (response) => {
      models.Customer.find({_id:_id}, (error, customer) => {
        if (error) {
          connection.close();
          response.status(500).json({ error });
        } else {
          response.status(200).json(customer);
          connection.close();
        }
      });
    },
    POST: (response) => {
      models.Customer.findOneAndUpdate({_id:_id}, { name, phone, email, currency, addressLine1, addressline2, city, zipCode, country, state, accountNumber, fax, mobile, website, notes }, {}).exec((error, customer) => {
        if (error) {
          console.log(error)
          connection.close();
          response.status(500).json({ error });
        } else {
          response.status(200).json(customer);
          connection.close();
        }
      });
    },
  });
});



