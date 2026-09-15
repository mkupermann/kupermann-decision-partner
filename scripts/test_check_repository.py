"""Regression checks for drift in the published example; no files are modified."""
import unittest

import check_repository as checker


class WorkedExampleChecks(unittest.TestCase):
    def setUp(self):
        checker.ERRORS.clear()
        self.document = (checker.ROOT / "docs" / "worked-example.md").read_text(encoding="utf-8")

    def test_published_example_passes(self):
        checker.check_example(self.document)
        self.assertEqual(checker.ERRORS, [])

    def reject_change(self, old, new, diagnostic):
        self.assertIn(old, self.document)
        checker.check_example(self.document.replace(old, new, 1))
        self.assertTrue(any(diagnostic in error for error in checker.ERRORS), checker.ERRORS)

    def test_wrong_displayed_result(self):
        self.reject_change("| 480 hours |", "| 481 hours |", "row 3")

    def test_changed_input_requires_recalculation(self):
        self.reject_change("| 6 reported minutes", "| 7 reported minutes", "row 1")

    def test_stale_carried_value(self):
        self.reject_change("| 480 × EUR 50 |", "| 481 × EUR 50 |", "inconsistent carried values")

    def test_wrong_break_even(self):
        self.reject_change("**2.5 net minutes**", "**2.6 net minutes**", "incorrect break-even")

    def test_missing_table_fails_explicitly(self):
        self.reject_change("## 2. Make", "## Removed. Make", "section missing")


if __name__ == "__main__":
    unittest.main()
