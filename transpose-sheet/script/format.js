/*
	Formats input and output sheets:
		* Headers will be bolded and centered.
		* Contents will have all formatting removed.
*/



// Main function.
function executeFormat()
{
  var spreadsheetFile = SpreadsheetApp.getActiveSpreadsheet();
  var inputSheetObject = spreadsheetFile.getSheetByName("Input");
  var outputSheetObject = spreadsheetFile.getSheetByName("Output");

  formatInputSheet(inputSheetObject);
  formatOutputSheet(outputSheetObject);
}



// Input sheet.
function formatInputSheet(sheetObj)
{
  var rowCount = -1;
  var colCount = -1;
  var formatStatus = null;
  var headerRange = null;
  var headerWeights = [];
  var contentRange = null;
  
  
  // Reads sheet dimensions.
  rowCount = sheetObj.getLastRow();
  colCount = sheetObj.getLastColumn();
  formatStatus = getFormatStatus(colCount);

  
  // Format header if it exists.
  if (formatStatus.header === true)
  {
    headerRange = sheetObj.getRange(1, 1, rowCount, 1);
    headerWeights = getInputHeaderWeights(rowCount);

    headerRange.clearFormat();
    headerRange.setHorizontalAlignment("center");
    headerRange.setVerticalAlignment("middle");
    headerRange.setFontWeights(headerWeights);
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



/*
	Prepares header weights for input sheet.
	For some reason, bolding them all at once causes a bug so using an MD array avoids this.
*/

function getInputHeaderWeights(rCount)
{
  var rowIndex = 0;
  var currentWeight = [];
  var weightRes = [];

  for (rowIndex = 0; rowIndex < rCount; rowIndex = rowIndex + 1)
  {
    currentWeight = ['bold'];
    weightRes.push(currentWeight);
  }

  return weightRes;
}