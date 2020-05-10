import TestCase from '../src/ligh-test';

export default class TestTestCase extends TestCase {
    testAssertTrue() {
        this.assertTrue(1 == 1);
    }

    testAssertTrueFailure() {
        this.assertThrows(() => {
            this.assertTrue(false);
        });
    }

    testAssertFalse() {
        this.assertFalse(1 != 1);
    }

    testAssertFalseFailure() {
        this.assertThrows(() => {
            this.assertFalse(true);
        });
    }

    testAssertEqual() {
        this.assertEqual(5, 5);
    }

    testAssertEqualFailure() {
        this.assertThrows(() => {
            this.assertEqual(5, 6);
        });
    }

    testAssertNotEqual() {
        this.assertNotEqual(5, 6);
    }

    testAssertNotEqualFailure() {
        this.assertThrows(() => {
            this.assertNotEqual(5, 5);
        });
    }

    testAssertLess() {
        this.assertLess(6, 7);
    }

    testAssertLessFailure() {
        this.assertThrows(() => {
            this.assertLess(7, 6);
        });
    }

    testAssertLessOrEqual() {
        this.assertLessOrEqual(6, 7);
        this.assertLessOrEqual(7, 7);
    }

    testAssertLessOrEqualFailure() {
        this.assertThrows(() => {
            this.assertLessOrEqual(7, 6);
        });
    }

    testAssertGreater() {
        this.assertGreater(7, 6);
    }

    testAssertGreaterFailure() {
        this.assertThrows(() => {
            this.assertGreater(6, 7);
        });
    }

    testAssertGreaterOrEqual() {
        this.assertGreaterOrEqual(7, 6);
        this.assertGreaterOrEqual(7, 7);
    }

    testAssertGreaterOrEqualFailure() {
        this.assertThrows(() => {
            this.assertGreaterOrEqual(4, 5);
        });
    }

    testAssertInSet() {
        let set = new Set([1, 2, 3]);
        this.assertIn(2, set);
    }

    testAssertInSetFailure() {
        let set = new Set([1, 2, 3]);
        this.assertThrows(() => {
            this.assertIn(4, set);
        });
    }

    testAssertInArray() {
        let arr = [1, 2, 3];
        this.assertIn(2, arr);
    }

    testAssertInArrayFailure() {
        let arr = [1, 2, 3];
        this.assertThrows(() => {
            this.assertIn(4, arr);
        });
    }

    testAssertIsNull() {
        this.assertIsNull(null);
    }

    testAssertIsNullFailure() {
        this.assertThrows(() => {
            this.assertIsNull(0);
        });
    }

    testAssertNotNull() {
        this.assertNotNull(0);
    }

    testAssertNotNullFailure() {
        this.assertThrows(() => {
            this.assertNotNull(null);
        });
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
