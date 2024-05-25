/* eslint-disable */
const CodeTypesEnum = {
  BASIC: "BASIC",
};

export default [
  {
    categoryId: CodeTypesEnum.BASIC,
    title: "Async",
    description: "",
    code: () => {
      /*
        The result of an async function is always a Promise:
            Any value that is returned (explicitly or implicitly) is used to fulfill the Promise.
            Any exception that is thrown is used to reject the Promise.
        */

      // The return value is implicitly transformed to a fullfiled promise
      async function asyncFunc() {
        return 123; // (A)
      }

      asyncFunc().then((result) => {
        console.log(result, 123);
      });

      // Returned Promises are not wrapped
      async function asyncFunc() {
        return Promise.resolve("abc");
      }
    },
  },
  {
    categoryId: CodeTypesEnum.BASIC,
    title: "for await...of",
    description: "",
    code: async () => {
      /*
            for-await-of loop, which is an asynchronous version of the for-of loop. 
            It can be used in async functions and async generators.
        */

      // In addition to asynchronous iterables, it also supports synchronous iterables
      for await (const x of ["a", "b"]) {
        console.log(x);
      }

      // And it supports synchronous iterables over values that are wrapped in Promises:
      const arr = [Promise.resolve("a"), Promise.resolve("b")];
      for await (const x of arr) {
        console.log(x);
      }

      function sleep(ms) {
        console.log("Started: " + ms);
        return new Promise((resolve) => setTimeout(() => resolve(ms), ms));
      }

      // We wait for the first promise and only when settled we await on the second one!
      async function test() {
        for await (const x of [sleep(10000), sleep(5000)]) {
          console.log(x);
        }
      }

      test();
    },
  },
  {
    categoryId: CodeTypesEnum.BASIC,
    title: "for await...of with generators",
    description: "",
    code: async () => {
        function* generatorWithRejectedPromises() {
            try {
              yield 0;
              yield 1;
              yield Promise.resolve(2);
              yield Promise.reject(3);
              yield 4;
              throw 5;
            } finally {
              console.log("called finally");
            }
          }
          
          (async () => {
            try {
              for await (const num of generatorWithRejectedPromises()) {
                console.log(num);
              }
            } catch (e) {
              console.log("caught", e);
            }
          })();
          
          // 0
          // 1
          // 2
          // caught 3 - The for await takes into account rejected promises and breaks the
          // iteration in case of rejected promise!
          
          //////////////////////////////
          // Compare with for-of loop //
          //////////////////////////////
          
          try {
            for (const numOrPromise of generatorWithRejectedPromises()) {
              console.log(numOrPromise);
            }
          } catch (e) {
            console.log("caught", e);
          }

          // 0
          // 1
          // Promise { 2 }
          // Promise { <rejected> 3 }
          // 4
          // caught 5
          // called finally
    },
  },
];
