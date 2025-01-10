```javascript
window.myLocalStorage = {
  getItem(key) {
    try {
      const { value, maxAge, createdAt } = JSON.parse(
        localStorage.getItem(key)
      );

      if (maxAge !== undefined && Date.now() - createdAt >= maxAge) {
        this.removeItem(key);
        return null;
      }

      return value;
    } catch (e) {
      return null;
    }
  },

  setItem(key, value, maxAge) {
    const entry = {
      value,
      maxAge,
      createdAt: Date.now(),
    };

    localStorage.setItem(key, JSON.stringify(entry));
  },

  removeItem(key) {
    return localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  },
};
//https://bigfrontend.dev/problem/localStorage-with-expiration
```
