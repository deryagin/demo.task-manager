const axios = require('axios').default;

const TIMEOUT = 200;

let timer = setTimeout(runner, TIMEOUT);

function runner() {
    return axios.post('https://reqbin.com/echo/post/json')
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
