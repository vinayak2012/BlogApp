const express = require('Express');
const { findById } = require('../models/article');
const router = express.Router();
const Article = require('../models/article');

router.get('/new', (req, res) => {
    res.render('new', {article: new Article() , text:'New Post'});
});

router.get('/:id', async (req, res) => {
    const article = await Article.findById(req.params.id);
    if(article == null) res.redirect('/');
    res.render('show', {article: article});
});

router.get('/delete/:id', async (req, res) => {
    const article = await Article.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id);
    res.render('edit', {article: article, text:'Edit your Post'});
});

router.put('/:id', async(req, res) => {
    const article = await Article.findById(req.params.id);
    // console.log(article.title);
    article.title = req.body.title,
    article.categories = req.body.categories,
    article.description = req.body.description
    try{
        await article.save();
        res.render('show', {article: article});
    }
    catch(e)
    {
        // console.log(e);
        res.render('edit', {article: article, text:'Edit your Post'});
    }
  });

router.post('/', async (req, res) => {
    let article = new Article({
    title: req.body.title,
    categories: req.body.categories,
    description: req.body.description
    });
    try{
        article = await article.save();
        res.redirect(`/articles/${article.id}`);
    }
    catch(e){
        // console.log(e);
        res.render('new', {article: article, text:'New Post' });
    }
})

module.exports = router;