// api/Client/index.js
import mongoose from "mongoose";
import mongoMiddleware from '../../../lib/api/mongo-middleware'
import apiHandler from '../../../lib/api/api-handler'



export default mongoMiddleware(async (req, res, connection, models) => {
  const {
    query: {id,name, surname, email, country, state, city, zipCode, birthday, businessId },
    method,
  } = req;
  apiHandler(res, method, {
    POST: (response) => {

      models.ClientInfo.updateOne({id:id},{name:name, surname:surname, email:email, country:country, state:state, city:city, zipCode:zipCode, birthday:birthday, businessId:businessId }, (error, client) => {
        if (error) {
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

