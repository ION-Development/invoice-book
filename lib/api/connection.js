import mongoose from "mongoose";
const bcrypt = require('bcrypt')

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    trim:true,
    required: true,
  },
  surname: {
    type: String,
    trim:true,
    required: true,
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
    required: true,
    minlength: 8,
    trim: true,
  },
});

ClientSchema.pre("save", async function(next){


 const client = this;
  if (client.isModified("password")) {
    client.password = await bcrypt.hash(client.password,8)
  }
  next();
});

ClientSchema.pre('update', async function(next) {
  const client = this;
  
  if (client.isModified("password")) {
    client.password = await bcrypt.hash(client.password,8)
  }
  next();
});

ClientSchema.pre('updateOne', async function(next) {
 const client = this;
  if (client.isModified("password")) {
    client.password = await bcrypt.hash(client.password,8)
  }
  next();
});

ClientSchema.pre('findOneAndUpdate', async function(next) {
  const client = this;
    client._update.password = await bcrypt.hash(client._update.password,8)
  next();
});


ClientSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const ClientInfoSchema = new mongoose.Schema({
  id: {
    type: String,
    trim:true,
  },
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
    trim: true,
    lowercase: true,
  },
  country: {
    type: String,
    trim: true,
  },
  state: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  zipCode: {
    type: String,
    trim: true,
  },
  birthday: {
    type: String,
    trim: true,
  },
  businessId: {
    type: String,
    trim: true,
  },
});

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    trim:true,
  },
  phone: {
    type: String,
    trim:true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  currency: {
    type: String,
    trim: true,
  },
  addressLine1: {
    type: String,
    trim: true,
  },
  addressline2: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  zipCode: {
    type: String,
    trim: true,
  },
  country: {
    type: String,
    trim: true,
  },
  state: {
    type: String,
    trim: true,
  },
  accountNumber: {
    type: String,
    trim: true,
  },
  fax: {
    type: String,
    trim: true,
  },
  mobile: {
    type: String,
    trim: true,
  },
  website: {
    type: String,
    trim: true,
    lowercase: true,
  },
  notes: {
    type: String,
    trim: true,
  },
});

const ProductSchema = new mongoose.Schema({
  clientID:{
    type: String,
    trim:true,
  },
  name: {
    type: String,
    trim:true,
  },
  description: {
    type: String,
    trim:true,
  },
  price: {
    type: String,
    trim: true,
  },
  sell: {
    type: Boolean,
    required: true,
    trim: true,
  },
  buy: {
    type: Boolean,
    trim: true,
  },
  tax: {
    type: Number,
    trim: true,
  }
});

const InvoiceSchema = new mongoose.Schema({
  invoiceID: {
    type: String,
    trim:true,
  },
  clientID: {
    type: Object,
    trim:true,
  },
  name: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  logo: {
    type: String,
    trim: true,
  },
  number: {
    type: Number,
    trim: true,
  },
  purchaseOrderNumber: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    trim: true,
  },
  dueDate: {
    type: Date,
    trim: true,
  },
  customerID: {
    type: Object,
    trim: true,
  },
  services: {
    type: Array,
    trim: true,
  },
  subtotal: {
    type: String,
    trim: true,
  },
  total: {
    type: Number,
    trim: true,
  },
  isPaid: {
    type: Boolean,
    trim: true,
  },
  footerNote: {
    type: String,
    trim: true,
  },
});

const connectToMongo = async () => {
  const connection = await mongoose.createConnection(
    "mongodb://localhost:27017/invoicebook",
    {
      useNewUrlParser: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
      useUnifiedTopology: true,
      useFindAndModify:true
    }
  );
  const Client = connection.model("Client", ClientSchema);
  const ClientInfo = connection.model("ClientInfo",ClientInfoSchema);
  const Customer = connection.model('Customer',CustomerSchema);
  const Invoice = connection.model('Invoice',InvoiceSchema);

  return {
    connection,
    models: {
      Client,
      ClientInfo,
      Customer,
      Invoice
    },
  };
};

export default connectToMongo;