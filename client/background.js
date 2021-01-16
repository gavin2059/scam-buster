const socket = io('http://127.0.0.1:5000');

// Runs when you connect
socket.on('connect', function() {
 });

 // Run when receive the 'scan' event which is triggered when server is alerted in app.py
 // Parameters: url (string)- url of the detected scam website
 //             tabID (int) - integer of the tabID that has scam website        
socket.on('scam', function(url, tabID) {
  // info is a (url, id) tuple
    console.log("server says scam to client", url, tabID);
    // Gets details about the current tab, once complete if current tab== scam tab will send Message to content.js with scam==True
    //Q: Race Condition?    
    chrome.tabs.get(tabID, (tab)=> {
      console.log("checking if still on page");
      if(url === tab.url) {
        console.log("still on page");
        chrome.tabs.sendMessage(tabID, {"scam": true});
      }
    });
    }
);

// Called when a new page is loaded. 
chrome.webNavigation.onCompleted.addListener(function(tab) {
// Gets info from the opened page
  var url = tab.url;
  var tabID = tab.tabId;
  console.log('pageload', url, tabID);
  socket.emit('pageload', url, tabID);
});