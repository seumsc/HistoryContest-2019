echo off
set path=%cd%
cd  "%path%/HistoryContest_2019_nginx"
start conf_nginx.bat

cd  "%path%/HistoryContest_2019_server"
start run_server.bat

cd  "%path%/HistoryContest_2019_nginx"

start run_nginx.bat

