@echo off
echo check for npm...
call npm -v
if %ERRORLEVEL% NEQ 0 pause
echo run developer...
cd ./HistoryContest_2019_client
start run_client.bat
echo run developer successfully!
echo wait for server to start... 
cd ../HistoryContest_2019_server
call npm run watch
if %ERRORLEVEL% NEQ 0 pause

pause