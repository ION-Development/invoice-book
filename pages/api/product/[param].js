// api/user/[id].js
import mongoose from "mongoose"
import mongoMiddleware from "../../../lib/api/mongo-middleware";
import apiHandler from "../../../lib/api/api-handler";

export default mongoMiddleware(async (req, res, connection, models) => {
  const {
    query: { id, name ,description ,price ,sell ,buy ,tax },
    method,
  } = req;  
  apiHandler(res, method, {
    GET: (response) => {
      models.Product.find({_id:ObjectId(id)}, (error, product) => {
        if (error) {
          connection.close();
          response.status(500).json({ error });
        } else {
          response.status(200).json(product);
          connection.close();
        }
      });
    },
    POST: (response) => {
      models.Product.findOneAndUpdate({_id:ObjectId(id)}, { name ,description ,price ,sell ,buy ,tax }, {}).exec((error, product) => {
        if (error) {
          console.log(error)
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