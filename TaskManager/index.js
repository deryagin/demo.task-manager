const request = require('./request');
const scedule = require('./scedule');

function runner() {
    const methodName = '/echo/post/json';

    return request.post(methodName)
        .then((response) => {
            console.log(response.status);
        })
        .catch((error) => {
            console.error(error.response ? error.response.status : error.code);
        })
        .then(() => {
            process.nextTick(runner);
        })
};

process.nextTick(runner);
