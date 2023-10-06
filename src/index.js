const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoute = require("./routes/user");

// Configuración puerto
const app = express();
const port = process.env.PORT || 1000;

// middlewares para el procesamiento de solicitudes
app.use(express.json());
app.use("/api", userRoute);

// routes
app.get("/", (req, res) => {
  res.send("Bienvenido a mi API");
});

// conexión a mongodb utilizando el archivo .env
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado a MongoDB Atlas"))
  .catch((error) => console.error(error));

// server listening
app.listen(port, () => console.log("Servidor escuchado por el puerto", port));