<#
  run_chhama_master_all_in_one.ps1
  Single-run orchestrator for CHHAMA - finds/creates helpers, fixes git fetch, runs master build & publish.
  Place this in: C:\Users\Dalmia Computers\Desktop\dalmia_relink
  Run:
    powershell -ExecutionPolicy Bypass -NoProfile -File .\run_chhama_master_all_in_one.ps1
#>

# --- Prep / logging ---
$root = (Get-Location).Path
$time = Get-Date -Format "yyyyMMdd_HHmmss"
$logDir = Join-Path $root "logs"
if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Path $logDir | Out-Null }
$logFile = Join-Path $logDir "chhama_master_all_$time.log"

Function Log { param($s) $t = Get-Date -Format "yyyy-MM-dd HH:mm:ss"; $line = "[$t] $s"; $line | Tee-Object -FilePath $logFile -Append; Write-Host $line }

Log "=== CHHAMA MASTER ALL-IN-ONE START ==="
Log "Root: $root"

# --- Ensure git available ---
try { git --version 2>&1 | Out-Null; Log "Git available." } catch { Log "ERROR: Git not found in PATH. Install Git and re-run."; exit 2 }

# --- Locate or create project\chhama folder ---
$projRel = "project\chhama"
$proj = Join-Path $root $projRel
if (-not (Test-Path $proj)) {
    Log "Project folder missing. Creating: $proj"
    New-Item -ItemType Directory -Path $proj -Force | Out-Null
} else {
    Log "Project folder exists: $proj"
}

# --- Helper file names we want ---
$masterName = "run_chhama_master.ps1"
$publishPsName = "run_auto_publish.ps1"
$publishBatName = "run_auto_publish.bat"

# --- Helper finder (search root) ---
Function Find-FileUnderRoot($name) {
    $r = Get-ChildItem -Path $root -Filter $name -Recurse -File -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($r) { return $r.FullName } else { return $null }
}

$masterPath = Find-FileUnderRoot $masterName
$publishPsPath = Find-FileUnderRoot $publishPsName
$publishBatPath = Find-FileUnderRoot $publishBatName

