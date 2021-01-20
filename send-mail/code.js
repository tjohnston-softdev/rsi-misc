/*
	Demo script used to send an E-Mail to multiple recipients.
	E-Mail Regular Expression from: https://emailregex.com/
	Retrieved: 2020-01-20
*/


var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


// Global settings
var settingsObject =
{
  recipientList: ["cexerow305@dashseat.com"],
  subjectLine: "Hello World",
  messageContents: "This is an E-Mail message.",
  senderAlias: "John Smith",
  useHTML: true,
  replyTarget: ""
};


// Main function
function runSendMail()
{
  var recipientListValid = false;
  var recipientContentsValid = false;
  var subjectValid = false;
  var contentsValid = false;
  var emailOptions = {};
  var replyTargetValid = false;
  
  
  // Validates 'recipientList' array object.
  recipientListValid = validateRecipientList();

  
  // Validates 'recipientList' array contents.
  if (recipientListValid === true)
  {
    recipientContentsValid = validateRecipientContents();
  }

  
  // Validates 'subjectLine' setting.
  if (recipientContentsValid === true)
  {
    subjectValid = validateStringSetting(settingsObject.subjectLine, "E-Mail Subject Line");
  }

  
  // Validates 'messageContents' setting.
  if (subjectValid === true)
  {
    contentsValid = validateStringSetting(settingsObject.messageContents, "Message Contents");
  }

  
  if (contentsValid === true)
  {
    // Sets 'from' and 'htmlBody' properties for E-Mail options.
	handleSenderAlias(emailOptions);
    handleHTML(emailOptions);
	
	// Validates 'replyTarget' setting.
    replyTargetValid = validateReplyTarget(emailOptions);
  }

  
  if (replyTargetValid === true)
  {
    // Input valid - Send E-Mails.
	sendPreparedEmails(emailOptions);
  }
}



// Validates E-Mail address array type.
function validateRecipientList()
{
  var correctType = Array.isArray(settingsObject.recipientList);
  var validationResult = false;

  if (correctType === true && settingsObject.recipientList.length > 0)
  {
    validationResult = true;
  }
  else if (correctType === true)
  {
    throw new Error("Recipient list cannot be empty");
  }
  else
  {
    throw new Error("Recipient list must be a valid array");
  }

  return validationResult;
}


// Validates E-Mail address elements.
function validateRecipientContents()
{
  var elementIndex = 0;
  var currentElement = null;
  var currentTypeString = "";
  var currentLength = -1;
  var currentSyntaxFlag = -1;
  var currentValid = false;

  var allValid = true;

  
  // Loops elements until end reached or error.
  while (elementIndex >= 0 && elementIndex < settingsObject.recipientList.length && allValid === true)
  {
    currentElement = settingsObject.recipientList[elementIndex];
    currentType = typeof currentElement;
    currentLength = -1;
    currentSyntaxFlag = -1;
    currentValid = false;

    if (currentElement !== undefined && currentElement !== null && currentType === "string")
    {
      currentLength = currentElement.length;
    }

    if (currentLength > 0)
    {
      // Check valid E-Mail address.
	  currentSyntaxFlag = currentElement.search(emailRegex);
    }

    if (currentSyntaxFlag >= 0 && currentSyntaxFlag < currentLength)
    {
      // Element valid.
	  currentValid = true;
    }

    if (currentValid !== true)
    {
      // Element invalid - Abort loop.
	  throw new Error("Recipient list must only contain valid E-Mail address strings.");
      allValid = false;
    }

    elementIndex = elementIndex + 1;
  }


  return allValid;
}



// Validates string type.
function validateStringSetting(sValue, sDescription)
{
  var valueType = typeof sValue;
  var correctType = false;
  var validationResult = false;
  var flaggedMessage = "";

  if (sValue !== undefined && sValue !== null && valueType === "string")
  {
    // String exists.
	correctType = true;
  }


  if (correctType === true && sValue.length > 0)
  {
    // Valid.
	validationResult = true;
  }
  else if (correctType === true)
  {
    flaggedMessage = sDescription + " cannot be empty.";
    throw new Error(flaggedMessage);
  }
  else
  {
    flaggedMessage = sDescription + " must be a valid string.";
    throw new Error(flaggedMessage);
  }

  return validationResult;
}



// Sets 'from' property for E-Mail settings. Used as display name.
function handleSenderAlias(eOpts)
{
  var valueType = "";

  if (settingsObject.senderAlias !== undefined && settingsObject.senderAlias !== null)
  {
    // Value exists - check type.
	valueType = typeof settingsObject.senderAlias;
  }

  if (valueType === "string" && settingsObject.senderAlias.length > 0)
  {
    // Use valid string.
	eOpts["name"] = settingsObject.senderAlias;
  }
}


// Marks E-Mail to use HTML if required.
function handleHTML(eOpts)
{
  if (settingsObject.useHTML === true)
  {
    eOpts["htmlBody"] = settingsObject.messageContents;
  }
}



// Validates reply target setting where applicable.
function validateReplyTarget(eOpts)
{
  var valueType = "";
  var stringExists = false;
  var syntaxFlag = -1;

  var validationResult = false;

  if (settingsObject.replyTarget !== undefined && settingsObject.replyTarget !== null)
  {
    // Value exists - check type.
	valueType = typeof settingsObject.replyTarget;
  }

  if (valueType === "string" && settingsObject.replyTarget.length > 0)
  {
    // String exists - check if valid E-Mail.
	stringExists = true;
    syntaxFlag = settingsObject.replyTarget.search(emailRegex);
  }


  if (stringExists === true && syntaxFlag >= 0 && syntaxFlag < settingsObject.replyTarget.length)
  {
    // Use valid E-Mail address string.
	eOpts["replyTo"] = settingsObject.replyTarget;
    validationResult = true;
  }
  else if (stringExists === true)
  {
    // Invalid E-Mail address string.
	validationResult = false;
    throw new Error("Reply Target must be a valid E-Mail address string");
  }
  else
  {
    // Ignore other types.
	validationResult = true;
  }

  return validationResult;
}



// Send E-Mail loop.
function sendPreparedEmails(eOpts)
{
  var loopIndex = 0;
  var currentAddress = "";

  for (loopIndex = 0; loopIndex < settingsObject.recipientList.length; loopIndex = loopIndex + 1)
  {
    currentAddress = settingsObject.recipientList[loopIndex];
    GmailApp.sendEmail(currentAddress, settingsObject.subjectLine, settingsObject.messageContents, eOpts);
  }
}