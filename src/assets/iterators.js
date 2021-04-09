/* eslint-disable */

const CodeTypesEnum = {
    BASIC: "BASIC"
}

export default [{
    "categoryId": CodeTypesEnum.BASIC,
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
    }
}];