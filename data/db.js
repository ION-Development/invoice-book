/*import mongoose from "mongoose";
const { Schema } = mongoose;

  const ClientSchema = new Schema({
    name:  String, // String is shorthand for {type: String}
    surname: String,
    email:   String
  });


const Named = async (req, res) => {
  const connection = await mongoose.createConnection(
    "mongodb://localhost:27017/invoicebook",
    {
      useNewUrlParser: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
      useUnifiedTopology: true,
    }
  );
  try {
    const Client = connection.model("clients", ClientSchema);
    
    Client.create({ name:'name',surname:'surname',email:'email' }, (error, user) => {
      if (error) {
        connection.close();
        res.status(500).json({ error });
      } else {
        res.status(200).json(user);
        connection.close();
      }
    });
        
   
  } catch (e) {
    connection.close();
    res.status(500).json({ error: e.message || "something went wrong" });
  }
};


                                                                                                                                                  
export default Named;  */