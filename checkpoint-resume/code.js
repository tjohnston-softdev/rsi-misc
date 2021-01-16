/*
	This script is used to give all cells in a spreadsheet a random colour.
	It is used to demonstrate the principles of checkpoint support for long scripts.
	Hex colours source: https://simple.wikipedia.org/wiki/Rainbow (Retrieved 2021-01-16)
*/


// Global settings.
var settingsObject =
{
  sheetFileID: "SPREADSHEET FILE ID",
  minBatchSize: 0.05,
  maxBatchSize: 0.20,
  timeLimit: 5000,
  colourPool: ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#2E2B5F", "#8B00FF"],
  loadExistingProgress: true,
  clearFormattingStart: false,
  removeOtherFormatting: true,
  displaySaveMessage: true
};



// Main function.
function runCheckpointSupport()
{
  var timeLimitValid = validateTimeLimit();
  var ssFile = null;
  var dataSheetObject = null;
  var checkpointSheetObject = null;

  var mainRowCount = -1;
  var mainColCount = -1;
  var chosenBatchSize = -1;
  var startPointObject = {row: 1, col: 1};
  var canResume = false;
  var dataExists = false;
  var loopReady = false;
  var loopResultObject = {};

  if (timeLimitValid === true)
  {
    // Opens target spreadsheet file.
	ssFile = SpreadsheetApp.openById(settingsObject.sheetFileID);
    dataSheetObject = ssFile.getSheetByName("Data");
    checkpointSheetObject = ssFile.getSheetByName("Checkpoint");

    // Reads data sheet dimensions.
	mainRowCount = dataSheetObject.getLastRow();
    mainColCount = dataSheetObject.getLastColumn();
  }

  // Data sheet not empty.
  if (mainRowCount > 0 && mainColCount > 0)
  {
	chosenBatchSize = chooseBatchSize(mainRowCount, mainColCount);						// Decides number of cells to colour in this execution.
    canResume = handleExistingProgress(checkpointSheetObject, startPointObject);		// Loads saved progress.
    dataExists = true;
  }

  
  if (dataExists === true && canResume === true)
  {
    // Resume from saved checkpoint.
	loopReady = true;
  }
  else if (dataExists === true)
  {
    // Start from scratch.
	handleFormatClear(dataSheetObject, mainRowCount, mainColCount);
    loopReady = true;
  }
  else
  {
    // Sheet empty.
	loopReady = false;
  }
  
  if (loopReady === true)
  {
    // Colours cells from saved point until limits reached.
	loopResultObject = loopDataCells(dataSheetObject, mainRowCount, mainColCount, chosenBatchSize, startPointObject);
    saveCurrentProgress(checkpointSheetObject, loopResultObject, chosenBatchSize);
	
    // Formats checkpoint sheet.
	formatCheckpointHeader(checkpointSheetObject);
    checkpointSheetObject.autoResizeColumns(1, 5);
    
	// Display saved data if required.
	handleSaveMessage(loopResultObject);
  }

}


// Validates the 'timeLimit' global variable.
function validateTimeLimit()
{
  var maxTime = 300000;
  var correctType = Number.isInteger(settingsObject.timeLimit);
  var validRes = false;

  if (correctType === true && settingsObject.timeLimit > 0 && settingsObject.timeLimit <= maxTime)
  {
    validRes = true;
  }
  else if (correctType === true && settingsObject.timeLimit > maxTime)
  {
	throw new Error("Script time limit must be less than 5 minutes");
  }
  else
  {
    throw new Error("Time limit must be a positive whole number");
  }

  return validRes;
}



// Randomly chooses number of cells to colour within chosen total percentages.
function chooseBatchSize(rCount, cCount)
{
  var totalCells = -1;
  var lowerLimit = -1;
  var upperLimit = -1;
  var differenceAmount = -1;
  
  var randomSeed = -1;
  var choiceBase = -1;
  var choiceFinal = -1;
  
  // Calculates random range limits.
  totalCells = rCount * cCount;
  lowerLimit = totalCells * settingsObject.minBatchSize;
  upperLimit = totalCells * settingsObject.maxBatchSize;
  differenceAmount = upperLimit - lowerLimit;
  
  // Randomly chooses number of cells.
  randomSeed = Math.random() * differenceAmount;
  choiceBase = lowerLimit + randomSeed;
  choiceFinal = Math.round(choiceBase);

  // Minimum cap.
  if (choiceFinal < 1)
  {
    choiceFinal = 1;
  }

  return choiceFinal;
}



