### Scenario

Unlike most scripts contained in this repository, 'checkpoint-resume' is really more of a concept or an idea than a full and complete project. That said, I still had to come up with some tangible script in order to demonstrate what I have learned.

The script I wrote opens a chosen spreadsheet file and then paints all of the cells a random colour from the [rainbow](https://simple.wikipedia.org/wiki/Rainbow). It seems simple enough at first but the catch is that the script only loops cells until a certain number have been coloured, or a time limit is reached. This forces the script to rely on a checkpoint system like the one I [came up with](./background.md) when I first encountered the [execution time limit](https://developers.google.com/apps-script/guides/services/quotas#current_limitations).

The chosen spreadsheet file uses two sheets:
* 'Data' contains the cells to be coloured. The actual content does not matter. Only the formatting is affected. 
* Checkpoint' stores information that is saved and loaded between executions.

---

##### Checkpoint Data

| Field         | Description                                                  | Example                       | Required |
|---------------|--------------------------------------------------------------|-------------------------------|----------|
| Row Number    | The row number to start at from next execution.              | 35                            | X        |
| Column Number | The column number to start at from next execution.           | 15                            | X        |
| Batch Size    | The number of cells processed during the last execution.     | 505                           |          |
| Timestamp     | UTC timestamp of checkpoint.                                 | Sat, 16 Jan 2021 04:14:11 GMT |          |
| Complete      | Indicates whether the loop is complete as of last execution. | false                         |          |

Only the row and column numbers are used in runtime. The other fields are only there for reference.

---

##### Program Settings

| Program Setting       | Type     | Description                                                                                       | Example                          											|
|-----------------------|----------|---------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------|
| sheetFileID           | String   | ID of the chosen spreadsheet file.                                                                | tdlRoTgZdYnLa6CXDkwpmfGPM6hlpjXY 											|
| minBatchSize          | Number   | Minimum percentage of cells to process per execution. Values between 0 and 1 should be used.      | 0.05                             											|
| maxBatchSize          | Number   | Maximum percentage of cells to process per execution.                                             | 0.20                             											|
| timeLimit             | Number   | Number of milliseconds allocated to cell loop (1s = 1000)                                         | 5000                             											|
| colourPool            | String[] | Array of hex strings representing possible colours to choose from at random.                      | ["#FF0000", "#FF7F00", [etc](https://simple.wikipedia.org/wiki/Rainbow)]  	|
| loadExistingProgress  | Boolean  | Indicates whether loading progress is allowed.                                                    | true                             											|
| clearFormattingStart  | Boolean  | If this is true, all ‘Data’ sheet formatting will be cleared when starting the loop from scratch. | false                            											|
| removeOtherFormatting | Boolean  | If this is true, formatting for individual cells will be removed when setting colour.             | true                             											|
| displaySaveMessage    | Boolean  | If this is true, loop progress will be displayed after saving.                                    | true                             											|

---

[Background](./background.md)

[Return to Index](../index.md)
