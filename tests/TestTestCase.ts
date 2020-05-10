import TestCase from '../src/ligh-test';

export default class TestTestCase extends TestCase {
    testAssertTrue() {
        this.assertTrue(1 == 1);
    }

    testAssertFalse() {
        this.assertFalse(1 != 1);
    }

    testAssertEqual() {
        this.assertEqual(5, 5);
    }

    testAssertNotEqual() {
        this.assertNotEqual(5, 6);
    }

    testAssertLess() {
        this.assertLess(6, 7);
    }

    testAssertLessOrEqual() {
        this.assertLessOrEqual(6, 7);
        this.assertLessOrEqual(7, 7);
    }

    testAssertGreater() {
        this.assertGreater(7, 6);
    }

    testAssertGreaterOrEqual() {
        this.assertGreaterOrEqual(7, 6);
        this.assertGreaterOrEqual(7, 7);
    }

    testAssertIsNull() {
        this.assertIsNull(null);
    }

    testAssertNotNull() {
        this.assertNotNull(0);
    }

    testAssertThrows() {
        this.assertThrows(() => { throw 0 });
    }

    testAssertThrowsFailure() {
        this.assertThrows(() => {
            this.assertThrows(() => { return 0 });
        });
    }
}
