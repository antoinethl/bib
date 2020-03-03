/* eslint-disable no-console, no-process-exit */
const michelin = require('./michelin');
const fs = require('fs');
const maitre = require("./maitre");

async function getMichelin() {

  var i = 1
  fs.writeFileSync('restaurant_michelin.json', "[")
  var linkMichelin

  do {
    linkMichelin = `https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/page/${i++}`
    var restaurant
    try {
      console.log(`Browsing ${linkMichelin} source`);
      restaurant = await michelin.scrapeRestaurant(linkMichelin);
      console.log('done');
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  } while (restaurant.length != 0) 
  fs.appendFileSync('restaurant_michelin.json', "]")
}

async function getMaitre() {

  const linkMaitre = 'https://www.maitresrestaurateurs.fr/annuaire/ajax/loadresult/'
  
  var i = 1
  fs.writeFileSync('restaurant_maitre.json', "")

  do {
    var restaurant
    try {
      console.log(`Browsing ${linkMaitre} source, page ${i}`);
      restaurant = await maitre.scrapeRestaurant(linkMaitre, i++);
      console.log('done');
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  } while (restaurant.length != 0) 
}

function maitrebib(){

  const michelin = require('./restaurant_michelin.json')
  fs.writeFileSync('./bibreact/src/restaurant_both.json', "[")
  fs.readFile("restaurant_maitre.json", function (err, data) {
    var restaurants = []
    if (err) throw err;
      michelin.forEach(restaurant => {
        var name = restaurant.name.toLowerCase()
        name = name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
      if (data.includes(restaurant.num) || data.includes(name)) {
        restaurants.push(JSON.stringify(restaurant, null, 2))
        
      }
    })
    fs.appendFileSync('./bibreact/src/restaurant_both.json', restaurants + "]")
  })

}
//getMichelin()
//getMaitre()
maitrebib()

//const both = require("./restaurant_both")
//const both = fs.readFileSync("restaurant_michelin.json")
//console.log(JSON.parse(both.toString()))
//test = JSON.parse(both)
//console.log(test)
//JSON.parse(both)
//var obj = fs.readFileSync('test.json', 'utf8');
//var data1 = JSON.parse(JSON.stringify(obj))
//console.log(data1)
//console.log(t[0].num)
//console.log(t)
//console.log(JSON.parse(obj))

