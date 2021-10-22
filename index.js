const post = require('micro-post')
 
module.exports = post(async (req, res) => {
  return `{"pool":{"name":"genesis","points":1},"external_url":"https://dontbuymeme.com/cards/1","image":"https://images.dontbuymeme.com/genesis/meme-grail-relic.png","name":"Meme Grail Relic","description":"The Meme Holy Grail. To show our appreciation to all humble farmers","attributes":[{"trait_type":"Set","value":"Genesis"},{"trait_type":"Rarity","value":"Relic"},{"trait_type":"Artist","value":"RektMe Rev"},{"trait_type":"Type","value":"Relic"},{"trait_type":"Tag","value":"Pineapple"},{"display_type":"date","trait_type":"birthday","value":1598450400},{"trait_type":"Max Supply","value":"10000"}]}`
})