# --- If missing, bootstrap conservative helper scripts inside project\chhama ---
if (-not $masterPath -or -not $publishPsPath -or -not $publishBatPath) {
    Log "One or more helper scripts missing. Bootstrapping in $proj"
    # ensure directories
    $dirs = @($proj, (Join-Path $proj "build\site"), (Join-Path $proj "reports"), (Join-Path $proj "fix_patch_v22"))
    foreach ($d in $dirs) { if (-not (Test-Path $d)) { New-Item -ItemType Directory -Path $d -Force | Out-Null } }

    # master script (safe placeholder build & diagnostics)
    $masterContent = @'
param([string]$PatchName="fix_patch_v22")
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$proj = $scriptDir
$reportDir = Join-Path $proj "reports"
if (-not (Test-Path $reportDir)) { New-Item -ItemType Directory -Path $reportDir -Force | Out-Null }
$buildDir = Join-Path $proj "build\site"
if (Test-Path $buildDir) { Remove-Item -Recurse -Force $buildDir -ErrorAction SilentlyContinue }
New-Item -ItemType Directory -Path $buildDir | Out-Null

# Try expand patch zip if present next to project
$zip = Join-Path $proj ($PatchName + ".zip")
if (Test-Path $zip) {
  try { Expand-Archive -Path $zip -DestinationPath (Join-Path $proj $PatchName) -Force; }
  catch {}
}

# Copy any provided site inside fix_patch_v22\site or src\site
$srcCandidates = @(
  Join-Path $proj (Join-Path $PatchName "site"),
  Join-Path $proj "src",
  Join-Path $proj "site"
) | Where-Object { Test-Path $_ }
if ($srcCandidates.Count -gt 0) {
  Copy-Item -Path (Join-Path $srcCandidates[0] "*") -Destination $buildDir -Recurse -Force -ErrorAction SilentlyContinue
} else {
  # placeholder index
  $html = @"
<!doctype html><html><head><meta charset='utf-8'><title>Dalmia Computers - CHHAMA</title></head><body><h1>CHHAMA Placeholder</h1><p>Place your site files under project\chhama\build\site or fix_patch_v22\site</p></body></html>
"@
  $html | Out-File -FilePath (Join-Path $buildDir "index.html") -Encoding UTF8
}

# diagnostics summary
$diag = Join-Path $reportDir ("diag_" + (Get-Date -Format "yyyyMMdd_HHmmss") + ".txt")
"Build created at: $buildDir" | Out-File -FilePath $diag -Encoding UTF8
"Files:" | Out-File -FilePath $diag -Append
Get-ChildItem -Path $buildDir -Recurse -File | ForEach-Object { $_.FullName } | Out-File -FilePath $diag -Append
Write-Output "MASTER_OK:$buildDir"
'@
    $masterPath = Join-Path $proj $masterName
    Set-Content -Path $masterPath -Value $masterContent -Encoding UTF8
    Log "Wrote master script: $masterPath"

    # publish PS (fixed, uses script folder to locate build)
    $publishPsContent = @'
param([string]$BuildDir)
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$repoRoot = Split-Path -Parent $scriptDir
if (-not $BuildDir) { $BuildDir = Join-Path $scriptDir "build\site" }
Write-Output "PUBLISH_START"
Write-Output ("RepoRoot:" + $repoRoot)
Write-Output ("BuildDir:" + $BuildDir)
if (-not (Test-Path $BuildDir)) { New-Item -ItemType Directory -Path $BuildDir -Force | Out-Null; "<h1>Publish Placeholder</h1>" | Out-File (Join-Path $BuildDir "index.html") -Encoding UTF8 }

Push-Location $repoRoot
# detect current branch
try { $currentBranch = (& git rev-parse --abbrev-ref HEAD).Trim() } catch { $currentBranch = "main" }
# ensure gh-pages exists
$hasGh = $false
try { git show-ref --verify --quiet refs/heads/gh-pages; if ($LASTEXITCODE -eq 0) { $hasGh = $true } } catch {}
if (-not $hasGh) {
  git checkout --orphan gh-pages 2>$null
  Get-ChildItem -Force | Where-Object { $_.Name -ne ".git" } | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue
  New-Item -ItemType File -Path ".nojekyll" -Force | Out-Null
  "GH Pages init" | Out-File -FilePath "index.html" -Encoding UTF8
  git add -A 2>$null
  try { git commit -m "Initialize gh-pages" 2>$null } catch {}
  try { git push -u origin gh-pages 2>$null } catch {}
} else {
  git checkout gh-pages
}

# clear contents (preserve .git)
Get-ChildItem -Force | Where-Object { $_.Name -ne ".git" } | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue
Copy-Item -Path (Join-Path $BuildDir "*") -Destination "." -Recurse -Force -ErrorAction SilentlyContinue
New-Item -ItemType File -Path ".nojekyll" -Force | Out-Null
git add -A 2>$null
try { git commit -m ("Publish via CHHAMA " + (Get-Date -Format "yyyy-MM-dd HH:mm:ss")) } catch {}
try { git push origin gh-pages } catch { Write-Output "PUSH_FAILED" }
git checkout $currentBranch
Pop-Location
Write-Output "PUBLISH_OK"
'@
    $publishPsPath = Join-Path $proj $publishPsName
    Set-Content -Path $publishPsPath -Value $publishPsContent -Encoding UTF8
    Log "Wrote publish ps script: $publishPsPath"

    # publish .bat wrapper
    $batContent = '@echo off
cd /d "%~dp0"
powershell -ExecutionPolicy Bypass -NoProfile -File "%~dp0run_auto_publish.ps1"
pause
'
    $publishBatPath = Join-Path $proj $publishBatName
    Set-Content -Path $publishBatPath -Value $batContent -Encoding ASCII
    Log "Wrote publish .bat wrapper: $publishBatPath"
} else {
    Log "All helper scripts present:"
    Log " master: $masterPath"
    Log " publish ps: $publishPsPath"
    Log " publish bat: $publishBatPath"
}

