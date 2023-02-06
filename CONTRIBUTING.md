# Contributing guidelines

Quokka template engine is currently a private library. 
While Quokka.Ts typescript implementation is a public repository, 
at the moment we don't expect people outside of Mindbox to contribute. 

However, feel free to contact us if you have any questions.

## Testing

```
npm test
```

## Building

```
npx webpack
```

## Publishing

```
npm publish
```

Note that this command will automatically perform the webpack build (by executing the `prepare` script), 
so you don't have to call `npx webpack` before publishing.

You'll have to set up the npm authorization first.

## Changing Quokka grammar 

This JS port uses the same ANTLR grammar that is used in the C# implementation. 
You should always be working with the grammar files from the [main Quokka repository](https://github.com/mindbox-cloud/Quokka) (currently private).

Use `antlr4ts-cli` tool to regenerate ANTLR4 lexer, visitor etc.
