/* ═══ Data (used by dashboard / workspace pages) ═══ */
const appUsage = [
  { name: "Telegram", value: 94 },
  { name: "WhatsApp", value: 86 },
  { name: "Signal", value: 79 },
  { name: "WeChat", value: 74 },
  { name: "QQ", value: 66 },
  { name: "Tor Chat", value: 58 }
];

const risks = [
  { title: "TG-Channel / delta-node", level: "高危", badge: "critical", desc: "跨区域传播频次异常，夜间活跃峰值提升 31%" },
  { title: "Signal Group / silent-market", level: "中高", badge: "warning", desc: "与多个已知代理节点共现，时间模式高度重合" },
  { title: "WhatsApp Hub / lotus-44", level: "高危", badge: "critical", desc: "文件分发特征明显，疑似存在跨协议跳转行为" },
  { title: "Tor Relay Cluster / r-17", level: "关注", badge: "info", desc: "正在与 Telegram 公共频道产生二次关联" }
];

const behaviorResults = [
  { sample: "pcap_batch_001", main: "图片传输", secondary: "文本聊天", confidence: 93.8 },
  { sample: "pcap_batch_002", main: "文件投递", secondary: "频道浏览", confidence: 88.2 },
  { sample: "pcap_batch_003", main: "语音通话", secondary: "文本聊天", confidence: 84.7 },
  { sample: "pcap_batch_004", main: "视频呼叫", secondary: "文件投递", confidence: 81.5 }
];

const vpnRows = [
  { file: "cross_mix_01.pcap", result: "VPN", vpn: 0.92, nonVpn: 0.08 },
  { file: "office_tls_02.pcap", result: "Non-VPN", vpn: 0.14, nonVpn: 0.86 },
  { file: "wireguard_stream_03.pcap", result: "VPN", vpn: 0.97, nonVpn: 0.03 },
  { file: "quic_social_04.pcap", result: "Non-VPN", vpn: 0.21, nonVpn: 0.79 }
];

const compareModels = [
  { name: "AppScanner", score: 58, meta: "3.67 Gbps / 2143 MB / 42.6‰" },
  { name: "GraphDApp", score: 65, meta: "4.12 Gbps / 1875 MB / 35.1‰" },
  { name: "ET-BERT", score: 81, meta: "5.14 Gbps / 1628 MB / 27.9‰" },
  { name: "TrafficVigil", score: 96, meta: "6.32 Gbps / 789 MB / 6.5‰" }
];

const logs = [
  "[22:17:03] 初始化抓取引擎，监听 Intel(R) Wi-Fi 6 AX201",
  "[22:17:04] 检测到 Telegram 会话，映射端口 443 / UDP 51820",
  "[22:17:05] 第 01 批次写入完成，输出目录 ./capture/batch-01.pcap",
  "[22:17:06] 行为推断: 图片发送概率 0.67，文本聊天概率 0.29",
  "[22:17:08] 第 02 批次关联到公共频道 delta-node",
  "[22:17:10] 当前吞吐稳定 6.1 Gbps，单包时延 8.4 ms"
];

const batches = [
  { name: "第 01 批次", top: "图片传输", second: "文本聊天", bars: [67, 23, 6, 4] },
  { name: "第 02 批次", top: "文本聊天", second: "频道浏览", bars: [33, 45, 14, 8] },
  { name: "第 03 批次", top: "文件投递", second: "图片传输", bars: [18, 22, 48, 12] },
  { name: "第 04 批次", top: "语音通话", second: "文本聊天", bars: [16, 36, 18, 30] },
  { name: "第 05 批次", top: "视频呼叫", second: "文件投递", bars: [12, 18, 29, 41] },
  { name: "第 06 批次", top: "频道浏览", second: "文本聊天", bars: [21, 39, 11, 29] }
];

const traceItems = [
  { title: "delta-node / Telegram Public", score: "89.4%", note: "与目标设备在 3 个时间窗口内形成稳定共现" },
  { title: "silent-market / Signal Relay", score: "84.1%", note: "跨协议迁移频率异常，边注意力权重上升" },
  { title: "lotus-44 / WhatsApp Hub", score: "78.6%", note: "文件类行为与群组广播峰值重叠" }
];

