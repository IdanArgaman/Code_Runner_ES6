const CodeTypesEnum = {
    BASIC: "BASIC",
    ADVANCED: "ADVANCED"
}

export default [{
        "categoryId": CodeTypesEnum.BASIC,
        "title": "",
        "description": "",
        "code": () => {
            var desc = "awesome";

            function tag(strings, ...values) {

                // s is an accamulator, we joing the value in the current index and then 'v' which
                // is the string in the string array

                return strings.reduce(function (acc, v, idx) {
                    return acc + (idx > 0 ? values[idx - 1] : "") + v;
                }, "" /* initial acc values */ );

            }

            var text = tag `Everything is ${desc}!`;
            console.log(text);
        }
    },
    {
        categoryId: CodeTypesEnum.ADVANCED,
        title: "",
        description: "",
        code: () => {
            function dollarify(strings, ...values) {

                return strings.reduce(function (s, v, idx) {
                    if (idx > 0) {
                        if (typeof values[idx - 1] == "number") {
                            s += `$${values[idx-1].toFixed( 2 )}`;
                        } else {
                            s += values[idx - 1];
                        }
                    }
                    return s + v;
                }, "");
            }

            var amt1 = 11.99,
                amt2 = amt1 * 1.08,
                name = "Kyle";

            var result = dollarify `Thanks for your purchase, ${name}! Your
                product cost was ${amt1}, which with tax comes out to ${amt2}.`;

            console.log(result);
        }
    }
];