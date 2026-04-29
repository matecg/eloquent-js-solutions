/**
 * Solution(s) to Chapter 11 - Problem 1: Quiet Times
*/
import { textFile } from "./read-text-file.js";
import { buildHistogram } from "./histogram.js";


/**
 * Group counting hourly logs for a giving day.
 * @param {number} day - Week day ranging from 0 for Sunday to 6 to Saturday.
 * @returns {number[]}
 */
async function activityTable(day) {
    const logFileList = await textFile("camera_logs.txt");
    const logFiles = logFileList.split("\n");
    const logsPromises = logFiles.map(async (log) => {
        try {
            return (await textFile(log)).split("\n").map(entry => new Date(+entry));
        } catch (error) {
            console.log(error);
        }
    });
    const output = new Array(24);
    output.fill(0);
    for (const logPromise of logsPromises) {
        const log = await logPromise;
        if (log.length && log[0].getDay() !== day) continue;
        for (const entry of log) {
            output[entry.getHours()] = output[entry.getHours()] + 1;
        }
    }
    return output;
}

activityTable(1)
    .then(table => console.log(buildHistogram(table)));