//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
const PORT = process.env.PORT || 3000 ;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//connect to mongoose
mongoose.connect('mongodb+srv://rhBlog:rhshoumik@blogwebsite.gp0zh.mongodb.net/blogWebsite')

//model schema
const postsSchema = new mongoose.Schema({
  title : String,
  content : String,
  url : String
});

const Posts = mongoose.model("Posts" , postsSchema);
let posts = [];


app.get('/', (req, res) => {
  Posts.find({}, (err, allPosts) => {
    if(err){
      console.log(err);
    }else{
      res.render('home', {
        paraContent : homeStartingContent,
        post : allPosts
      });

    }
  })
});
app.get('/posts/:types', (req,res) => {
  const requestedTitle = req.params.types;
  Posts.findOne({title : requestedTitle }, (err , singlePost) =>{
    if(err){
      console.log("Not found");
    }
    else{
      res.render('post' , {title: singlePost.title , content : singlePost.content});
    }
  })
  // console.log("Start");

  // const requestedTitle = _.lowerCase(req.params.types);

  // posts.forEach(item => {
  //   const storedTitle = _.lowerCase(item.title);
  //   if(storedTitle === requestedTitle)
  //   {
  //     return res.render('post' , {title: item.title , content : item.content});
  //   }
  //   else{
  //     console.log("Not Found");
  //   }
  // })

  // for(let i = 1 ; i< posts.length ; i++){
  //   const storedTitle = _.lowerCase(posts[i].title);
  //   if(storedTitle === requestedTitle)
  //   {
  //     res.render('post' , {title: posts[i].title , content : posts[i].content}) 
  //   }
  // }


})
app.get('/about', (req, res) =>{
  res.render('about', {abContent : aboutContent});
})

app.get('/contact', (req, res) => {
  res.render('contact', {contactForm : contactContent});
})

app.get('/compose', (req, res) =>{
  res.render('compose');
})
app.post('/compose', (req, res) =>{
  // const post = {
  //   title : req.body.postTitle,
  //   content : req.body.postContent,
  //   url :  "/posts/" + req.body.postTitle
  // };
  const newPost = new Posts({
    title : req.body.postTitle,
    content : req.body.postContent,
    url :  "/posts/" + req.body.postTitle
  });
  newPost.save();
  //console.log(post.url);
  //posts.push(post);
  res.redirect("/");
})








app.listen(PORT, () => {
  console.log("Server started on port 3000");
});
