module.exports.formatRelativeTime = (time) => {
    // seconds: 1000
    // hours: 1000 * 3600
    // days: 1000 * 3600 * 24
    // months: 1000 * 3600 * 24 * 12
    const week = Math.floor((Date.now() - time) / (1000 * 3600 * 24 * 7));
    const days = Math.floor((Date.now() - time) / (1000 * 3600 * 24));
    const hours = Math.floor((Date.now() - time) / (1000 * 3600));
    if (week) {
        return time;
    } else if (days) {
        return days;
    } else if (hours) {
        return hours;
    }
};
