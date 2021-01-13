### Isolate Random Files
This script takes randomly chosen files of matching types from an input folder and copies them to an output folder.

I wrote the original version of this script during the 26th of July 2017. I was asked to compile a small selection of photos out of a collection from Response's system. My boss and the upper-management staff were due to attend an industry expo that evening and needed pictures to accompany their speeches. Given a folder of ~950 different photos, I did not have the necessary time or energy to hand-pick a good selection so I simply wrote a script to choose pictures at random and go from there.

Now it is the start of 2021. I rewrote the script in accordance with my current coding style.

| Program Setting      | Type     | Description                                                                                                                                             | Example                        									|
|----------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------|
| inputFolderID        | String   | The ID of the folder containing files to randomly choose from. ([How to](https://ploi.io/documentation/mysql/where-do-i-get-google-drive-folder-id))                                     | dOZMtGQ4ptcGJ8O1ZkYBXEqjpDF5C7 	|
| outputFolderID       | String   | The ID of the folder where chosen files should be copied into.                                                                                          | NBryJo9q0yB4QfIywssBZ7XOrFQYy1 									|
| targetMimeTypes      | String[] | Only select files of the following MIME types. If this is empty, all files will be used. ([Supported types](https://developers.google.com/drive/api/v3/ref-export-formats))              | ["image/jpeg", "image/png"]    	|
| fractionAmount       | Number   | The fraction amount of files to choose from the input folder. Values between 0 and 1 should be used.                                                    | 0.10                           									|
| roundingFlag         | Number   | Indicates how rounding should be handled when calculating the number of files to choose. Positive rounds up, Negative rounds down, Zero rounds nearest. | 0                              									|
| clearOutputFolder    | Boolean  | If this is true, any preexisting files in the output folder will be deleted.                                                                            | true                           									|
| allowIncorrectAmount | Boolean  | If the final amount of chosen files is less than the calculated target, copy them anyway. Otherwise, there will be an error.                            | false                          									|
