/*
    runDecorator takes an expression and a decorator
    and runs the decorator on the expression
    and returns that value, acting as a wrapper function
 */
const runDecorator = (expr, decorator) => decorator(expr);

// string to work with
const string = 'supercalifragilisticexpialidocious';

/*
    PART 1: run a lambda decorator that returns an array
    with the fragments of the original string broken
    on the letter 'c' by passing in the string to break
 */
console.log("PART1:");
// use the regex lookahead /(?=[])/ with the character to break on in between the []
console.log(runDecorator(string, (expr) =>  expr.split(/(?=[c])/g)));  // use /g for global matches
console.log("-------------------------------------------------------");

/*
    PART 2: run a lambda decorator that returns an object
    with the original string, string modified with a->A,
    the number of characters replaced,
    and the length of the string
    SINCE STRING ORIGINAL AND MODIFIED ARE SAME LENGTH
    USE ORIGINAL TO CALCULATE LEN AND HOW MANY REPLACEMENTS
 */
console.log("PART 2:");
console.table(runDecorator(string, (expr) => {
    return {
        originalString: expr,
        modifiedString: expr.replace(/a/g, 'A'), // must use regex /g to replace all occurrences
        numberReplaced: expr.match(/a/g).length, // generate array of all occurrences, find length of the array
        length: expr.length
    }
}));