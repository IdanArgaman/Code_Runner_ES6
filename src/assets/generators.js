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
                    return z; // The return value is the iterable completion value!
                }

                // ⚠️ The generator doesn't run yet!!!
                var it = foo();

                // Now it is running. The iterator's body executes until the yield keyword.
                console.log(it.next()); // {value: undefined, done: false} -> Since we don't return anything in the yield, we get undefine as value!

                // {value: 30, done: true} -> We get the completion value which is the value returned by 
                // the generator. We also get "done" as the generartor's status. 
                console.log(it.next());
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
            // The yield* expression is used to delegate to another generator OR iterable object.
            // Look at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield*

            (() => {
                function* foo() {
                    // Because an array is an iterable object, we can delege the yield 
                    // directly to it.
                    yield*[1, 2, 3];
                    return 5000;
                }

                /* The above is the same as:

                    function *foo() {
                        yield 1;
                        yield 2;
                        yield 3;
                    }

                */

                var it = foo();

                console.log(JSON.stringify(it.next()));
                console.log(JSON.stringify(it.next()));
                console.log(JSON.stringify(it.next()));
                console.log(JSON.stringify(it.next()));
            })();

            (() => {
                function* foo() {
                    yield 1;
                    yield 2;
                    yield 3;
                    return 4;
                }

                /* While the 1, 2, and 3 values would be yield`ed out of `*foo() and then out of
                 *bar(), the 4 value returned from *foo() is the completion value of the yield
                 *foo() expression, which then gets assigned to x. */

                function* bar() {
                    var x = yield* foo();
                    console.log(x); // 4
                }

                var it = bar();

                console.log(JSON.stringify(it.next()));
                console.log(JSON.stringify(it.next()));
                console.log(JSON.stringify(it.next()));
                console.log(JSON.stringify(it.next()));
            })();
        }
    },
    {
        categoryId: CodeTypesEnum.ADVANCED,
        title: "Recursive yield",
        description: "An advanced yield usage showing recursion & delegation",
        code: () => {
            function* foo(x) {
                if (x < 3) {
                    x = yield* foo(x + 1);
                }

                return x * 2;
            }


            var it = foo(1);

            // Start the generator
            // It is important to understand the calling "next" only once,
            // completes the generator, there is a single yield in its body
            // so even the recursive pattern, calling next once completes it!

            // The recursion values are 6, 12 and finally 24!
            console.log(JSON.stringify(it.next()));
        }
    },
    {
        categoryId: CodeTypesEnum.BASIC,
        title: "Generator error handling",
        description: "",
        code: () => {
            function* foo() {
                try {
                    // yield -> stop here, get this value, I'm expecting to 
                    // evaluate the value passed to me by the next call to 'next'
                    yield 1;
                } catch (err) {
                    console.log("The excpetion error is: " + err);
                }
                yield 2;
                throw "Hello!";
            }

            var it = foo();

            // next -> starts the iterator until yield expression is found in the generator
            // when yield is encoutered, get its value

            console.log(JSON.stringify(it.next())); // { value: 1, done: false }

            try {
                // The  throw () method resumes the execution of a generator by throwing an
                // error into it and returns an object with two properties done and value.

                // We feed the 'yield 1' expression at *foo with an exception.
                // When this exception expression that replaces 'yield 1' evaluates
                // it will be handled by a catch block if exists.

                // Note that after the exception gets handled the generator body continues
                // and stops at the next yield.

                console.log(JSON.stringify(it.throw("Hi!"))); // Hi! // { value: 2, done: false }

                // Fill 'yield 2' expression with nothing and continue the iterator
                // which throws an exception that isn't handled by its body
                console.log(JSON.stringify(it.next()));

                // Because the iterator throws an exception
                console.log("never gets here");
            } catch (err) {
                console.log(err); // Hello - recieved from the iterator!
            }
        }
    }
];