const timelineItems = [
  "22:14 接入 TLS1.3 通道，建立初始设备指纹",
  "22:16 捕获 QUIC 爆发流，提取到频道浏览模式",
  "22:17 Telegram 批次与敏感群组图谱产生高权重边",
  "22:19 Signal 转发流出现，跨协议交互特征被命中",
  "22:20 生成公共群组关联告警并推送报告摘要"
];

const protocols = ["TLS1.3", "QUIC", "WireGuard", "OpenVPN", "Tor", "Shadowsocks", "HTTP/3", "DTLS", "SRTP", "gRPC"];

const summaryPool = [
  "综合检测链路已完成多层分类，当前以 Telegram 图片传输和频道浏览行为为主，建议优先查看高危公共频道 delta-node。",
  "模型已在真实混合流量模板上完成回放，系统保持低丢包率并发现跨协议跳转模式，适合继续进入群组匹配阶段。",
  "当前节点稳定输出行为嗅探结果，风险主要集中在文件投递和夜间广播活动，建议导出报告并复核批次 03 与批次 05。"
];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

/* ═══ Counter Animation ═══ */
function animateCounters() {
  document.querySelectorAll("[data-counter]").forEach((node) => {
    const target = Number(node.dataset.counter);
    const isInt = Number.isInteger(target);
    let current = 0;
    const timer = setInterval(() => {
      current += target / 36;
      if (current >= target) {
        node.textContent = isInt ? String(target) : target.toFixed(1);
        clearInterval(timer);
      } else {
        node.textContent = isInt ? String(Math.floor(current)) : current.toFixed(1);
      }
    }, 36);
  });
}

/* ═══ Scroll Reveal ═══ */
function setupScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal-section").forEach((el) => observer.observe(el));
}

