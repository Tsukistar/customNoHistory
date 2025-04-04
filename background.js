// 监听存储变化，更新域名列表
let noHistoryDomains = [];
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.noHistoryDomains) {
    noHistoryDomains = changes.noHistoryDomains.newValue || [];
    console.log('更新域名列表:', noHistoryDomains);
  }
});

// 初始化时加载域名列表
chrome.storage.sync.get(['noHistoryDomains'], (result) => {
  noHistoryDomains = result.noHistoryDomains || [];
  console.log('初始域名列表:', noHistoryDomains);
});

// 监听网页请求完成，删除匹配的历史记录
chrome.webRequest.onCompleted.addListener(
  (details) => {
    const url = new URL(details.url);
    const domain = url.hostname;

    // 检查是否匹配用户设置的域名
    if (noHistoryDomains.some(d => domain === d || domain.endsWith('.' + d))) {
      chrome.history.deleteUrl({ url: details.url }, () => {
        console.log(`已删除历史记录: ${details.url}`);
      });
    }
  },
  { urls: ["<all_urls>"] }
);