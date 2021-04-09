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
                console.log(a); // 2
                //a = 3; // TypeError!
            }

            {
                const b = [1, 2, 3];
                b.push(4); // OK!!!
                console.log(b); // [1,2,3,4]
            }

        })();
    }
}];