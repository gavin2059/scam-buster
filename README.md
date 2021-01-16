# ScamBuster
Chrome extension to detect potential tech support scam websites.

todo:
  - implement detection.py
  - make frontend a e s t h e t i c
  
Dev Notes:
- For sendMessage in background.js, do we have to consider the race condition where the function checks that current tab is scam tab but user switches to other tab while message is being sent? 
