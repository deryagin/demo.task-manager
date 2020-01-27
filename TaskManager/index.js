const api = require('./api');
const scedule = require('./scedule');

const runner = () => {
    const method = scedule.nextMethod();
    if (!method) {
        return null;
    }

    const dateStart = new Date().toISOString();
    return api.runMethod(method.methodName)
        .then(() => {
            const methodLog = {
                ...method,
                dateStart,
                dateEnd: new Date().toISOString(),
                result: 'OK',
            };
            api.logLastRun(methodLog);
            const method = scedule.planNextRun(methodLog);
            scedule.modifyScedule(method);
        })
        .catch(error => {
            const methodLog = {
                ...method,
                dateStart,
                dateEnd: new Date().toISOString(),
                result: 'Error',
                errorDescription: error.message || error.code,
            };
            api.logLastRun(methodLog);
            const method = scedule.planInHour(methodLog)
            scedule.modifyScedule(method);
        })
        .then(() => setTimeout(runner, 100));
};

process.on('uncaughtException', console.error);
scedule.makeScedule().then(runner);
// process.nextTick(runner);
