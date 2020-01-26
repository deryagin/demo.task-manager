const _ = require('lodash');
const moment = require('moment');
const request = require('./request');
const rules = require('./config').rules;

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

const checkErrors = ({ code, request, response }) => {
    if (code !== 200) {
        throw new Error(`Cannot get log for ${request.url}!`);
    }

    return response.data;
};

const planInHour = (rule) => {
        return { ...rule, startDate: moment(data.dateEnd).add(1, 'hour').toISOString() };
}

const scedule = Promise.all(_.map(rules, (rule) => request.get(`/taskManagerLogs/last/${rule.methodName}`)))
    .then((methodLogs) => _.map(methodLogs), checkErrors)
    .then((methodLogs) => _.map(methodLogs, planNextRun));


module.exports.scedule = {
    scedule,
    planInHour,
};