// Loads existing progress from checkpoint sheet.
function handleExistingProgress(checkpointSheet, startPoint)
{
  var checkpointRowCount = -1;
  var checkpointColCount = -1;
  var dimensionsValid = false;
  var progressRange = null;
  var progressContents = [];
  var progressObject = [];
  var rowCellValue = null;
  var columnCellValue = null;
  var rowReadSuccessfully = false;
  var colReadSuccessfully = false;

  var handleRes = false;
  
  // Reads checkpoint sheet dimensions.
  checkpointRowCount = checkpointSheet.getLastRow();
  checkpointColCount = checkpointSheet.getLastColumn();

  
  // Validates dimensions for data cells.
  if (checkpointRowCount >= 2 && checkpointColCount >= 2)
  {
    dimensionsValid = true;
  }


  if (dimensionsValid === true && settingsObject.loadExistingProgress === true)
  {
    // Retrieves progress data row.
	progressRange = checkpointSheet.getRange(2, 1, 1, 2);
    progressContents = progressRange.getValues();
    progressObject = progressContents[0];

    // Reads saved row and column number cells.
	rowCellValue = progressObject[0];
    columnCellValue = progressObject[1];

    // Casts cell values.
	startPoint.row = Number(rowCellValue);
    startPoint.col = Number(columnCellValue);

    // Checks if numbers read successfully.
	rowReadSuccessfully = Number.isInteger(startPoint.row);
    colReadSuccessfully = Number.isInteger(startPoint.col);
  }

  if (rowReadSuccessfully === true && colReadSuccessfully === true)
  {
    // Checkpoint load successful.
	handleRes = true;
  }


  return handleRes;
}


// Clears pre-existing formatting from data sheet if required.
function handleFormatClear(dataSheet, rCount, cCount)
{
  var contentRange = null;

  if (settingsObject.clearFormattingStart === true)
  {
    contentRange = dataSheet.getRange(1, 1, rCount, cCount);
    contentRange.clearFormat();
  }
}


// Colours individual cells in a loop until time limit or batch size reached.
function loopDataCells(dataSheet, rCount, cCount, batchSize, startPoint)
{
  var startTime = -1;
  var endTime = -1;

  var rowNumber = -1;
  var colNumber = -1;

  var currentTime = -1;
  var currentCell = null;
  var currentColour = "";

  var iterationCount = 0;
  var canContinue = true;

  var loopRes = {};
  
  
  // Calculates end time.
  startTime = Date.now();
  endTime = startTime + settingsObject.timeLimit;
  
  
  // Sets loop numbers to current cell.
  rowNumber = startPoint.row;
  colNumber = startPoint.col;

  
  // Outer loop for rows.
  while (rowNumber >= 1 && rowNumber <= rCount && canContinue === true)
  {
    currentTime = -1;
    currentCell = null;
    currentColour = "";

    
	// Inner loop for individual cells.
	while (colNumber >= 1 && colNumber <= cCount && canContinue === true)
    {
      // Checks current time.
	  currentTime = Date.now();
      currentCell = null;
      currentColour = "";

      if (currentTime < endTime && iterationCount < batchSize)
      {
        // Process current cell.
		currentCell = dataSheet.getRange(rowNumber, colNumber, 1, 1);
        currentColour = getRandomColour();
        resolveCellFormatting(currentCell);
        currentCell.setBackground(currentColour);
        iterationCount = iterationCount + 1;
        colNumber = colNumber + 1;
      }
      else
      {
        // Limits reached, abort loop safely.
		canContinue = false;
      }
      
    }

    // Move to next row.
	if (colNumber > cCount)
    {
      rowNumber = rowNumber + 1;
      colNumber = 1;
    }    
  }

  // Remember loop progress.
  loopRes["nextRow"] = rowNumber;
  loopRes["nextCol"] = colNumber;
  loopRes["complete"] = canContinue;

  return loopRes;
}



// Saves current progress into checkpoint sheet.
function saveCurrentProgress(checkpointSheet, loopObj, batchSize)
{
  var timestampObject = null;
  var timestampString = "";
  var headerRow = [];
  var valueRow = [];
  var checkpointRange = null;
  var checkpointContents = [];
  
  // Retrieves current UTC timestamp.
  timestampObject = new Date();
  timestampString = timestampObject.toUTCString();
  
  
  // Defines checkpoint sheet contents.
  headerRow = ["Row Number", "Column Number", "Batch Size", "Timestamp", "Complete"];
  valueRow = [loopObj.nextRow, loopObj.nextCol, batchSize, timestampString, loopObj.complete];
  
  // Selects checkpoint cells.
  checkpointRange = checkpointSheet.getRange(1, 1, 2, 5);
  checkpointContents = [headerRow, valueRow];
  
  // Writes checkpoint data.
  checkpointRange.clear();
  checkpointRange.setValues(checkpointContents); 
}


// Formats checkpoint header row.
function formatCheckpointHeader(checkpointSheet)
{
  var headerRange = checkpointSheet.getRange(1, 1, 1, 5);

  headerRange.setFontWeight("bold");
  headerRange.setHorizontalAlignment("center");
}


// Displays save data.
function handleSaveMessage(loopObj)
{
  if (settingsObject.displaySaveMessage === true)
  {
    Logger.log(loopObj);
  }
}


// Chooses random colour.
function getRandomColour()
{
  var randomSeed = Math.random() * settingsObject.colourPool.length;
  var chosenIndex = Math.floor(randomSeed);
  var colourRes = settingsObject.colourPool[chosenIndex];
  return colourRes;
}


// Clears individual cell formatting before colour change.
function resolveCellFormatting(cellObj)
{
  if (settingsObject.removeOtherFormatting === true)
  {
    cellObj.clearFormat();
  }
}