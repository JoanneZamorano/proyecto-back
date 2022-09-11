const passport = require('passport');

const User = require("./user.model");

const registerPost = (req, res) => {
  
  const done = (error, user) => {
    if (error) return res.status(500).json(error.message);

    req.logIn(user, (error) => {
      if (error) return res.status(error.status || 500).json(error.message);
      return res.status(201).json(user);
    });
  }
  
  passport.authenticate('registrito', done)(req);
};

const loginPost = (req, res) => {

  const done = (error, user) => {
    if (error) return res.status(error.status || 500).json(error.message);

    req.logIn(user, (error) => {
      if (error) return res.status(error.status || 500).json(error.message);
      return res.status(200).json(user);
    });
  };

  passport.authenticate('logincito', done)(req);
};

const logoutPost = async (req, res) => {
  if(req.user) {
    await req.logout(() => {
      req.session.destroy(() => {
        res.clearCookie("connect.sid");
        return res.status(200).json('Hasta pronto! Te has deslogueado correctamente');
      });
    });
  } else {
    return res.status(404).json('No hay usuario autenticado');
  }
};

const test = (req, res) => {
  console.log('Usuario autenticado', req.user);
  return res.status(200).json(req.user);
};

const getUsers = async (req, res) =>{
    try{
      const {id} = req.params;
      const users = await User.findById(id).populate('posts');   
     console.log()
      return res.status(200).json(users);
    } catch(error){
      console.error(error);
      return res.status(500).json(error);
    }
  }
  const getAllUsers = async (req, res, next) =>{
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
      console.error(error);
        return res.status(500).json(error);
    }
}

// const updateUser = async (req, res) =>{
//   const user = await User.findById(req.user.id);
//   if(user){
//     const { phone, age, Linkedin, Gitplatform, Vercel} = req.body
//     user.phone = phone;
//     user.age = age;
//     user.Linkedin = Linkedin;
//     user.Gitplatform = Gitplatform;
//     user.Vercel = Vercel;

//   }
// }

const updateUser = async (req, res, next) =>{
  try {
      const {id} = req.params;
      const user = new User(req.body);
      user._id = id;
      
      if(req.file){
          // user.photo = req.file.path;
          user.phone = req.file.path;
          user.age = req.file.path;
          user.Linkedin = req.file.path;
          user.Gitplatform = req.file.path;
          user.Vercel = req.file.path;
      }
      const userDb = await User.findByIdAndUpdate(id, user);
      // if(userDb.photo){
      //     deleteFile(userDb.photo)
      // }
      return res.status(200).json(userDb);
  } catch (error) {
      return res.status(500).json(error);
  }
}






module.exports = {
  registerPost,
  loginPost,
  logoutPost,
  test,
  getUsers,
  getAllUsers,
  updateUser
}