@echo off
echo ===================================================
echo Bolt Tools Project Runner
echo ===================================================

echo [1] Starting Backend Server...
start "Backend" cmd /k "cd backend && npm start"

echo [2] Starting Frontend Development Server...
start "Frontend" cmd /k "cd frontend && npm run dev"

echo Both services have been started in separate windows!
echo Close this window at any time.
pause
