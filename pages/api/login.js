// api/user/[id].js
import mongoose from "mongoose"
import mongoMiddleware from "../../lib/api/mongo-middleware";
import apiHandler from "../../lib/api/api-handler";

export default mongoMiddleware(async (req, res, connection, models) => {
  const {
    query: {email, password },
    method,
  } = req;  
  apiHandler(res, method, {
    GET: (response) => {
      models.Client.findOne({email:email}, (error, client) => {
        if (error) {
          connection.close();
          response.status(500).json({ error });
        } else {

          client.comparePassword(password, function(err, isMatch) {
              if (err) throw err;
              if (isMatch) {
                response.status(200).json(client);
                connection.close();
              }else{
                response.status(200).json({error:{code:8008,message:"Wrong Credentials"}});
                connection.close();
              }
          });
          
        }
      });
    }
  });
});