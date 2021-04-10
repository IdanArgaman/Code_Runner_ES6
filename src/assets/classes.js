const CodeTypesEnum = {
    BASIC: "BASIC"
}

export default [{
        "categoryId": CodeTypesEnum.BASIC,
        "title": "Understanding ES6 static",
        "description": "",
        "code": () => {
            class Foo {
                /*
                  According to http://exploringjs.com/es6/ch_classes.html
                  For the sake of finishing ES6 classes in time, they were deliberately designed to be “maximally minimal”.
                  That’s why you can currently only create static methods, getters, and setters, but not static data properties.
                  There is a proposal for adding them to the language.
                */

                static answer = 42;
                static cool() {
                    console.log("cool");
                }
            }

            class Bar extends Foo {
                constructor() {
                    super();
                    /*
                        👍
                        The new.target pseudo-property lets you detect whether a function or constructor
                        was called using the new operator. In constructors and functions invoked using
                        the new operator, new.target returns a reference to the constructor or
                        function. In normal function calls, new.target is undefined.
                    */
                    console.log(new.target.answer);
                }
            }

            // We can access static members on a subclass
            // This is different from the prototype patterns we've used
            // to create static members.
            console.log(Foo.answer); // 42
            console.log(Bar.answer); // 42
            Bar.cool();

            // Static memebers are not accessible by instances!
            var b = new Bar(); // 42
            console.log(b.answer); // undefined
            b.cool();
        }
    },
    {
        categoryId: CodeTypesEnum.BASIC,
        title: "New feature - Computed class property names",
        description: "",
        code: () => {
            const prefix = "user_";

            const o = {
                baz: function () {},
                // We can have a computed proerty name directly inside the object literal
                [prefix + "foo"]: function () {
                    console.log(prefix + "foo");
                },
                [prefix + "bar"]: function () {
                    console.log(prefix + "bar");
                },

                // Even in concise method
                [prefix + "test"]() {
                    console.log(prefix + "test");
                }
            };

            o[prefix + "foo"]();
            o[prefix + "bar"]();
            o[prefix + "test"]();
        }
    }
]