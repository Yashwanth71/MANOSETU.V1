#!/usr/bin/env bash
set -euo pipefail
if ! command -v code >/dev/null 2>&1; then
  echo 'VS Code CLI is not installed here. In VS Code, enable the code command, then run this script on your development computer.'
  exit 1
fi
for extension in dbaeumer.vscode-eslint esbenp.prettier-vscode ms-python.python ms-python.vscode-pylance charliermarsh.ruff GitHub.vscode-pull-request-github GitHub.vscode-github-actions; do
  code --install-extension "$extension"
done
