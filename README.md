### Credit Card Generator

A lightweight typescript library that uses the fast and lightweight [Luhn implementation](https://github.com/credit-card-stuffs/luhn) to generate valid credit cards.

### Overview

Below is an overview of the package.

### Install

Package can be installed using npm cli

```
npm i @credit-card-stuffs/ccgen
```

### Import

You can import like any other npm package

```ts
import { ccgen } from "@credit-card-stuffs/ccgen"
```

### Basic

You control the data generated through masks and everything can be customized in the generator options.

```ts
const cards = ccgen(
    {
        generation: {
            masks: {
                targets: {
                    number: {
                        mask: "4xxxxxxxxxxxxxxx",
                    },
                    cvv: {
                        mask: "xxx",
                    },
                },
            },
            date: {
                month: {
                    generate: true,
                },
                year: {
                    generate: true,
                },
            },
        },
    },
    5
)
console.log(cards)
// [
//      {
//          metadata: { brand: "visa" },
//          expiration: { month: "02", year: "2024" },
//          identifier: { number: "4638862591704015", cvv: "365" }
//      },
//      ...
// ]
```

In this example of use, we are generating 5 credit cards that start with the number 4.
