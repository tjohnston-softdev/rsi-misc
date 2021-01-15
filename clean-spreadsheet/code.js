/*
	This script removes empty rows from a target spreadsheet.
	Discourages large sheets from reaching the total cell limit.
*/


// Global settings
var settingsObject =
{
  targetFileID: "SPREADSHEET FILE ID",
  targetSheetName: "SHEET NAME",
  ignoreHeader: true,
  displayCellCounts: true
};



// Main Function
function runSpreadsheetClean()
{
  var sheetFile = null;
  var sheetObject = null;
  var originalDimensions = {};
  var rowSpecs = {};
  var selectedRange = null;
  var sheetContents = [];
  var updatedDimensions = {};
  var cleanSuccessful = false;


  // Opens input sheet.
  sheetFile = SpreadsheetApp.openById(settingsObject.targetFileID);
  sheetObject = sheetFile.getSheetByName(settingsObject.targetSheetName);

  
  // Reads original sheet dimensions.
  originalDimensions = readDimensions(sheetObject);
  rowSpecs = getRangeRows(sheetObject, originalDimensions);


  // If there are content rows:
  if (rowSpecs.count > 0)
  {
    // Read original data.
	selectedRange = sheetObject.getRange(rowSpecs.start, 1, rowSpecs.count, originalDimensions.cols);
    sheetContents = selectedRange.getValues();
	
	// Remove empty rows.
    cleanRowsLoop(sheetContents);
    selectedRange.setValues(sheetContents);
	
	// Read updated sheet dimensions.
    updatedDimensions = readDimensions(sheetObject);
    cleanSuccessful = true;
  }

  
  // Display before and after cell counts if required.
  if (cleanSuccessful === true && settingsObject.displayCellCounts === true)
  {
    displayCellCount("Before", originalDimensions);
    displayCellCount("After", updatedDimensions);
  }

}


// Reads number of rows and columns in a sheet.
function readDimensions(sObject)
{
  var readRes = {"rows": -1, "cols": -1};

  readRes.rows = sObject.getLastRow();
  readRes.cols = sObject.getLastColumn();

  return readRes;
}


// Decides where to start row selection based on whether a header is used.
function getRangeRows(sObject, dimensionsObject)
{
  var rowRes = {start: -1, count: -1};

  if (settingsObject.ignoreHeader === true)
  {
    // Sheet has header - Start at second row.
	rowRes.start = 2;
    rowRes.count = dimensionsObject.rows - 1;
  }
  else
  {
    // No header - Start at first row.
	rowRes.start = 1;
    rowRes.count = dimensionsObject.rows;
  }

  return rowRes;
}


// Remove empty rows loop.
function cleanRowsLoop(sContents)
{
  var rowIndex = 0;
  var loopCutoff = sContents.length;
  var currentRowObject = [];
  var currentRowLength = -1;

  var colIndex = 0;
  var currentCell = null;
  var currentString = "";


  // Outer loop reads data rows.
  while (rowIndex >= 0 && rowIndex < loopCutoff)
  {
    currentRowObject = sContents[rowIndex];
    currentRowLength = 0;

    colIndex = 0;
    currentCell = null;
    currentString = "";

    
	// Inner loop sums total length of row cells.
	for (colIndex = 0; colIndex < currentRowObject.length; colIndex = colIndex + 1)
    {
      currentCell = currentRowObject[colIndex];
      currentString = String(currentCell);
      currentRowLength += currentString.length;
    }

    
	if (currentRowLength > 0)
    {
      // Row has content.
	  rowIndex = rowIndex + 1;
    }
    else
    {
      // Row empty - Move to end of row set.
	  sContents.splice(rowIndex, 1);
      sContents.push(currentRowObject);
      loopCutoff = loopCutoff - 1;
    }

  }
  
}


// Displays total number of cells.
function displayCellCount(fieldLabel, dimensionsObject)
{
  var totalCells = dimensionsObject.rows * dimensionsObject.cols;
  var messageText = fieldLabel + ": " + totalCells;
  Logger.log(messageText);
}