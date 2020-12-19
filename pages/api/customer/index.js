// api/Client/index.js
import mongoose from "mongoose";
import mongoMiddleware from '../../../lib/api/mongo-middleware'
import apiHandler from '../../../lib/api/api-handler'



export default mongoMiddleware(async (req, res, connection, models) => {
  console.log(req.query)
  const {
    query: { name, surname, email, password },
    method,
  } = req;
  apiHandler(res, method, {
    POST: (response) => {
      models.Client.create({ name, surname, email, password }, (error, client) => {
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
