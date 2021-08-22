## Clean Spreadsheet

This script is used to clean empty rows from a chosen spreadsheet. This is to reduce the likelihood of a large spreadsheet with frequent use reaching the [total cell limit](https://support.google.com/docs/thread/6339567?hl=en), which is ~5 million as of May 2019.

Read the [background](./background.md) for additional context as to why I wrote this script and how it works.

See [here](../install.md#script) for instructions on installing.

| Program Setting   | Type    | Description                                                                                    | Example                          |
|-------------------|---------|------------------------------------------------------------------------------------------------|----------------------------------|
| targetFileID      | String  | The ID of the Google Sheets file that contains the target spreadsheet. ([How to](https://developers.google.com/sheets/api/guides/concepts#spreadsheet_id))            | R9l98mzhXX6eMjXlIgyPCuc8qW1OIfzo |
| targetSheetName   | String  | The name of the target spreadsheet within the chosen file.                                     | Running Sheet                    |
| ignoreHeader      | Boolean | If this is true, the first row of the sheet will be ignored.                                   | true                             |
| displayCellCounts | Boolean | If this is true, the before and after cell counts will be displayed when cleaning is finished. | true                             |

---

[Return to Home Page](../readme.md)