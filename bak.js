// load PouchDB with the optional node-websql adapter
var PouchDB = require('pouchdb').plugin(require('pouchdb-adapter-node-websql'));
let time = new Date();
let time_name =(time.getFullYear()+'/'+(time.getMonth()+1)+'/'+time.getDate()+'/'+time.getHours()+'/'+time
.getMinutes()+'/'+time.getSeconds()).replace(/\//g, '-')
console.log(time_name)
// set up our databases - make sure the URL is correct!
var inputDB = new PouchDB('http://localhost:3456/shit');
var outputDB = new PouchDB('shit-'+time_name, {adapter: 'websql'});

// replicate
inputDB.replicate.to(outputDB);