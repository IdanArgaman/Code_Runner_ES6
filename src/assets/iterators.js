/* eslint-disable */

const CodeTypesEnum = {
    BASIC: "BASIC",
    ADVANCED: "ADVANCED"
}

export default [{
        categoryId: CodeTypesEnum.BASIC,
        title: "Basic iteartors useage",
        description: "",
        code: () => {
            const arr = [1, 2, 3];

            // Note the use of a symbol in order to get an iterator

            const it = arr[Symbol.iterator]();

            console.log(JSON.stringify(it.next())); // { value: 1, done: false }
            console.log(JSON.stringify(it.next())); // { value: 2, done: false }
            console.log(JSON.stringify(it.next())); // { value: 3, done: false }
            console.log(JSON.stringify(it.next())); // { value: undefined, done: true }

            ///////////////////////////////
            // Strings are also iterable //
            ///////////////////////////////

            const greeting = "hello world";
            const it2 = greeting[Symbol.iterator]();

            console.log(JSON.stringify(it2.next())); // { value: "h", done: false }
            console.log(JSON.stringify(it2.next()));

            /////////
            // MAP //
            /////////

            const m = new Map();

            m.set("foo", 42);
            m.set({
                cool: true
            }, "hello world");

            // Accessing the iterator directly
            const it3 = m[Symbol.iterator]();

            // Note the use of the method that belongs to the map object in order to create an iterator
            const it4 = m.entries();

            // Each value is an array, the iterators are independent
            console.log(JSON.stringify(it3.next())); // { value: [ "foo", 42 ], done: false }
            console.log(JSON.stringify(it4.next())); // { value: [ "foo", 42 ], done: false }

            // More examples

            const a = [1, 2, 3, 4, 5];

            // Getting the iterator for the array
            var it5 = a[Symbol.iterator]();

            var [x, y] = it5; // take just the first two elements from `it` -> destructing  and iterator

            var [z, ...w] = it5; // take the third, then the rest all at once -> continute the destruction from third element

            // is `it` is fully exhausted? Yep.

            it5.next(); // { value: undefined, done: true }

            console.log(x); // 1
            console.log(y); // 2
            console.log(z); // 3
            console.log(w);

        }
    },
    {
        "categoryId": CodeTypesEnum.ADVANCED,
        "title": "Implementing our own iterator",
        "description": "We can easily implement an interator by defining a Symbol.iterator function in it",
        "code": () => {

            var tasks = {
                // We make thae tasks object iterable by defining the "Symbol.iterator" method.
                // The task iterator returns an object which is an iterator that implement the "next" method and 
                // uses a closure 'steps' that is unique for each iterator instance.

                [Symbol.iterator]() {

                    const steps = this.actions.slice();

                    return {

                        // make the iterator an iterable
                        [Symbol.iterator]() {
                            return this;
                        },

                        /* The iterator protocol defines a standard way to produce a sequence of values
                          (either finite or infinite), and potentially a return value when all values have been generated.
                          An object is an iterator when it implements a next() method with the following semantics.

                          The iterable protocol specifies than an object is iterable if it implements a method accessed by 
                          the [Symbol.iterator] key. It’s called implicitly when using for..of loop or other constructs that
                          expect an iterable object. */

                        next(...args) {
                            if (steps.length > 0) {
                                // We invoke the step with the provided args, we also shift the steps from the list
                                let res = steps.shift()(...args);
                                return {
                                    value: res,
                                    done: false
                                };
                            } else {
                                return {
                                    done: true
                                };
                            }
                        }
                    };
                },
                actions: []
            };

            // USAGE - Feeding the actions

            tasks.actions.push(
                function step1(x) {
                    console.log("step 1:", x);
                    return x * 2;
                },
                function step2(x, y) {
                    console.log("step 2:", x, y);
                    return x + (y * 2);
                },
                function step3(x, y, z) {
                    console.log("step 3:", x, y, z);
                    return (x * y) + z;
                }
            );

            // Get the tasks iterator
            var it = tasks[Symbol.iterator]();

            // Calling next with argments

            it.next(10); // step 1: 10
            // { value: 20, done: false }

            it.next(20, 50); // step 2: 20 50
            // { value: 120, done: false }

            it.next(20, 50, 120); // step 3: 20 50 120
            // { value: 1120, done: false }

            console.log(JSON.stringify(it.next())); // { done: true }
        },

    },
    {
        categoryId: CodeTypesEnum.ADVANCED,
        title: "Extending number to be an iterable",
        description: "Using define property to define Symbol.iterator on number",
        code: () => {
            if (!Number.prototype[Symbol.iterator]) {

                Object.defineProperty(
                    Number.prototype,
                    Symbol.iterator, { // We name the new property - Sumbol.iterator
                        writable: true,
                        configurable: true,
                        enumerable: false,
                        value: function () { // The property value is an object implementing the iterator protocol
                            // "this" is number! The + sign extracts its value forcin Number.valueOf to execute
                            var i, inc, done = false,
                                top = +this;

                            // iterate positively or negatively?
                            inc = 1 * (top < 0 ? -1 : 1);

                            return {
                                // make the iterator itself an iterable!
                                [Symbol.iterator]() {
                                    return this;
                                },
                                next() {

                                    if (!done) {
                                        // initial iteration always 0
                                        if (i == null) {
                                            i = 0;
                                        }
                                        // iterating positively
                                        else if (top >= 0) {
                                            i = Math.min(top, i + inc);
                                        }
                                        // iterating negatively
                                        else {
                                            i = Math.max(top, i + inc);
                                        }
                                        // done after this iteration?
                                        if (i == top) done = true;
                                        return {
                                            value: i,
                                            done: false
                                        };
                                    } else {
                                        return {
                                            done: true
                                        };
                                    }
                                }
                            };
                        }
                    }
                );
            }

            for (let i of 3) {
                console.log(i);
            }
            // 0 -1 -2 -3
            console.log([...-3]);
        }
    }
];