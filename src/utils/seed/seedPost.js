const mongoose=require ('mongoose');
const db=require ('../database/db');
const Post = require('../../api/posts/post.model');

const initialPost=[
{
    title: "Primer Post",
    text: "Este es el primer post",
    image: "https://res.cloudinary.com/djbn99sev/image/upload/v1662829349/FinalProyect/wk3o9mk8gj25ghwiklts.jpg"
}
]


mongoose
  .connect(db.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    const allPosts = await Posts.find();

    if (allPosts.length) {
      console.log('Eliminando colección de posts...');
      await Post.collection.drop();
    } else {
      console.log('No hay posts en la base de datos... procediendo a añadir los usuario');
    }
  })
  .catch(error => console.log('Error al borrar la colección de la base de datos', error))
  .then(async () => {
    await Posts.insertMany(initialPost);
    console.log('posts añadidos con éxito...');
  })
  .catch(error => console.log('Error al añadir usuario a la base de datos', error))
  .finally(() => mongoose.disconnect());