/* ═══ Nav Scroll Spy ═══ */
function setupNavSpy() {
  const navLinks = document.querySelectorAll(".topnav a[href^='#']");
  const sections = [];

  navLinks.forEach((link) => {
    const id = link.getAttribute("href").slice(1);
    const section = document.getElementById(id);
    if (section) sections.push({ id, link, section });
  });

  if (sections.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((a) => a.classList.remove("nav-current"));
        const activeLink = document.querySelector(`.topnav a[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add("nav-current");
      }
    });
  }, { threshold: 0, rootMargin: "-20% 0px -70% 0px" });

  sections.forEach((s) => observer.observe(s.section));
}

/* ═══ Smooth Scroll for Anchor Links ═══ */
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href").slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

/* ═══ Feedback Form ═══ */
window.submitFeedback = function () {
  const name = document.getElementById("fbName")?.value.trim() || "匿名";
  const dimension = document.getElementById("fbDimension")?.value;
  const score = document.getElementById("fbScore")?.value;
  const strength = document.getElementById("fbStrength")?.value.trim();
  const suggestion = document.getElementById("fbSuggestion")?.value.trim();

  if (!dimension || !score || !suggestion) {
    alert("请填写完整的评审信息（评审维度、评分、改进建议为必填项）。");
    return;
  }

  const entry = {
    name,
    dimension,
    score,
    strength: strength || "未填写",
    suggestion,
    time: new Date().toLocaleString("zh-CN"),
  };

  const list = JSON.parse(localStorage.getItem("traf_feedback") || "[]");
  list.unshift(entry);
  if (list.length > 50) list.length = 50;
  localStorage.setItem("traf_feedback", JSON.stringify(list));

  const successEl = document.getElementById("fbSuccess");
  if (successEl) successEl.classList.add("show");
  const form = document.getElementById("feedbackForm");
  if (form) form.reset();
  const counter = document.getElementById("fbCharCount");
  if (counter) counter.textContent = "0/1000";

  renderFeedbackList();

  setTimeout(() => {
    if (successEl) successEl.classList.remove("show");
  }, 4000);
};

function renderFeedbackList() {
  const container = document.getElementById("fbEntries");
  const listPanel = document.getElementById("fbList");
  const countEl = document.getElementById("fbCount");
  if (!container) return;

  const list = JSON.parse(localStorage.getItem("traf_feedback") || "[]");

  if (list.length === 0) {
    container.innerHTML = '<p class="fb-empty">暂无评审意见，欢迎首位评审专家留下宝贵建议。</p>';
    if (countEl) countEl.textContent = "共 0 条反馈";
    return;
  }

  if (listPanel) listPanel.classList.add("show");
  if (countEl) countEl.textContent = `共 ${list.length} 条反馈`;

  const dimLabels = {
    innovation: "技术创新性",
    performance: "性能指标表现",
    completeness: "功能完整性",
    usability: "平台易用性",
    applicability: "实际应用价值",
    overall: "整体综合评价",
  };

  container.innerHTML = list.map((item) => `
    <div style="padding:16px;border-radius:14px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
        <strong style="font-size:15px;">${escapeHtml(item.name)}</strong>
        <span style="display:flex;align-items:center;gap:8px;">
          <span class="badge teal">${dimLabels[item.dimension] || item.dimension}</span>
          <span style="color:var(--accent);font-weight:700;font-size:16px;">${item.score}/10</span>
        </span>
      </div>
      <p style="margin:8px 0 4px;color:var(--text);font-size:14px;">&#128161; 亮点：${escapeHtml(item.strength)}</p>
      <p style="margin:4px 0;color:var(--muted);font-size:14px;line-height:1.6;">&#128221; 建议：${escapeHtml(item.suggestion)}</p>
      <span style="font-size:11px;color:var(--muted);">${item.time}</span>
    </div>
  `).join("");
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function setupFeedbackForm() {
  const textarea = document.getElementById("fbSuggestion");
  const counter = document.getElementById("fbCharCount");
  if (textarea && counter) {
    textarea.addEventListener("input", () => {
      counter.textContent = textarea.value.length + "/1000";
    });
  }
  renderFeedbackList();
}

/* ═══ Auth Drawer (index.html) ═══ */
function setupAuthDrawer() {
  const authBtn = document.getElementById("authButton");
  const overlay = document.getElementById("authOverlay");
  const drawer = document.getElementById("authDrawer");
  const closeBtn = document.getElementById("authClose");
  if (!authBtn || !overlay || !drawer) return;

  function openDrawer() {
    overlay.classList.add("open");
    drawer.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    overlay.classList.remove("open");
    drawer.classList.remove("open");
    document.body.style.overflow = "";
  }

  authBtn.addEventListener("click", openDrawer);
  if (overlay) overlay.addEventListener("click", closeDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("open")) {
      closeDrawer();
    }
  });
}

function setupAuthTabs() {
  $$(".auth-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const drawer = tab.closest(".auth-drawer");
      const forms = drawer ? drawer.querySelectorAll(".auth-form") : $$(".auth-form");
      const tabs = drawer ? drawer.querySelectorAll(".auth-tab") : $$(".auth-tab");
      tabs.forEach((t) => t.classList.remove("active"));
      forms.forEach((f) => f.classList.remove("active"));
      tab.classList.add("active");
      const targetForm = (drawer || document).querySelector(`[data-auth-form="${tab.dataset.auth}"]`);
      if (targetForm) targetForm.classList.add("active");
    });
  });
}

window.handleLogin = function () {
  alert("登录成功\n\n欢迎回到 TrafficVigil 平台。");
};

window.handleRegister = function () {
  alert("注册成功\n\n欢迎加入 TrafficVigil 平台。\n验证邮件已发送至您的邮箱。");
};

/* ═══ Page renderers (dashboard / workspace) ═══ */
function renderAppBars() {
  const container = document.getElementById("appBars");
  if (!container) return;
  container.innerHTML = appUsage.map((item) => `
    <div class="app-bar">
      <strong>${item.name}</strong>
      <div class="bar-shell"><div class="bar-fill" style="width:${item.value}%"></div></div>
      <span>${item.value}%</span>
    </div>
  `).join("");
}

function renderRiskFeed() {
  const container = document.getElementById("riskFeed");
  if (!container) return;
  container.innerHTML = risks.map((item) => `
    <li class="alert-item">
      <span class="alert-badge ${item.badge}">${item.level}</span>
      <div>
        <strong>${item.title}</strong>
        <div style="color:var(--muted);margin-top:4px;">${item.desc}</div>
      </div>
    </li>
  `).join("");
}

function renderSignalMap() {
  const container = document.getElementById("signalMap");
  if (!container) return;
  const points = [
    { top: "14%", left: "18%" },
    { top: "29%", left: "63%" },
    { top: "56%", left: "22%" },
    { top: "68%", left: "74%" },
    { top: "40%", left: "48%" },
    { top: "81%", left: "43%" }
  ];
  container.innerHTML = points.map((point) => `
    <span class="signal-point" style="top:${point.top}; left:${point.left};"></span>
  `).join("");
}

function renderSummary() {
  const container = document.getElementById("summaryCard");
  if (!container) return;
  const text = summaryPool[Math.floor(Math.random() * summaryPool.length)];
  container.innerHTML = `
    <article>
      <span class="eyebrow">自动摘要</span>
      <strong>系统结论</strong>
      <p>${text}</p>
    </article>
    <article>
      <span class="eyebrow">当前建议</span>
      <strong>继续执行群组关联与批次复核</strong>
      <p>优先查看高置信度实例卡片，并结合实时日志回放分析行为突发点。</p>
    </article>
  `;
}

function runBehaviorDemo() {
  const progress = document.getElementById("behaviorProgress");
  const status = document.getElementById("behaviorStatus");
  const stats = document.getElementById("behaviorStats");
  const cards = document.getElementById("behaviorCards");
  if (!progress || !status) return;
  progress.style.width = "0%";
  status.textContent = "正在解析 PCAP";
  if (stats) stats.innerHTML = "";
  if (cards) cards.innerHTML = "";

  let pct = 0;
  const timer = setInterval(() => {
    pct += 10;
    progress.style.width = `${pct}%`;
    if (pct === 40 && status) status.textContent = "构建包级/流级图谱";
    if (pct === 70 && status) status.textContent = "执行 GATv2 推理";
    if (pct >= 100) {
      clearInterval(timer);
      if (status) status.textContent = "分析完成";
      if (stats) {
        stats.innerHTML = `
          <div class="result-chip"><strong>150 维</strong><span>融合特征</span></div>
          <div class="result-chip"><strong>4 条</strong><span>关键实例</span></div>
          <div class="result-chip"><strong>90.2%</strong><span>准确率模板</span></div>
        `;
      }
      if (cards) {
        cards.innerHTML = behaviorResults.map((item) => `
          <article class="behavior-card">
            <span class="eyebrow">${item.sample}</span>
            <b>${item.main}</b>
            <p>次分类：${item.secondary}</p>
            <p>置信度：${item.confidence}%</p>
          </article>
        `).join("");
      }
    }
  }, 180);
}

function renderVpnCompare() {
  const container = document.getElementById("vpnCompare");
  if (!container) return;
  container.innerHTML = compareModels.map((item) => `
    <div class="compare-item">
      <div>
        <strong>${item.name}</strong>
        <small>${item.meta}</small>
      </div>
      <div class="bar-shell"><div class="bar-fill" style="width:${item.score}%"></div></div>
    </div>
  `).join("");
}

function renderVpnTable() {
  const container = document.getElementById("vpnTable");
  if (!container) return;
  container.innerHTML = vpnRows.map((row) => `
    <div class="vpn-row">
      <strong>${row.file}</strong>
      <span>${row.result}</span>
      <div class="probability-bar">
        <span style="width:${row.vpn * 100}%"></span>
        <span style="width:${row.nonVpn * 100}%"></span>
      </div>
    </div>
  `).join("");
}

function streamLogs() {
  const box = document.getElementById("logBox");
  if (!box) return;
  box.innerHTML = "";
  let index = 0;
  const timer = setInterval(() => {
    box.innerHTML += `${logs[index]}<br>`;
    box.scrollTop = box.scrollHeight;
    index += 1;
    if (index >= logs.length) clearInterval(timer);
  }, 420);
}

function renderBehaviorShare() {
  const container = document.getElementById("behaviorShare");
  if (!container) return;
  const shares = [
    { label: "图片传输", value: "66.7%" },
    { label: "文本聊天", value: "33.3%" },
    { label: "文件投递", value: "12.1%" },
    { label: "语音/视频", value: "8.8%" }
  ];
  container.innerHTML = shares.map((item) => `
    <div class="share-item">
      <strong>${item.label}</strong>
      <span>${item.value}</span>
    </div>
  `).join("");
}

function renderBatch(index) {
  const label = document.getElementById("batchLabel");
  const summary = document.getElementById("batchSummary");
  const bars = document.getElementById("batchBars");
  if (!label || !summary || !bars) return;
  const batch = batches[index];
  label.textContent = batch.name;
  summary.innerHTML = `
    <div class="batch-card">
      <span class="eyebrow">Top 1</span>
      <strong>${batch.top}</strong>
    </div>
    <div class="batch-card">
      <span class="eyebrow">Top 2</span>
      <strong>${batch.second}</strong>
    </div>
  `;
  const labels = ["图片", "聊天", "文件", "语音视频"];
  bars.innerHTML = batch.bars.map((value, idx) => `
    <div class="app-bar">
      <strong>${labels[idx]}</strong>
      <div class="bar-shell"><div class="bar-fill" style="width:${value}%"></div></div>
      <span>${value}%</span>
    </div>
  `).join("");
}

function renderTrace() {
  const list = document.getElementById("traceList");
  const timeline = document.getElementById("timeline");
  if (list) {
    list.innerHTML = traceItems.map((item) => `
      <div class="trace-item">
        <strong>${item.title}</strong>
        <span class="eyebrow">${item.score}</span>
        <div>${item.note}</div>
      </div>
    `).join("");
  }
  if (timeline) {
    timeline.innerHTML = timelineItems.map((item) => `
      <div class="timeline-item">${item}</div>
    `).join("");
  }
}

function renderProtocols() {
  const container = document.getElementById("protocolCloud");
  if (!container) return;
  container.innerHTML = protocols.map((item) => `<span>${item}</span>`).join("");
}

/* ═══ Workspace Tabs ═══ */
function setupTabs() {
  $$(".tab-button").forEach((button) => {
    button.addEventListener("click", () => {
      $$(".tab-button").forEach((btn) => btn.classList.remove("active"));
      $$(".tab-panel").forEach((panel) => panel.classList.remove("active"));
      button.classList.add("active");
      const target = document.querySelector(`[data-panel="${button.dataset.tab}"]`);
      if (target) target.classList.add("active");
    });
  });
}

/* ═══ Event Wiring ═══ */
function setupEvents() {
  const refreshBtn = document.getElementById("refreshSummary");
  if (refreshBtn) refreshBtn.addEventListener("click", renderSummary);

  const runBehavior = document.getElementById("runBehavior");
  if (runBehavior) runBehavior.addEventListener("click", runBehaviorDemo);

  const runVpn = document.getElementById("runVpn");
  if (runVpn) runVpn.addEventListener("click", renderVpnTable);

  const startRt = document.getElementById("startRealtime");
  if (startRt) startRt.addEventListener("click", () => {
    streamLogs();
    renderBehaviorShare();
  });

  const stopRt = document.getElementById("stopRealtime");
  if (stopRt) stopRt.addEventListener("click", () => {
    const box = document.getElementById("logBox");
    if (box) box.innerHTML += "[22:17:12] 手动停止抓取，已完成当前批次落盘<br>";
  });

  const batchRange = document.getElementById("batchRange");
  if (batchRange) batchRange.addEventListener("input", (event) => renderBatch(Number(event.target.value)));

  const runTrace = document.getElementById("runTrace");
  if (runTrace) runTrace.addEventListener("click", renderTrace);

  const trainModel = document.getElementById("trainModel");
  if (trainModel) trainModel.addEventListener("click", () => {
    const output = document.getElementById("trainOutput");
    if (output) output.innerHTML = "已接入新协议样本集 12,480 条，迁移学习任务启动。预计 47 秒完成预训练映射，随后自动进入微调与鲁棒性校验。";
  });

  const pulseBtn = document.getElementById("pulseButton");
  if (pulseBtn) pulseBtn.addEventListener("click", () => {
    const hero = document.querySelector(".hero-wrap");
    if (hero) hero.scrollIntoView({ behavior: "smooth" });
    runBehaviorDemo();
  });
}

/* ═══ Init ═══ */
function init() {
  animateCounters();
  setupScrollReveal();
  setupNavSpy();
  setupSmoothScroll();
  setupFeedbackForm();
  setupTabs();
  setupEvents();
  setupAuthDrawer();
  setupAuthTabs();

  // Sub-page renders (safe — they bail if containers are missing)
  renderAppBars();
  renderRiskFeed();
  renderSignalMap();
  renderSummary();
  renderVpnCompare();
  renderVpnTable();
  renderBehaviorShare();
  renderBatch(0);
  renderTrace();
  renderProtocols();
}

document.addEventListener("DOMContentLoaded", init);
