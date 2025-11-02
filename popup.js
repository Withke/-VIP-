const IS_EXTENSION = typeof chrome !== "undefined" && !!(chrome.tabs && chrome.storage);

const ROUTES = [
  "https://www.yemu.xyz/?url=",
  "http://8.134.102.170:8000/play?url=",
];
const routeKey = "currentRouteIndex";
const autoCloseKey = "autoCloseAfterParse";

const storage = IS_EXTENSION
  ? {
      get: (key) =>
        new Promise((resolve) => chrome.storage.local.get([key], (data) => resolve(data[key]))),
      set: (key, value) =>
        new Promise((resolve) => chrome.storage.local.set({ [key]: value }, resolve)),
    }
  : null;

const Tabs = IS_EXTENSION
  ? {
      queryActive: () =>
        new Promise((resolve) =>
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => resolve(tabs[0]))
        ),
      create: (url) => new Promise((resolve) => chrome.tabs.create({ url }, resolve)),
    }
  : null;

function $(id) { return document.getElementById(id); }

function showMsg(text, timeout = 2500) {
  const el = $("msg");
  el.textContent = text || "";
  if (text && timeout) setTimeout(() => (el.textContent = ""), timeout);
}

async function getRouteIndex() {
  if (!IS_EXTENSION) return null;
  const idx = await storage.get(routeKey);
  return typeof idx === "number" ? idx : null;
}

async function setRouteIndex(idx) {
  if (!IS_EXTENSION) return;
  await storage.set(routeKey, idx);
  await updateRouteLabel();
  await updateParseEnabled();
}

async function updateRouteLabel() {
  const idx = IS_EXTENSION ? await getRouteIndex() : null;
  const chip = $("routeChip");
  if (chip) chip.textContent = idx != null ? `线路 ${idx + 1}` : "未选择";
}

async function updateParseEnabled() {
  const idx = IS_EXTENSION ? await getRouteIndex() : null;
  const btn = $("parse");
  if (btn) btn.disabled = idx == null;
}

async function getAutoClose() {
  if (!IS_EXTENSION) return false;
  const val = await storage.get(autoCloseKey);
  return !!val;
}

async function setAutoClose(val) {
  if (!IS_EXTENSION) return;
  await storage.set(autoCloseKey, !!val);
}

document.addEventListener("DOMContentLoaded", async () => {
  await updateRouteLabel();
  await updateParseEnabled();

  const autoCloseEl = $("autoClose");
  if (autoCloseEl) {
    const initVal = await getAutoClose();
    autoCloseEl.checked = initVal;
    autoCloseEl.addEventListener("change", async (e) => {
      await setAutoClose(e.target.checked);
    });
  }

  $("platform").addEventListener("change", async (e) => {
    const url = e.target.value;
    if (!url) return;
    if (IS_EXTENSION) {
      await Tabs.create(url);
      window.close();
    } else {
      window.open(url, "_blank");
      showMsg("预览模式：已在新标签打开平台", 1800);
    }
  });

  $("toggle").addEventListener("click", async () => {
    if (!IS_EXTENSION) {
      showMsg("请在扩展环境中使用切换线路", 2500);
      return;
    }
    const idx = await getRouteIndex();
    const next = idx == null ? 0 : (idx + 1) % ROUTES.length;
    await setRouteIndex(next);
    showMsg(`已切换至线路${next + 1}`);
  });

  $("parse").addEventListener("click", async () => {
    if (!IS_EXTENSION) {
      showMsg("此功能需在扩展环境中使用", 2500);
      return;
    }
    const idx = await getRouteIndex();
    if (idx == null) {
      showMsg("请先切换并选择解析线路");
      return;
    }
    const tab = await Tabs.queryActive();
    const url = tab && tab.url;
    if (!url) {
      showMsg("无法获取当前页面网址");
      return;
    }
    const target = ROUTES[idx] + encodeURIComponent(url);
    await Tabs.create(target);
    const autoClose = await getAutoClose();
    if (autoClose) window.close();
  });
});