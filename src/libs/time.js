import { format, register } from 'timeago.js';

const localeFunc = (number, index, totalSec) => {
    return [
        ['just now', 'right now'],
        ['%s secs ago', 'in %s secs'],
        ['1 min ago', 'in 1 min'],
        ['%s mins ago', 'in %s mins'],
        ['1 hour ago', 'in 1 hour'],
        ['%s hours ago', 'in %s hours'],
        ['1 day ago', 'in 1 day'],
        ['%s days ago', 'in %s days'],
        ['1 week ago', 'in 1 week'],
        ['%s weeks ago', 'in %s weeks'],
        ['1 mon ago', 'in 1 mon'],
        ['%s mons ago', 'in %s mons'],
        ['1 year ago', 'in 1 year'],
        ['%s years ago', 'in %s years']
    ][index];
};
register('custom', localeFunc);

export const parseTime = (time) => {
    // use format if above 5 days
    if (time > 432000000) {
        return format(time, 'custom');
    }
    const date = new Date(time)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const dt = date.getDate()

    return `${year}/${month}/${dt}`
}