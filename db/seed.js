// run node seed.js to seed

const db = require('./index');
const Sequelize = require('sequelize');
const Student = require('./models/students');
const Campus = require('./models/campuses');

//curl -H "Content-Type: application/json" -X POST -d '{"name":"Roke","dean":"Ged"}' http://localhost:1337/api/campus
//curl -H "Content-Type: application/json" -X PUT -d '{"name":"Rivendell","image":"rivendell.jpg"}' http://localhost:1337/api/campus
const newcampuses = [
 { name: 'Discworld', image: 'discworld.jpg', dean: 'Terry Pratchett' },
 { name: 'Tralfamadore', image: 'tralfamadore.jpg', dean: 'Kurt Vonnegut' },
 { name: 'Gethen', image: 'gethen.jpg', dean: 'Ursula K. LeGuin' },
 { name: 'Rivendell', image: 'rivendell.jpg', dean: 'JRR Tolkein' },
 { name: 'Uriel', image: 'uriel.jpg', dean: 'Madeline L\'Engle' },
 { name: 'Hain', image: 'hain.jpg', dean: 'Ursula K. LeGuin' },
];
const newstudents = [
  { name: 'Granny Weatherwax', email: 'granny@discworld.com', campusId: 1 },
  { name: 'Nanny Ogg', email: 'nanny@discworld.com', campusId: 1 },
  { name: 'Detritus', email: 'Detritus@discworld.com', campusId: 1 },
  { name: 'Carrot Ironfoundersson', email: 'Carrot@discworld.com', campusId: 1 },
  { name: 'Cheery Littlebottom', email: 'Cheery@discworld.com', campusId: 1 },
  { name: 'Nobby Nobbs', email: 'Nobby@discworld.com', campusId: 1 },
  { name: 'Brutha', email: 'Brutha@discworld.com', campusId: 1 },
  { name: 'Death', email: 'Death@discworld.com', campusId: 1 },
  { name: 'Carcer', email: 'Carcer@discworld.com', campusId: 1 },
  { name: 'Mort', email: 'Mort@discworld.com', campusId: 1 },
  { name: 'Rincewind', email: 'Rincewind@discworld.com', campusId: 1 },
  { name: 'Magrat Garlick', email: 'Magrat@discworld.com', campusId: 1 },

  { name: 'Bernard V. OHare', email: 'Bernard@tralfamadore.com', campusId: 2},
  { name: 'Gerhard Muller', email: 'Gerhard@tralfamadore.com', campusId: 2},
  { name: 'Mary OHare', email: 'Mary@tralfamadore.com', campusId: 2},
  { name: 'Roland Weary', email: 'Roland@tralfamadore.com', campusId: 2},
  { name: 'Edgar Derby', email: 'Edgar@tralfamadore.com', campusId: 2},
  { name: 'Paul Lazzaro', email: 'Paul@tralfamadore.com', campusId: 2},
  { name: 'Billy Pilgrim', email: 'Billy@tralfamadore.com', campusId: 2},
  { name: 'Kilgore Trout', email: 'Kilgore@tralfamadore.com', campusId: 2},
  { name: 'Bertram Copeland Rumfoord', email: 'Bertram@tralfamadore.com', campusId: 2},

  { name: 'Genly', email: 'Genly@ukl.com', campusId: 3},
  { name: 'Shevek', email: 'Shevek@ukl.com', campusId: 3},
  { name: 'Estraven', email: 'Estraven@ukl.com', campusId: 3},
  { name: 'Argaven', email: 'Argaven@ukl.com', campusId: 3},
  { name: 'Tibe', email: 'Tibe@ukl.com', campusId: 3},
  { name: 'Yoss', email: 'Yoss@ukl.com', campusId: 3},
  { name: 'Solly', email: 'Solly@ukl.com', campusId: 3},
  { name: 'Havzhiva', email: 'Havzhiva@ukl.com', campusId: 3},
  { name: 'Rakam', email: 'Rakam@ukl.com', campusId: 3},
  { name: 'Old Music', email: 'Music@ukl.com', campusId: 3},

  { name: 'Frodo', email: 'Frodo@jrrt.com', campusId: 4},
  { name: 'Bilbo', email: 'Bilbo@jrrt.com', campusId: 4},
  { name: 'Galadriel', email: 'Galadriel@jrrt.com', campusId: 4},
  { name: 'Elron', email: 'Elron@jrrt.com', campusId: 4},
  { name: 'Arwen', email: 'Arwen@jrrt.com', campusId: 4},
  { name: 'Gandalf', email: 'Gandalf@jrrt.com', campusId: 4},
  { name: 'Gimli', email: 'Gimli@jrrt.com', campusId: 4},
  { name: 'Boromir', email: 'Boromir@jrrt.com', campusId: 4},
  { name: 'Faramir', email: 'Faramir@jrrt.com', campusId: 4},
  { name: 'Samwise', email: 'Samwise@jrrt.com', campusId: 4},
  { name: 'Pipin', email: 'Pipin@jrrt.com', campusId: 4},
  { name: 'Merry', email: 'Merry@jrrt.com', campusId: 4},
  { name: 'Thranduil', email: 'Thranduil@jrrt.com', campusId: 4},

  { name: 'Meg', email: 'meg@wit.com', campusId: 5},
  { name: 'Charles Wallace', email: 'cw@wit.com', campusId: 5},
  { name: 'Calvin', email: 'calvin@wit.com', campusId: 5},
  { name: 'Mrs Who', email: 'mwho@wit.com', campusId: 5},
  { name: 'Mrs Which', email: 'mwhich@wit.com', campusId: 5},
  { name: 'Mrs Whatsit', email: 'mwhatsit@wit.com', campusId: 5},
  { name: 'Sandy', email: 'sandy@wit.com', campusId: 5},
  { name: 'Dennys', email: 'dennys@wit.com', campusId: 5},
  { name: 'Mr. Jenkins', email: 'jenkins@wit.com', campusId: 5},
  { name: 'Aunt Beast', email: 'auntie@wit.com', campusId: 5},

 ];

const seed = () =>
  Promise.all(newcampuses.map(campus =>
    Campus.create(campus))
  )
  .then(() =>
  Promise.all(newstudents.map(student =>
    Student.create(student))
  ));

  console.log('Syncing db...');
  db.sync({ force: true }).then(() => {
      return console.log('Seeding databse...');
    })
    .then(()=>{
      console.log('seeding');
      return seed();
    })
    .catch((e) => {
      console.log('error', e);
    });


