# ligh-test

`ligh-test` (pronounced "lightest") is a lightweight test framework for TypeScript and JavaScript. It is only a few hundred lines of code, and has no external dependencies; this means it's easy to understand and prevents bloating your `node_modules` folder.

## Usage

Install `ligh-test`:
```
npm install @jacobdweightman/ligh-test --save-dev
```

Test cases are created by subclassing `TestCase`. The particular tests, then, are the methods of this test case whose names start with "test". For example:
```
import TestCase from 'ligh-test';

function double(x: number): number {
    return x * 2;
}

export default class ExampleTest extends TestCase {
    testDouble() {
        this.assertEqual(double(5), 10);
        this.assertEqual(double(0), 0);
    }
}
```

In order for `ligh-test` to find your tests, it currently uses an index file. The test index is another JS/TS file that exports an array of instances of your test cases. For the example above, this would look like
```
import ExampleTest from 'path/to/example-test';

export default [
    new ExampleTest()
];
```

Finally, you can run your tests using
```
ligh-test path/to/compiled/test-index.js
```

## Contributing

This project is new and small. If you run into any trouble or have ideas for improvements or new features, feel free to open an issue or create a pull request.

Some possible next steps for `ligh-test` include automated test discovery (so that it is no longer necessary to maintain the test index) and a more comprehensive set of test assertions.
