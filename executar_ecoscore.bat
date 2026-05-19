@echo off
cd /d "%~dp0python"

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

echo Nao encontrei Python no PATH.
echo Abra pelo VS Code usando F5 e escolha "EcoScore - terminal externo".
pause
