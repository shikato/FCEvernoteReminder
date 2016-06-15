# FCEvernoteReminder
FCEvernoteReminder automatically registers reminders which are based on [forgetting curve](https://en.wikipedia.org/wiki/Forgetting_curve) with your Evernote.

```
You can use this software only in Mac.
Because this software uses JXA.
```
## Getting Started
### Required 
Please install [Evernote.app](https://itunes.apple.com/en/app/evernote/id406056744?mt=12).

### Download
#### curl
``` 
curl -Ss -f -L https://github.com/shikato/FCEvernoteReminder/tarball/master | tar xvz -C ./
```

#### git
```
git clone https://github.com/shikato/FCEvernoteReminder.git
```

#### zip
[https://github.com/shikato/FCEvernoteReminder/archive/master.zip](https://github.com/shikato/FCEvernoteReminder/archive/master.zip)

### Install
```
sh ./install.sh
```

### Uninstall
```
sh ./uninstall.sh
```

## Usage
If you want to automatically register reminders which are based on **[forgetting curve](https://en.wikipedia.org/wiki/Forgetting_curve)** with your notes of Evernote.  
Please add `fc0` as a tag to the notes. Then reminders will be automatically registered with the notes.  
If you finish the reminder. Next reminder will be automatically registered with the note.

Reminders are registered in the following timings.

1. **one day later (fc1)**
1. **one week later (fc2)**
1. **two weeks later (fc3)**
1. **one month later (fc4)**

[fcEvernoteReminder.js]()

This FCEvernoteReminder task is automatically executed at the following times.
* 8:00
* 12:00
* 23:00

[org.shikato.fc.evernote.reminder.plist.before]()

If your mac sleeps, this task will be executed right after your mac wakes up.

### Option 
If you want to change tags names.
Please modify the following code.

```javascript
var FIRST_TIME = 'c0';
var ONE_DAY_LATER = 'c1';
var ONE_WEEK_LATER = 'c2';
var TWO_WEEKS_LATER = 'c3';
var ONE_MONTH_LATER = 'c4';
var COMPLETE = 'c5';
```

[fcEvernoteReminder.js]()

If you want to change times when FCEvernoteReminder task executes.
Please modify the following code.
```xml
<dict>
  <key>Hour</key>
  <integer>8</integer>
  <key>Minute</key>
  <integer>00</integer>
</dict>
<dict>
  <key>Hour</key>
  <integer>12</integer>
  <key>Minute</key>
  <integer>00</integer>
</dict>
<dict>
  <key>Hour</key>
  <integer>23</integer>
  <key>Minute</key>
  <integer>00</integer>
</dict>  
```
[org.shikato.fc.evernote.reminder.plist.before]()

After modified the code to use option. Please execute `sh ./install.sh`.

## Other documents
qiita

## License
MIT


