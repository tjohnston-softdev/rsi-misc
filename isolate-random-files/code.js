/*
  This script takes randomly chosen files of matching types from an input folder and
  copies them to an output folder.
*/



// Global settings
var settingsObject =
{
  inputFolderID: "INPUT FOLDER ID",
  outputFolderID: "OUTPUT FOLDER ID",
  targetMimeTypes: ["MIME TYPES"],
  fractionAmount: 1 / 10,
  roundingFlag: 0,
  clearOutputFolder: true,
  allowIncorrectAmount: false
};


// Main function
function runFileIsolation()
{
  var inputFolderObject = null;
  var outputFolderObject = null;
  var inputFileList = [];
  var chosenFileCount = -1;
  var chosenFileList = [];
  var randomSuccessful = false;

  // Opens input and output folders.
  inputFolderObject = DriveApp.getFolderById(settingsObject.inputFolderID);
  outputFolderObject = DriveApp.getFolderById(settingsObject.outputFolderID);

  // Reads list of matching files in input folder.
  inputFileList = getInputFileList(inputFolderObject);

  
  // Removes existing files from output folder if needed.
  if (settingsObject.clearOutputFolder === true)
  {
    deleteExistingOutputFiles(outputFolderObject);
  }

  
  if (inputFileList.length > 0)
  {
    // Chooses random input files.
    chosenFileCount = calculateFileCount(inputFileList.length);
    chosenFileList = chooseRandomFiles(chosenFileCount, inputFileList);
    randomSuccessful = checkChosenFileCount(chosenFileCount, chosenFileList.length);
  }

  
  if (randomSuccessful === true)
  {
    // Copies marked files to output folder.
    copyChosenFilesLoop(chosenFileList, outputFolderObject);
  }

}


// Clears output folder.
function deleteExistingOutputFiles(oFolderObj)
{
  var fileLoop = oFolderObj.getFiles();
  var currentFile = null;
  var canContinue = fileLoop.hasNext();

  while (canContinue === true)
  {
    // Delete current file.
    currentFile = fileLoop.next();
    currentFile.setTrashed(true);
    canContinue = fileLoop.hasNext();
  }

}



// Reads input files.
function getInputFileList(inpFolderObj)
{
  var fileLoop = inpFolderObj.getFiles();
  var currentFile = null;
  var currentID = "";
  var currentType = "";
  var currentMatch = false;
  var currentAdd = false;
  var canContinue = fileLoop.hasNext();

  var listRes = [];

 
  while (canContinue === true)
  {
    // Reads current file ID and type.
    currentFile = fileLoop.next();
    currentID = currentFile.getId();
    currentType = currentFile.getMimeType();
    currentMatch = settingsObject.targetMimeTypes.includes(currentType);
	currentAdd = false;

    if (settingsObject.targetMimeTypes.length > 0 && currentMatch === true)
    {
      // Matching file type - Add to result.
      currentAdd = true;
    }
	else if (settingsObject.targetMimeTypes.length > 0)
	{
		// Unwanted file type - Skip.
		currentAdd = false;
	}
	else
	{
		// No file types specified - Use all files.
		currentAdd = true;
	}
	
	
	if (currentAdd === true)
	{
		listRes.push(currentID);
	}

    canContinue = fileLoop.hasNext();
  }

  return listRes;
}


// Calculates number of random files to copy.
function calculateFileCount(totalCount)
{
  var baseAmount = totalCount * settingsObject.fractionAmount;
  var calcRes = -1;

  if (settingsObject.roundingFlag > 0)
  {
    // Round up.
    calcRes = Math.ceil(baseAmount);
  }
  else if (settingsObject.roundingFlag < 0)
  {
    // Round down.
    calcRes = Math.floor(baseAmount);
  }
  else
  {
    // Round nearest.
    calcRes = Math.round(baseAmount);
  }

  return calcRes;
}


// Chooses random input files.
function chooseRandomFiles(randCount, fullList)
{
  var currentSeed = -1;
  var currentIndex = -1;
  var currentID = "";

  var loopSafe = true;
  var choiceRes = [];


  while (choiceRes.length < randCount && fullList.length > 0 && loopSafe === true)
  {
    // Get random input file index.
    currentSeed = Math.random() * fullList.length;
    currentIndex = Math.floor(currentSeed);
    currentID = "";

    if (currentIndex >= 0 && currentIndex < fullList.length)
    {
      // Add file ID to copy list, remove from pool.
      currentID = fullList[currentIndex];
      choiceRes.push(currentID);
      fullList.splice(currentIndex, 1);
    }
    else
    {
      // Invalid index number, abort loop.
      loopSafe = false;
    }
  }


  return choiceRes;
}


// Validates file counts.
function checkChosenFileCount(expectedCount, actualCount)
{
  var checkRes = false;

  if (expectedCount > 0 && actualCount > 0 && actualCount === expectedCount)
  {
    // Correct number of files chosen.
    checkRes = true;
  }
  else if (expectedCount > 0 && actualCount > 0 && settingsObject.allowIncorrectAmount === true)
  {
    // Incorrect number, ignore error.
    checkRes = true;
  }
  else if (expectedCount > 0 && actualCount > 0)
  {
    throw new Error("Incorrect number of files chosen");
  }
  else
  {
    throw new Error("No files chosen");
  }

  return checkRes;
}


// Copies chosen input files to output folder.
function copyChosenFilesLoop(chosenList, oFolderObj)
{
  var entryIndex = 0;
  var currentID = "";
  var currentFile = null;

  for (entryIndex = 0; entryIndex < chosenList.length; entryIndex = entryIndex + 1)
  {
    currentID = chosenList[entryIndex];
    currentFile = DriveApp.getFileById(currentID);
    currentFile.makeCopy(oFolderObj);
  }
}