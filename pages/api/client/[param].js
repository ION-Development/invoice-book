// api/user/[id].js
import mongoose from "mongoose"
import mongoMiddleware from "../../../lib/api/mongo-middleware";
import apiHandler from "../../../lib/api/api-handler";

export default mongoMiddleware(async (req, res, connection, models) => {
  console.log(req)
  const {
    query: { name, surname, email, password, param },
    method,
  } = req;  
  if (param ==="update" || param === "get"){
    apiHandler(res, method, {
      GET: (response) => {
        models.Client.find({email:email}, (error, client) => {
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
        models.Client.findOneAndUpdate({email:email}, { name, surname, password }, {}).exec((error, client) => {
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
  }else{
    res.status(500).json({ error:{code:12000,message:"Wrong endpoint used. Use 'update' [POST] or 'get' [GET]."} });
  }

  
});