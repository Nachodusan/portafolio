#!/usr/bin/env bash
# Genera cv.pdf desde cv.html. La fuente del CV es cv.html; el PDF es derivado.
set -euo pipefail
cd "$(dirname "$0")"

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
[ -x "$CHROME" ] || { echo "No encontré Google Chrome en $CHROME" >&2; exit 1; }

"$CHROME" \
  --headless \
  --disable-gpu \
  --no-pdf-header-footer \
  --virtual-time-budget=4000 \
  --print-to-pdf=cv.pdf \
  "file://$PWD/cv.html" 2>/dev/null

echo "cv.pdf  $(wc -c < cv.pdf | tr -d ' ') bytes"
