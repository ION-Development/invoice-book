// api/Client/index.js
import mongoose from "mongoose";
import mongoMiddleware from '../../../lib/api/mongo-middleware'
import apiHandler from '../../../lib/api/api-handler'



export default mongoMiddleware(async (req, res, connection, models) => {
  const {
    query: { name, surname, email, password },
    method,
  } = req;
  apiHandler(res, method, {
    POST: (response) => {
      models.Client.create({ name, surname, email, password }, (error, client) => {
        if (error) {
          connection.close();
          if (error.code == 11000) {
            response.status(500).json({error:{code:11000,message: email+ " is already registered. Please use the login to access your account"}});
          }else{
            response.status(500).json({ error });
          }
        } else {
          console.log(client)
          apiHandler(res, method, {
            POST: (response) => {
              const id = client.id;
              models.ClientInfo.create({id, name, surname, email}, (error, clientInfo) => {
                if (error) {
                  connection.close();
                  response.status(500).json({ error });
                } else {
                  response.status(200).json(clientInfo);
                  connection.close();
                }
              });
            },
          });
        }
      });
    },
  });
});
