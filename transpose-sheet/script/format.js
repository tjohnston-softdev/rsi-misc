/*
	Formats input and output sheets:
		* Headers will be bolded and centered with no other formatting.
		* Contents will have all formatting removed.
		* Column widths will be automatically adjusted.
*/



// Main function.
function executeFormat()
{
  var spreadsheetFile = SpreadsheetApp.getActiveSpreadsheet();
  var inputSheetObject = spreadsheetFile.getSheetByName("Input");
  var outputSheetObject = spreadsheetFile.getSheetByName("Output");

  formatInputSheet(inputSheetObject);
  formatOutputSheet(outputSheetObject);
  boldInputHeader(inputSheetObject);

  setColumnWidths(inputSheetObject);
  setColumnWidths(outputSheetObject);
}



// Input sheet.
function formatInputSheet(sheetObj)
{
  var rowCount = -1;
  var colCount = -1;
  var formatStatus = null;
  var headerRange = null;
  var contentRange = null;
  
  
  // Reads sheet dimensions.
  rowCount = sheetObj.getLastRow();
  colCount = sheetObj.getLastColumn();
  formatStatus = getFormatStatus(colCount);

  
  // Format header if it exists.
  if (formatStatus.header === true)
  {
    headerRange = sheetObj.getRange(1, 1, rowCount, 1);

    headerRange.clearFormat();
    headerRange.setHorizontalAlignment("center");
    headerRange.setVerticalAlignment("middle");
  }

  
  // Format contents if they exist.
  if (formatStatus.contents === true)
  {
    contentRange = sheetObj.getRange(1, 1, rowCount, colCount - 1);
    contentRange.clearFormat();
  }

}


// Output sheet.
function formatOutputSheet(sheetObj)
{
  var rowCount = -1;
  var colCount = -1;
  var formatStatus = null;
  var headerRange = null;
  var contentRange = null;
  
  // Reads sheet dimensions.
  rowCount = sheetObj.getLastRow();
  colCount = sheetObj.getLastColumn();
  formatStatus = getFormatStatus(rowCount);

  
  // Format header if it exists.
  if (formatStatus.header === true)
  {
    headerRange = sheetObj.getRange(1, 1, 1, colCount);
    headerRange.clearFormat();
    headerRange.setHorizontalAlignment("center");
    headerRange.setVerticalAlignment("middle");
    headerRange.setFontWeight("bold");
  }

  
  // Format contents if they exist.
  if (formatStatus.contents === true)
  {
    contentRange = sheetObj.getRange(2, 1, rowCount - 1, colCount);
    contentRange.clearFormat();
  }
}


// Bolds first column for Input sheet. Done in separate function due to bug.
function boldInputHeader(sheetObj)
{
  var rowCount = -1;
  var colCount = -1;
  var boldRange = null;

  // Reads sheet dimensions.
  rowCount = sheetObj.getLastRow();
  colCount = sheetObj.getLastColumn();

  // If Input sheet not empty, bold header column.
  if (colCount > 0 && rowCount > 0)
  {
    boldRange = sheetObj.getRange(1, 1, rowCount, 1);
    boldRange.setFontWeight("bold");
  }
}


// Adjusts column widths to fit sheet contents.
function setColumnWidths(sheetObj)
{
  var colCount = sheetObj.getLastColumn();

  var loopNumber = 1;
  var currentAutoSize = -1;
  var currentFinalSize = -1;

  for (loopNumber = 1; loopNumber <= colCount; loopNumber = loopNumber + 1)
  {
    // Sets width automatically as base amount.
	sheetObj.autoResizeColumn(loopNumber);
    currentAutoSize = sheetObj.getColumnWidth(loopNumber);
    
	// Set final amount.
	currentFinalSize = currentAutoSize + 25;
    sheetObj.setColumnWidth(loopNumber, currentFinalSize);
  }
}


// Checks sheet dimensions to determine what formatting tasks should be performed.
function getFormatStatus(dimensionNumber)
{
  var statusRes = {header: false, contents: false};

  if (dimensionNumber >= 2)
  {
    // Both header and contents.
	statusRes.header = true;
    statusRes.contents = true;
  }
  else if (dimensionNumber === 1)
  {
    // Header without contents.
	statusRes.header = true;
    statusRes.contents = false;
  }
  else
  {
    // Empty sheet.
	statusRes.header = false;
    statusRes.contents = false;
  }

  return statusRes;
}