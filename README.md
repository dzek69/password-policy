# password-policy

My own password policy for apps I'm creating implemented in JavaScript. 

## Documentation

Documentation can be found here: [password-policy documentation](https://dzek69.github.io/password-policy).
Jump directly to usage information: [password-policy usage](https://dzek69.github.io/password-policy/tutorial-EXAMPLE.html).

## Demo

Demo can be found here: [password-policy demo](https://dzek69.github.io/password-policy/demo).

## Features

- returns valid flag, "security level" in percents (for nice progress bars under password inputs) and scored points
(for demo purposes, but you can save it with the password too, so if you wanna enforce better passwords in the future
you can do it)
- tweakable, but by default it should:
    - filter out most weak passwords,
    - prevent reusing same characters,
    - be BS-free and requiring just unique characters, not different character ranges (lower/upper case letters,
    numbers, some "special chars" and that kind of typical BS) 
- es6+ first approach, >3% browsers usage transpiled version to be found inside `dist` folder *

\* - transpiling kills JS engines optimizations, makes codes longer and tree shaking harder to do and/or slower

## Should I use it?

It's your choice if you like the idea. I published this for my own needs. Still would like to hear your thoughts/ideas.

## To be done

- Unit tests ?

## License

MIT
