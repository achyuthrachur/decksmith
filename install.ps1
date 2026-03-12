# decksmith installer
# Usage: irm https://raw.githubusercontent.com/achyuthrachur/decksmith/main/install.ps1 | iex
#
# Installs for both Claude Code and Codex by default.
# To install for one agent only, set env var before running:
#   $env:DECKSMITH_AGENT = "claude"; irm .../install.ps1 | iex
#   $env:DECKSMITH_AGENT = "codex";  irm .../install.ps1 | iex

$ErrorActionPreference = "Stop"

function Write-Step($msg) { Write-Host "`n$msg" -ForegroundColor Cyan }
function Write-Ok($msg)   { Write-Host "  $msg" -ForegroundColor Green }
function Write-Warn($msg) { Write-Host "  $msg" -ForegroundColor Yellow }

Write-Host ""
Write-Host "decksmith installer" -ForegroundColor White
Write-Host "===================" -ForegroundColor White

# Bypass corporate SSL proxy for npm and git
npm config set strict-ssl false 2>$null
git config --global http.sslVerify false 2>$null

# ── 1. Clone / update ────────────────────────────────────────────────────────
$installDir = "$env:USERPROFILE\.decksmith"

Write-Step "Step 1/4 - Downloading decksmith..."

if (Test-Path "$installDir\.git") {
    Write-Warn "Existing install found - updating..."
    git -C $installDir pull
}
else {
    git clone https://github.com/achyuthrachur/decksmith.git $installDir
}

Write-Ok "Source ready at $installDir"

# ── 2. Build and install globally ────────────────────────────────────────────
Write-Step "Step 2/4 - Building and installing..."

Set-Location $installDir
npm install 2>&1 | Out-Null
npm install -g .

Write-Ok "decksmith $(decksmith --version) installed globally"

# ── 3. Register MCP server + slash command ───────────────────────────────────
Write-Step "Step 3/4 - Registering MCP server..."

$agent = $env:DECKSMITH_AGENT  # "claude", "codex", or empty (both)

if ($agent -eq "codex") {
    decksmith register --codex --force
}
elseif ($agent -eq "claude") {
    decksmith register --claude --force
}
else {
    decksmith register --claude --force
    decksmith register --codex  --force
}

# ── 4. Sync skills (copy from local clone — avoids SSL issues) ───────────────
Write-Step "Step 4/4 - Syncing skills..."

$skillsSrc = "$installDir\skills"
$claudeDest = "$env:USERPROFILE\AI Coding Projects\.claude\skills"
$codexDest  = "$env:USERPROFILE\.codex\skills"

function Sync-Skills-Local($dest, $label) {
    New-Item -ItemType Directory -Force -Path $dest | Out-Null
    $skills = Get-ChildItem $skillsSrc -Directory
    foreach ($skill in $skills) {
        $target = Join-Path $dest $skill.Name
        New-Item -ItemType Directory -Force -Path $target | Out-Null
        Copy-Item "$($skill.FullName)\SKILL.md" -Destination "$target\SKILL.md" -Force
        Write-Ok "$($skill.Name.PadRight(24)) installed"
    }
    Write-Host ""
    Write-Host "  Done. Restart $label to pick up new skills." -ForegroundColor DarkGray
}

if ($agent -eq "codex") {
    Write-Host "`n  Syncing to $codexDest"
    Sync-Skills-Local $codexDest "Codex"
}
elseif ($agent -eq "claude") {
    Write-Host "`n  Syncing to $claudeDest"
    Sync-Skills-Local $claudeDest "Claude Code"
}
else {
    Write-Host "`n  Syncing to $claudeDest"
    Sync-Skills-Local $claudeDest "Claude Code"
    Write-Host "`n  Syncing to $codexDest"
    Sync-Skills-Local $codexDest "Codex"
}

# ── Done ─────────────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "Done." -ForegroundColor Green
Write-Host ""

if ($agent -ne "codex") {
    Write-Host "Claude Code:" -ForegroundColor White
    Write-Host "  1. Restart Claude Code"
    Write-Host "  2. Type /deck to start a new deck project"
    Write-Host ""
}

if ($agent -ne "claude") {
    Write-Host "Codex:" -ForegroundColor White
    Write-Host "  1. Restart Codex"
    Write-Host "  2. Reference @instructions/deck.md to start a new deck project"
    Write-Host ""
}

Write-Host "Verify: decksmith --version" -ForegroundColor DarkGray
