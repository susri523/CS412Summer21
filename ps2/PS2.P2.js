
/*
    splitSentence is a generator and takes
    a string input called sentence
    and outputs each word as a yield
 */
function* splitSentence (sentence) {
    // split the string into an array on the space separator
    const sentenceArray = sentence.split(" ");

    // for each element of the array, yield the element and pause
    for (const word of sentenceArray){
        yield word;
    }
}

//set up the generator with the input sentence
const generator = splitSentence("All I know is something like a bird within her sang");

// prime the generator with the .next and store the object in nextWord
let nextWord = generator.next();

//use the objects done flag to see if the sentence is complete
while (!nextWord.done) {

    //if it's not complete, log the value and advance the generator
    console.log(nextWord.value);
    nextWord = generator.next();
}