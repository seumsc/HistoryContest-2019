@echo off
echo closing app...
cd ./HistoryContest_2019_nginx
call close_nginx.bat
if %ERRORLEVEL% NEQ 0 pause