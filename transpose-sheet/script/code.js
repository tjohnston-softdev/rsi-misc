
/*
	Main script file.
	Executed on Spreadsheet open. Initializes menu options.
	Source: https://developers.google.com/apps-script/guides/menus
	Retrieved: 2021-01-14
*/


function onOpen()
{
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Actions')
      .addItem('Transpose', 'executeTranspose')
      .addItem('Clear', 'executeClear')
      .addItem('Format', 'executeFormat')
      .addToUi();
}