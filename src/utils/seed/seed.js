const mongoose = require("mongoose");
const db = require("../database/db");
const User = require("../../api/users/user.model");
const bcrypt = require("bcrypt");

const initialUsers = [
  {
    email: "gonesteb@gmail.com",
    password: "Aaaa6666",
    name: "Gonzalo",
    age: 29,
    phone: 666777888,
    Linkedin: "",
    Gitplatform: "",
    Vercel: "",
    role: "admin",
  },
  {
    email: "boris.castro1991@gmail.com",
    password: "Aaaa7777",
    name: "Boris",
    age: 31,
    phone: 888777888,
    Linkedin: "",
    Gitplatform: "",
    Vercel: "",
    role: "admin",
  },
  {
    email: "joannezamorano@gmail.com",
    password: "Aaaa8888",
    name: "Joanne",
    age: 32,
    phone: 999777888,
    Linkedin: "",
    Gitplatform: "",
    Vercel: "",
    role: "admin",
  },
  {
    email: "fjclivar@gmail.com",
    password: "Aaaa9999",
    name: "Javier",
    age: 36,
    phone: 555777888,
    Linkedin: "",
    Gitplatform: "",
    Vercel: "",
    role: "admin",
  },
];

mongoose 
  .connect(db.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    const allUsers = await User.find();

    if (allUsers.length) {
      console.log("Eliminando colección de usuarios...");
      await User.collection.drop();
    } else {
      console.log(
        "No hay usuarios en la base de datos... procediendo a añadir los usuario"
      );
    }
  })
  .catch((error) =>
    console.log("Error al borrar la colección de la base de datos", error)
  )
  .then(async () => {
    initialUsers.forEach(async (user) => {
      user.password = await bcrypt.hash(user.password, 10);
      const userToSave = new User(user);
      await userToSave.save();
    });
    console.log("Usuarios añadidos con éxito...");

    // Promise.all(passEncrypt)
    // .then(async (pepe) => {
    //   console.log(pepe);
    //   await User.insertMany(pepe)
    //
    // })
  })
  .catch((error) =>
    console.log("Error al añadir usuario a la base de datos", error)
  )
//.finally( () =>  mongoose.disconnect());
