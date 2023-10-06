const express = require("express");
const userSchema = require("../models/user");
const router = express.Router();

// Crear Usuario
router.post("/users", (req, res) => {
  const user = userSchema(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// login usuario
router.post("/login", async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await userSchema.findOne({ name });

    if (user && user.password === password) {
      res.json({ message: 'Autenticación satisfactoria' });
    } else {
      res.status(401).json({ message: 'Error en la autenticación' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Buscar todos los usuarios
router.get("/users", (req, res) => {
  userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// buscar un usuario por id
router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// borrar un usuario por id
router.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .findByIdAndRemove({ _id: id })
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.json({ message: 'Usuario eliminado satisfactoriamente' });
    })
    .catch((error) => res.status(500).json({ message: error.message }));
});

// actualizar un usuario
router.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, identification, password } = req.body;
  userSchema
    .updateOne({ _id: id }, { $set: { name, identification, password } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;