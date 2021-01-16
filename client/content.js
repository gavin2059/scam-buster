// Listen to message passed and perform action
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.scam === true ) {
      alert('this is a scam')
    }
  }
);