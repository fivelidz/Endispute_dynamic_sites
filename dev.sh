#!/usr/bin/env bash
# Quick dev launcher — pick a site to run locally.
#
# Usage:
#   ./dev.sh           → menu
#   ./dev.sh 1         → site-1-aurora
#   ./dev.sh 2         → site-2-courtroom
#   ./dev.sh 3         → site-3-mosaic
#   ./dev.sh build     → build all 3 for production

set -e
cd "$(dirname "$0")"

run_dev() {
  local dir=$1
  echo "→ Starting $dir on http://localhost:3000"
  cd "$dir" && bun dev
}

build_all() {
  for dir in site-1-aurora site-2-courtroom site-3-mosaic; do
    echo "→ Building $dir"
    (cd "$dir" && bun run build)
    echo "  ✓ $dir/out/ ready"
  done
}

case "${1:-menu}" in
  1|aurora)     run_dev "site-1-aurora" ;;
  2|courtroom)  run_dev "site-2-courtroom" ;;
  3|mosaic)     run_dev "site-3-mosaic" ;;
  build)        build_all ;;
  menu|*)
    echo "Endispute dynamic sites — pick one:"
    echo "  1) Aurora    — warm gradient, modern law firm"
    echo "  2) Courtroom — editorial dark, kinetic typography"
    echo "  3) Mosaic    — bento + magnetic cursor"
    echo
    echo "Usage:  ./dev.sh [1|2|3|build]"
    echo "Or run any site directly:  cd site-X-name && bun dev"
    ;;
esac
