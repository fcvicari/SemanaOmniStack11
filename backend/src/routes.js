const { Router } = require('express');
const ongs = require('./controllers/ongController') 
const incident = require('./controllers/incidentController') 
const profile = require('./controllers/ProfileController') 
const section = require('./controllers/sectionController') 

const routes = Router();

routes.get('/ongs', ongs.index);
routes.post('/ongs', ongs.create);
routes.get('/incidents', incident.index);
routes.post('/incidents', incident.create);
routes.delete('/incidents/:id', incident.delete);
routes.get('/profile', profile.index);
routes.post('/section', section.create);

module.exports = routes;