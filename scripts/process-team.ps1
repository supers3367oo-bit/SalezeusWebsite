# Remove solid-color backgrounds from team avatars; preserve full resolution.
param(
    [string]$AssetsDir = "$env:USERPROFILE\.cursor\projects\c-Users-OLA-Desktop-SalezeusWeb\assets",
    [string]$OutDir = "$PSScriptRoot\..\public\team"
)

Add-Type -AssemblyName System.Drawing

function Get-BackgroundColor {
    param([System.Drawing.Bitmap]$bmp)
    $w = $bmp.Width; $h = $bmp.Height
    $samples = @(
        $bmp.GetPixel(2, 2),
        $bmp.GetPixel($w - 3, 2),
        $bmp.GetPixel(2, $h - 3),
        $bmp.GetPixel($w - 3, $h - 3),
        $bmp.GetPixel([int]($w / 2), 2),
        $bmp.GetPixel(2, [int]($h / 2))
    )
    $rs = ($samples | ForEach-Object { $_.R }) | Measure-Object -Average | Select-Object -ExpandProperty Average
    $gs = ($samples | ForEach-Object { $_.G }) | Measure-Object -Average | Select-Object -ExpandProperty Average
    $bs = ($samples | ForEach-Object { $_.B }) | Measure-Object -Average | Select-Object -ExpandProperty Average
    return @([int][math]::Round($rs), [int][math]::Round($gs), [int][math]::Round($bs))
}

function Remove-Background {
    param(
        [string]$InputPath,
        [string]$OutputPath,
        [int]$Threshold = 42,
        [int]$Feather = 18
    )

    $src = [System.Drawing.Bitmap]::FromFile($InputPath)
    $w = $src.Width; $h = $src.Height

    $out = New-Object System.Drawing.Bitmap $w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb
    $bg = Get-BackgroundColor $src

    for ($y = 0; $y -lt $h; $y++) {
        for ($x = 0; $x -lt $w; $x++) {
            $p = $src.GetPixel($x, $y)
            $dr = $p.R - $bg[0]
            $dg = $p.G - $bg[1]
            $db = $p.B - $bg[2]
            $dist = [math]::Sqrt($dr * $dr + $dg * $dg + $db * $db)

            if ($dist -le $Threshold) {
                $alpha = 0
            } elseif ($dist -ge ($Threshold + $Feather)) {
                $alpha = 255
            } else {
                $t = ($dist - $Threshold) / $Feather
                $alpha = [int](255 * $t)
            }

            $out.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $p.R, $p.G, $p.B))
        }
    }

    if (-not (Test-Path (Split-Path $OutputPath))) {
        New-Item -ItemType Directory -Path (Split-Path $OutputPath) -Force | Out-Null
    }

    $out.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $src.Dispose(); $out.Dispose()

    return @{
        width = $w
        height = $h
        size = (Get-Item $OutputPath).Length
        bg = $bg
    }
}

function Test-Transparency {
    param([string]$Path)
    $bmp = [System.Drawing.Bitmap]::FromFile($Path)
    $transparent = 0; $opaque = 0
    $stepX = [math]::Max(1, [int]($bmp.Width / 40))
    $stepY = [math]::Max(1, [int]($bmp.Height / 40))
    for ($y = 0; $y -lt $bmp.Height; $y += $stepY) {
        for ($x = 0; $x -lt $bmp.Width; $x += $stepX) {
            if ($bmp.GetPixel($x, $y).A -lt 128) { $transparent++ } else { $opaque++ }
        }
    }
    $bmp.Dispose()
    return @{ transparent = $transparent; opaque = $opaque; hasAlpha = ($transparent -gt 0) }
}

$results = @()
1..11 | ForEach-Object {
    $n = $_
    $pattern = Join-Path $AssetsDir "c__Users_OLA_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_${n}-*.png"
    $srcFile = Get-ChildItem -Path $pattern -ErrorAction SilentlyContinue | Select-Object -First 1
    if (-not $srcFile) {
        Write-Error "Missing source for image $n"
        return
    }
    $dest = Join-Path $OutDir "t$n.png"
    Write-Host "Processing $n : $($srcFile.Name) -> t$n.png"
    $info = Remove-Background -InputPath $srcFile.FullName -OutputPath $dest
    $alpha = Test-Transparency -Path $dest
    $results += [PSCustomObject]@{
        file = "t$n.png"
        source = $srcFile.Name
        width = $info.width
        height = $info.height
        bytes = $info.size
        bgRGB = ($info.bg -join ',')
        transparentSamples = $alpha.transparent
        opaqueSamples = $alpha.opaque
        hasAlpha = $alpha.hasAlpha
    }
}

Write-Host "`n=== RESULTS ==="
$results | Format-Table -AutoSize
$results | ConvertTo-Json -Depth 3
