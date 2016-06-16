/*
 * fcEvernoteReminder
 *
 * Copyright (c) 2016 shikato
 *
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 */

// Evernote tag names
var FIRST_TIME = 'c0';
var ONE_DAY_LATER = 'c1';
var ONE_WEEK_LATER = 'c2';
var TWO_WEEKS_LATER = 'c3';
var ONE_MONTH_LATER = 'c4';
var COMPLETE = 'c5';

var MAX_NETWORK_CHECK_COUNT = 5;
var DELAY_SECOND = 10;

var DEFINED_TAG_NAMES = [FIRST_TIME, ONE_DAY_LATER, ONE_WEEK_LATER, TWO_WEEKS_LATER, ONE_MONTH_LATER, COMPLETE];
var evernoteApp = null;

var getEvernoteApp = function () {
  try {
    evernoteApp = Application('Evernote');
    evernoteApp.includeStandardAdditions = true;
    return evernoteApp;
  } catch (e) {
    console.log(e);
  }
  return null;
};

var getNotesByTag = function (tagName) {
  var notes = evernoteApp.findNotes();
  notes = notes.filter(function (note) {
    return note.tags().filter(function (tag) {
        return tag.name() === tagName;
      }).length > 0
  });
  return notes;
};

var isReminderDone = function (note) {
  if (note.reminderTime.get() == null) {
    return true;
  } else if (note.reminderDoneTime.get() == null) {
    return false;
  }
  return true;
};

var replaceTagWithNextTag = function (note, tagName) {
  if (tagName === COMPLETE) return;

  var tagToUnassign = getTagByName(tagName);

  var tagToAssign = null;
  DEFINED_TAG_NAMES.forEach(function (definedTagName, i) {
    if (tagName === definedTagName) {
      tagToAssign = getTagByName(DEFINED_TAG_NAMES[i + 1])
    }
  });
  if (tagToAssign == null) return;

  tagToUnassign.unassign({from: note});
  tagToAssign.assign({to: note});
};

var getTagByName = function (tagName) {
  var tag = evernoteApp.tags.byName(tagName);
  if (!tag.exists()) {
    tag = evernoteApp.Tag({name: tagName}).make();
  }
  return tag;
};

var setNextReminder = function (note, currentTagName) {
  if (currentTagName === ONE_MONTH_LATER || currentTagName === COMPLETE) {
    return;
  }

  var doneTime = null;
  if (currentTagName === FIRST_TIME) {
    doneTime = new Date();
  } else {
    doneTime = note.reminderDoneTime.get();
    if (doneTime == null) {
      doneTime = new Date();
    }
  }

  if (doneTime == null) return;
  var timeToNextReminder = getTimeForNextReminder(doneTime, currentTagName);
  if (timeToNextReminder == null) return;
  note.reminderTime.set(timeToNextReminder);
  note.reminderOrder.set(new Date());
  note.reminderDoneTime.set(null);
};

var removeReminder = function (note) {
  note.reminderDoneTime.set(null);
  note.reminderTime.set(null);
  note.reminderOrder.set(null);
};

var getTimeForNextReminder = function (doneTime, currentTagName) {
  if (currentTagName === FIRST_TIME) {
    doneTime.setDate(doneTime.getDate() + 1);
  } else if (currentTagName === ONE_DAY_LATER) {
    doneTime.setDate(doneTime.getDate() + 7);
  } else if (currentTagName === ONE_WEEK_LATER) {
    doneTime.setDate(doneTime.getDate() + 14);
  } else if (currentTagName === TWO_WEEKS_LATER) {
    doneTime.setMonth(doneTime.getMonth() + 1);
  } else if (currentTagName === ONE_MONTH_LATER || currentTagName === COMPLETE) {
    return null;
  }
  return doneTime;
};

var isNetworkConnected = function () {
  try {
    var app = Application.currentApplication();
    app.includeStandardAdditions = true;
    app.doShellScript("/sbin/ping -c 1 www.evernote.com");
    return true;
  } catch (e) {
    console.log(e);
  }
  return false;
};

function run(argv) {
  evernoteApp = getEvernoteApp();
  if (evernoteApp == null) {
    console.log("FCEvernoteReminder failed. Evernote.app doesn't exist.");
    return;
  }

  var i = 0;
  while (!isNetworkConnected()) {
    i++;
    if (i === MAX_NETWORK_CHECK_COUNT) {
      console.log("FCEvernoteReminder failed. Network is offline.");
      return;
    }
    delay(DELAY_SECOND);
  }

  evernoteApp.synchronize();

  var notesEachTagArray = [];
  DEFINED_TAG_NAMES.forEach(function (definedTagName) {
    if (definedTagName === COMPLETE) return;
    var notes = getNotesByTag(definedTagName);
    notesEachTagArray.push(notes);
  });

  notesEachTagArray.forEach(function (notesEachTag, i) {
    notesEachTag.forEach(function (note) {
      if (DEFINED_TAG_NAMES[i] !== FIRST_TIME) {
        if (!isReminderDone(note)) {
          return;
        }
      }
      replaceTagWithNextTag(note, DEFINED_TAG_NAMES[i]);
      setNextReminder(note, DEFINED_TAG_NAMES[i]);
      if (DEFINED_TAG_NAMES[i] === ONE_MONTH_LATER) {
        removeReminder(note);
      }
    });
  });
}

