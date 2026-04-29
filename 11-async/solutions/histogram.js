/**
 * Builds a horizontal histogram string for a giving array of frequency.
 * @param {number[]} table - A frequency of numbers.
 * @returns {string}
 */
export function buildHistogram(table) {
    let widest = Math.max(50, Math.max(...table))
    return table.map((n, i) => {
        let width = (n / widest) * 20
        let full = Math.floor(width), rest = " ▏▎▍▌▋▊▉"[Math.floor((width - full) * 8)]
        return String(i).padStart(2, " ") + " " + "█".repeat(full) + rest
    }).join("\n")
}