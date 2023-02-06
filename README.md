# Quokka.Ts


![master](https://github.com/mindbox-cloud/Quokka.Ts/workflows/master/badge.svg) ![npm](https://img.shields.io/npm/v/@mindbox/quokka)

Mindbox.Quokka Typescript implementation.

For now, only a subset of Quokka constructs is supported:

- first-level parameter output (no composite parameters)
- no arithmetic expressions
- no boolean expressions
- no string expressions
- only user-defined functions are supported (no standard function library)
- no condition and iteration blocks (`if` and `for` are not supported)
- no comments

## Installation

```
npm install --save @mindbox/quokka
```

## Usage

```typescript
import { Template } from "@mindbox/quokka";

// Create a template
let template = new Template(
	"Print a parameter: ${ Param }. Also multiply ${ a } and ${ b }: ${ multiply(a, b) }",
	{
    // Optionally provide a function registry object with user-defined functions
		"multiply": (a, b) => a * b
	});

// Render the template. Optionally provide the parameters as an object.
let result = template.render({
	"param": "Mindbox",
	"a": 6,
	"b": 8
});

// Resut:
// Print a parameter: Mindbox. Also multiply 6 and 8: 48
```
