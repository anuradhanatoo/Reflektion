call "C:\Program Files\nodejs\nodevars.bat"

set MOCHA_HOME=.\\

cd %MOCHA_HOME%

set report_file=Reflektion_Test_Report
echo %report_file%

.\node_modules\.bin\mocha .\tests\API_TestSuite.js --reporter mochawesome --reporter-options overwrite=false,reportFilename=%report_file%,reportTitle=%report_file%,showPassed=true,inlineAssets=true,quiet=true
pause>nul