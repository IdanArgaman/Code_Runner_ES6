/* eslint-disable */

const CodeTypesEnum = {
    LET: "LET"
}

export default [{
    "categoryId": CodeTypesEnum.LET,
    "title": "Understanding ES6 let",
    "description": "",
    "code": () => {
        (() => {
            'use strict'
            {
                let _value = 'secret'
                function nested() {
                    return _value;
                }
            }

            // ---------- Works in ES5 but it’s broken in ES6

            try {
                console.log(nested()) // nested is not defined
            } catch (e) {
                console.log(e)
            }

        })();

        (() => {
            {
                let _value = 'secret'
                function nested() {
                    return _value;
                }
            }

            // ---------- Works in ES5 but it’s broken in ES6

            console.log(nested()) // nested is not defined
        })();
    }
}];