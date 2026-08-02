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
    categoryId: CodeTypesEnum.BASIC,
    title: "Self implemented Promise helpers",
    description: "A simple version of Promise.all, Promise.any, Promise.race, and Promise.allSettled.",
    code: () => {
      /*
        These are simplified versions of the native Promise helpers.
        The original Promise.all / Promise.any / Promise.race / Promise.allSettled
        already handle edge cases and built-in behavior for you.
      */

      function myPromiseAll(promises) {
        return new Promise((resolve, reject) => {
          const items = Array.from(promises);
          const results = [];
          let remaining = items.length;

          if (remaining === 0) {
            resolve([]);
            return;
          }

          items.forEach((promise, index) => {
            Promise.resolve(promise)
              .then((value) => {
                results[index] = value;
              })
              .catch(reject)
              .finally(() => {
                remaining -= 1;
                if (remaining === 0) {
                  resolve(results);
                }
              });
          });
        });
      }

      function myPromiseAny(promises) {
        return new Promise((resolve, reject) => {
          const items = Array.from(promises);
          const reasons = [];
          let rejectedCount = 0;

          if (items.length === 0) {
            reject(new Error([]));
            return;
          }

          items.forEach((promise, index) => {
            Promise.resolve(promise)
              .then(resolve)
              .catch((reason) => {
                reasons[index] = reason;
                rejectedCount += 1;

                if (rejectedCount === items.length) {
                  reject(new Error(reasons));
                }
              });
          });
        });
      }

      function myPromiseRace(promises) {
        return new Promise((resolve, reject) => {
          const items = Array.from(promises);

          items.forEach((promise) => {
            Promise.resolve(promise).then(resolve, reject);
          });
        });
      }

      function myPromiseAllSettled(promises) {
        return new Promise((resolve) => {
          const items = Array.from(promises);
          const results = [];
          let remaining = items.length;

          if (remaining === 0) {
            resolve([]);
            return;
          }

          items.forEach((promise, index) => {
            Promise.resolve(promise)
              .then((value) => {
                results[index] = { status: "fulfilled", value };
              })
              .catch((reason) => {
                results[index] = { status: "rejected", reason };
              })
              .finally(() => {
                remaining -= 1;
                if (remaining === 0) {
                  resolve(results);
                }
              });
          });
        });
      }

      const fast = new Promise((resolve) => setTimeout(resolve, 100, "fast"));
      const slow = new Promise((resolve) => setTimeout(resolve, 500, "slow"));
      const fail = Promise.reject("boom");

      myPromiseAll([fast, slow]).then((value) => console.log("all:", value));
      myPromiseAny([fail, fast]).then((value) => console.log("any:", value));
      myPromiseRace([slow, fast]).then((value) => console.log("race:", value));
      myPromiseAllSettled([fast, fail]).then((value) => console.log("allSettled:", value));
    },
  },
  {
    categoryId: "Snippet",
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
        console.log("asyncFunc");
        return new Promise((resolve) => {
          // 2 - The promise body execute in the current task!
          console.log("new Promise()");
          resolve();
        });
      }

      // 3
      console.log("START");

      asyncFunc().then(() => {
        // 5
        console.log(".then()"); // (A)
      });

      // 4
      console.log("END");

      // Output:
      // 'START'
      // 'asyncFunc'
      // 'new Promise()'
      // 'END'
      // '.then()'
    },
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
          // This handles error on the promise returned by the previous .then() call:
          // It doesn't handle errors the comes from the then's body itself, only the promise returned by the then() call.
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
          console.log("Hi again: " + h); // [Error: bar]
          return "From catch!";
        })
        .then((v) => console.log('I"m here! ' + v));
    },
  },
  {
    categoryId: "Snippet",
    title: "catch gotchas",
    description: "",
    code: () => {
      // Errors thrown inside asynchronous functions will act like uncaught errors
      var p2 = new Promise(function() {
        setTimeout(function() {
          throw new Error("Uncaught Exception!");
        }, 1000);
      });

      p2.catch(function(e) {
        console.error(e); // This is never called
      });

      // Errors thrown after resolve is called will be silenced
      var p3 = new Promise(function(resolve) {
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

          // We listen to the cancel token, which is a promise that when resolved
          // we stop the BG operation (clear timeout in this case) and reject the promise!
          cancelToken.then(() => {
            clearTimeout(timeId);
            reject("Cancelled");
          });
        });
      }

      let resolve = null;

      someLongProcess(
        "http://localhost:3000",
        // A cancel token is a promise object we can resolve to trigger cancellation
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
        resolve(); // Trigger the cancel token!
      }, 2000);
    },
  },
  {
    categoryId: "Snippet",
    title: "Another implementation of generic cancellable promise",
    description: "",
    code: () => {
      const convertToCancellablePromise = (fn, cancelToken) => {
        return new Promise((resolve, reject) => {
          const setOnCancelEventHandler = (cancelEventHandler) => {
            cancelToken.then(cancelEventHandler);
          };

          fn(resolve, reject, setOnCancelEventHandler);
        });
      };

      const someAsync = (url, cancel /* cancel token */) => {
        // Spec accepts a function that will be equipped with
        // resolve, reject an a mechanism to listen to cancel.
        // Spec returns a promise that is fullfilled or rejectd by fn!
        // The second param to spec is a cancel token!

        return convertToCancellablePromise(
          /* fn */ (resolve, reject, setOnCancelEventHandler) => {
            const timeId = setTimeout(() => {
              resolve("Some Async Resolved!"); // Resolve the promise returned by spec!
            }, 5000);

            setOnCancelEventHandler(
              /* Triggered on cancel */ () => {
                clearTimeout(timeId);
                reject("Some Async Cancled!"); // Upon cancel, reject the promise returned by spec!
              }
            );
          },
          cancel
        );
      };

      someAsync(
        null,
        /* cancel token */ new Promise((resolve) => setTimeout(resolve, 6000))
      )
        .then((x) => console.log(x))
        .catch((x) => console.log(x));
    },
  },
  {
    categoryId: "Snippet",
    title: "Finally in Promises",
    description: "",
    code: () => {
      // We can also use .finally() before both .then() and .catch().
      // Then what we do in the .finally() callback is always executed
      // before the other two callbacks!

      // We can use finally everywhere in the chain, it is always gets invoked!
      Promise.resolve(123)
        .finally((n) => {
          // Finally ignores its input - n is undefined
          console.log(n);
          console.log("F1");
          return 456; // The return value is ignored!
        })
        .then((result) => {
          // result is 123
          console.log(result);
          return result; // The return value is ignored!
        })
        .finally((n) => {
          // Finally ignores its input - n is undefined
          console.log(n);
          console.log("F3");
          return "XXX"; // The return value is ignored!
        })
        .then((result) => {
          // result is 123 which is the last value from then
          console.log(result);
        })
        .finally(() => {
          // If the .finally() callback throws an exception, the Promise returned by .finally() is rejected
          throw "error (finally)";
        })
        .then(() => {
          console.log("Hi");
        })
        .catch(() => {
          console.log("error (finally)");
        });

      Promise.reject("rejected")
        .finally(() => {
          // Finally is always called even if the promise is already settled
          console.log("finally");
        })
        .then((result) => {
          console.log("then " + result);
        })
        .catch((error) => {
          console.log("catch " + error);
        });
    },
  },
  {
    categoryId: "Snippet",
    title: "then/catch/finally - the full mental model",
    description:
      "A deep dive into how then/catch/finally pass values along the chain, how thrown errors become rejections, and what happens when a handler returns a promise.",
    code: () => {
      /*
        THE CORE RULE:

        .then(onFulfilled, onRejected) is the only "primitive". Both
        .catch(fn) and .finally(fn) are built on top of it:

            .catch(fn)   === .then(undefined, fn)
            .finally(fn) is special-cased (see below), but conceptually
                         it is close to .then(fn, fn) that forwards its input.

        Every .then/.catch/.finally call returns a BRAND NEW promise.
        That new promise's state depends ONLY on what the handler that
        actually ran did:

          1. Handler returns a plain value  -> new promise FULFILLS with that value.
          2. Handler returns nothing (undefined) -> new promise FULFILLS with undefined.
          3. Handler throws                  -> new promise REJECTS with the thrown value.
          4. Handler returns a promise/thenable P -> new promise "locks on" to P;
             it fulfills/rejects with whatever P eventually does (the chain "flattens").
          5. No matching handler was provided (e.g. a .then(onFulfilled) with no
             onRejected, sitting on a rejected promise) -> the state simply
             passes through UNCHANGED to the next link, skipping every .then()
             until a .catch() (or a .then's 2nd arg) is found.
      */

      // --- 1) .then's success value flows to the next .then's success value ---
      Promise.resolve(1)
        .then((v) => v + 1) // 2
        .then((v) => v + 1) // 3
        .then((v) => console.log("1) chained then:", v)); // 3

      // --- 2) Returning nothing = returning undefined ---
      Promise.resolve("ignored")
        .then((v) => {
          console.log("2) input was:", v);
          // no return here!
        })
        .then((v) => console.log("2) next then got:", v)); // undefined

      // --- 3) A throw inside .then() rejects the NEXT promise, not the current one ---
      // The .then() call itself never throws synchronously - it always returns
      // a promise, and that promise becomes rejected.
      Promise.resolve()
        .then(() => {
          throw new Error("boom in then");
        })
        .then(
          () => console.log("3) this success handler is SKIPPED"),
          (err) => console.log("3) caught via 2nd then() arg:", err.message)
        );

      // --- 4) .catch() only fires on rejection, and is skipped entirely on success ---
      Promise.resolve("ok")
        .then((v) => v) // fulfilled, so...
        .catch((err) => console.log("4) never runs:", err)) // ...this is skipped...
        .then((v) => console.log("4) skips straight through catch to:", v)); // "ok"

      // --- 5) A successful .catch() RECOVERS the chain back to fulfilled! ---
      // This is the classic gotcha: catch() swallows the error and the chain
      // continues as if nothing happened, unless you re-throw.
      Promise.reject("original error")
        .catch((err) => {
          console.log("5) recovering from:", err);
          return "recovered value"; // turns rejection back into fulfillment
        })
        .then((v) => console.log("5) then AFTER catch sees:", v)) // "recovered value"
        .catch((err) => console.log("5) never runs, chain is healthy:", err));

      // --- 6) Throwing INSIDE a .catch() re-rejects the chain with a NEW reason ---
      Promise.reject("first error")
        .catch((err) => {
          console.log("6) handling:", err);
          throw "second error"; // re-throw (or throw something new)
        })
        .catch((err) => console.log("6) caught the re-thrown error:", err));

      // --- 7) then(onFulfilled, onRejected) vs then(fn).catch(fn) ---
      // If onFulfilled ITSELF throws, the sibling onRejected passed to the
      // SAME .then() call will NOT catch it - onRejected only guards the
      // promise .then() was called ON, not errors from onFulfilled.
      Promise.resolve("value")
        .then(
          () => {
            throw "error thrown from onFulfilled";
          },
          (err) => console.log("7) NEVER runs, wrong promise:", err)
        )
        .catch((err) =>
          console.log("7) only a LATER catch sees it:", err)
        );

      // --- 8) Returning a promise from .then() flattens/adopts its state ---
      // The outer promise doesn't settle until the returned inner promise does.
      Promise.resolve()
        .then(() => {
          console.log("8) returning an inner promise...");
          return new Promise((resolve) =>
            setTimeout(() => resolve("inner resolved after delay"), 50)
          );
        })
        .then((v) => console.log("8) outer then unwraps it:", v));

      // --- 9) Returning a REJECTED promise from .then() is like throwing ---
      Promise.resolve()
        .then(() => {
          return Promise.reject("inner promise rejected");
        })
        .then(() => console.log("9) skipped"))
        .catch((err) => console.log("9) caught adopted rejection:", err));

      // --- 10) finally() NEVER sees the value, and CANNOT change it ---
      // Its return value is always ignored, UNLESS it throws or returns a
      // rejected promise - then it overrides the outcome (see #12).
      Promise.resolve("kept value")
        .finally((arg) => {
          console.log("10) finally arg is always undefined:", arg);
          return "ignored return";
        })
        .then((v) => console.log("10) value passes through untouched:", v));

      Promise.reject("kept rejection")
        .finally(() => "ignored, does not recover!")
        .catch((err) =>
          console.log("10b) finally cannot swallow a rejection:", err)
        );

      // --- 11) finally() always runs, on the success AND the failure path ---
      const runBoth = (label, p) =>
        p
          .finally(() => console.log(`11) finally ran for ${label}`))
          .then(
            (v) => console.log(`11) ${label} fulfilled:`, v),
            (err) => console.log(`11) ${label} rejected:`, err)
          );
      runBoth("A", Promise.resolve("A-value"));
      runBoth("B", Promise.reject("B-reason"));

      // --- 12) If finally()'s callback throws (or returns a rejected promise),
      // THAT overrides the original outcome - even if the chain was fulfilled! ---
      Promise.resolve("would have been fine")
        .finally(() => {
          throw "error thrown from finally";
        })
        .then((v) => console.log("12) skipped:", v))
        .catch((err) =>
          console.log("12) finally's throw wins over fulfillment:", err)
        );

      // --- 13) If finally()'s callback returns a PENDING promise, settling is
      // delayed until that promise settles (but the eventual value/reason is
      // still whatever the chain already had, per rule #10/#10b). ---
      Promise.resolve("delayed but unchanged")
        .finally(() => new Promise((resolve) => setTimeout(resolve, 30)))
        .then((v) => console.log("13) delayed, still original value:", v));

      // --- 14) Multiple .then() calls on the SAME promise fan out independently ---
      // .then() does not "consume" the promise; each call subscribes its own
      // pair of callbacks and gets its own derived promise.
      const shared = Promise.resolve("shared value");
      shared.then((v) => console.log("14) subscriber A:", v));
      shared.then((v) => console.log("14) subscriber B:", v));

      // --- 15) Order matters only in the sense of chaining, not calling order ---
      // Handlers always run as microtasks, so ALL synchronous code below runs
      // before any .then/.catch/.finally callback fires.
      Promise.resolve().then(() => console.log("15) microtask callback"));
      console.log("15) synchronous log happens first");
    },
  },
  {
    categoryId: "Snippet",
    title: "Promise.any",
    description: "",
    code: () => {
      /*
      Promise.any() returns a Promise p. How it is settled, depends on the parameter promises 
      (which refers to an iterable over Promises):
        - If and when the first Promise is fulfilled, p is resolved with that Promise.
        - If ***ALL*** Promises are rejected, p is rejected with an instance of AggregateError 
          that contains all rejection values.
      */

      const promises = [
        Promise.reject("ERROR A"),
        Promise.reject("ERROR B"),
        Promise.resolve("result"),
      ];

      Promise.any(promises).then((result) => console.log(result, "result"));

      const promises2 = [
        Promise.reject("ERROR A"),
        Promise.reject("ERROR B"),
        Promise.reject("ERROR C"),
      ];

      Promise.any(promises2).catch((aggregateError) =>
        console.log(aggregateError.errors, ["ERROR A", "ERROR B", "ERROR C"])
      );


      /* NOTE:

      Promise.any() and Promise.race() are also related, but interested in different things:

        Promise.race() is interested in settlements. The Promise which is settled first, “wins”.
        In other words: We want to know about the asynchronous computation that terminates first.

        Promise.any() is interested in fulfillments. The Promise which is fulfilled first, “wins”. 
        In other words: We want to know about the asynchronous computation that succeeds first.
      */
    },
  },
  {
    categoryId: "Snippet",
    title: "Promise.allSettled",
    description: "",
    code: () => {
      // Resolved once all promises are settled
      Promise.allSettled([
        Promise.resolve('a'),
        Promise.reject('b'),
      ])
      // Note the data structure difference between rejected and settled promise
      .then(arr => console.log(arr, [
        { status: 'fulfilled', value:  'a' },
        { status: 'rejected',  reason: 'b' },
      ]));
    },
  },
  {
    categoryId: CodeTypesEnum.BASIC,
    title: "MyPromise - cloning the native Promise",
    description:
      "A from-scratch reimplementation of Promise (states, executor, microtask queue, chaining, the Promises/A+ resolution procedure, catch/finally) to understand how the native one works internally.",
    code: () => {
      /*
        HOW NATIVE PROMISES WORK, IN ONE PARAGRAPH:

        A promise is a state machine with 3 states: pending -> fulfilled or
        pending -> rejected (one-way, and it can only happen once). It holds
        a list of {onFulfilled, onRejected} callback pairs registered via
        .then(). When the promise settles, every registered callback is
        scheduled to run as a MICROTASK (not immediately, not as a macrotask
        like setTimeout). Microtasks run after the current synchronous code
        finishes, but before the event loop picks up the next macrotask
        (setTimeout, I/O, rendering). That's why .then() callbacks always
        run "later", even if the promise was already resolved synchronously
        - this is what makes promises reliably asynchronous.

        Event loop ordering, cheat sheet:
          synchronous code  >  microtasks (Promise callbacks, queueMicrotask)
          >  macrotasks (setTimeout, setInterval, I/O, UI events)
        All pending microtasks drain completely before the next macrotask runs.

        WHAT IS A "THENABLE"?

        A thenable is just any object (or function) that happens to have a
        .then(onFulfilled, onRejected) method - it doesn't need to be an
        actual Promise instance. A plain object like
        { then(cb) { cb(42); } } counts. This is a deliberate, duck-typed
        interop hook in the spec: it's how native Promises, MyPromise
        instances, and any other Promise-like library (jQuery deferreds,
        old Bluebird promises, etc.) can all be awaited/chained
        interchangeably, without needing to share a class hierarchy.

        HOW IT'S HANDLED:

        Whenever a promise is about to be resolved with a value, the engine
        checks "is this value thenable?" (does it have a callable .then?).
          - If NOT thenable -> resolve normally, fulfill with that value.
          - If thenable -> DON'T fulfill with the thenable itself. Instead,
            call its .then(onFulfilled, onRejected) and "lock on" to it:
            wait for it to call onFulfilled/onRejected, and adopt whatever
            state/value IT eventually produces. If that value is ALSO
            thenable, repeat (recursive unwrapping) until a plain value
            falls out.
        This check happens in exactly two places: when a promise's own
        resolve() is called with a thenable, and when a .then() handler
        RETURNS a thenable. Both funnel through the same resolution logic
        (Part 5, #resolveWithThenable below). `await` uses this same
        mechanism, which is why `await thenable` works even for plain
        objects, not just real Promises.
      */

      // ============================================================
      // PART 1 - States, executor, resolve/reject
      // ============================================================

      const STATE = {
        PENDING: "pending",
        FULFILLED: "fulfilled",
        REJECTED: "rejected",
      };

      // Module-level helper (not a class member) so it can be a plain
      // function instead of a private static METHOD - this parser only
      // supports private FIELDS on classes, not private methods.
      const isThenable = (value) =>
        value !== null &&
        (typeof value === "object" || typeof value === "function") &&
        typeof value.then === "function";

      class MyPromise {
        #state = STATE.PENDING;
        #value; // fulfillment value OR rejection reason, once settled

        // Every .then() call registers a callback pair here. We need a LIST
        // (not a single slot) because .then() can be called multiple times
        // on the same promise (see Part 2), and if the promise is still
        // pending when that happens, we must remember all of them.
        #callbacks = [];

        constructor(executor) {
          // The executor runs SYNCHRONOUSLY, immediately, inside the constructor.
          // This mirrors native behavior: `new Promise(fn)` runs `fn` right away.
          try {
            executor(this.#resolve, this.#reject);
          } catch (err) {
            // If the executor throws synchronously, that's equivalent to
            // calling reject(err).
            this.#reject(err);
          }
        }

        // Arrow-function class fields so `this` stays bound when these are
        // passed around as bare `resolve`/`reject` references (which is
        // exactly how the executor receives and calls them). Private
        // METHODS (`#settle() {}`) aren't supported by this parser, so
        // every "method" here is a field holding an arrow function instead.
        #resolve = (value) => {
          this.#settle(STATE.FULFILLED, value);
        };

        #reject = (reason) => {
          this.#settle(STATE.REJECTED, reason);
        };

        #settle = (state, value) => {
          // A promise can only settle ONCE. Calling resolve/reject again
          // after that (or calling both) is a silent no-op - this is what
          // guarantees a promise's outcome never changes.
          if (this.#state !== STATE.PENDING) return;

          // PART 5 preview: resolving with a thenable/promise must adopt
          // its eventual state instead of fulfilling with the thenable
          // itself. See #resolveWithThenable below.
          if (state === STATE.FULFILLED && isThenable(value)) {
            this.#resolveWithThenable(value);
            return;
          }

          this.#state = state;
          this.#value = value;

          // Fire every callback that was registered while we were pending.
          this.#callbacks.forEach((cb) => this.#scheduleCallback(cb));
          this.#callbacks = [];
        };

        // ============================================================
        // PART 3 - Microtask queue
        // ============================================================

        #scheduleCallback = (callback) => {
          // THIS is the single most important line for "why are promises
          // always async": even though `this.#state` is already settled
          // and we could call the handler right now, we defer it with
          // queueMicrotask. That guarantees .then() callbacks NEVER run
          // synchronously, whether the promise settled before or after
          // .then() was called - consistent, predictable ordering.
          queueMicrotask(() => {
            const { onFulfilled, onRejected, resolveNext, rejectNext } = callback;
            const isFulfilled = this.#state === STATE.FULFILLED;
            const handler = isFulfilled ? onFulfilled : onRejected;

            // PART 4 - "no matching handler" pass-through: if .then() was
            // called without an onRejected (or vice versa), forward the
            // current state/value untouched to the next promise in the chain.
            if (typeof handler !== "function") {
              isFulfilled ? resolveNext(this.#value) : rejectNext(this.#value);
              return;
            }

            try {
              // Whatever the handler returns becomes the fulfillment value
              // of the NEXT promise (the one .then() returned). If it
              // returns a thenable, resolveNext will detect that and adopt
              // its state (Part 5).
              const result = handler(this.#value);
              resolveNext(result);
            } catch (err) {
              // A throw inside a handler rejects the NEXT promise, not this one.
              rejectNext(err);
            }
          });
        };

        // ============================================================
        // PART 2 - Multiple .then() callbacks
        // PART 4 - Chaining
        // ============================================================

        then(onFulfilled, onRejected) {
          // .then() always returns a BRAND NEW promise. That new promise's
          // resolve/reject become "resolveNext"/"rejectNext" for whichever
          // handler ends up running above.
          return new MyPromise((resolveNext, rejectNext) => {
            const callback = { onFulfilled, onRejected, resolveNext, rejectNext };

            if (this.#state === STATE.PENDING) {
              // Not settled yet - stash the pair, #settle() will run it later.
              this.#callbacks.push(callback);
            } else {
              // Already settled (e.g. .then() called after the fact, or a
              // second .then() on the same promise) - still goes through
              // the microtask queue, never synchronously.
              this.#scheduleCallback(callback);
            }
          });
        }

        // ============================================================
        // PART 6 - catch()
        // ============================================================

        catch(onRejected) {
          // catch(fn) is just sugar for then(undefined, fn).
          return this.then(undefined, onRejected);
        }

        // ============================================================
        // PART 7 - finally()
        // ============================================================

        finally(onFinally) {
          return this.then(
            (value) => {
              // finally's callback receives no arguments and its return
              // value is ignored UNLESS it throws or returns a rejected
              // promise/thenable - then that overrides the outcome.
              // Returning `onFinally?.()` from inside then() lets Part 5's
              // resolution procedure adopt a thrown/returned rejection.
              return MyPromise.resolve(onFinally?.()).then(() => value);
            },
            (reason) => {
              return MyPromise.resolve(onFinally?.()).then(() => {
                throw reason;
              });
            }
          );
        }

        // ============================================================
        // PART 5 - Promise Resolution Procedure (Promises/A+ "[[Resolve]]")
        // ============================================================

        // Implements the Promises/A+ "2.3 Promise Resolution Procedure".
        // Called whenever we're about to resolve THIS promise with a value
        // that turns out to be thenable (another MyPromise, a native
        // Promise, or any plain object with a .then method).
        #resolveWithThenable = (thenable) => {
          // Self-resolution protection: if a promise's own resolver is
          // handed the promise itself as the resolution value, that's a
          // circular reference (it can never settle) - reject with a
          // TypeError, exactly like native Promise does.
          if (thenable === this) {
            this.#reject(new TypeError("Chaining cycle detected: promise resolved with itself"));
            return;
          }

          // "called" guards against a misbehaving/malicious thenable that
          // invokes both resolve AND reject, or invokes one of them twice -
          // per spec, only the FIRST call counts.
          let called = false;

          try {
            thenable.then(
              (value) => {
                if (called) return;
                called = true;
                // Recursive unwrapping: the value we were just handed might
                // ITSELF be thenable (a promise resolved with a promise
                // resolved with a promise...). Recursing through #resolve
                // (which re-runs this same procedure) flattens the whole
                // chain down to a single non-thenable value or a rejection.
                this.#resolve(value);
              },
              (reason) => {
                if (called) return;
                called = true;
                this.#reject(reason);
              }
            );
          } catch (err) {
            // Edge case: accessing `.then` or calling it throws synchronously.
            if (called) return;
            called = true;
            this.#reject(err);
          }
        };

        // ------------------------------------------------------------
        // Static helpers (mirroring Promise.resolve / Promise.reject)
        // ------------------------------------------------------------

        static resolve(value) {
          if (value instanceof MyPromise) return value;
          return new MyPromise((resolve) => resolve(value));
        }

        static reject(reason) {
          return new MyPromise((_, reject) => reject(reason));
        }
      }

      // ============================================================
      // Demo / sanity checks
      // ============================================================

      // Basic fulfillment + chaining with a returned plain value.
      new MyPromise((resolve) => resolve(1))
        .then((v) => v + 1)
        .then((v) => console.log("basic chain:", v)); // 2

      // Returning a thenable from a handler - the outer chain "flattens"
      // and waits for the inner one (Part 4 + Part 5 recursive unwrapping).
      new MyPromise((resolve) => resolve("start"))
        .then(() => new MyPromise((res) => setTimeout(() => res("inner"), 20)))
        .then((v) => console.log("flattened thenable:", v)); // 'inner'

      // Multiple independent .then() calls on the same promise (Part 2) -
      // both subscribers fire, each gets its own derived promise.
      const shared = new MyPromise((resolve) => resolve("shared"));
      shared.then((v) => console.log("subscriber A:", v));
      shared.then((v) => console.log("subscriber B:", v));

      // Error thrown in a handler rejects the next link; caught by catch().
      new MyPromise((resolve) => resolve())
        .then(() => {
          throw new Error("boom");
        })
        .catch((err) => console.log("caught:", err.message)); // 'boom'

      // finally() always runs, never sees/changes the value.
      new MyPromise((resolve) => resolve(42))
        .finally(() => console.log("cleanup ran"))
        .then((v) => console.log("value survives finally:", v)); // 42

      // Proof it's truly async: sync log always wins over the microtask.
      new MyPromise((resolve) => resolve()).then(() =>
        console.log("microtask (runs after sync code)")
      );
      console.log("synchronous code runs first");
    },
  },
];
