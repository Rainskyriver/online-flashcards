const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const PORT = 9001;
require('dotenv').config();
const cookie = require('cookie-session');

//Database setup
const pg = require('pg');
const db = new pg.Client(process.env.DATABASE_URL);

db.connect();

// Middleware
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json())
App.use(Express.static('public'));
App.use(cookie({
  name:'session',
  keys: ['key1']
}));


//Api Routes
const cardsRoutes = require('./routes/cards')
const decksRoutes = require('./routes/decks')
const ratingsRoutes = require('./routes/ratings')
const testquestionsRoutes = require('./routes/testquestions')
const testsRoutes = require('./routes/tests')
const usersRoutes = require('./routes/users')
const tagsRoutes = require('./routes/tags')
const decktagsRoutes = require('./routes/deck_tags');

App.use('/api/cards', cardsRoutes(db));
App.use('/api/decks', decksRoutes(db));
App.use('/api/ratings', ratingsRoutes(db));
App.use('/api/testquestions', testquestionsRoutes(db));
App.use('/api/tests', testsRoutes(db));
App.use('/api/users', usersRoutes(db));
App.use('/api/tags', tagsRoutes(db));
App.use('/api/deck_tags', decktagsRoutes(db))

// GET Routes
//Search Api
App.get('/api/search/:tag', (req, res) => {
  const tag = req.params.tag;
  
  db.query(`
  SELECT * FROM decks
  WHERE id=(
    SELECT deck_id FROM deck_tags
    WHERE tag_id=(
      SELECT id FROM tags
      WHERE LOWER(name) LIKE '${tag}'
    )
  )
  OR LOWER(name) LIKE '%${tag}%'
  OR description LIKE '%${tag}%'
  OR user_id=(
    SELECT id FROM users
    WHERE LOWER(name) LIKE '%${tag}%'
  )
    `).then((result) => {
    res.send(result.rows)
  }).catch((e) => 
  console.log(e));
});

//Login/Logout API
App.post('/api/login', (req, res) => {
  req.session.userID = 3;
  res.redirect(`/users/${req.session.userID}`)
})
App.post('/api/logout', (req, res) => {
  req.session.userID = null;
  res.redirect(`/`)
})

//Study API
App.get('/api/study/:id', (req, res) => {
  const id = req.params.id
  let data = {};
  db.query(`
  SELECT name FROM tags
  WHERE id IN (SELECT tag_id FROM deck_tags
    WHERE deck_id=${id})
  `).then((result) => {
    data.tags = (result.rows);
    db.query(`
    SELECT * FROM decks
    WHERE id=${id}
    `).then((result) => {
      data.deck = (result.rows[0]);
      res.send(data);
    })
  }).catch((e) => {
    console.error(e);
  })
})

//Decks API
App.get('/api/decks/:id/edit', (req, res) => {
  const id = req.params.id
  let data = {};
  db.query(`
  SELECT name FROM tags
  WHERE id IN (SELECT tag_id FROM deck_tags
    WHERE deck_id=${id})
  `).then((result) => {
    data.tags = (result.rows);
    db.query(`
    SELECT * FROM decks
    WHERE id=${id}
    `).then((result) => {
      data.deck = (result.rows[0]);
      db.query(`
      SELECT * FROM cards
      WHERE deck_id=${id}
      `).then((result) => {
        data.cards = (result.rows)
        res.send(data);
      })
    })
  }).catch((e) => {
    console.error(e);
  })
})

App.get('/api/users/:id', (req, res) => {
  const id = req.params.id;
  db.query(`
  SELECT * FROM decks
  WHERE user_id=${id}
  `).then((results) => {
    res.send(results.rows);
  }).catch((e) => {
    console.error(e);
  })
});

//New Deck API
App.post('/api/decks/new', (req, res) => {
  console.log(JSON.parse(req.body.data).deckData.title);
  const data = JSON.parse(req.body.data)
  const d = data.deckData
  const c = data.cardData
  db.query(`INSERT INTO decks (user_id, name, description, image_url) 
  VALUES (3, '${d.title}', '${d.description}', '${d.image}') RETURNING *;
  `).then((data) => {
    console.log(data.rows);
  }).catch(e => console.log(e)) 
  res.send(req.body);
})

App.get('/study/:id/original', (req, res) =>
  res.send('hello2')
);

App.get('/study/:id/test', (req, res) =>
  res.send('hello3')
);

App.get('/study/:id/match', (req, res) =>
  res.send('hello4')
);

App.get('/deck/:id', (req, res) =>
  res.send('hello5')
);

App.get('/search/:params', (req, res) =>
  res.send('hello6')
);

App.get('/study/:id', (req, res) =>
  res.send('hello2')
);

App.get('/', (req, res) => 
  res.send('hello')
);


// API Routes
// API/USERS
App.get('/api/users', (req, res) => 
  res.send('hi api/users')
);

App.post('/api/users', (req, res) => 
  res.send('post api/users')
);

// API/DECKS
App.get('/api/decks', (req, res) => 
  res.send('get api/decks')
);

App.post('/api/decks', (req, res) => 
  res.send('post api/decks')
);

App.put('/api/decks', (req, res) => 
  res.send('put api/decks')
);

App.delete('/api/decks', (req, res) => 
  res.send('delete api/decks')
);

// API/CARDS
App.get('/api/cards', (req, res) => 
  res.send('get api/cards')
);

App.post('/api/cards', (req, res) => 
  res.send('post api/cards')
);

App.put('/api/cards', (req, res) => 
  res.send('put api/cards')
);

App.delete('/api/cards', (req, res) => 
  res.send('delete api/cards')
);

// API/TESTS
App.get('/api/tests', (req, res) => 
  res.send('get api/tests')
);

App.post('/api/tests', (req, res) => 
  res.send('post api/tests')
);

App.put('/api/tests', (req, res) => 
  res.send('put api/tests')
);

// LISTENING ON THIS PORT
App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
