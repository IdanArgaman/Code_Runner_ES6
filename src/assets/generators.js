const CodeTypesEnum = {
    BASIC: "BASIC",
    ADVANCED: "ADVANCED"
}

export default [{
        "categoryId": CodeTypesEnum.BASIC,
        "title": "Generartor Inner Working",
        "description": "Describe the generators inner working",
        "code": () => {
            (() => {
                // We can debug the function to see how generators work
                function* foo() {
                    var x = 10;
                    var y = 20;

                    yield; // Iterator returns and paused

                    var z = x + y;
                    return z;
                }

                // ⚠️ The generator doesn't run yet!!!
                var it = foo();

                // Now it is running. The iterator's body executes until the yield keyword.
                console.log(it.next()); // {value: undefined, done: false} -> Since we don't return anything in the yield, we get undefine as value!
                console.log(it.next()); // {value: 30, done: true} -> We get the value returned by the generator, z! We also get "done" as the generartor's status
            })();
        },
    },
    {
        categoryId: CodeTypesEnum.BASIC,
        title: "Generator Examples",
        description: "",
        code: () => {
            (() => {
                console.log("Random numbers using generators:");

                function* bar() {
                    // This generator never ends!
                    while (true) {
                        yield Math.random();
                    }
                }

                var it2 = bar();

                console.log(JSON.stringify(it2.next()));
                console.log(JSON.stringify(it2.next()));
                console.log(JSON.stringify(it2.next()));
            })();

            (() => {
                function* gap() {
                    // What will be the value of x?
                    const x = yield 10;

                    // What will be logged?
                    console.log(x);
                }
                var it3 = gap();

                // Exceutes the iterator which returns the yielded value (10) 
                // ❗❗❗ BEFORE ❗❗❗ setting x's value
                it3.next();

                /*  From kyle simpson book:
                    When we resume the generator using the it.next(..) provided with a value 
                    the value we used will ❗❗❗ replace ❗❗❗ the "yield 10"
                    expression! So that means the provided value will be assigned to the x variable.
                */
                it3.next(5);

            })();

            (() => {
                // Another example of calling next with value
                function* taz() {
                    // All the "yield" expressions will be replaced with the value
                    // provided to next(...)
                    var arr = [yield 1, yield 2, yield 3];
                    console.log(arr, yield 4);
                }

                // Get the iterator
                var it = taz();

                console.log(JSON.stringify(it.next(5))); // There is not previous yield so the 5 value doesn't influence anything
                console.log(JSON.stringify(it.next(6))); // 6 becomes first array item
                console.log(JSON.stringify(it.next(7))); // 7 becomes second array item
                console.log(JSON.stringify(it.next(8))); // 7 becomes third array item
                it.next(9); // the value return from 'yield 4'
            })();
        }
    },
    {
        categoryId: CodeTypesEnum.ADVANCED,
        title: "Yield delegation",
        description: "using the yield * to delegate to another iterable",
        code: () => {
            // Look at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield*

            // Besides generator objects, yield* can also yield other kinds of iterables
        }
    }
];