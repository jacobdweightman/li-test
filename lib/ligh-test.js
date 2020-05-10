#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TestResult;
(function (TestResult) {
    TestResult[TestResult["success"] = 0] = "success";
    TestResult[TestResult["failure"] = 1] = "failure";
    TestResult[TestResult["error"] = 2] = "error";
})(TestResult = exports.TestResult || (exports.TestResult = {}));
class TestCase {
    setUp() { }
    tearDown() { }
    assertTrue(x) {
        if (!x) {
            console.error(`Test failure: expected ${x} to be true`);
            throw TestResult.failure;
        }
    }
    assertFalse(x) {
        if (x) {
            console.error(`Test failure: expected ${x} to be false`);
            throw TestResult.failure;
        }
    }
    assertEqual(x, y) {
        if (!(x === y)) {
            console.error(`Test failure: expected ${x} === ${y}`);
            throw TestResult.failure;
        }
    }
    assertNotEqual(x, y) {
        if (!(x != y)) {
            console.error(`Test failure: expected ${x} != ${y}`);
            throw TestResult.failure;
        }
    }
    assertLess(x, y) {
        if (!(x < y)) {
            console.error(`Test failure: expected ${x} < ${y}`);
            throw TestResult.failure;
        }
    }
    assertLessOrEqual(x, y) {
        if (!(x <= y)) {
            console.error(`Test failure: expected ${x} <= ${y}`);
            throw TestResult.failure;
        }
    }
    assertGreater(x, y) {
        if (!(x > y)) {
            console.error(`Test failure: expected ${x} > ${y}`);
            throw TestResult.failure;
        }
    }
    assertGreaterOrEqual(x, y) {
        if (!(x >= y)) {
            console.error(`Test failure: expected ${x} >= ${y}`);
            throw TestResult.failure;
        }
    }
    assertIn(item, collection) {
        if (collection instanceof Set || collection instanceof Map) {
            // Able to check these types in O(1) time.
            if (collection.has(item))
                return;
        }
        else {
            for (let collectionItem of collection) {
                if (collectionItem === item)
                    return;
            }
        }
        console.error(`Test failure: ${item} isn't in collection [`);
        for (let collectionItem of collection) {
            console.error(`\t${collectionItem},`);
        }
        console.error("]");
        throw TestResult.failure;
    }
    assertIsNull(x) {
        if (!(x === null)) {
            console.error(`Test failure: expected ${x} to be null`);
            throw TestResult.failure;
        }
    }
    assertNotNull(x) {
        if (!(x != null)) {
            console.error(`Test failure: expected ${x} to be non-null`);
            throw TestResult.failure;
        }
    }
    assertThrows(f) {
        try {
            f();
        }
        catch (_a) {
            return;
        }
        console.error(`Test failure: expected ${f.toString()} to throw an error.`);
        throw TestResult.failure;
    }
}
exports.default = TestCase;
class TestRunner {
    constructor() {
        this.total = 0;
        this.failures = 0;
        this.errors = 0;
        this.results = [];
    }
    run(testCase) {
        let testCaseClass = Object.getPrototypeOf(testCase);
        // discover the tests on the test case. These are methods with the
        // signature `() => void` and names that start with 'test'.
        Object.getOwnPropertyNames(testCaseClass).forEach(propertyName => {
            let property = testCase[propertyName];
            if (propertyName.substring(0, 4) === "test" && property) {
                this.runTest(testCase, propertyName, property.bind(testCase));
            }
        });
    }
    runTest(testCase, testName, test) {
        try {
            this.total++;
            testCase.setUp();
            test();
            testCase.tearDown();
            // if no assertions fail, the test passed
            this.results.push(TestResult.success);
        }
        catch (result) {
            // failed assertions and errors will both be caught here since a
            // TestResult.failure is thrown. If an error occurs, print it.
            if (result instanceof Error) {
                console.error(result);
                this.results.push(TestResult.error);
                this.errors++;
            }
            else if (result == TestResult.failure) {
                this.results.push(TestResult.failure);
                console.log(`in ${testName}\n`);
                this.failures++;
            }
        }
    }
    printResults() {
        console.log(this.results.map((value) => {
            switch (value) {
                case TestResult.success:
                    return ".";
                case TestResult.failure:
                    return "F";
                case TestResult.error:
                    return "E";
            }
        }).join(''));
        console.log("------------------------------");
        console.log(`Ran ${this.total} tests with ${this.failures} failures and ${this.errors} errors.\n`);
    }
}
if (require.main === module) {
    let testIndexPath = process.argv[2];
    console.log(`Using index file at ${testIndexPath}`);
    Promise.resolve().then(() => require(testIndexPath)).then((index) => {
        let testCases = index.default;
        let runner = new TestRunner();
        for (let testCase of testCases) {
            runner.run(testCase);
        }
        runner.printResults();
    });
}
