## Isolate Random Files

This script randomly chooses files of matching types from an input folder and copies them to an output folder.

---

### Background

I wrote the original version of this script during the 26 July 2017. I was asked to compile a small selection of photos from a collection stored on Response's Google Drive. My boss and the upper-management staff were due to attend an industry expo that evening and needed pictures to accompany their speeches. Given a folder of ~950 different photos, I did not have the necessary time or energy to hand-pick a good selection so I simply wrote a script to choose pictures at random and go from there.


### Getting Started

To install this script, refer to these [instructions](../install.md#script).

After the script file has been saved, choose the `runFileIsolation` function in order to execute the script. The `settingsObject` variable contains the script's settings, as outlined in the table below.


### Settings

| Program Setting | Type | Description | Example |
|---|---|---|---|
| inputFolderID | String | The ID of the folder containing files to randomly choose from. ([How to](https://ploi.io/documentation/mysql/where-do-i-get-google-drive-folder-id)) | dOZMtGQ4ptcGJ8O1ZkYBXEqjpDF5C7 |
| outputFolderID | String | The ID of the folder where the chosen files will be copied into. | NBryJo9q0yB4QfIywssBZ7XOrFQYy1 |
| targetMimeTypes | String[] | Only select files of the following MIME types. If this is empty, all file types will be used. ([Supported types](https://developers.google.com/drive/api/v3/ref-export-formats)) | ["image/jpeg", "image/png"] |
| fractionAmount | Number | The percentage of files to choose from the input folder as a decimal between 0 and 1. | 0.10 |
| roundingFlag | Number | Indicates how the calculated number of files to choose based on the given percentage will be rounded. Positive rounds up, Negative rounds down, Zero rounds nearest. | 0 |
| clearOutputFolder | Boolean | If this is true, any pre-existing files in the output folder will be deleted. | true |
| allowIncorrectAmount | Boolean | If the final amount of chosen files is less than the calculated target, copy them anyway. Otherwise, there will be an error. | false |

---

[Return to Home Page](../readme.md)