document.addEventListener('DOMContentLoaded', () => {
  const domainListTextarea = document.getElementById('domainList');
  const errorMessage = document.getElementById('error-message');
  const saveMessage = document.getElementById('save-message');

  // 设置多语言文本
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    element.textContent = chrome.i18n.getMessage(key);
  });
  document.title = chrome.i18n.getMessage('popupTitle');

  // 从存储中加载已有域名列表
  chrome.storage.sync.get(['noHistoryDomains'], (result) => {
    const domains = result.noHistoryDomains || [];
    domainListTextarea.value = domains.join(',\n');
  });

  // 防抖函数
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  // 验证域名格式
  function isValidDomain(domain) {
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
    return domainRegex.test(domain);
  }

  // 保存域名列表并显示提示
  function saveDomains() {
    const input = domainListTextarea.value.trim();
    const domains = input.split(/,\s*\n/).map(d => d.replace(/,$/, '').trim()).filter(d => d);

    const invalidDomains = domains.filter(d => !isValidDomain(d));
    if (invalidDomains.length > 0) {
      domainListTextarea.classList.add('error');
      errorMessage.classList.remove('hidden');
      saveMessage.classList.add('hidden'); // 隐藏成功提示
      console.log('无效域名:', invalidDomains);
      return;
    }

    domainListTextarea.classList.remove('error');
    errorMessage.classList.add('hidden');
    chrome.storage.sync.set({ noHistoryDomains: domains }, () => {
      console.log('域名列表已保存:', domains);
      saveMessage.classList.remove('hidden'); // 显示保存成功
      setTimeout(() => saveMessage.classList.add('hidden'), 1000); // 1秒后隐藏
    });
  }

  domainListTextarea.addEventListener('input', debounce(saveDomains, 1000));
  domainListTextarea.addEventListener('input', () => {
    domainListTextarea.classList.remove('error');
    errorMessage.classList.add('hidden');
    saveMessage.classList.add('hidden'); // 输入时隐藏成功提示
  });
});