const specialForms = Object.create(null);

export default function evaluate(expression, scope) {
    if (expression.type == "value") {
        return expression.value;
    } else if (expression.type == "word") {
        if (expression.name in scope) {
            return scope[expression.name];
        } else {
            throw new ReferenceError(`Undefined biding: ${expression.name}`);
        }
    } else if (expression.type == "apply") {
        let { operator, args } = expression;
        if (operator.type == "word" && operator.name in specialForms) {
            return specialForms[operator.name](expression.args, scope);
        } else {
            let operation = evaluate(operator, scope);
            if (typeof operation == "function") {
                return operation(...args.map(arg => evaluate(arg, scope)));
            } else {
                throw new TypeError("Applying a Non-function");
            }
        }
    }
}

specialForms.if = (args, scope) => {
    if (args.length != 3) {
        throw new SyntaxError("Wrong number of arguments to if");
    } else if (evaluate(args[0], scope) !== false) {
        return evaluate(args[1], scope);
    } else {
        return evaluate(args[2], scope);
    }
}

specialForms.while = (args, scope) => {
    if (args.length !== 2) {
        throw new SyntaxError("Wrong number of arguments to if");
    }
    while (evaluate(args[0], scope)) {
        evaluate(args[1], scope);
    }
    return false; // Used in the absence of an 'undefined' value
}

specialForms.do = (args, scope) => {
    let output = false;
    for (const arg of args) {
        output = evaluate(arg, scope);
    }
    return output
}

specialForms.define = (args, scope) => {
    if (args.length !== 2) {
        throw new SyntaxError("Wrong number of arguments to define");
    }
    let value = evaluate(args[1], scope);
    scope[args[0].name] = value;
    return value;
}