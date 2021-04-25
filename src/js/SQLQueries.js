const sql = require('mssql/msnodesqlv8');
const chalk = require('chalk');
const debug = require('debug')('sql');

function getAllPosts(callback){
    const request = new sql.Request();
    request.query('select * from posts', (error, result) => {
      if (error) debug(chalk.Red(error));
      callback(result);
    });
}

function insertNewPost(data,callback){
  const request = new sql.Request();
  request.input('title',data.title);
  request.input('category',data.category);
  request.input('content',data.content);
  request.query(`
  Insert into dbo.Posts
  values
  (@title,@category,@content)`,(error,result)=>{
    if (error) debug(chalk.Red(error));
    callback(result);
  });
}

function getPost(id,callback){
  const request = new sql.Request();
  request.input('id',id);
  request.query(`Select * from posts where id = @id `,(error,result)=>{
    if (error) debug(chalk.Red(error));
    callback(result);
  });
}

function editPost(data,callback){
  const request = new sql.Request();
  request.input('id',data.id);
  request.input('title',data.title);
  request.input('category',data.category);
  request.input('content',data.content);
  request.query(`update Posts
  Set title = @title, category = @category, content = @content
  where id = @id`,(error,result)=>{
    if (error) debug(chalk.Red(error));
    callback(result);
  });
}

function deletePost(id,callback){
  const request = new sql.Request();
  request.input('id',id);
  request.query(`delete from Posts
  where id = @id`,(error,result)=>{
    if (error) debug(chalk.Red(error));
    callback(result);
  });
}

exports.getAllPosts = getAllPosts;
exports.insertNewPost = insertNewPost;
exports.getPost = getPost;
exports.editPost = editPost;
exports.deletePost = deletePost;
