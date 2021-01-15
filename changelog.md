# Changelog
---

**./transpose-sheet/script/format.js**
* Sheet column widths will be automatically adjusted.
	* Handled by the 'setColumnWidths' function.
	* Final width will be: ([autoResizeColumn](https://developers.google.com/apps-script/reference/spreadsheet/sheet#autoresizecolumncolumnposition) + 25)
* Main file comment:
	* Added 'column width' description.
	* Clarified that headers will have no additional formatting.
* Removed the 'headerWeights' variable from 'formatInputSheet'.
* Removed the 'getInputHeaderWeights' function.
* Removed header bolding from 'formatInputSheet' due to a bug skipping this action.
	* Moving to a separate function: 'boldInputHeader' fixed this bug.
	* Header bolding remains in 'formatOutputSheet' as normal.

---

**./transpose-sheet/script/transpose.js**
* Added new global variable 'clearCompletedInput'.
	* If true, input data will be removed after successful transpose.
* Added new variable 'writeSuccessful' to 'executeTranspose'. Set after 'writeOutputContents' is finished.
* Wrote new function 'eraseInputData'.
* Changed 'Global' comment to plural.

---

**./transpose-sheet/index.md**
* Added 'clearCompletedInput' row to the program settings table.
* Lowercased 'clearExistingOutput' example cell.
* Added dividers between sections.
* Simplified 'example' comment.
* Reworded the sentence: "It was to give my boss..."
