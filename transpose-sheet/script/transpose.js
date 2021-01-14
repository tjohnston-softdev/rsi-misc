// Reads horizontal column input from spreadsheet and transposes it into vertical row output.


// Global variable.
var clearExistingOutput = true;


// Main function
function executeTranspose()
{
  var spreadsheetFile = null;
  var inputSheetObject = null;
  var outputSheetObject = null;

  var inputRowCount = -1;
  var inputColCount = -1;
  var outputContentExists = false;

  var inputRange = null;
  var inputEntry = [];
  var transposedData = {header: null, contents: null};
  var transposeSuccessful = false;

  
  // Opens spreadsheet file.
  spreadsheetFile = SpreadsheetApp.getActiveSpreadsheet();
  inputSheetObject = spreadsheetFile.getSheetByName("Input");
  outputSheetObject = spreadsheetFile.getSheetByName("Output");

  
  // Clears output sheet if required.
  if (clearExistingOutput === true)
  {
    outputSheetObject.clear();
  }
  
  
  // Reads input sheet dimensions.
  inputRowCount = inputSheetObject.getLastRow();
  inputColCount = inputSheetObject.getLastColumn();
  
  // Checks if output sheet has content.
  outputContentExists = checkOutputExists(outputSheetObject);

  
  // IF input sheet not empty, read and transpose content.
  if (inputRowCount > 0 && inputColCount > 0)
  {
    inputRange = inputSheetObject.getRange(1, 1, inputRowCount, inputColCount);
    inputEntry = inputRange.getValues();
    transposedData.contents = transposeInputEntry(inputEntry, inputColCount);
    transposeSuccessful = checkTransposeSuccessful(transposedData);
  }
  
  
  if (transposeSuccessful === true)
  {
    // Separate header row from contents.
	separateHeader(transposedData);
	
	// Write transposed input data to output sheet.
    writeOutputHeader(outputSheetObject, transposedData.header);
    writeOutputContents(outputSheetObject, transposedData.contents);
  }

  
}



// Checks whether output sheet has any content based on dimensions.
function checkOutputExists(outputSheetObj)
{
  var rCount = outputSheetObj.getLastRow();
  var cCount = outputSheetObj.getLastColumn();
  var checkRes = false;

  if (rCount > 0 && cCount > 0)
  {
    checkRes = true;
  }

  return checkRes;
}


// Converts input data from column to row format.
function transposeInputEntry(inpArray, colCount)
{
  var columnIndex = 0;
  var currentOutputRow = [];

  var rowIndex = 0;
  var currentInputRow = [];
  var currentCell = "";

  var transposeRes = [];


  // Outer loop reads input sheet columns.
  for (columnIndex = 0; columnIndex < colCount; columnIndex = columnIndex + 1)
  {
    // Begin new output row.
	currentOutputRow = [];

    rowIndex = 0;
    currentInputRow = [];
    currentCell = "";

    // Inner loop reads column cells per row.
	while (rowIndex >= 0 && rowIndex < inpArray.length)
    {
	  currentInputRow = inpArray[rowIndex];
      currentCell = "";

      if (columnIndex >= 0 && columnIndex < currentInputRow.length)
      {
        // Read row cell from current column.
		currentCell = currentInputRow[columnIndex];
      }

      
	  // Add column cell to transposed row.
	  currentOutputRow.push(currentCell);
      rowIndex = rowIndex + 1;
    }

    
	// Output row complete.
	transposeRes.push(currentOutputRow);
  }

  return transposeRes;
}


// Checks whether input sheet contents were successfully transposed.
function checkTransposeSuccessful(tData)
{
  var correctType = Array.isArray(tData.contents);
  var checkRes = false;

  if (correctType === true && tData.contents.length > 0)
  {
    checkRes = true;
  }

  return checkRes;
}


// Isolates header row from transpose contents.
function separateHeader(tData)
{
  var headerRowObject = tData.contents[0];
  
  tData.header = [headerRowObject];
  tData.contents.splice(0, 1);
}


// Writes header row to output sheet.
function writeOutputHeader(outputSheetObj, headerObj)
{
  var colCount = headerObj[0].length;
  var outputRange = outputSheetObj.getRange(1, 1, 1, colCount);
  outputRange.setValues(headerObj);
}


// Writes input data to output sheet.
function writeOutputContents(outputSheetObj, contentsObj)
{
  var existingRows = -1;
  var contentRowStart = -1;
  var contentColCount = -1;
  var outputRange = null;

  
  // IF contents not empty.
  if (contentsObj.length > 0)
  {
    // Find next empty row and number of columns.
	existingRows = outputSheetObj.getLastRow();
    contentRowStart = existingRows + 1;
	contentColCount = contentsObj[0].length;
	
	// Append content rows.
    outputRange = outputSheetObj.getRange(contentRowStart, 1, contentsObj.length, contentColCount);
    outputRange.setValues(contentsObj);
  }

}