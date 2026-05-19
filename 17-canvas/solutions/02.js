/**
 * Solution(s) to Chapter 17 - Problem 2: Pie Chart
 */
const results = [
  {name: "Satisfied", count: 1043, color: "lightblue"},
  {name: "Neutral", count: 563, color: "lightgreen"},
  {name: "Unsatisfied", count: 510, color: "pink"},
  {name: "No comment", count: 175, color: "silver"}
];
const cx = document.querySelector("canvas").getContext("2d");
const total = results
    .reduce((sum, { count }) => sum + count, 0);
let currentAngle = -0.5 * Math.PI;
const centerX = 300, centerY = 150;
const PIE_RADIUS = 100, LABEL_RADIUS = 120;

// Add code to draw the slice labels in this loop.
for (let result of results) {
    const sliceAngle = (result.count / total) * 2 * Math.PI;
    const labelAngle = currentAngle + (sliceAngle / 2);
    cx.beginPath();
    cx.arc(centerX, centerY, PIE_RADIUS,
        currentAngle, currentAngle + sliceAngle);
    currentAngle += sliceAngle;
    cx.lineTo(centerX, centerY);
    cx.fillStyle = result.color;
    cx.fill();

    const fontSize = 14;
    cx.font = `${fontSize}px Georgia`;
    cx.fillStyle = "black";
    const textX = centerX - (result.name.length/4 * fontSize)  + Math.cos(labelAngle) * LABEL_RADIUS;
    const textY = centerY + 10  + Math.sin(labelAngle)* LABEL_RADIUS;
    cx.fillText(result.name, textX, textY);
}