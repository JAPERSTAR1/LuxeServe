# Assemble the single-file exam studio.
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$utf8 = New-Object System.Text.UTF8Encoding($false)

function Read-Text([string]$path) {
  return [System.IO.File]::ReadAllText($path, $utf8)
}

$cssFiles = @(
  "01-base.css",
  "02-dashboard.css",
  "03-exam.css",
  "04-results.css",
  "05-responsive.css"
)
$cssParts = foreach ($file in $cssFiles) {
  $path = Join-Path (Join-Path $PSScriptRoot "css") $file
  "/* ==== $file ==== */`n" + (Read-Text $path).TrimEnd()
}
$css = $cssParts -join "`n`n"

$dataFiles = @("ch1.js", "ch2.js", "ch3.js", "ch4.js", "ch5.js")
$dataParts = foreach ($file in $dataFiles) {
  $path = Join-Path (Join-Path $PSScriptRoot "data") $file
  (Read-Text $path).TrimEnd()
}
$data = $dataParts -join "`n`n"

$appFiles = @("app-01.js", "app-02.js", "app-03.js")
$appParts = foreach ($file in $appFiles) {
  $path = Join-Path $PSScriptRoot $file
  (Read-Text $path).TrimEnd()
}
$app = $appParts -join "`n`n"

$shell = Read-Text (Join-Path $PSScriptRoot "shell.html")
$output = $shell.Replace("<!--STYLE-->", $css).Replace("<!--DATA-->", $data).Replace("<!--APP-->", $app)

if ($output.Contains("<!--STYLE-->") -or $output.Contains("<!--DATA-->") -or $output.Contains("<!--APP-->")) {
  throw "A build marker was not replaced."
}

$target = Join-Path $root "index.html"
[System.IO.File]::WriteAllText($target, $output, $utf8)
Write-Host ("Built {0} ({1:N0} bytes)" -f $target, (Get-Item $target).Length)
