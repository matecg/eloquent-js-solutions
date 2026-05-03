export default function generateGlobalScope() {
    const topScope = Object.create(null);

    topScope.true = true;
    topScope.false = false;

    for (const op of ["+", "-", "*", "/", "==", "<", ">"]) {
        topScope[op] = Function("a, b", `return a ${op} b;`);
    }

    topScope.print = (message) => {
        console.log(message);
        return message;
    }
    return topScope;
}