/**
 * Solution(s) to Chapter 11 - Problem 2: Real Promises
*/

import { textFile } from "./read-text-file.js";
import { buildHistogram } from "./histogram.js";

/**
 * Group counting hourly logs for a giving day.
 * @param {number} day - Week day ranging from 0 for Sunday to 6 to Saturday.
 * @returns {number[]}
 */
function activityTable(day) {
    return textFile("camera_logs.txt")
        .then(logFiles => {
            return logFiles.split("\n").map(async (log) => {
                return textFile(log)
            })
        })
        .catch(error => console.log)
        .then(logPromises => {
            return Promise.all(logPromises);
        })
        .then(data => {
            const output = new Array(24);
            output.fill(0);
            let datesLog = null;
            for (const log of data) {
                datesLog = log.split("\n").map(entry => new Date(+entry));
            }
            for (const log of datesLog) {
                output[log.getHours()] = output[log.getHours()] + 1;
            }
            return output;
        });
}

activityTable(6)
    .then(table => console.log(buildHistogram(table)));