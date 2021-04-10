/* eslint-disable */

const CodeTypesEnum = {
    BASIC: "BASIC"
}

export default [{
        "categoryId": CodeTypesEnum.BASIC,
        "title": "Functions default values before ES6",
        "description": "",
        "code": () => {
            // Problems with default value technics before ES6

            ///////
            // 1 //
            ///////

            function foo(x, y) {
                // ❌ Checking for falsy value this way is a bit dangerous, becuase 0 is falsy in JS
                x = x || 11;
                y = y || 31;
                console.log(x + y);
            }

            foo(); // 42
            foo(5, 6); // 11
            foo(5); // 36
            foo(null, 6); // 17

            console.log("NOTE foo(0):");
            foo(0);

            ///////
            // 2 //
            ///////

            function bar(x, y) {
                x = (0 in arguments) ? x : 11;
                y = (1 in arguments) ? y : 31;
                console.log(x + y);
            }

            bar(5); // 36
            bar(5, undefined);
        }
    },
    {
        categoryId: CodeTypesEnum.BASIC,
        title: "Functions default values using ES6",
        description: "",
        code: () => {
            function test(x = 11, y = 31) {
                console.log(x + y);
            }

            test(); // 42
            test(5, 6); // 11
            test(0, 42); // 42
            test(5); // 36

            // 👍 "undefined" is considered as missing value but "null" isn't!

            test(5, undefined); // 36 <-- `undefined` is missing
            test(5, null); // 5 <-- null coerces to `0`
            test(undefined, 6); // 17 <-- `undefined` is missing
            test(null, 6); // 6 <-- null coerces to `0
        }
    },
    {
        categoryId: CodeTypesEnum.BASIC,
        title: "Complex expressions as default values",
        description: "",
        code: () => {

            // 👍 The default value expressions are lazily evaluated, meaning they're only 
            // run if and when they're needed

            function bar(val) {
                console.log("bar called!");
                return y + val;
            }

            // Note that the value for "x" is evaluated first
            // so it gets availalbe for the "bar(x)" expression used for "z"
            // Note the "y" is available because it is defined globally!
            function foo(x = y + 3, z = bar(x)) {
                console.log(`x: ${x}, z: ${z}`);
            }

            var y = 5;

            // We don't provide values for either parameters,
            // so the default expressions get evaluated.
            // x = y + 3 -> x = 5 + 3 -> x = 8
            // z = bar(x) -> z = bar(8) -> z = 5 + 8 -> z = 13
            foo();

            // We've provided the value for "x", so only the expression for "z" gets evaluated
            // z = bar(x) -> z = bar(10) -> z = 5 + 10 -> z = 15
            foo(10);

            y = 6;

            // Undefined equal missing a value.
            // So the first default value expression gets evaluated.
            // x = y + 3 -> x = 6 + 3 -> x = 9
            foo(undefined, 10);

        }
    },
    {
        categoryId: CodeTypesEnum.BASIC,
        title: "Complex default value expression",
        description: "Understand variable resolvement",
        code: () => {
            /* 
                From Oreilly - You Don 't Know JS - ES6 and Beyond (page 17):
                formal parameters in a function declaration are in their own scope -
                think of it as a scope bubble wrapped around just the(..) of the
                function declaration — not in the function body’s scope. That means a 
                reference to an identifier in a default value expression first matches the
                formal parameters’ scope before looking to an outer scope */

            var w = 1,
                z = 2;

            // According to the above rule:
            // 'z' is the problem here because it is considered to be used before it gets defined
            // 'w' is defined in the outer scope ONLY so no problem at it.
            function foo(x = w + 1, y = x + 1, z = z + 1) {
                console.log(x, y, z);
            }

            foo();
        }
    },
    {
        categoryId: CodeTypesEnum.BASIC,
        title: "More default value expressions",
        description: "",
        code: () => {
            // Default value as IIFE
            function foo(x = (function (v) {
                return v + 11;
            })(31)) {
                console.log(x);
            }

            foo(); // 42

            // Default callback value

            function ajax1(url, cb = function () {
                console.log('no impl');
            }) {
                cb();
            }

            ajax1("http://some.url.1");

            // OR

            // 👍 Since the early days of JS, there’s been a little known but useful quirk available
            // to us: Function.prototype is itself an empty no - op function!

            function ajax2(url, cb = Function.prototype) {
                cb();
            }

            ajax2("http://some.url.1");
        }
    }
];