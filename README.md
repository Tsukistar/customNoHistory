<div style="font-weight: bolder; font-size: larger; margin-left: 10px; padding-bottom: 10px;">
    <a href="./README.zh-hans.md" target="_blank" rel="noopener noreferrer">简体中文 |</a>
    <a href="./README.zh-hant.md" target="_blank" rel="noopener noreferrer">正體中文</a>
</div>

# Custom No History

## Features
Custom No History is a Chrome browser extension that allows users to selectively prevent specific websites from leaving a browsing history. You can configure a list of domains to ensure that visits to those sites leave no trace.

## Installation
This extension is not yet available on the Chrome Web Store. You can install it manually by following these steps:
1. **Download the Code**:
   - Download the ZIP file from **Release**, or use `git clone` to obtain the code.
2. **Extract the Files**:
   - Unzip the file to a folder (e.g., `CustomNoHistory`).
3. **Load the Extension**:
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable "Developer Mode" in the top right corner.
   - Click "Load unpacked" and select the extracted folder.
4. **Verify Installation**:
   - The extension icon should appear in the browser toolbar.

## Usage
1. **Configure Domains**:
   - Click the extension icon to open the configuration page.
   - Enter the domains to block in the text box, one per line, ending with a comma (e.g., `tsukistar.cc,`).
   - Changes save automatically after 1 second.
2. **Verify Results**：
   - Visit a configured website and check if its history (`chrome://history/`) has been cleared.

## Notes
- Requires "all websites" and "history" permissions for real-time monitoring and cleanup.
- The domain list is stored locally and not uploaded to any server.
- If results are inconsistent, ensure the domain format is correct (e.g., `example.com`).
- This extension runs in developer mode, which may trigger a warning—this is normal.

## Contribution
Feel free to submit issues or suggestions to [Issues](https://github.com/Tsukistar/customNoHistory/issues).

## License
GPL-3.0 License