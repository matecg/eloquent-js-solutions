import { skip } from "./03.js";

/**
 * Parse a program into a valid Object tree structure.
 * @param {string} program - Program to be parsed
 * @returns {Object}
 */
export default function parse(program) {
    let {expr, rest} = parseExpression(program);
    if (skip(rest).length > 0) {
        throw new SyntaxError(`Unexpected text after the program: ${skip(rest)}`);
    }
    return expr;
}

/**
 * Parse an program string extracting string and number values or words presenting variables.
 * @param {string} program - Current program being parsed
 * @returns 
 */
function parseExpression(program) {
    program = skip(program);
    let expr, match;
    if (match = /^"([^"]*)"/.exec(program)) {   // Extract strings
        expr = {type: "value", value: match[1]};
    }else if (match = /^\d+\b/.exec(program)) { // Extract numbers
        expr = {type: "value", value: +match[0]}
    } else if (match = /^[^\s(),#"]+/.exec(program)) { // Extract variables
        expr = {type: "word", name: match[0]}
    } else {
        throw SyntaxError("Unexpected syntax: " + program);
    }

    return parseApply(expr, program.slice(match[0].length));
}

function parseApply(expression, program) {
    program = skip(program);
    if (program[0] != "(") {
        return {expr: expression, rest: program};
    }

    program = skip(program.slice(1));
    expression = {type: "apply", operator: expression, args: []};
    while (program[0] != ")") {
        let arg = parseExpression(program);
        expression.args.push(arg.expr);
        program = skip(arg.rest);
        if (program[0] == ",") {
            program = skip(program.slice(1));
        } else if (program[0] != ")") {
            throw SyntaxError("Expected ',' or ')'");
        }
    }
    return parseApply(expression, program.slice(1));
}