Add-Type -TypeDefinition @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

public static class BgRemover
{
    public static void Remove(string input, string output, int tolerance = 42, int feather = 38)
    {
        using (var src = new Bitmap(input))
        {
            int w = src.Width, h = src.Height;

            // Average corner colors for background estimate
            Color[] corners = {
                src.GetPixel(2, 2),
                src.GetPixel(w - 3, 2),
                src.GetPixel(2, h - 3),
                src.GetPixel(w - 3, h - 3)
            };
            int bgR = 0, bgG = 0, bgB = 0;
            foreach (var c in corners) { bgR += c.R; bgG += c.G; bgB += c.B; }
            bgR /= 4; bgG /= 4; bgB /= 4;

            var dst = new Bitmap(w, h, PixelFormat.Format32bppArgb);

            var srcRect = new Rectangle(0, 0, w, h);
            var srcData = src.LockBits(srcRect, ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
            var dstData = dst.LockBits(srcRect, ImageLockMode.WriteOnly, PixelFormat.Format32bppArgb);

            int stride = Math.Abs(srcData.Stride);
            int bytes = stride * h;
            byte[] srcPx = new byte[bytes];
            byte[] dstPx = new byte[bytes];
            Marshal.Copy(srcData.Scan0, srcPx, 0, bytes);

            double maxDist = tolerance + feather;

            for (int y = 0; y < h; y++)
            {
                int row = y * stride;
                for (int x = 0; x < w; x++)
                {
                    int i = row + x * 4;
                    byte b = srcPx[i], g = srcPx[i + 1], r = srcPx[i + 2];

                    double dr = r - bgR, dg = g - bgG, db = b - bgB;
                    double dist = Math.Sqrt(dr * dr + dg * dg + db * db);

                    int alpha = 255;
                    if (dist <= tolerance) alpha = 0;
                    else if (dist < maxDist) alpha = (int)(255.0 * (dist - tolerance) / feather);

                    dstPx[i]     = b;
                    dstPx[i + 1] = g;
                    dstPx[i + 2] = r;
                    dstPx[i + 3] = (byte)alpha;
                }
            }

            Marshal.Copy(dstPx, 0, dstData.Scan0, bytes);
            src.UnlockBits(srcData);
            dst.UnlockBits(dstData);

            // Lossless PNG — preserve full resolution
            dst.Save(output, ImageFormat.Png);
            dst.Dispose();
        }
    }
}
"@ -ReferencedAssemblies System.Drawing

$assetsDir = "C:\Users\OLA\.cursor\projects\c-Users-OLA-Desktop-SalezeusWeb\assets"
$outDir    = "C:\Users\OLA\Desktop\SalezeusWeb\public\team"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$mapping = @(
    @{ n = 1;  file = "c__Users_OLA_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_1-4b0ced63-8926-4a63-9906-3ce508708e3f.png" },
    @{ n = 2;  file = "c__Users_OLA_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_2-b834e4db-1bd3-4dc1-9c05-39df0e27dbc8.png" },
    @{ n = 3;  file = "c__Users_OLA_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_3-d7bd9539-9c02-472d-8560-06e7d198b0f4.png" },
    @{ n = 4;  file = "c__Users_OLA_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_4-a3649c8d-d17a-493e-a39f-e051f3817e9d.png" },
    @{ n = 5;  file = "c__Users_OLA_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_5-055fe8ba-5cc3-40d2-9785-4af56d9b2a3a.png" },
    @{ n = 6;  file = "c__Users_OLA_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_6-86f1ebb8-4b90-4b4a-a73f-e1da792362b7.png" },
    @{ n = 7;  file = "c__Users_OLA_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_7-e2b936d6-6183-4f8e-b6fe-c5587d6f88f6.png" },
    @{ n = 8;  file = "c__Users_OLA_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_8-cbea45d2-1b81-42b8-91d9-05b1dcce8eb3.png" },
    @{ n = 9;  file = "c__Users_OLA_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_9-0a1f8cd1-9570-430b-a26f-0ff934b4d069.png" },
    @{ n = 10; file = "c__Users_OLA_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_10-906631ee-389a-453c-bf1c-a7330329ccb4.png" },
    @{ n = 11; file = "c__Users_OLA_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_11-bc7d43c6-46c8-49f9-83b1-3e571a1cbdda.png" }
)

foreach ($item in $mapping) {
    $src = Join-Path $assetsDir $item.file
    $dst = Join-Path $outDir ("t{0}.png" -f $item.n)
    if (-not (Test-Path $src)) { Write-Error "Missing: $src"; continue }
    Write-Host "Processing t$($item.n)..."
    [BgRemover]::Remove($src, $dst)
    $info = Get-Item $dst
    Write-Host "  -> $($info.Name)  $($info.Length) bytes"
}

Write-Host "Done. Output in $outDir"
