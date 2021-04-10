const CodeTypesEnum = {
    BASIC: "BASIC"
}

export default [{
        "categoryId": CodeTypesEnum.BASIC,
        "title": "Understanding ES6 const",
        "description": "",
        "code": () => {
            /*
                Using Symbol() function will NOT create a global Symbol that is available in your
                whole codebase.To create Symbols available across files and even across
                realms(each of which has its own global scope), use the methods Symbol.for()
                and Symbol.keyFor() to set and retrieve Symbols from the global Symbol registry. */

            /* 
                Every Symbol() call is guaranteed to return a unique Symbol.Every Symbol.for("key")
                call will always return the same Symbol for a given value of "key". */

            /*  The Symbol.for(key) method searches for existing symbols in a runtime-wide symbol
                registry with the given key and returns it if found. Otherwise a new symbol gets
                reated in the global symbol registry with this key. */

            console.log(Symbol.for('bar') === Symbol.for('bar'));
            // expected output: true

            console.log(Symbol('bar') === Symbol('bar'));
            // expected output: false

            const symbol1 = Symbol.for('foo');

            console.log(symbol1.toString());
            // expected output: "Symbol(foo)"
        }
    },
    {
        categoryId: CodeTypesEnum.BASIC,
        title: "Symbols as Object Properties",
        description: "",
        code: () => {
            /*  If a symbol is used as a property/key of an object, it’s stored in a special
                way that the property will not show up in a normal enumeration of the object’s 
                properties. */

            const o = {
                foo: 42,
                [Symbol("bar")]: "hello world",
                baz: true
            };

            console.log(Object.getOwnPropertyNames(o));
            Object.getOwnPropertySymbols(o);
        }
    }
];