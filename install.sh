#!/bin/sh

BASE_DIR="$(cd $(dirname $0); pwd)" 
JXA_SCRIPT_NAME="fcEvernoteReminder.js" 
PLIST_FILE_NAME="org.shikato.fc.evernote.reminder.plist" 
PLIST_FILE_INSTALL_DIR="${HOME}/Library/LaunchAgents/" 

if [[ ! -e "${PLIST_FILE_INSTALL_DIR}" ]]; then 
  echo 'Install failed.' 
  echo "${PLIST_FILE_INSTALL_DIR} doesn't exist."
  echo "Please create ${PLIST_FILE_INSTALL_DIR}"
  exit 1
fi

OSASCRIPT_PATH="$(which osascript)" 
if [[ $? -eq 1 ]]; then 
  echo 'Install failed.' 
  echo "Osascript command is not found." 
  exit 1
fi 

cp "${BASE_DIR}/${PLIST_FILE_NAME}.before" "${BASE_DIR}/${PLIST_FILE_NAME}"
sed -i '' "s:<!-- OSASCRIPT_PATH -->:${OSASCRIPT_PATH}:g" ${BASE_DIR}/${PLIST_FILE_NAME}
sed -i '' "s:<!-- JXA_SCRIPT_PATH -->:${BASE_DIR}/${JXA_SCRIPT_NAME}:g" ${BASE_DIR}/${PLIST_FILE_NAME} 
cp "${BASE_DIR}/${PLIST_FILE_NAME}" $PLIST_FILE_INSTALL_DIR

launchctl unload ${PLIST_FILE_INSTALL_DIR}/${PLIST_FILE_NAME} >/dev/null 2>&1
launchctl_result="$(launchctl load ${PLIST_FILE_INSTALL_DIR}/${PLIST_FILE_NAME} 2>&1)" 
if [[ $? -eq 1 ]]; then 
  echo "Install failed."
  echo "Launchctl command status is 1." 
  exit 1
fi 

if [[ $(echo "$launchctl_result" | grep "not permitted") ]]; then
  echo 'Install failed.' 
  if [[ "$TMUX" != "" ]]; then
    echo "Because you maybe are using tmux now."
    echo "I recommend finishing tmux."
  fi
  exit 1
fi 

echo "Install completed." 
