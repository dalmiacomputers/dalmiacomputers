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
