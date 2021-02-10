/*
	This script is used to convert an existing Google Docs file into a PDF,
	with an optional destination folder.
*/



// Global settings
var settingsObject =
{
  documentFileID: "DOCUMENT",
  outputFolderID: "FOLDER"
};


// Main function
function executeDocumentToPDF()
{
  var retrievedDocument = null;
  var binaryData = null;
  var convertedFile = null;
  var targetFolder = null;

  
  // Opens chosen document and converts it to PDF.
  retrievedDocument = DocumentApp.openById(settingsObject.documentFileID);
  binaryData = retrievedDocument.getAs("application/pdf");
  convertedFile = DriveApp.createFile(binaryData);

  
  // Attempts to retrieve target destination folder.
  targetFolder = retrieveOutputFolder();

  
  // If target folder is specified, move file from root.
  if (targetFolder !== null)
  {
    convertedFile.moveTo(targetFolder);
  }
  
}



// Destination folder.
function retrieveOutputFolder()
{
  var folderRes = null;

  try
  {
    // Retrieve
	folderRes = DriveApp.getFolderById(settingsObject.outputFolderID);
  }
  catch(e)
  {
    // Invalid folder ID - Ignore without error.
	folderRes = null;
  }


  return folderRes;
}