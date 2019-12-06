chrome.tabs.onUpdated.addListener(function (tabId , info) {
  if (info.status === 'complete') {
   chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });
  }
});

chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    message.innerText = request.source;
  }
});

chrome.tabs.executeScript( {
  code: "window.getSelection().toString();"
}, function(selection) {
	if(selection[0] && selection[0].length>1) {
	var v1 = "https://bonitasoft.atlassian.net/browse/PA-37?jql=text%20~%20" + encodeURI(selection[0])+"%20and%20type%3DBug";
	var v2 = "https://customer.bonitasoft.com/search?keys=" + encodeURI(selection[0]);
	var v3 = "https://bonitasoft.atlassian.net/wiki/dosearchsite.action?queryString=" + encodeURI(selection[0]);
	var v4 = "https://documentation.bonitasoft.com/bonita/7.8/index/search?start=0&pageSize=10&searchRequest=" + encodeURI(selection[0]);
	var v5 = "https://eu4.salesforce.com/_ui/search/ui/UnifiedSearchResults?searchType=2&sen=001&sen=a0b&sen=003&sen=a0c&sen=005&sen=500&sen=a0h&sen=a18&str=" + encodeURI(selection[0]);
	var linkArray = [v1, v2, v3, v4, v5];
		for (var i = 0; i < linkArray.length; i++) {
    	// will open each link in the current window
    	chrome.tabs.create({url: linkArray[i]});
		}
	}
});


function onWindowLoad() {

  var message = document.querySelector('#message');

  chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });

}

window.onload = onWindowLoad;