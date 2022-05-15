const CodeTypesEnum = {
  BASIC: "BASIC",
};

export default [
  {
    categoryId: "Snippet",
    title: "",
    description: "",
    code: () => {
      /*
         A promise  will be in one of 3 possible states:

            Fulfilled: onFulfilled() will be called (e.g., resolve() was called)
            Rejected: onRejected() will be called (e.g., reject() was called)
            Pending: not yet fulfilled or rejected

        A promise or “thenable” is an object that supplies a standard-compliant
        .then() method.

        .then() may be called many times on the same promise. In other words, 
        a promise can be used to aggregate callbacks.

        ---------------------------------------------------------------------------

        Regarding: 

        save().then(
            handleSuccess,
            handleError
        );

        What happens if handleSuccess() throws an error? The promise returned from .then()
        will be rejected, but there’s nothing there to catch the rejection — meaning that 
        an error in your app gets swallowed. Oops! For that reason, some people consider 
        the code above to be an anti-pattern, and recommend the following, instead:
            
        save()
            .then(handleSuccess)
            .catch(handleError);

        Let's handle them both, look at this: 

        save()
            .then(
                handleSuccess,
                handleNetworkError          // Handles errors in save()
            )
            .catch(handleProgrammerError)   // Handles errors in "handleSuccess"

        */
    },
  },
  {
    categoryId: "Snippet",
    title: "Thenable object",
    description:
      "We can use await with promise as well as any object that implements a then function.",
    code: async () => {
      const thenable = {
        then: function(callback) {
          setTimeout(() => callback(2), 100);
        },
      };

      const value = await thenable;
      console.log(value); // 2
    },
  },
  {
    categoryId: CodeTypesEnum.BASIC,
    title: "Promise 'race' and 'any'",
    description: "",
    code: () => {
      /*
        Promise.race takes the first settled (resolved or rejected) Promise.
        Promise.any takes the first fulfilled (resolved only) Promise.
    */

      () => {
        // -> expected output: "failed with reason: two"

        const promise1 = new Promise((resolve) => {
          setTimeout(resolve, 500, "one");
        });

        const promise2 = new Promise((resolve, reject) => {
          setTimeout(reject, 100, "two");
        });

        Promise.race([promise1, promise2])
          .then((value) => {
            console.log("succeeded with value:", value);
          })
          .catch((reason) => {
            // Promise2 is faster
            console.log("failed with reason:", reason);
          });
      };

      () => {
        // -> expected output: "succeeded with value: one"

        const promise1 = new Promise((resolve) => {
          setTimeout(resolve, 500, "one");
        });

        const promise2 = new Promise((resolve, reject) => {
          setTimeout(reject, 100, "two");
        });

        Promise.any([promise1, promise2])
          .then((value) => {
            // Promise2 is faster but "any" cares of resolved promise only
            console.log("succeeded with value:", value);
          })
          .catch((reason) => {
            console.log("failed with reason:", reason);
          });
      };
    },
  },
  {
      categoryId: 'Snippet',
      title: "",
      description: "",
      code: () => {
        /*
        Most Promise-based functions are executed as follows:
            ❗ Their execution starts right away, synchronously (in the current task).
              But the Promise they return is guaranteed to be settled 
              asynchronously (in a later task) – if ever.
        */
        
        function asyncFunc() {
          // 1
          console.log('asyncFunc');
          return new Promise((resolve) => {
              // 2 - The promise body execute in the current task!
              console.log('new Promise()');
              resolve();
            });
        }

        // 3
        console.log('START');

        asyncFunc()
          .then(() => {
            // 5
            console.log('.then()'); // (A)
          });

        // 4
        console.log('END');
        
        // Output:
        // 'START'
        // 'asyncFunc'
        // 'new Promise()'
        // 'END'
        // '.then()'
        
      }
  },
  {
    categoryId: "Snippet",
    title: "Chaining",
    description: "",
    code: () => {
      const wait = (time) =>
        new Promise((res) => setTimeout(() => res(), time));

      wait(200)
        // onFulfilled() can return a new promise
        .then(() => new Promise((res) => res("foo")))
        // a will be wrapped into a promise
        .then((a) => a)
        // .then() above returns a fulfilled promise
        // with that value:
        .then((b) => console.log(b)) // 'foo'
        // Note that `null` is a valid promise value:
        .then(() => null)
        .then((c) => console.log(c)) // null
        // The following error is not reported yet:
        .then(() => {
          throw new Error("foo");
        })
        // Instead, the returned promise is rejected
        // with the error as the reason:
        .then(
          // Nothing is logged here due to the error above:
          (d) => console.log(`d: ${d}`),
          // Now we handle the error (rejection reason)
          (e) => console.log("Hi " + e)
        ) // [Error: foo]
        // With the previous exception handled, we can continue:
        .then((f) => console.log(`f: ${f}`)) // f: undefined
        // The following doesn't log. e was already handled,
        // so this handler doesn't get called:
        .catch((e) => console.log(e))
        .then(() => {
          throw new Error("bar");
        })
        // When a promise is rejected, success handlers get skipped.
        // Nothing logs here because of the 'bar' exception:
        .then((g) => console.log(`g: ${g}`)) // Skipped
        .then((g) => console.log(`g: ${g}`)) // Skipped
        .then((g) => console.log(`g: ${g}`)) // Skipped
        .then((g) => console.log(`g: ${g}`)) // Skipped
        .catch((h) => {
          console.log("Hi again: " + h);
          return "From catch!";
        }) // [Error: bar]
        .then((e) => console.log('I"m here! ' + e));
    },
  },
  {
    categoryId: "Snippet",
    title: "catch gotchas",
    description: "",
    code: () => {
      // Errors thrown inside asynchronous functions will act like uncaught errors
      var p2 = new Promise(function(resolve, reject) {
        setTimeout(function() {
          throw new Error("Uncaught Exception!");
        }, 1000);
      });

      p2.catch(function(e) {
        console.error(e); // This is never called
      });

      // Errors thrown after resolve is called will be silenced
      var p3 = new Promise(function(resolve, reject) {
        resolve();
        throw new Error("Silenced Exception!");
      });

      p3.catch(function(e) {
        console.error(e); // This is never called
      });
    },
  },
  {
    categoryId: "Snippet",
    title: "",
    description: "",
    code: () => {
      /* 
            The finally block doesn’t receive any value, and anything returned from finally is 
            not considered in the then block so the output from the last then is used.
        */
      const promise = new Promise((res) => res(2));
      promise
        .then((v) => {
          console.log(v);
          return v * 2;
        })
        .then((v) => {
          console.log(v);
          return v * 2;
        })
        .finally((v) => {
          // doesn't recieve any value in v
          console.log(v);
          // return value ignored
          return v * 2;
        })
        .then((v) => {
          // v is the value from the last then
          console.log(v);
        });
    },
  },
  {
    categoryId: "Snippet",
    title: "Cancel Token",
    description: "",
    code: () => {
      function someLongProcess(url, cancelToken = Promise.reject()) {
        return new Promise((resolve, reject) => {
          const timeId = setTimeout(() => {
            resolve({
              id: 1,
              name: "Idan",
            });
          }, 5000);

          // We listen to the cancel token!
          cancelToken.then(() => {
            clearTimeout(timeId);
            reject("Cancelled");
          });
        });
      }

      let resolve = null;

      someLongProcess(
        "http://localhost:3000",
        new Promise((r) => {
          resolve = r;
        })
      )
        .then((data) => {
          console.log(JSON.stringify(data));
        })
        .catch((reason) => {
          console.log(reason);
        });

      setTimeout(() => {
        resolve();
      }, 2000);
    },
  },
  {
    categoryId: "Snippet",
    title: "Another implementation of generic cancellable promise",
    description: "",
    code: () => {
      const spec = (fn, cancelPrm) => {
        return new Promise((resolve, reject) => {
          const registerCancelEvent = (cancelEventHandler) => {
            cancelPrm.then(cancelEventHandler);
          };

          fn(resolve, reject, registerCancelEvent);
        });
      };

      const someAsync = (url, cancel) =>
        spec((resolve, reject, registerCancelEvent) => {
          const timeId = setTimeout(() => {
            resolve("Some Async Resolved!");
          }, 5000);

          registerCancelEvent(() => {
            clearTimeout(timeId);
            reject("Some Async Cancled!");
          });
        }, cancel);

      someAsync(null, new Promise((resolve) => setTimeout(resolve, 6000)))
        .then((x) => console.log(x))
        .catch((x) => console.log(x));
    },
  },
];
