const express = require('express');
const SQLQueries = require('./SQLQueries');
const debug = require('debug')('routes');

const bookRouter = express.Router();

function routes() {

  bookRouter.route('/').get((req, res) => {
    SQLQueries.getAllPosts(({ recordset }) => {
      res.render('index',
        {
          recordset
        });
    })
  })

  bookRouter.route('/newpost').get((req, res) => {
    res.render("newpost");
  })

  bookRouter.route('/newpost').post((req, res) => {
    SQLQueries.insertNewPost(
      {
        title: req.body.title,
        category: req.body.category,
        content: req.body.content
      },
      (result) => {
        res.redirect('/');
        debug(result);
      }
    )
  })

  bookRouter.route('/viewpost/:id').get((req, res) => {
    SQLQueries.getPost(req.params.id, (result) => {
      res.render('viewpost',result.recordset[0]);
      }
    )
  })

  //GET edit
  bookRouter.route('/editpost/:id').get((req, res) => {
    SQLQueries.getPost(req.params.id, (result) => {
      res.render('editpost',result.recordset[0]);
      }
    )
  })

  //Post edit
  bookRouter.route('/editpost/:id').post((req, res) => {
    SQLQueries.editPost(
      {
        id: req.params.id,
        title: req.body.title,
        category: req.body.category,
        content: req.body.content
      },
      (result) => {
        res.redirect('/');
        debug(result);
      }
    )
  })

  bookRouter.route('/deletepost/:id').get((req, res) => {
    SQLQueries.deletePost(req.params.id, (result) => {
      res.redirect('/');
      debug(result);
      }
    )
  })

  return bookRouter;
}

module.exports = routes;
