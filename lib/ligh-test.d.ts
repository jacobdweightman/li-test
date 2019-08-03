#!/usr/bin/env node
export declare type Test = () => void;
export declare enum TestResult {
    success = 0,
    failure = 1,
    error = 2
}
export default class TestCase {
    setUp(): void;
    tearDown(): void;
    protected assertTrue(x: boolean): void;
    protected assertFalse(x: boolean): void;
    protected assertEqual<T>(x: T, y: T): void;
    protected assertNotEqual<T>(x: T, y: T): void;
    protected assertLess<T>(x: T, y: T): void;
    protected assertLessOrEqual<T>(x: T, y: T): void;
    protected assertGreater<T>(x: T, y: T): void;
    protected assertGreaterOrEqual<T>(x: T, y: T): void;
    protected assertIsNull(x: any): void;
    protected assertNotNull(x: any): void;
    protected assertThrows(f: () => void): void;
}
