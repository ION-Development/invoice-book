// api/Client/index.js
import mongoose from "mongoose";
import mongoMiddleware from '../../../lib/api/mongo-middleware'
import apiHandler from '../../../lib/api/api-handler'



export default mongoMiddleware(async (req, res, connection, models) => {
  console.log(req.query)
  const {
    query: { clientID ,name ,description ,price ,sell ,buy ,tax },
    method,
  } = req;
  apiHandler(res, method, {
    POST: (response) => {
      models.Product.create({ clientID ,name ,description ,price ,sell ,buy ,tax }, (error, product) => {
        if (error) {
          connection.close();
          response.status(500).json({ error });
        } else {
          response.status(200).json(product);
          connection.close();
        }
      });
    },
  });
});
