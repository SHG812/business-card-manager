#!/bin/bash
# このスクリプトは名刺管理アプリを開きます

# HTML ファイルのフルパス
HTML_FILE="$(pwd)/index.html"

echo "名刺管理アプリを開こうとしています..."
echo "以下のファイルを開いてください: $HTML_FILE"

# ブラウザを検出して開く試み
if command -v google-chrome &> /dev/null; then
    echo "Google Chrome で開いています..."
    google-chrome "$HTML_FILE"
elif command -v firefox &> /dev/null; then
    echo "Firefox で開いています..."
    firefox "$HTML_FILE"
elif command -v chromium-browser &> /dev/null; then
    echo "Chromium で開いています..."
    chromium-browser "$HTML_FILE"
elif command -v brave-browser &> /dev/null; then
    echo "Brave で開いています..."
    brave-browser "$HTML_FILE"
elif command -v microsoft-edge &> /dev/null; then
    echo "Microsoft Edge で開いています..."
    microsoft-edge "$HTML_FILE"
else
    echo "自動でブラウザを開くことができませんでした。"
    echo "======================="
    echo "手動でブラウザを開き、以下のファイルを開いてください："
    echo "$HTML_FILE"
    echo "======================="
fi
