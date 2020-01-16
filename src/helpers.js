import { months } from './constants';

export function parseData(data) {
    return data
        .filter(event => event && event.location !== 'Bij je thuis')
        .map(parseEvent)
}

function parseEvent(event) {
    let [venue, city] = event.location.split(',').map(item => item.trim())
    if (!city) { city = venue.substring(venue.lastIndexOf(" ")).trim() }
    const dateText = event.date.split('Zet')[0];
    const date = parseDateFromText(event.date);
    return { ...event, city, venue, date, dateText }
}

function parseDateFromText(dateText) {
    //dateText example: Donderdag 09 januari, 20:15
    const re = /^\w+\s(\w+)\s(\w+)/i;
    // Retrieve 09
    const day = re.exec(dateText)[1];
    // Retrieve januari => 0
    const month = months[re.exec(dateText)[2]];
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const year = currentMonth > month ? currentYear + 1 : currentYear;
    return new Date(year, month, day)
}