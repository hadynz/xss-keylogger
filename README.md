# xss-keylogger
A simple keystroke logger that listens and sends all keystrokes for a user on a Cross-site scripting (XSS) vulnerable 
page to a remote dashboard page via [websockets][1].


## Demo
![](https://cloud.githubusercontent.com/assets/315585/4782509/1aafaf46-5cf8-11e4-87c6-a698c7c47deb.gif)


## Introduction
The XSS Keylogger project is based on a client side script which is to be embedded in a a vulnerable page that listens
to keystrokes on a page, and broadcasts it to an actively running Node server.

The client side script connects using a persistent websocket connection to the Node server. The Node server then in
turn relays the information received to a remote monitoring dashboard which could optionally be running.

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
Run `node index.js` to start up the Node server. The server will run on port `:3000` by default. The snooping client
script will be available to access on the following URL:

```
http://localhost:3000/snoop.js
```

## Demo Harness
To demonstrate this utility locally, point your browser to the following two URLs:

* `http://localhost:3000/innocent.html` - a sample web page that has been exploited with the XSS keystroke logger
  client script. Any text typed on the input fields of this page will immediately be made broadcasted and made visible
   to a sample remote spy dashboard.

* `http://localhost:3000/monitor.html` - a spy dashboard that logs all remote keystrokes from exploited clients.

From the spy dashboard, you can type and send a JavaScript snippet to run remotely in the context of the exploited
client. Some tame code snippets that you can try:

```
// Show a popup remotely
alert("You've been Sn00ped!");

// Change background of client page to pink
document.body.style.background = 'pink';
```

## Embedding Client Side script
A blog post write-up detailing how the keylogger can be embedded in a live XSS vulnerable site is coming soon.

[1]: http://dev.w3.org/html5/websockets
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval
[3]: http://brew.sh