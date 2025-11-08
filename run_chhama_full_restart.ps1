<#
  run_chhama_full_restart.ps1
  Purpose: one-shot runner to (A) ensure git/repo state, (B) run master automation, (C) run quick publish.
  Save this file in: C:\Users\Dalmia Computers\Desktop\dalmia_relink
  Run in PowerShell (Admin recommended):
    cd "C:\Users\Dalmia Computers\Desktop\dalmia_relink"
    powershell -ExecutionPolicy Bypass -File .\run_chhama_full_restart.ps1
#>

# --- Config ---
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$logDir = Join-Path $root "logs"
if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Path $logDir | Out-Null }
$time = Get-Date -Format "yyyyMMdd_HHmmss"
$logFile = Join-Path $logDir "chhama_run_$time.log"

Function Log {
    param([string]$line)
    $t = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $msg = "[$t] $line"
    $msg | Tee-Object -FilePath $logFile -Append
}

# Start
Log "=== CHHAMA FULL RUN START ==="
Log "Working directory: $root"

# Pre-check: Git installed?
try {
    git --version 2>&1 | Out-Null
    Log "Git is available."
} catch {
    Log "ERROR: Git not found in PATH. Install Git (https://git-scm.com/) and re-run."
    Write-Host "ERROR: Git not found. See log: $logFile" -ForegroundColor Red
    exit 2
}

# Ensure .git exists and remote configured
if (-not (Test-Path (Join-Path $root ".git"))) {
    Log ".git not found. Initializing repo..."
    Push-Location $root
    git init 2>&1 | Tee-Object -FilePath $logFile -Append
    # Try to add remote if known
    $remoteUrl = "https://github.com/dalmiacomputers/dalmiacomputers.git"
    try {
        git remote add origin $remoteUrl 2>&1 | Tee-Object -FilePath $logFile -Append
        Log "Remote 'origin' set to $remoteUrl"
    } catch {
        Log "Warning: couldn't add remote automatically. If remote differs run: git remote add origin <url>"
    }
    Pop-Location
} else {
    Log ".git exists."
    # verify remote
    Push-Location $root
    $remotes = git remote -v 2>&1
    $hasOrigin = $remotes -match "origin"
    if (-not $hasOrigin) {
        $remoteUrl = "https://github.com/dalmiacomputers/dalmiacomputers.git"
        git remote add origin $remoteUrl 2>&1 | Tee-Object -FilePath $logFile -Append
        Log "Added origin remote: $remoteUrl"
    } else {
        Log "Remotes OK: `n$remotes"
    }
    Pop-Location
}

# Try to fetch and set up branches
Push-Location $root
try {
    Log "Fetching origin..."
    git fetch origin --all --prune 2>&1 | Tee-Object -FilePath $logFile -Append
    Log "Attempting to checkout main (or master) branch..."
    # try common main branch names
    $branches = @("main","master")
    $checked = $false
    foreach ($b in $branches) {
        try {
            git checkout $b 2>&1 | Tee-Object -FilePath $logFile -Append
            git pull origin $b 2>&1 | Tee-Object -FilePath $logFile -Append
            Log "Checked out and pulled branch '$b'."
            $checked = $true
            break
        } catch {
            Log "Branch $b not available or pull failed; trying next."
        }
    }
    if (-not $checked) {
        Log "Neither 'main' nor 'master' found locally. Creating 'main' and setting to origin/main if available."
        git checkout -b main 2>&1 | Tee-Object -FilePath $logFile -Append
        try { git pull origin main 2>&1 | Tee-Object -FilePath $logFile -Append; Log "Pulled origin/main"; } catch { Log "origin/main may not exist yet." }
    }
} catch {
    Log "Warning: fetch/checkout sequence failed: $_"
}
Pop-Location

# Run pre-checks for helper scripts
$masterScript = Join-Path $root "run_chhama_master.ps1"
$autoPublishBat = Join-Path $root "run_auto_publish.bat"

if (-not (Test-Path $masterScript)) {
    Log "ERROR: run_chhama_master.ps1 not found at $masterScript"
    Write-Host "ERROR: run_chhama_master.ps1 not found. Check file location." -ForegroundColor Red
    exit 3
}
if (-not (Test-Path $autoPublishBat)) {
    Log "ERROR: run_auto_publish.bat not found at $autoPublishBat"
    Write-Host "ERROR: run_auto_publish.bat not found. Check file location." -ForegroundColor Red
    exit 4
}

# Run master automation
Log "Running master automation: $masterScript"
try {
    & powershell -NoProfile -ExecutionPolicy Bypass -File $masterScript 2>&1 | Tee-Object -FilePath $logFile -Append
    Log "Master automation finished (exit)."
} catch {
    Log "ERROR: Master automation errored: $_"
}

# After master run, check for merge conflicts or uncommitted changes
Push-Location $root
$st = git status --porcelain 2>&1
if ($st) {
    Log "Repository has uncommitted changes or conflicts (git status shows):`n$st"
    Write-Host "NOTICE: repo has uncommitted changes or conflicts. Check $logFile for details." -ForegroundColor Yellow
    # try to auto-add and commit salvage (optional)
    try {
        git add -A 2>&1 | Tee-Object -FilePath $logFile -Append
        git commit -m "Auto-commit: after master automation run at $time" 2>&1 | Tee-Object -FilePath $logFile -Append
        Log "Auto-commit attempted."
    } catch {
        Log "Auto-commit failed (likely merge conflicts). Manual resolution required."
    }
} else {
    Log "Git working tree clean."
}
Pop-Location

# Run quick publish
Log "Running quick publish: $autoPublishBat"
try {
    Start-Process -FilePath $autoPublishBat -WorkingDirectory $root -NoNewWindow -Wait
    Log "Quick publish completed."
} catch {
    Log "ERROR: Quick publish failed to start: $_"
}

Log "=== CHHAMA FULL RUN END ==="
Write-Host "Run complete. Log: $logFile" -ForegroundColor Cyan
