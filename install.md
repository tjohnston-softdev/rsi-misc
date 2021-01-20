## Installing Script Files
This file contains instructions on how to install the scripts hosted in this project for your own use. There is no proper 'install' feature for Google Drive so manual action is required. The exact procedure depends on the file type the given script is attached to.

### Script
First, open a Google Drive folder. To create a new script file, navigate to **New > More > Google Apps Script**. This will open a new tab with the script file. Copy and paste the contents of [code.js](./code.js) into the empty script file. Afterwards, click on the 'Save project' button next to 'Run'.

Keep in mind that no matter what folder you 'create' the script file in, it will actually be placed in the Drive root folder, so you will have to manually move it to the desired folder.

### Sheet

First, create a new Google Sheets file. You can do this manually inside your Drive, or you can open [Google Sheets](https://www.google.com.au/sheets/about/) directly.

Once you have created and opened your chosen file, navigate to **Tools > Script editor**. This will open a new tab containing the sheet's attached script.

The script project initially has one file `Code.gs`. Inside this project's repository, navigate to the './%name%/script' folder. Take note of the file names. Inside the sheet's attached script, create extra files corresponding to each local script file. Copy the contents of each .js file and paste them into the corresponding .gs file in your Google Sheets script. After all files have been copied, click the 'Save project' button and close the script tab.

Back in your spreadsheet file tab, refresh the page and wait for the file to load. After around 10 seconds, there will be a new menu **Actions** next to **Help**. The 'Actions' menu allows you to execute the functionality added to the script rather than having to open the editor and worry about code.
