const _ = require('lodash');
const moment = require('moment');
const api = require('./api');
const rules = require('./config').rules;

const scedule = [];

const makeScedule = () => {
    const methodLastRuns = _.map(rules, (rule) => api.getLastRun(rule.methodName));
    return Promise.all(methodLastRuns)
        .then((results) => _.map(results, extractMethodLog))
        .then((methodLogs) => _.map(methodLogs, planNextRun))
        .then((methodScedule) => _.map(methodScedule, modifyScedule));
};

const extractMethodLog = ({ code, request, response }) => {
    if (code !== 200) {
        throw new Error(`Cannot get log for ${request.url}!`);
    }

    return response.methodLog;
}

const nextMethod = () => {
    const method = _.chain(scedule)
        .orderBy(['dateStart'], ['asc'])
        .first()
        .value();

    const plannedRun = new Date(method.startDate).getTime();
    const nowSeconds = new Date().getTime();
    return (plannedRun - nowSeconds) <= 0 ? method : null;
}

const planNextRun = (methodLog) => {
    const rule = _.find(rules, { methodName: methodLog.methodName })

    if (!methodLog.dateEnd) {
        return { ...rule };
    }

    if (methodLog.dateEnd && methodLog.result === 'Error') {
        return { ...rule, startDate: new Date().toISOString() };
    }

    if (methodLog.dateEnd && methodLog.result === 'OK') {
        return { ...rule, startDate: moment(methodLog.dateEnd).add(1, rule.frequency).toISOString() };
    }

    throw new Error('Unknown planning conditions!');
};

const planInHour = (methodLog) => {
    const rule = _.find(scedule, { methodName: methodLog.methodName })
    return { ...rule, startDate: moment(data.dateEnd).add(1, 'hour').toISOString() };
}

const modifyScedule = (method) => {
    const index = _.findIndex(schedule, { methodName: method.methodName });
    (index === -1)
        ? scedule.push(method)
        : scedule.splice(index, 1, method);
}

module.exports = {
    makeScedule,
    nextMethod,
    planInHour,
    planNextRun,
    modifyScedule,
};
