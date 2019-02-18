const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const loki = require('lokijs');

const app = express();
const port = process.env.PORT || 8000;

/* 
* creo il DB loki
*/
var db = new loki(__dirname + "/alfatube.db.json", {
  autoload: true,
  autoloadCallback: databaseInitialize,
  autosave: true,
  autosaveInterval: 10000
});

/*
* ad inizializzazione avvenuta creo (se necessario) le due collection necessarie
*/
function databaseInitialize() {
  if (!db.getCollection("recent")) {
    db.addCollection("recent", {
      unique: ['videoId']
    });
    console.log("recent collection created");
  }
  if (!db.getCollection("relation")) {
    db.addCollection("relation");
    console.log("relation collection created");
  }
  if(!db.getCollection("user")){
    db.addCollection("user")
    console.log("user collection created");
  }
}

/*
* uso, come parte statica, quanto prodotto dalla compilazione di angular
*/
app.use(express.static(__dirname + '/build'));

/*
 * bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
  extended: true
}));

/*
*bodyParser.json(options)
* Parses the text as JSON and exposes the resulting object on req.body.
*/
app.use(bodyParser.json());

/*
* risponde al POST su /api
* usato er memorizzare i dati delle visualizzazioni utente
* video1 è il video corrente
* video2 (è null al primo giro) è il video precedente
*/
app.post('/api', (req, res) => {
  var recent = db.getCollection("recent");
  var relation = db.getCollection("relation");

  var videoId = req.body.video1;

  /*
  * cerco il video corrente, se lo trovo incremento il count, se non lo trovo credo un "record" nuovo
  * in ogni caso aggiorno la data di ultima visualizzazione
  */
  var itm = recent.find({ videoId: videoId });
  if (undefined == itm || 0 == itm.length) {
    recent.insert({
      videoId: videoId,
      count: 1,
      data: req.body.video1,
      lastWatched: new Date()
    });

    console.log('video inserted: ' + req.body.video1);
  } else {
    itm[0].count++;
    itm[0].lastWatched = new Date();
    recent.update(itm[0]);

    console.log('video updated: ' + req.body.video1);
  }

  /*
  * se il video2 esiste inserisco un "record" nelle relazioni
  */
  if (null != req.body.video2) {
    relation.insert({
      video1Id: videoId,
      video2Id: req.body.video2,
      video2: req.body.video2,
      recommender: req.body.recommender
    });

    console.log('video: ' + req.body.video1 + ' is related to: ' + req.body.video2 + ' by: ' + req.body.recommender);
  }

  //var results = recent.find({ 'videoId': videoId });
  res.status(200).jsonp({ result: "OK" })
}
);

/*
* api in GET per la popolatità globale
* prende in input id del video di cui avere info riguardanti i video "relati"
* se id non viene passato ritorna la popolarità globale di quanto memorizzato
*/
app.get('/globpop', (req, res) => {
  var recent = db.getCollection("recent");
  var relation = db.getCollection("relation");

  var listaRecommended = new Array();

  /*
  * mi creo la lista delle relazioni (con id o senza)
  */
  var videoId = req.query.id;
  if (undefined == videoId) {
    /*
    * lista dei recent
    */
    var listaRecent = recent.chain();

    var listaUnivoca = new Array();

    /*
    * scorro tutta la lista ordinata per 'count' discendente
    */
    listaRecent.simplesort('count', true).data().forEach(element => {

      /*
      * mi salvo in un array di stringhe la chiaved del video che sto per aggiungere e se esiste gia'
      * non lo inserisco di nuovo. in questo modo evito i duplicati
      * a 'prevalentReason' risultera' essere quella del primo elemento trovato
      */
      if (-1 == listaUnivoca.indexOf(element.videoId)) {
        listaUnivoca.push(element.videoId);
        var nodo = {
          "videoId": element.videoId,
          "prevalentReason": "undefined",
          "timesWatched": element.count,
          "lastWatched": element.lastWatched
        }

        listaRecommended.push(nodo);
      }
    });

  } else {
    var listaRelazioni;

    listaRelazioni = relation.chain().find({ video1Id: videoId }).simplesort('video2Id').limit(100);
    /*
    * lista dei recent per il join
    */
    var listaRecent = recent.chain();

    /*
    * metto in join le due collection
    */
    var listaTotale = listaRelazioni.eqJoin(listaRecent, 'video2Id', 'videoId');

    var listaUnivoca = new Array();

    /*
    * scorro tutta la lista ordinata per 'count' discendente
    */
    listaTotale.simplesort('right.count', true).data().forEach(element => {

      /*
      * mi salvo in un array di stringhe la chiaved del video che sto per aggiungere e se esiste gia'
      * non lo inserisco di nuovo. in questo modo evito i duplicati
      * a 'prevalentReason' risultera' essere quella del primo elemento trovato
      */
      if (-1 == listaUnivoca.indexOf(element.left.video2Id)) {
        listaUnivoca.push(element.left.video2Id);
        var nodo = {
          "videoId": element.left.video2Id,
          "prevalentReason": element.left.recommender,
          "timesWatched": element.right.count,
          "lastWatched": element.right.lastWatched
        }

        listaRecommended.push(nodo);
      }
    });
  }

  var lastWatched = 'undefined';
  var recommender = 'LocalPopularity';

  /*
  * se mi e' stato passato un videoId lo ricerco per ottenere i dettagli del video in questione
  */
  if (undefined != videoId) {
    var itm = recent.find({ videoId: videoId });
    if (itm.length > 0) {
      recommender = videoId;
      lastWatched = new Date(itm[0].lastWatched).toUTCString();
    }
  }

  /*
  * costruisco il risultato in out
  */
  var result = {
    "site": req.hostname,
    "recommender": recommender,
    "lastWatched": lastWatched,
    "recommended": listaRecommended
  }

  res.status(200).jsonp(result)
}
);

/*
alla fine di tutti le gestioni di route vari,
per evitare che un link diretto a un url gestito da angular client side fallisca
es: /videoList/xxxxx 
*/
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/build/index.html'));
});

/*
* creo il server e mi metto in listen sulla porta (8000)
*/
const server = http.createServer(app);
server.listen(port, () => console.log("running on port " + port + "..."));