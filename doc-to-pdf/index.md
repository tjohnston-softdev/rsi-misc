## Document to PDF
This script takes an existing Google Docs file and converts it into a PDF, with an optional destination folder.

---

### Background
When I wrote the original version of my [submission-to-pdf](https://github.com/tjohnston-softdev/submission-to-pdf) script at the start of 2017, it was a little tricky for me to figure out how to actually convert the finished document to a PDF. Looking through the documentation, it seemed pretty obvious but for some reason, following it to the letter caused the resulting 'pdf' to become corrupt. Google Apps scripting can be quite glitchy sometimes for no obvious reason. It is not uncommon for the most obvious solution to just simply fail. Fortunately, there is often more than one way to do things and eventually, I found a solution that successfully converts to PDF as intended.

The solution:

* Open the document file using [DocumentApp](https://developers.google.com/apps-script/reference/document/document-app).
* Retrieve it's [contents](https://developers.google.com/apps-script/reference/document/document#getAs(String)) as an "application/pdf" blob.
* Then [create](https://developers.google.com/apps-script/reference/drive/drive-app#createFile(BlobSource)) the converted file as-is.
	* It may be tempting to use the other 'createFile' functions but the blob object contains both the original file name and the contents so this is not necessary.
	* Using the other functions will likely cause corruption errors.
* Afterwards, use the output file as you would normally.

When I wrote the refined version of 'submission-to-pdf' for public release, It had been over two years since I worked with Google Docs scripting. I had forgotten this solution entirely and I had to figure it out all over again. That is why I decided to quickly write a stand-alone conversion script for future reference, and to show others how it might be done.



### Getting Started
To install this script, refer to these [instructions](../install.md#script).

After the script file has been saved, choose the `executeDocumentToPDF` function in order to execute the script. The `settingsObject` variable contains the script's settings, as outlined in the table below.


### Settings

| Program Setting | Type   | Description                                                                                                                                   | Example                          |
|-----------------|--------|-----------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------|
| documentFileID  | string | The ID of the Google Docs file to convert into a PDF. If it is invalid or missing, there will be an error.                                    | 6piTxNNopDGJlce5RMGMHS6ePKm1opb5 |
| outputFolderID  | string | The ID of the folder where the output PDF will be located. If it is invalid or missing, the file will be placed in the drive root by default. | 51a9PDMC5LCQIXmcLBZ6qAFtdImPrHID |

Refer to the following [page](https://docs.meiro.io/books/meiro-integrations/page/where-can-i-find-the-file-id-on-google-drive) for retrieving file and folder IDs.