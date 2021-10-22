const thinkagain = require('thinkagain')(/* rethinkdbdash options */);

// Create a model - the table is automatically created
let Post = thinkagain.createModel('Post', {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    content: { type: 'string' },
    idAuthor: { type: 'string' }
  },
  required: [ 'title' ]
});

let Author = thinkagain.createModel('Author', {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' }
  },
  required: [ 'name' ]
});

// Join the models
Post.belongsTo(Author, 'author', 'idAuthor', 'id');

// Create a new post
let post = new Post({
  title: 'Hello World!',
  content: 'This is an example.'
});

// Create a new author
var author = new Author({
  name: 'Llama'
});

// Join the documents
post.author = author;

// Save everything
post.saveAll()
  .then(result => console.log(result));

/*
output:
{
  id: '0e4a6f6f-cc0c-4aa5-951a-fcfc480dd05a',
  title: 'Hello World!',
  content: 'This is an example.',
  idAuthor: '3851d8b4-5358-43f2-ba23-f4d481358901',
  author: {
    id: '3851d8b4-5358-43f2-ba23-f4d481358901',
    name: 'Llama'
  }
}
*/

