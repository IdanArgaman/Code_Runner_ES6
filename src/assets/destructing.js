const CodeTypesEnum = {
    BASIC: "BASIC",
    ADVANCED: "ADVANCED"
}

export default [{
        "categoryId": CodeTypesEnum.BASIC,
        "title": "Examples of ES6 destructing",
        "description": "",
        "code": () => {
            (() => {
                function foo() {
                    return [1, 2, 3];
                }

                function bar() {
                    return {
                        x: 4,
                        y: 5,
                        z: 6
                    };
                }

                var a, b, c, x, y, z;
                [a, b, c] = foo();

                // Note that using this short syntax without the 'var' keyword is not allowed
                // unless we enclose the statement using angle brackets becuase the 'var' would
                // be considered as declaration

                ({
                    x,
                    y,
                    z
                } = bar()); // We will get 'Uncaught SyntaxError: Unexpected token =' if we omit  the ()

                console.log(a, b, c); // 1 2 3
                console.log(x, y, z); // 4 5 6

                // Good example for population empty object literal

                var o = {};

                // Creates the a,b,z properties on the object literal
                [o.a, o.b, o.c] = foo();

                // Creates the x,y,z properties on the object literal
                ({
                    x: o.x,
                    y: o.y,
                    z: o.z
                } = bar());

                console.log(o.a, o.b, o.c); // 1 2 3
                console.log(o.x, o.y, o.z); // 4 5 6
            })();

            (() => {
                // OBJECT TO ARRAY

                var o1 = {
                        a: 1,
                        b: 2,
                        c: 3
                    },
                    a2 = [];

                ({
                    a: a2[0],
                    b: a2[1],
                    c: a2[2]
                } = o1);
            })();

            (() => {
                // ARRAY TO OBJECT

                var a1 = [1, 2, 3],
                    o2 = {};

                [o2.a, o2.b, o2.c] = a1;

                console.log(o2.a, o2.b, o2.c); // 1 2 3
            })();

            (() => {
                // REARRANGE ARRAY

                var a1 = [1, 2, 3],
                    a2 = [];

                // Note that we must decalre a2 variable before using it, the compiler won't be able to guess it type by
                // by evaluating the expression next line

                [a2[2], a2[0], a2[1]] = a1; // Great! we destruct the array to its indicies but in a different order

                console.log(a2);
            })();

            (() => {
                // SWAP

                var x = 10,
                    y = 20;

                // The right operand creates an array from x and y variables
                // The left operand destructs the array to y and x -> actually swapping them!
                [y, x] = [x, y];

                console.log(x, y);
            })();
        }
    },
    {
        categoryId: CodeTypesEnum.ADVANCED,
        title: "An adavnaced destruct example",
        description: "",
        code: () => {

            // We declare the base object we want to merge with
            var defaults = {
                options: {
                    remove: true,
                    enable: false,
                    instance: {}
                },
                log: {
                    warn: true,
                    error: true
                }
            };

            // This object will be merged with the defaults
            var config = {
                options: {
                    remove: false,
                    instance: null
                }
            };

            console.dir(defaults);
            console.dir(config);

            // We create a scope to enclose the let expressiond
            {

                // If config doesn't contain an 'options' property we use the
                // {} object for destruction, and because that object doesn't contain
                // any poperty the default values will be used for the 'remove','enable','instance'
                // variables. Note that these variables will be created using the 'let' keyword
                // so we can use them inside the enclosing block only.

                // Using the following code block we create: 
                // 'remove', 'enable', 'instance', 'warn', 'error' variables

                let {
                    // Get to the options property (if exists) on config
                    options: {
                        // Use config.options.remove OR the default value!
                        remove = defaults.options.remove,
                        enable = defaults.options.enable,
                        instance = defaults.options.instance
                    } = {},
                    log: {
                        warn = defaults.log.warn,
                        error = defaults.log.error
                    } = {}
                } = config;

                // Now we will construct config, with the values we've created above.
                // This have the effect of merging objects.
                config = {
                    options: {
                        remove,
                        enable,
                        instance
                    },
                    log: {
                        warn,
                        error
                    }
                };
            }

            console.dir(config);
        }
    }
]