// Listen to message passed and perform action
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("received");
    if( request.scam === true ) {
      console.log('alerted');
      alert('take a shower cmon bruh');
    }
  }
);