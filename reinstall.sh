#!/usr/bin/env bash

set -euo pipefail

TARGET="${TARGET:-cursor}"

yarn build && \
	{ $TARGET --uninstall-extension kiprasmel.terminal-title-context || :; } && \
	$TARGET --install-extension terminal-title-context-0.0.1.vsix

echo -e "\ndone. restart $TARGET's extension host now."
