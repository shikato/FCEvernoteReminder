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
#### via curl
``` 
curl -Ss -f -L https://github.com/shikato/FCEvernoteReminder/tarball/master | tar xvz -C ./
```

#### via git
```
git clone https://github.com/shikato/FCEvernoteReminder.git
```

#### via zip
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
If you finish the reminders. Next reminders will be automatically registered with the notes.

Reminders are registered in the following timings.

1. **one day later (fc1)**
1. **one week later (fc2)**
1. **two weeks later (fc3)**
1. **one month later (fc4)**

This FCEvernoteReminder task is automatically executed at the following times.
* 8:00
* 12:00
* 23:00

If your mac sleeps, this task will be executed right after your mac wakes up.

### Option 
#### How to change tag names 
If you want to change tag names.  
Please modify the following code.
```javascript
// Evernote tag names
var FIRST_TIME = 'fc0';
var ONE_DAY_LATER = 'fc1';
var ONE_WEEK_LATER = 'fc2';
var TWO_WEEKS_LATER = 'fc3';
var ONE_MONTH_LATER = 'fc4';
var COMPLETE = 'fc5';
```

[fcEvernoteReminder.js](https://github.com/shikato/FCEvernoteReminder/blob/master/fcEvernoteReminder.js#L10-L16)

#### How to change times when FCEvernoteReminder task is executed
If you want to change times when FCEvernoteReminder task is executed.  
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
[org.shikato.fc.evernote.reminder.plist.before](https://github.com/shikato/FCEvernoteReminder/blob/master/org.shikato.fc.evernote.reminder.plist.before#L18-L35)

After you modified the code to use option. Please execute `sh ./install.sh`.

#### How to execute by yourself
You can execute FCEvernoteReminder task by yourself.
```
sh ./self.sh
```

## Other documents
[qiita]()

## License
MIT
