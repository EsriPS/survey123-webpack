# JavaScript Functions for Survey123
With newer releases of Survey123 you are allowed to extend the function of a question by including a JavaScript file in the extension for the survey.  This provided the survey the ability to leverage additional logic to calculate the value of a question.  This function came with some limitations on how much JavaScript could be included in the question.  This library allows the user to bring in WebPacked JS functions and additional libraries to extend that even further.

## Getting Started
Clone this repository to any location on your machine.  The JavaScript functions for Survey123 will get installed in the Extensions directory for the Survey.  
---ADD IMAGE HERE---

## Developing with the Extensions**
Most mode modules can be included in the WebPack for the Javascript libraries.  Simply develop the functions in JavaScript as you would any other JS functions.  

Run `npm build` to create the packed version of your extension.  Make sure the output of the webpack is included in the extensions directory of the Survey (either in the My Survey Designs folder if testing in Survey123 Connect or the My Surveys directory if testing in Survey123)

This library contains the JavaScript functions used by Survey123 in addtion to polyfills needed to support more advanced functions.  This are included in the `survey123\lib.js` library.

### Including the Extension in your Survey
Once you have developed you library and are ready to include in your Survey.  Make sure to include in the extension directory.  You can create a symbolic link from the webpack out file into the Surveys extension directory.  
