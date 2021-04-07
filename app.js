const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Article = require('./models/article');
const methodOverride = require('method-override');
const articleRouter = require('./routes/articles'); 

const app = express();
mongoose.connect('mongodb://localhost/blog_project', { useNewUrlParser: true , useUnifiedTopology: true });

app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine','ejs');
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.use('/articles',articleRouter);

app.get('/', async(req, res) => {
    const articles = await Article.find().sort({createdAt:'desc'});
    res.render('home', {articles : articles});
});
app.listen(5000);