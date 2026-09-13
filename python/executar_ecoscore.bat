@echo off
chcp 1252 >nul
title EcoScore

rem entra na pasta onde este arquivo esta (a pasta python do projeto)
cd /d "%~dp0"

where py >nul 2>nul
if %errorlevel%==0 (
  py main.py
  pause
  exit /b
)

where python >nul 2>nul
if %errorlevel%==0 (
  python main.py
  pause
  exit /b
)

echo Python nao foi encontrado no PATH.
echo Instale o Python 3 ou abra o projeto pelo VS Code e rode o main.py.
pause
