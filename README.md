# Fetch and Promises

- A new(better) API for making asynchronous HTTP requests have also been implemented by modern browsers ( Fetch API).

- The new Fetch API is meant to replace XMLHttpRequest.

- Goal: make fetching data easier

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

