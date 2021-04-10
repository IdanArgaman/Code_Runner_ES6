/* eslint-disable */

const CodeTypesEnum = {
    BASIC: "BASIC"
}

export default [{
    "categoryId": CodeTypesEnum.BASIC,
    "title": "Simple spread and rest usage",
    "description": "",
    "code": () => {

        ////////////
        // SPREAD //
        ////////////

        function foo(x, y, z) {
            console.log(x, y, z);
        }

        foo(...[1, 2, 3]); // Destruct

        // Spread into another array
        const a = [2, 3, 4];
        const b = [1, ...a, 5];
        console.log(b);

        // Prior ES6
        console.log([1].concat(a, [5]));

        //////////
        // REST //
        //////////

        // Rest collects the function arguments into an array

        function bar(x, y, ...z) {
            // Rest is different from the old 'arguments' variable inside a function because
            // rest is a real array unlike 'arguments' which is an array like object.
            // So, here "z" is a real array!
            console.log(x, y, z);
        }

        bar(1, 2, 3, 4, 5);
    }
}];