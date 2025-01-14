<h1>title</h1>

<br/>
<br/>

```javascript
const MAX_CACHE_ENTRIES_ALLOWED = 5;
/**
 * @param {(path: string, config: any) => Promise<any>} getAPI
 * @returns {(path: string, config: any) => Promise<any> & {clearCache: () => void}}
 */
function createGetAPIWithMerging(getAPI) {
  const cache = new Map();
  function getAPIWithMerging(path, config) {
    const key = generateKey(path, config);
    const timestamp = new Date().getTime();

    if (cache.has(key)) {
      const entry = cache.get(key);
      if (timestamp - entry.timestamp <= 1000) {
        return entry.promise;
      }
    }

    const promise = getAPI(path, config);
    const entry = { config, promise, timestamp };
    if (cache.size === MAX_CACHE_ENTRIES_ALLOWED) {
      cache.delete(cache.keys()[0]); // delete first entry
    }
    cache.set(key, entry);
    return promise;
  }

  getAPIWithMerging.clearCache = cache.clear;

  return getAPIWithMerging;
}

function generateKey(path, config) {
  const keys = Object.keys(config);
  const configStr = keys
    .sort((a, b) => a.localeCompare(b))
    .map((k) => k + ":" + config[k].toString())
    .join("&");

  return path + configStr;
}

//https://bigfrontend.dev/problem/merge-identical-API-calls
```