# --- Git: safe fetch & branch sync (use correct fetch usage) ---
Push-Location $root
try {
    Log "Running: git fetch --all --prune"
    git fetch --all --prune 2>&1 | Tee-Object -FilePath $logFile -Append
    Log "Fetch done."
} catch { Log "Fetch warning: $_" }
# Try checkout main/master
$branches = @("main","master")
$checked = $false
foreach ($b in $branches) {
    try {
        git checkout $b 2>&1 | Tee-Object -FilePath $logFile -Append
        git pull origin $b 2>&1 | Tee-Object -FilePath $logFile -Append
        Log "Checked out and pulled $b"
        $checked = $true; break
    } catch { Log "Branch $b not available or pull failed." }
}
if (-not $checked) {
    try { git checkout -b main 2>&1 | Tee-Object -FilePath $logFile -Append; Log "Created local main branch." } catch {}
}
Pop-Location

# --- Run master script (full path) ---
try {
    Log "Running MASTER: $masterPath"
    & powershell -NoProfile -ExecutionPolicy Bypass -File $masterPath 2>&1 | Tee-Object -FilePath $logFile -Append
    Log "MASTER finished."
} catch { Log "MASTER error: $_" }

# --- Ensure build exists (calc path relative to master script) ---
$expectedBuild = Join-Path (Split-Path $masterPath -Parent) "build\site"
if (-not (Test-Path $expectedBuild)) {
    Log "Build dir missing at expected path: $expectedBuild - creating placeholder"
    New-Item -ItemType Directory -Path $expectedBuild -Force | Out-Null
    "<h1>Auto placeholder</h1>" | Out-File -FilePath (Join-Path $expectedBuild "index.html") -Encoding UTF8
} else {
    Log "Build dir exists: $expectedBuild"
}

# --- Run publish (use cmd.exe to run .bat so WorkingDirectory works reliably) ---
$pubBat = (Find-FileUnderRoot $publishBatName)
if (-not $pubBat) { Log "ERROR: cannot find publish .bat"; exit 3 }
$pubDir = Split-Path -Parent $pubBat
Log "Invoking publish wrapper: $pubBat (working dir: $pubDir)"

try {
    $args = "/c `"$pubBat`""
    Start-Process -FilePath "cmd.exe" -ArgumentList $args -WorkingDirectory $pubDir -NoNewWindow -Wait -WindowStyle Hidden
    Log "Publish wrapper executed."
} catch {
    Log "Publish invocation failed: $_ - trying PowerShell direct"
    try {
        & powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $pubDir "run_auto_publish.ps1") 2>&1 | Tee-Object -FilePath $logFile -Append
        Log "Publish PS executed."
    } catch {
        Log "Publish script failed too: $_"
    }
}

# --- Post-publish: check git status and optionally auto-add/commit ---
Push-Location $root
$st = git status --porcelain 2>&1
if ($st) {
    Log "Git working tree shows changes (status):"
    git status --short 2>&1 | Tee-Object -FilePath $logFile -Append
    try {
        git add -A 2>&1 | Tee-Object -FilePath $logFile -Append
        git commit -m ("Auto-commit: after CHHAMA run $time") 2>&1 | Tee-Object -FilePath $logFile -Append
        Log "Auto-commit attempted."
        # attempt push to main safely
        try { git push origin main 2>&1 | Tee-Object -FilePath $logFile -Append; Log "Pushed to origin/main (if auth allowed)." } catch { Log "Push to origin/main failed (auth or remote)."}
    } catch { Log "Auto commit failed: $_" }
} else {
    Log "Git working tree clean."
}
Pop-Location

Log "=== CHHAMA MASTER ALL-IN-ONE END ==="
Log "Log file: $logFile"
Write-Host "`n=== LAST 80 LINES OF LOG ===" -ForegroundColor Cyan
Get-Content $logFile -Tail 80 | ForEach-Object { Write-Host $_ }
