let noHistoryDomains = [];
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.noHistoryDomains) {
    noHistoryDomains = changes.noHistoryDomains.newValue || [];
    console.log('Updated domain list:', noHistoryDomains);
  }
});

chrome.storage.sync.get(['noHistoryDomains'], (result) => {
  noHistoryDomains = result.noHistoryDomains || [];
  console.log('Initial domain list:', noHistoryDomains);
});

// 防抖：避免短时间内重复删除同一 URL
let processedUrls = new Set();

// 删除历史记录的通用逻辑
const deleteHistory = (urlString) => {
  const url = new URL(urlString);
  const domain = url.hostname;

  if (!noHistoryDomains.some(d => domain === d || domain.endsWith('.' + d))) {
    return;
  }

  // 防抖：短时间内跳过重复 URL
  if (processedUrls.has(urlString)) {
    console.log(`Already processed URL, skipping: ${urlString}`);
    return;
  }
  processedUrls.add(urlString);
  setTimeout(() => processedUrls.delete(urlString), 2000); // 缩短防抖时间到 2 秒

  console.log(`Matched domain: ${domain}, deleting history for: ${urlString}`);
  
  // 第一次尝试：直接删除
  setTimeout(() => {
    chrome.history.deleteUrl({ url: urlString }, () => {
      if (chrome.runtime.lastError) {
        console.error(`Failed to delete history for ${urlString}:`, chrome.runtime.lastError);
      } else {
        console.log(`Successfully deleted history: ${urlString}`);
      }

      // 后备：使用 chrome.history.search 查找并删除所有相关记录
      chrome.history.search(
        { text: url.origin, startTime: 0, maxResults: 100 },
        (historyItems) => {
          historyItems.forEach((item) => {
            if (item.url.startsWith(url.origin)) {
              chrome.history.deleteUrl({ url: item.url }, () => {
                console.log(`Fallback: deleted history: ${item.url}`);
              });
            }
          });
        }
      );
    });
  }, 1000); // 增加延迟到 1 秒
};

// 监听网页请求事件
chrome.webRequest.onBeforeRequest.addListener(
  (details) => deleteHistory(details.url),
  { urls: ["<all_urls>"] }
);
chrome.webRequest.onCompleted.addListener(
  (details) => deleteHistory(details.url),
  { urls: ["<all_urls>"] }
);
chrome.webRequest.onHeadersReceived.addListener(
  (details) => deleteHistory(details.url),
  { urls: ["<all_urls>"] }
);

// 监听页内跳转事件（SPA 跳转）
chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
  if (details.url) {
    console.log(`History state updated: ${details.url}`);
    deleteHistory(details.url);
  }
});

// 监听页面提交事件（包括刷新）
chrome.webNavigation.onCommitted.addListener((details) => {
  if (details.url) {
    console.log(`Page committed: ${details.url}`);
    deleteHistory(details.url);
  }
});

// 监听页面加载完成事件
chrome.webNavigation.onDOMContentLoaded.addListener((details) => {
  if (details.url) {
    console.log(`DOM content loaded: ${details.url}`);
    deleteHistory(details.url);
  }
});