### Background

I wrote the original version of this script at the start of 2018. One major component of our Google Drive system was a 'running sheet' used for accounting by administration staff. I was asked by one of the admins to look into an error in the running sheet's functionality. I do not remember the exact details of this incident but before long, I discovered that the error was caused by reaching the total cell limit.

I always assumed that Google Sheets had hard limits of some kind but I never would have guessed that we would actually reach them in our everyday use. As it happens, empty cells and empty rows *do* count against the limit. The way that the running sheet worked is that it would clear rows when no longer needed, but the rows themselves would not be deleted. This was by design in order to avoid cascading effects when multiple people access the sheet at once.  As a result, empty rows in between actual data will build up overtime. Hence, the total cell count will be unnecessarily bloated and the hard cell limit will eventually be reached.

To work around this error, I wrote a script that marks empty rows in the running sheet and moves them to the end of the sheet where they will not count against the cell limit. Furthermore, I set the script to run automatically at the first of every month during the night. This allows the sheet to function normally leaving empty rows in its wake. However, with regular cleaning, it significantly reduces the amount of cells left behind.

To give an example, imagine a sheet with 500 rows and 7 columns (3500 cells total).

* Rows 1 is a header.
* Rows 2-101 have data as normal.
* 102-499 are empty.
* Row 500 has data.

Because of that one filled row at the end, the total cell amount includes all of the empty rows above. After cleaning the sheet, there are only 102 rows with a total cell count of 714. This amounts to the removal of 2786 cells. (79.6% reduction)

---

[Return to Index](./readme.md)