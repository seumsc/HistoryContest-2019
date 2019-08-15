@echo off
start nginx
if %ERRORLEVEL% NEQ 0 pause
echo run nginx successfully!