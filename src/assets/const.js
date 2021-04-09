/* eslint-disable */

const CodeTypesEnum = {
    BASIC: "BASIC"
}

export default [{
    "categoryId": CodeTypesEnum.BASIC,
    "title": "Understanding ES6 const",
    "description": "",
    "code": () => {
        (function () {
            {
                const a = 2;
                console.log(a);
                try {
                    a = 3; // ❌
                } catch (e) {
                    console.log(e);
                }
            }

            {
                const b = [1, 2, 3];
                b.push(4); // OK!!!
                console.log(b); // [1,2,3,4]

                try {
                    b = []; // ❌
                } catch (e) {
                    console.log(e);
                }
            }

        })();
    }
}];