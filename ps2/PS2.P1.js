/*
    fibs is the generator that iterates through
    the regular fibonacci sequence and outputs the
    yield of the fibonacci number that is next in seq
 */
function* fibs(){
    //initialize value1, value2 and result as integers
    let [value1, value2, result] = [0, 1, 0];

    // the first 2 fib numbers are 0 and 1, so yield those as is
    yield value1;
    yield value2;

    // loop continously using fib_n = fib_n-1 + fib_n-2
    while (true){
        result = value1 + value2;
        value1 = value2;
        value2 = result;

        // yield the next result
        yield result;
    }
}

/*
    evenFibs is the generator that calls upon
    the fibs generator. It checks whether the
    yielded result is even and only yields a result
    if that is the case
 */
function* evenFibs(){

    // set up the generator for all fibs
    const getFibs = fibs();

    //loop continuously
    while (true){
        // store the next value of all fibs as an object so val can be retrieved
        let fibNum = getFibs.next()

        if (fibNum.value % 2 === 0){
            yield fibNum.value;
        }
    }
}


let count = 6;
const getEvenFibs = evenFibs();

while ( count --> 0){
    console.log(getEvenFibs.next().value);
}