// load PouchDB with the optional node-websql adapter
var PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-adapter-node-websql'));
PouchDB.plugin(require('pouchdb-full-sync'));
// set up our databases - make sure the URL is correct!
var inputDB = new PouchDB('shit_init', {adapter: 'websql'});
var outputDB = new PouchDB('http://localhost:3456/shit');


// replicate
//inputDB.replicate.to(outputDB);
// full sync
inputDB.fullyReplicateTo(outputDB);
//即使是full sync也没法同步修改过后的数据库