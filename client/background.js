const socket = io('http://127.0.0.1:5000');

// Runs when you connect
socket.on('connect', function() {
 });

socket.on('scam', function(tabID) {
    console.log("server says scam to client", tabID);
    chrome.tabs.sendMessage(tabID, {"scam": true});
}
);

// Called when a new page is loaded
chrome.webNavigation.onDOMContentLoaded.addListener(function(tab) {
// Gets info from the opened page
  var url = tab.url;
  var tabID = tab.id;
  console.log('pageload', url, tabID);
  socket.emit('pageload', url, tabID);
// Gets info from active tab (breaks if alt tab)
  // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //   var activeTab = tabs[0];
  //   var url = activeTab.url;
  //   var tabID = activeTab.id;
  //   console.log('pageload', url, tabID);
  //   socket.emit('pageload', url, tabID);
  // });
});