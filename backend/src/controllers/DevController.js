const axios  = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket'); 


//funcs do controoler: index, show, store, update, destroy

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({github_username}); // vvariavel let pode ser sobreposta

        if (!dev) {

            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            //async await para aguardar o retorno da api
        
            const { name = login, avatar_url, bio } = apiResponse.data;
            
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
            
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })

            //filtrar as conexoes que estao há no maximo 10km de distancia
            //e que o novo dev tenha pelo menos uma das techs

            const sendSocketMessageTo = findConnections(
                {latitude, longitude },
                techsArray,
            )

            sendMessage(sendSocketMessageTo, 'new-dev', dev );
        }            
    
        return response.json(dev);
    }
};