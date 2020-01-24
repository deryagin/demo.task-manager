const axios = require('axios').default;

const APIURI = 'https://reqbin.com/echo/post/json';
const APITOKEN = '1fff74e532ee6e1da4c7effb8681395aa8d5a549';
const TIMEOUT = 200;

const request = axios.create({
    baseURL: APIURI,
    timeout: 1000,
    headers: { 'x-auth-token': APITOKEN }
});

function runner() {
    return request.post('/firstmethod')
        .then((response) => {
            console.log(response.status);
        })
        .catch((error) => {
            console.error(error.response.status);
        })
        .then(() => {
            timer = setTimeout(runner, TIMEOUT);
        })
};

let timer = setTimeout(runner, TIMEOUT);
