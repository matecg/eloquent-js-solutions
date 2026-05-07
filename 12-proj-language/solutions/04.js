/**
 * Solution(s) to Chapter 12 - Problem 4: Fixing Scope
*/
import { specialForms } from "../evaluator.js";
import buildRunFunction, {evaluate} from "../evaluator.js";

const run = buildRunFunction();

/**
 * Set an existing binding value to a new provided value, or throws a
 * ReferenceError if the binding isn't defined on any scope.
 * @param {Object[]} args - Two required arguments: binding name and value
 * @param {Object} scope - Local scope object
 */
specialForms.set = (args, scope) => {
    if (args.length !== 2) {
        throw new SyntaxError("Wrong number of arguments to define");
    }

    const value = evaluate(args[1], scope);
    let currentScope = scope;
    do {
        if (Object.hasOwn(currentScope, args[0].name)) {
            currentScope[args[0].name] = value;
            break;
        } else {
            currentScope = Object.getPrototypeOf(currentScope);
        }
    } while (currentScope !== null);

    if (currentScope === null) {
        throw new ReferenceError("Trying to assign an undefined variable.")
    }
};

run(`
do(define(x, 4),
   define(setx, fun(val, set(x, val))),
   setx(50),
   print(x))
`);
// → 50
try {
    run(`set(quux, true)`);
} catch (error) {
    if (error instanceof ReferenceError) {
        console.log(`Error: ${error.message}`);
    }
}
// → Some kind of ReferenceError