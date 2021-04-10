/* eslint-disable */

const CodeTypesEnum = {
    BASIC: "BASIC"
}

export default [{
        "categoryId": CodeTypesEnum.BASIC,
        "title": "Understanding ES6 let",
        "description": "Example of TDZ",
        "code": () => {
            /*
                The whole point of the TDZ is to make it easier to catch errors where accessing a variable before it’s 
                declared in user code leads to unexpected behavior
            */

            try {
                there = 'far away'; // ❌ ReferenceError: there is not defined
                let there = 'dragons';
            } catch (e) {
                console.log(e);
            }

            /*
              Declaring a method that references "there" before it’s defined is okay,
              AS LONG AS the method doesn’t  get executed while there is in the TDZ, and
              there will be in the TDZ for as long as the let there statement isn’t reached.
            */

            // The following code is OK

            function readThere() {
                return there2; // Uses "there" but it is not get called until "there" gets defined!
            }

            let there2 = 'dragons'
            console.log(readThere()) // <- 'dragons'
        }
    },
    {
        categoryId: CodeTypesEnum.BASIC,
        title: "Let Examples",
        description: "",
        code: () => {
            var funcs = [];
            for (let i = 0; i < 5; i++) { // NOTE 'let'
                funcs.push(function () {
                    console.log(i);
                });
            }

            funcs[3](); // 3

            funcs = [];
            for (var i = 0; i < 5; i++) { // NOTE 'var'
                funcs.push(function () {
                    console.log(i);
                });
            }

            funcs[3](); // 5
        }
    }
];