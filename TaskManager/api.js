const request = require('./request');

module.exports = {
    runMethod: (methodName) => {
        return request.post(methodName);
    },

    getLastRun: (methodName) => {
        return request.get(`/taskManagerLogs/last/${methodName}`);
    },

    logLastRun: (methodLog) => {
        return request.post(`/taskManagerLogs/create`, methodLog);
    },
};