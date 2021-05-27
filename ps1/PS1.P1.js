/*
    revAlpha converts a given string to a new string
    in reverse alphabetical order
    -------------------------------------------------------
    Split the string into an array, that is order descending
    by passing in an inline compare where if a < b then return 1
    and if a > b return -1. This means when a < b,
    in place swap and join it back together into a string
 */
const revAlpha = string => string.split("").sort((a, b) => (a < b ? 1 : -1)).join("");

/*
    test case 1
 */
console.log("Case 1:")
const testStr = 'exioi';
const ans = revAlpha(testStr);
const trueAns ='xoiie';     //true answer from http://www.easysurf.cc/ralphawrd.htm

console.log(`Reverse alphabetically ordered string ${testStr} will become ${ans}`)
console.log(trueAns === ans)

console.log("----------------")

/*
    test case 2
 */
console.log("Case 2:")
const testStr2 = 'supercalifragilisticexpialidocious'
const ans2 = revAlpha(testStr2);
const trueAns2 ='xuutsssrrppoollliiiiiiigfeedcccaaa'; //true ans from http://www.easysurf.cc/ralphawrd.htm

console.log(`Reverse alphabetically ordered string ${testStr2} will become ${ans2}`)
console.log(trueAns2 === ans2)