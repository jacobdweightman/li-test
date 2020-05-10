#!/usr/bin/env node

export type Test = () => void;

export enum TestResult {
    success,
    failure,
    error
}

export default class TestCase {
    setUp() {}

    tearDown() {}

    protected assertTrue(x: boolean): void {
        if(!x) {
            console.error(`Test failure: expected ${x} to be true`);
            throw TestResult.failure;
        }
    }

    protected assertFalse(x: boolean): void {
        if(x) {
            console.error(`Test failure: expected ${x} to be false`);
            throw TestResult.failure;
        }
    }

    protected assertEqual<T>(x: T, y: T): void {
        if(!(x === y)) {
            console.error(`Test failure: expected ${x} === ${y}`);
            throw TestResult.failure;
        }
    }

    protected assertNotEqual<T>(x: T, y: T): void {
        if(!(x != y)) {
            console.error(`Test failure: expected ${x} != ${y}`);
            throw TestResult.failure;
        }
    }

    protected assertLess<T>(x: T, y: T) {
        if(!(x < y)) {
            console.error(`Test failure: expected ${x} < ${y}`);
            throw TestResult.failure;
        }
    }

    protected assertLessOrEqual<T>(x: T, y: T) {
        if(!(x <= y)) {
            console.error(`Test failure: expected ${x} <= ${y}`);
            throw TestResult.failure;
        }
    }

    protected assertGreater<T>(x: T, y: T) {
        if(!(x > y)) {
            console.error(`Test failure: expected ${x} > ${y}`);
            throw TestResult.failure;
        }
    }

    protected assertGreaterOrEqual<T>(x: T, y: T) {
        if(!(x >= y)) {
            console.error(`Test failure: expected ${x} >= ${y}`);
            throw TestResult.failure;
        }
    }

    protected assertIn<T>(item: T, collection: Iterable<T>) {
        if(collection instanceof Set || collection instanceof Map) {
            // Able to check these types in O(1) time.
            if(collection.has(item)) return;
        } else {
            for(let collectionItem of collection) {
                if(collectionItem === item) return;
            }
        }
        console.error(`Test failure: ${item} isn't in collection [`);
        for(let collectionItem of collection) {
            console.error(`\t${collectionItem},`);
        }
        console.error("]");
        throw TestResult.failure;
    }

    protected assertIsNull(x: any): void {
        if(!(x === null)) {
            console.error(`Test failure: expected ${x} to be null`);
            throw TestResult.failure;
        }
    }

    protected assertNotNull(x: any): void {
        if(!(x != null)) {
            console.error(`Test failure: expected ${x} to be non-null`);
            throw TestResult.failure;
        }
    }

    protected assertThrows(f: () => void): void {
        try {
            f();
        } catch {
            return;
        }
        console.error(`Test failure: expected ${f.toString()} to throw an error.`);
        throw TestResult.failure;
    }
}

class TestRunner {
    private total: number = 0;
    private failures: number = 0;
    private errors: number = 0;

    private results: TestResult[] = [];

    run(testCase: TestCase) {
        let testCaseClass = Object.getPrototypeOf(testCase);

        // discover the tests on the test case. These are methods with the
        // signature `() => void` and names that start with 'test'.
        Object.getOwnPropertyNames(testCaseClass).forEach(propertyName => {
            let property = (testCase as {[key: string]: any})[propertyName];
            if(propertyName.substring(0, 4) === "test" && property as Test) {
                this.runTest(testCase, propertyName, property.bind(testCase));
            }
        });
    }

    runTest(testCase: TestCase, testName: string, test: Test) {
        try {
            this.total++;
            testCase.setUp();
            test();
            testCase.tearDown();
            // if no assertions fail, the test passed
            this.results.push(TestResult.success);
        } catch(result) {
            // failed assertions and errors will both be caught here since a
            // TestResult.failure is thrown. If an error occurs, print it.
            if(result instanceof Error) {
                console.error(result);
                this.results.push(TestResult.error);
                this.errors++;
            } else if(result == TestResult.failure) {
                this.results.push(TestResult.failure);
                console.log(`in ${testName}\n`);
                this.failures++;
            }
        }
    }

    printResults(): void {
        console.log(this.results.map((value) => {
            switch(value) {
            case TestResult.success:
                return ".";
            case TestResult.failure:
                return "F";
            case TestResult.error:
                return "E";
            }
        }).join(''));

        console.log("------------------------------")
        console.log(`Ran ${this.total} tests with ${this.failures} failures and ${this.errors} errors.\n`)
    }
}

if(require.main === module) {
    let testIndexPath = process.argv[2];
    console.log(`Using index file at ${testIndexPath}`);

    import(testIndexPath).then((index) => {
        let testCases = index.default as TestCase[];
    
        let runner = new TestRunner();
    
        for(let testCase of testCases) {
            runner.run(testCase);
        }
        runner.printResults();
    });
}
