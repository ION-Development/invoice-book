import mongoose from "mongoose";

const bcrypt = require("bcryptjs")
const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    trim:true,
  },
  surname: {
    type: String,
    trim:true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    minlength: 8,
    trim: true,
  },
});



ClientSchema.pre('save',async function(next){
  const client = this;

  if (client.isModified("password")) {
    client.password = await bcrypt.hash(client.password,client.name)
    console.log('ovde?')
  } 

  next()
})


export default async (req, res) => {
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
    const Client = connection.model("Client", ClientSchema);
    const {
      query: { name, surname, email, password },
      method,
    } = req;
    switch (method) {
      case "POST":
        Client.create({ name, surname, email, password }, (error, client) => {
          if (error) {
            connection.close();
            res.status(500).json({ error });
          } else {
            res.status(200).json(client);
            connection.close();
          }
        });
        break;
      default:
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (e) {
    connection.close();
    res.status(500).json({ error: e.message || "something went wrong" });
  }
};
