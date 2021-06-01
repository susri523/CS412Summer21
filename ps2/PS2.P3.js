
/*
    cube takes a number as an input
    and returns the number to the power
    of 3.
 */
const cube = (num) => num ** 3;

/*
    takes the given array of integers from 1 to 7
    and maps the cube function on each value of the array
    and returns a new array which is console logged.
    -------------------------------------------------
    HOWEVER, all this could be done in one line if
    you did not need to write the cube function separately.
 */
console.log(`${[1,2,3,4,5,6,7].map(value => cube(value))}`);

//ALTERNATE ONE LINER
//console.log(`${[1,2,3,4,5,6,7].map(value => value**3)}`);