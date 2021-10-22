const query = require('micro-query');

module.exports = async (req, res) => {
  return query(req);
}
