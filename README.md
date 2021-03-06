# Reflektion
This is a Mocha - Chai based framework for API Automation with JavaScript language, using Mochawesome reporter that creates HTML reports and JSON data report as well.
1. Checkout the framework on your machine

2. Install Node js from Nodejs website for respective OS platform

3. Open the nodejs command prompt from your Automation folder where the framework was checkedout into and execute below command to install packages if they are not imported during checkout

 a. Automation Folder>> npm install mocha --save-dev --> This command will create a node_modules folder inside Automation with all mocha inbuilt packages
 
 b. Automation Folder>> npm install properties-reader --save-dev --> This will install properties reader package comaptible with JS
 
 c. Automation Folder>> npm install chai --save-dev --> This will install chai assertion libraries 
 
 d. Automation Folder>> npm install chai-http --save-dev --> This will install chai http request libraries
 
 e. Automation Folder>> npm install mochawesome --save-dev --> This will install Mochawesome reporter libraries
 
 f. Automation Folder>> npm install mochawesome-report-generator --save-dev --> This will install Mochawesome reporter libraries
 
4. To execute any single script, open command prompt under Automation folder and run below command:
 a. Automation Folder>>  .\node_modules\.bin\mocha .\tests\<scriptName>.js
 
5. To run the framework, execute below command from Automation framework folder on command prompt:

 a. Automation Folder>> .\node_modules\.bin\mocha .\tests\API_TestSuite.js --reporter mochawesome --reporter-options overwrite=false,reportFilename=Reflektion_Test_Report,reportTitle=Reflektion_Test_Report,showPassed=true,inlineAssets=true,quiet=true
 
6. To run the bat file for running the automation or integrating with Jenkins --> Double click on ::  run_tests.bat

7. Reports are generated in html and json data format using mochawesome - reporter and can be found under : mochawesome-report folder.

8. "testdata" folder contains expected response data as well as request body template wherever necessary

9. "libs" folder contains the API library with all the used functions for GET, POST, PUT, DELETE API requests and 1 for Comparing Actual and Expected response

10. All the test scripts along with a common testsuite script are placed under "tests" folder. "verify_GET_APIs.js" --> for GET related testcases. "verify_POST_PUT_DELETE_APIs.js" --> For POST, PUT, DELETE related tests

11. All the API paths and environment related configurations can be found under config folder in config.properties

12. "node_modules" contains all the npm packages installed during mocha installation and other packages installed above.
