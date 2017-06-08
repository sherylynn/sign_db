var express = require('express'),
  http = require('http'),
  app = express();

var  PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-adapter-node-websql'));
var server = http.createServer(app);




app.set('port', 3456);

/*
var InMemPouchDB = PouchDB.defaults({db: require('memdown')});

app.use('/db', require('express-pouchdb')(InMemPouchDB));

var myPouch = new InMemPouchDB('foo');

var TempPouchDB = PouchDB.defaults({prefix: '/tmp/my-temp-pouch/'});

app.use('/db', require('express-pouchdb')(TempPouchDB));

var myPouch = new TempPouchDB('foo');

var TempPouchDB = require('http-pouchdb')(PouchDB, 'http://localhost:5984');
app.use('/db', require('express-pouchdb')(TempPouchDB));
*/



var SQLPouchDB = PouchDB.defaults({db: require('pouchdb-adapter-node-websql')});

app.use('/', require('express-pouchdb')(SQLPouchDB, {
  mode: 'minimumForPouchDB',
  overrideMode: {
    include: ['routes/fauxton']
  }
})); //目前版本非根目录下utils是不可以使用的，若根目录则kankan不能使用，会被db截取
var shit = new SQLPouchDB('shit');
//var shit = new PouchDB('shit',{adapter: 'websql'})

var server = http.createServer(app);
server.listen(app.get('port'),'localhost');

server.on('listening', function() {
  console.log('----------listening on port: ' + app.get('port') + '----------------------');
});


server.on('error', function(error) {
  switch (error.code) {
    case 'EACCES':
      console.error(bind + '需要权限许可');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + '端口已被占用');
      process.exit(1);
      break;
    default:
      throw error;
  }
});

