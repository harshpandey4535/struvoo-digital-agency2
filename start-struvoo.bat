@echo off
setlocal

cd /d "%~dp0"
title STRUVoo Website Launcher

echo.
echo ================================================
echo          STRUVoo DIGITAL AGENCY WEBSITE
echo ================================================
echo.

where node >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js was not found.
    echo Install the current Node.js LTS version from https://nodejs.org/
    echo Then close and reopen this window and run start-struvoo.bat again.
    echo.
    pause
    exit /b 1
)

where npm >nul 2>&1
if errorlevel 1 (
    echo ERROR: npm was not found. Reinstall Node.js LTS from https://nodejs.org/
    echo Make sure the option to add Node.js to PATH is enabled.
    echo.
    pause
    exit /b 1
)

if not exist "package.json" (
    echo ERROR: package.json was not found.
    echo Keep this BAT file in the same folder as package.json.
    echo.
    pause
    exit /b 1
)

echo Checking project dependencies...
if not exist "node_modules\.bin\vite.cmd" (
    echo Installing dependencies. This may take a few minutes...
    call npm install
    if errorlevel 1 (
        echo.
        echo ERROR: Dependency installation failed.
        echo Check your internet connection and Node.js installation, then try again.
        echo.
        pause
        exit /b 1
    )
) else (
    echo Dependencies are already installed.
)

echo.
echo Starting the website server...
echo The server window must remain open while you use the website.
echo Your browser will open automatically when Vite is ready.
echo.

start "STRUVoo Website Server" /D "%~dp0" cmd /k "npm run dev -- --host 127.0.0.1 --open"

echo Launcher started. Check the separate server window for the local URL.
timeout /t 3 /nobreak >nul
exit /b 0
