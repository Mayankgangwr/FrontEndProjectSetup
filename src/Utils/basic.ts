import moment from 'moment';

export const convertDateIntoTimeStamp = (dateString: string) => {
    const date = moment(dateString, "YYYY/M/D");  // Parse the date string with Moment.js

    const timestamp = date.unix();  // Get the Unix timestamp (seconds since epoch)

    return timestamp;
}
