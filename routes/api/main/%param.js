const { send } = require('micro')
const fetch = require('node-fetch');

// respond to specific methods by exposing their verbs
module.exports.GET = async function(req, res) {
  const id = req.params.param
  console.log('id', id)
  const response = await fetch(`https://api.dontbuymeme.com/memes/${id}`);
	const json = await response.json();
  return json
}