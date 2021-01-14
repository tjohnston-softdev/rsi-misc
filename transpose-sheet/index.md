### Transpose Sheet
This Google Sheets script reads horizontal column input from an 'Input' sheet and transposes them into vertical row output for an 'Output' sheet. In other words, it changes the spreadsheet orientation from horizontal to vertical.

I wrote the original version of the script as part of a traning exercise when I started working for Response. It was to give my boss an indication as to my programming experience, and to give me an oppurtunity to familiarise myself with the Google Sheets scripting environment.

These screencaps give an example of what transposing is:

##### Before
![Before screencap](./example/before.jpg)

##### After
![After screencap](./example/after.jpg)


| Program Setting     | Type    | Description                                                                               | Example |
|---------------------|---------|-------------------------------------------------------------------------------------------|---------|
| clearExistingOutput | Boolean | If this is true, the output sheet will be cleared of any existing data before transposing | TRUE    |