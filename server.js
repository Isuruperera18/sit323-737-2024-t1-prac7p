const mongoose = require('mongoose');
const app = require("./app");
const dotEnv = require('dotenv')

dotEnv.config();

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017';

// mongoose.connect('mongodb://admin:adminpass@mongodb-service.default.svc.cluster.local:27017')
mongoose.connect(mongoURI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
