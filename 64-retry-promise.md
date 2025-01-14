<h1>title</h1>

<br/>
<br/>

```javascript
//https://bigfrontend.dev/problem/retry-promise-on-rejection

function fetchWithAutoRetry(fetcher, maximumRetryCount) {
  return fetcher().catch((e) => {
    if (maximumRetryCount === 0) {
      throw e;
    } else {
      return fetchWithAutoRetry(fetcher, maximumRetryCount - 1);
    }
  });
}
```
