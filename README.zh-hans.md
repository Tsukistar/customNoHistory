# Custom No History

## 功能
Custom No History 是一个 Chrome 浏览器扩展，允许用户选择性地阻止特定网站留下历史记录。你可以自行配置域名列表，确保列表中指定的网站不会留下访问痕迹。

## 安装方法
此扩展尚未上架 Chrome Web Store，您可以通过以下步骤手动安装：
1. **下载代码**：
   - 从 **Release** 下载 ZIP 文件，或使用 `git clone` 获取代码。
2. **解压文件**：
   - 将 ZIP 文件解压到一个文件夹（例如 `CustomNoHistory`）。
3. **加载扩展**：
   - 打开 Chrome 浏览器，进入 `chrome://extensions/`。
   - 启用右上角的“开发者模式”（Developer Mode）。
   - 点击“加载已解压的扩展”（Load unpacked），选择解压后的文件夹。
4. **验证安装**：
   - 扩展图标应出现在浏览器工具栏中。

## 使用方法
1. **配置域名**：
   - 点击扩展图标，打开配置页面。
   - 在文本框中输入需屏蔽的域名，每行一个，以逗号结尾（如 `tsukistar.cc,`）。
   - 输入后 1 秒自动保存。
2. **验证效果**：
   - 访问配置中的网站，检查历史记录（`chrome://history/`）是否已清除。

## 注意事项
- 需要授予“访问所有网站”和“历史记录”权限，以实现实时监控和清理。
- 保存的域名仅存储在本地，不上传至任何服务器。
- 若效果不理想，请确保域名格式正确（如 `example.com`）。
- 本扩展需在开发者模式下运行，可能会有提示，属正常现象。

## 贡献
欢迎提交问题或建议至 [Issues](https://github.com/Tsukistar/customNoHistory/issues) 。

## 许可证
GPL-3.0 License