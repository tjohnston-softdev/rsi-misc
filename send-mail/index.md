## Send Mail

This is a demo script that can send a prepared E-Mail message to multiple addresses.

---

### Background
When I was working at Response, I was in charge of several different system components that automatically sent out E-Mails to different staff members. This could be when submitting a form, or when certain actions in a spreadsheet are performed. Since there are no easy or conventional ways to share scripts between different projects, I eventually had as many different copies of the code responsible for sending E-Mails. This is not inherently bad as it is mostly a [call to a service](). In all fairness, the code for writing the E-Mail itself was always different and tailored to the output. However, looking back on it now, I wanted to write a script that demonstrates sending an E-Mail for future reference.

---

### Getting Started
To install this script, refer to these [instructions](../install.md#script).

After the script file has been saved, choose the `runSendMail` function in order to execute the script. The `settingsObject` variable contains the script's settings, as outlined in the table below.

---

### Settings
| Program Setting | Type     | Description                                                                                                                | Example                                                 | Service Argument | Required |
|-----------------|----------|----------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------|------------------|----------|
| recipientList   | string[] | Array of E-Mail addresses to send the E-Mail to. This script does not support carbon, or blind carbon copies.              | ["johnsmith@example.com", "janesmith@example.com", etc] | recipient        | X        |
| subjectLine     | string   | The subject of the E-Mail.                                                                                                 | Hello, world!                                           | subject          | X        |
| messageContents | string   | The body contents of the E-Mail.                                                                                           | This is a message.                                      | body             | X        |
| senderAlias     | string   | If this is set, it will be used as a display name for the E-Mail’s sender. Otherwise, it will be your user account’s name. | Automatic Notification                                  | options.name     |          |
| useHTML         | boolean  | If this is true, devices will render HTML elements when displaying the E-Mail                                              | true                                                    | options.htmlBody |          |
| replyTarget     | string   | If this is set, the E-Mail will use this as the default reply-to address.                                                  | reply-inbox@example.com                                 | options.replyTo  |          |

Unlike other scripts, these settings have proper validation and incorrect data may result in an error.

Refer to this [page](https://developers.google.com/apps-script/reference/gmail/gmail-app#sendemailrecipient,-subject,-body,-options) for the GMail service call.