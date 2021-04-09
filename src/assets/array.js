/* eslint-disable */

const CodeTypesEnum = {
    BASIC: "BASIC"
}

export default [{
        "categoryId": CodeTypesEnum.BASIC,
        "title": "Exenting the base Array class",
        "description": "An example of extending the base array by using class instead of prototype.",
        "code": () => {
            // Extending an existing array
            // 👍 Before classes we used prototypes to achieve the same effect

            class MyCoolArray extends Array {
                sum() {
                    return this.reduce(function reducer(acc, curr) {
                        return acc + curr;
                    }, 0);
                }
            }

            var z = MyCoolArray.of(3);
            console.log(z.length); // 1
            console.log(z.sum()); // 3

            var y = new MyCoolArray(1, 2, 3);
            console.log(y.slice(1) instanceof MyCoolArray);

            var x = new MyCoolArray(1, 2, 3);
            console.log(x.slice(1) instanceof Array); // true
            console.log(MyCoolArray.from(x) instanceof Array); // true
            console.log(MyCoolArray.of([2, 3]) instanceof Array); // true
            console.log(MyCoolArray.from(x) instanceof MyCoolArray); // true
            console.log(MyCoolArray.of([2, 3]) instanceof MyCoolArray); // true 
        },
    },
    {
        categoryId: CodeTypesEnum.BASIC,
        title: "New array methods",
        description: "of, from, copyWithin",
        code: () => {
            // The Array.of() method creates a new Array instance from a variable number of arguments,
            // regardless of number or type of the arguments.

            console.log(Array.of(3));

            // The Array.from() static method creates a new, shallow-copied Array 
            // instance from an array - like or iterable object.

            console.log(Array.from('foo'));
            console.log(Array.from([1, 2, 3], x => x + x)); // 👍 We can also provide a map function to call on every element of the array.

            // "copyWithin"
            // The copyWithin() method shallow copies part of an array to another location in the same
            // array and returns it without modifying its length.

            console.log([1, 2, 3, 4, 5].copyWithin(3, 0)); // [1,2,3,1,2]
            console.log([1, 2, 3, 4, 5].copyWithin(3, 0, 1)); // [1,2,3,1,5]
            console.log([1, 2, 3, 4, 5].copyWithin(0, -2)); // [4,5,3,4,5]
            console.log([1, 2, 3, 4, 5].copyWithin(0, -2, -1)); // [4,2,3,4,5]
        }
    }
];