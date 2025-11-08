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
