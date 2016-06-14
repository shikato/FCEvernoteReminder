#!/bin/sh 

PLIST_FILE_NAME="org.shikato.fc.evernote.reminder.plist" 
PLIST_FILE_INSTALL_DIR="${HOME}/Library/LaunchAgents/" 

launchctl unload ${PLIST_FILE_INSTALL_DIR}/${PLIST_FILE_NAME}
if [[ $? -eq 1 ]]; then
  echo "Uninstall failed." 
  if [[ "$TMUX" != "" ]]; then
    echo "Because you maybe are using tmux now."
    echo "I recommend finishing tmux."
  fi
  exit 1
fi 

rm ${PLIST_FILE_INSTALL_DIR}/${PLIST_FILE_NAME}

echo "Uninstall completed."
