# Max variables eslint rule

A js-file should contain not a large number of variable declarations (from option).

### Options

```js
{
  "rules": {
    // ...
    "max-variables/max-variables": ["error", 5 /* number of variables */],
  }
}
```

### Valid

The code contains 6 variables (a, b, c, d, i, e), but allowed maximum number of variables is 7.

```js
// for max_variables = 7
const a = 10,
  b = 20;
let c = () => {
  const d = 5;
  for (let i = 0; i < b; i++) {
    let e = 100;
  }
};
```

### Invalid

The code contains 8 variables (a, b, c, d, e, i, j, k), but allowed maximum number of variables is 7.

```js
// for max_variables = 5
let a, b, c;
const d = 20,
  e = 30;
var i = 5,
  j = 6;
while (true) {
  if (i < 0) {
    let k = 7;
    i = 100;
    break;
  }
  i--;
}
```
