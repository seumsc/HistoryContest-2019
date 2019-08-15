@echo off
echo check for npm...
call npm -v
if %ERRORLEVEL% NEQ 0 pause
echo run nginx...
cd ./HistoryContest_2019_nginx
call run_nginx.bat
if %ERRORLEVEL% NEQ 0 pause

echo now homepage is on locahost
echo wait for server to start... 
cd ../HistoryContest_2019_server
call npm run start
if %ERRORLEVEL% NEQ 0 pause
if %ERRORLEVEL% EQU 0 (
    echo exiting...
    cd ./HistoryContest_2019_nginx
    call close_nginx
)
pause





