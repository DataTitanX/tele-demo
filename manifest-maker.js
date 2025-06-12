// manifest-maker.js
const fs = require('fs');
const KEY   = process.env.KEY;          // same hex key
const files = JSON.parse(fs.readFileSync('file_ids.json','utf8'));
// file_ids.json  = ["BAACAgQAA...","BAACAgQAB...", ...]

const manifest = {
  key: KEY,
  total: files.length,
  map: files.map((id,i)=>({i,id}))
};
fs.writeFileSync('manifest.json', JSON.stringify(manifest));
