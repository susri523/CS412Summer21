/*
    evalute function takes a string expression
    in the digit, op, digit format where length is given
    and returns an arrow function with the parameter obj
 */
const evaluate = expr => {
    switch(expr[1]){
        case '+':
            return ({left, right}) => left + right;
            break;
        case '-':
            return ({left, right}) => left - right;
            break;
        case '/':
            return ({left, right}) => left / right;
            break;
        case '*':
            return ({left, right}) => left * right;
            break;
        case '^':
            return ({left, right}) => left**right;
            break;
        default:
            // case for non supported operators returns undefined
            return ({left, right}) => undefined;
    }
}

/*
   parser function takes a string expression
   in the digit, op, digit format where length is given
   and returns an object with the left and right labeled
   with the num1 and num2, converted to integers
 */
const parser = expr => {
    return {left: parseInt(expr[0]), right: parseInt(expr[2])};

    /*
    if i didn't know how long the operands were I could
    pass a regex into split function and
    it will split anytime it sees any of the ops
 */

    // const string = "5+8"
    // const arr = string.split(/[-+*/^]/);
    // console.log(`NUM1: ${arr[0]} and NUM2: ${arr[1]}`);
};

/*
    test case 1
 */
let string = "4+2";
let opFunction = evaluate(string);
console.log(`${string} = ${opFunction(parser(string))}`);
console.log('------------');

/*
    test case 2
 */
string = "5*7";
opFunction = evaluate(string);
console.log(`${string} = ${opFunction(parser(string))}`);
console.log('------------');

/*
    test case 3
 */
string = "9/2";
opFunction = evaluate(string);
console.log(`${string} = ${opFunction(parser(string))}`);
console.log('------------');

/*
    test case 4
 */
string = "6-1";
opFunction = evaluate(string);
console.log(`${string} = ${opFunction(parser(string))}`);
console.log('------------');

/*
    test case 5
 */
string = "2^8";
opFunction = evaluate(string);
console.log(`${string} = ${opFunction(parser(string))}`);
console.log('------------');
