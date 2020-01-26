const axios = require('axios').default;

const APIURI = process.env.APIURI;
const APITOKEN = process.env.APITOKEN;

const request = axios.create({
    baseURL: APIURI,
    timeout: 30000,
    headers: { 'x-auth-token': APITOKEN }
});

module.exports = request;
