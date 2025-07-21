# AI เพื่อนที่ปรึกษา - Deployment Script
# PowerShell script สำหรับ deploy ขึ้น Vercel

Write-Host "🚀 เริ่มต้นการ Deploy AI เพื่อนที่ปรึกษา ขึ้น Vercel" -ForegroundColor Green
Write-Host ""

# Step 1: ตรวจสอบ prerequisites
Write-Host "📋 ตรวจสอบ Prerequisites..." -ForegroundColor Yellow

# ตรวจสอบ Node.js
$nodeVersion = node --version 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Node.js: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Node.js ไม่พบ กรุณาติดตั้ง Node.js" -ForegroundColor Red
    exit 1
}

# ตรวจสอบ npm
$npmVersion = npm --version 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ npm: $npmVersion" -ForegroundColor Green
} else {
    Write-Host "❌ npm ไม่พบ" -ForegroundColor Red
    exit 1
}

# ตรวจสอบ Vercel CLI
$vercelVersion = vercel --version 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Vercel CLI: $vercelVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Vercel CLI ไม่พบ กรุณารัน: npm install -g vercel" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Step 2: ตรวจสอบไฟล์ที่จำเป็น
Write-Host "📁 ตรวจสอบไฟล์ที่จำเป็น..." -ForegroundColor Yellow

$requiredFiles = @(
    "package.json",
    "next.config.js",
    "vercel.json"
)

foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "✅ $file" -ForegroundColor Green
    } else {
        Write-Host "❌ $file ไม่พบ" -ForegroundColor Red
    }
}

# ตรวจสอบ .env.local
if (Test-Path ".env.local") {
    Write-Host "✅ .env.local" -ForegroundColor Green
} else {
    Write-Host "⚠️ .env.local ไม่พบ (จะต้องตั้งค่าใน Vercel Dashboard)" -ForegroundColor Yellow
}

Write-Host ""

# Step 3: Build project
Write-Host "🔨 Build โปรเจค..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build สำเร็จ" -ForegroundColor Green
} else {
    Write-Host "❌ Build ล้มเหลว" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Step 4: Deploy to Vercel
Write-Host "🚀 Deploy ขึ้น Vercel..." -ForegroundColor Yellow
Write-Host "💡 หากยังไม่ได้ login Vercel จะเปิดเบราว์เซอร์ให้ login" -ForegroundColor Cyan
Write-Host ""

vercel --prod
if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "🎉 Deploy สำเร็จ!" -ForegroundColor Green
    Write-Host "📝 อย่าลืมตั้งค่า Environment Variables ใน Vercel Dashboard:" -ForegroundColor Cyan
    Write-Host "   - GOOGLE_GEMINI_API_KEY" -ForegroundColor White
} else {
    Write-Host "❌ Deploy ล้มเหลว" -ForegroundColor Red
    Write-Host "💡 ลองรัน: vercel login ก่อน" -ForegroundColor Cyan
    exit 1
}

Write-Host ""
Write-Host "📚 คู่มือเพิ่มเติม:" -ForegroundColor Yellow
Write-Host "   - DEPLOYMENT.md - คู่มือการ deploy" -ForegroundColor White
Write-Host "   - DEPLOYMENT_CHECKLIST.md - Checklist สำหรับ deploy" -ForegroundColor White
Write-Host ""
Write-Host "🎯 ขั้นตอนต่อไป:" -ForegroundColor Yellow
Write-Host "   1. ตั้งค่า Environment Variables ใน Vercel Dashboard" -ForegroundColor White
Write-Host "   2. ทดสอบฟีเจอร์ต่างๆ" -ForegroundColor White
Write-Host "   3. ตรวจสอบ performance" -ForegroundColor White 