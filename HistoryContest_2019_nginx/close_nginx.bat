@echo off
nginx -s quit
if %ERRORLEVEL% NEQ 0 pause
