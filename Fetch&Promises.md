# Fetch and Promises

- A new(better) API for making asynchronous HTTP requests have also been implemented by modern browsers ( Fetch API).

- The new Fetch API is meant to replace XMLHttpRequest.

- Goal: make fetching data easier

- Benefit: the advantage of Promise is the ability to chain multiple asynchronous tasks together linearly.


## Asynchronous promises

- A promise does the same thing as callbacks. But we get to use a linear flow for implementing the callbacks instead of nested flow

```
const doAfterDelay = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, 300);
  })
};

doAfterDelay("hello world").then((data) => {
    console.log(data);
})
//After 300 milliseconds, console will log "hello world"


doAfterDelay('hello world').then((data) => {
  return doAfterDelay(data);
}).then((data) => {
  console.log(data);
});
// After 600 milliseconds, console will log "hello world"
```

1. - Inside `doAfterDelay`, we are creating a new Promise object. It will pass two functions to this argument, `resolve` and `reject`.

- `resolve` : let the Promise object know when asynchronous task has completed sucessfully

- A Promise can only be in one of three states:
pending: when the promise is created, this is the initial state.
fulfilled: when the operation completed successfully, triggered by a resolve() call.
rejected: when the operation failed, triggered by a reject() call.

```
const doAfterDelay = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, 300);
  })
};

```
2. `doAfterDelay` is ran and after 3 seconds, we console log  the data

```
doAfterDelay('hello world').then((data) => {
  console.log(data);
});
```
---

### How promises process 3 states:pending, fullfiled and reject

- Function A is invoked, the 300 milliseconds setTimeout count down begins. At the same time, the Promise object is returned by doAfterDelay function. The Promise is still in "pending" state.

- The returned Promise object stores the functions defined in the .then() method into a queue. Queued functions will be called when the Promise resolves into a "fulfilled" state.

- After 300 milliseconds has passed, resolve(data) is called. The Promise now turns into a "fulfilled" state permanently. It cannot go back to "pending" or change to "rejected".

-The queued then() function is invoked, logging the data object passed on by resolve(data) to the console. We get "hello world" in the console.


## Rejecting a promise

- Not all asynchronous tasks are going to be completed successfully, it could be network issues, it could be erroneous inputs, etc

```
const flipCoin = new Promise((resolve, reject) => {
  if (Math.random() < 0.5) {
    resolve('Success');
  }
  reject(new Error('Failure, better luck next time'));
  // Error creates a JS error object with a message, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
});
flipCoin.then((data) => {
  console.log(data);
}).catch((error) => {
  console.log(error.message);
})


```

## Throw an error

- The reject() is used in the primary Promise functon to turn the Promise object into a "rejected" state.However, if we need to discontinue the task chain due to discovery of an error in subsequent tasks, we need to be able to stop further execution of .then() methods

```
const biasedCoin = () => {
  return new Promise((resolve, reject) => {
    const num = Math.random();
    if (Math.random() > 0.5) {
      resolve(num);
    }
    resolve(1);
    // This coin is biased, will only return decimal larger than 0.5 or 1
  });
}
biasedCoin().then((num) => {
  if (num === 1) {
    throw new Error('Math.random() should not produce whole number');
  }
  if (num > 0.5) {
    console.log('Coin flip got Head.');
  } else {
    console.log('Coin flip got Tail.');
  }
  return num;
}).then((num) => {
  console.log('The num was ', num);
}).catch((error) => {
  console.log(error.message);
})
```

- When the Error is thrown, any subsequent .then() methods will be skipped, and the .catch()method will be invoked.

- This is useful because when dealing with a chain of tasks, we need the ability to stop future tasks from executing because we have discovered an error.