// load PouchDB with the optional node-websql adapter
var PouchDB = require('pouchdb').plugin(require('pouchdb-adapter-node-websql'));
// set up our databases - make sure the URL is correct!
var inputDB = new PouchDB('shit_init', {adapter: 'websql'});
var outputDB = new PouchDB('http://localhost:3456/shit');


// replicate
inputDB.replicate.to(outputDB);