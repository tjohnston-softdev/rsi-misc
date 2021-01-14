/*
	Clears all content, formatting, etc from both Input and Output sheets.
	The header in the Input sheet will stay.
*/


// Main function
function executeClear()
{
  var spreadsheetFile = SpreadsheetApp.getActiveSpreadsheet();

  var inputSheetObject = spreadsheetFile.getSheetByName("Input");
  var outputSheetObject = spreadsheetFile.getSheetByName("Output");

  clearInput(inputSheetObject);
  outputSheetObject.clear();
}



// Removes content columns from input sheet.
function clearInput(inpSheet)
{
  var rowCount = inpSheet.getLastRow();
  var colCount = inpSheet.getLastColumn();
  var contentRange = inpSheet.getRange(1, 2, rowCount, colCount - 1);

  contentRange.clear();
}
