## Install

`npm install @dzek69/password-policy --save`

## Use

For default configuration simply import the function, pass the value and get the result:

```javascript
import validate from "@dzek69/password-policy";

const result = validate("this is a password");
if (result.valid) {
    // save the password
}
else {
    // warn the user
    alert("Your password is " + result.percentage + "% secure. You need better password.");
}
```

{@link Validator validate} function uses single argument only and returns {@link Result} object.

## Tweak values

The policy can be tweaked a little. To create tweaker validator use `tweaked.js` file:
```javascript
import createValidate from "@dzek69/password-policy/tweaked";

const validate = createValidate({
    fullPoints: 30,
    requiredPercentage: 50,
    minUniqueChars: 6,
});
```

For full reference of configuration object see {@link TweakedOptions}

## ES5 code

ES5 transpiled code can be found inside `dist` directory. Import example:

```javascript
import validate from "@dzek69/password-policy/dist";
// or
const validate = require("@dzek69/password-policy/dist");
```
