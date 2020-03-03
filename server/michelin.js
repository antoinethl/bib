const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');


const parse = async data => {
  var $ = cheerio.load(data)
  var restaurants = []
  var links = []

  $('div.col-md-6.col-lg-6.col-xl-3').each(function (x, elem) {
    var link = 'https://guide.michelin.com' + $(elem).find('a.link').attr('href') + "/"
    links.push(link)
  });  

  for(let url of links){
      const response = await axios(url)
      const {data, status} = response;
      restaurants.push(singleRestaurant(data, url))
  }
  fs.appendFileSync('restaurant_michelin.json', restaurants)
  if (restaurants.length == 40)
    fs.appendFileSync('restaurant_michelin.json', ",")
  return restaurants
}

const singleRestaurant = (res, url) => {

  var $ = cheerio.load(res)

  var name = $('h2.restaurant-details__heading--title').first().text()
  var location = $('ul.restaurant-details__heading--list > li:nth-child(1)').first().text()
  var comfort = $('ul.restaurant-details__classification--list > li:nth-child(2)').text()
  var num = $('span.flex-fill').eq(0).text()
  var specialities = $('div.restaurant-details__text-componets > div').text()
  name = name.replace(/\n|  /g,'')
  location = location.replace(/\n|  /g,'')
  comfort = comfort.replace(/\n|  /g,'')
  comfort = comfort.substring(1)
  specialities = specialities.replace(/  /g,'')
  specialities = specialities.replace(/\n\n/g,'\n')
  num = num.replace(/\n| /g,'')
  num = num.replace("+33",'0')

  restaurant = JSON.stringify({ name: name, location: location, link: url, comfort: comfort, specialities: specialities, num: num }, null, 2)
  return restaurant
}

module.exports.scrapeRestaurant = async url => {
  const response = await axios(url);
  const {data, status} = response;
  if (status >= 200 && status < 300) {
    return parse(data);
  }
  console.error(status);
  return null;
};


module.exports.get = () => {
  return [];
};



  /*
  $('div.col-md-6.col-lg-6.col-xl-3').each(function (x, elem) {

    var name = $(elem).find('h5').text()
    var location = $(elem).find('div.card__menu-footer--location.flex-fill').text()
    var type_of_cooking = $(elem).find('div.card__menu-footer--price').text()
    var link = 'https://guide.michelin.com' + $(elem).find('a.link').attr('href')

    //const response = await axios(link)
    //const {data, status} = response;

    num = 1

    name = name.replace(/\n|  /g,'')
    location = location.replace(/\n|  /g,'')
    type_of_cooking = type_of_cooking.replace(/\n|  /g,'')

    //console.log(JSON.stringify({ name: name, location: location, type_of_cooking: type_of_cooking, link: link, num: num }, null, 2))
    restaurants.push(JSON.stringify({ name: name, location: location, type_of_cooking: type_of_cooking, link: link, num: num }, null, 2))
  });*/



    /*
  $('div.col-md-6.col-lg-6.col-xl-3').each(function (x, elem) {

    var name = $(elem).find('h5').text()
    var location = $(elem).find('div.card__menu-footer--location.flex-fill').text()
    var type_of_cooking = $(elem).find('div.card__menu-footer--price').text()
    var link = 'https://guide.michelin.com' + $(elem).find('a.link').attr('href')

    //const response = await axios(link)
    //const {data, status} = response;

    num = 1

    name = name.replace(/\n|  /g,'')
    location = location.replace(/\n|  /g,'')
    type_of_cooking = type_of_cooking.replace(/\n|  /g,'')

    //console.log(JSON.stringify({ name: name, location: location, type_of_cooking: type_of_cooking, link: link, num: num }, null, 2))
    restaurants.push(JSON.stringify({ name: name, location: location, type_of_cooking: type_of_cooking, link: link, num: num }, null, 2))
  });*/


  /*
  axios.all(links.map( async l =>  {
    const response = await axios(l).then(function (l) {
      const {dataS, status} = response;
      singleRestaurant(dataS)
    });
  }
  ));
  */
