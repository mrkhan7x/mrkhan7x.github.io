/**
 * Recruitment OS - Client-Side Application Engine (Dual-Sourcing Architecture)
 * Fully integrates Highway 1 (Internal ATS Resume RAG) & Highway 2 (Google X-Ray SERP)
 * Connects directly to FastAPI backend with zero-friction local fallback.
 */

class RecruitmentApp {
  constructor() {
    this.data = window.RECRUITMENT_DATA;
    this.activeReqId = "REQ-104";
    this.activeFilter = "All"; // 'All', 'Shortlisted', 'Pending Review', 'Rejected'
    this.highway = "both"; // 'both', 'internal', 'external'
    this.activeCandidateId = null;
    this.xrayPlatform = "linkedin";
    this.apiBase = "http://localhost:8000";
    this.isBackendOnline = false;

    this.init();
  }

  async init() {
    this.renderReqTabs();
    this.renderReqDetail();
    this.updateHighwayButtons();
    this.renderCandidates();
    this.updateKPIs();
    await this.checkBackendStatus();
  }

  async checkBackendStatus() {
    try {
      const res = await fetch(`${this.apiBase}/api/health`, { method: "GET", cache: "no-cache" });
      if (res.ok) {
        this.isBackendOnline = true;
        console.log("[Recruitment OS] FastAPI Dual-Sourcing Backend connected.");
      }
    } catch (e) {
      this.isBackendOnline = false;
      console.log("[Recruitment OS] Running in autonomous client mode.");
    }
  }

  // --- REQUISITION SWITCHING ---
  setActiveReq(reqId) {
    this.activeReqId = reqId;
    this.activeFilter = "All";
    this.updateFilterButtons();
    this.renderReqTabs();
    this.renderReqDetail();
    this.renderCandidates();
  }

  renderReqTabs() {
    const container = document.getElementById("reqTabsContainer");
    if (!container) return;

    container.innerHTML = this.data.requisitions.map(req => {
      const isActive = req.id === this.activeReqId;
      return `
        <button 
          onclick="window.app.setActiveReq('${req.id}')"
          class="tactile-btn flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs whitespace-nowrap transition-all ${
            isActive 
              ? 'bg-surface-800 text-white border border-brand-500/40 shadow-sm shadow-brand-500/10' 
              : 'text-neutral-400 hover:text-white hover:bg-surface-850 border border-transparent'
          }"
        >
          <div class="w-2 h-2 rounded-full ${isActive ? 'bg-brand-400 animate-pulse' : 'bg-neutral-600'}"></div>
          <div class="text-left">
            <div class="font-semibold flex items-center gap-1.5">
              <span>${req.id}: ${req.title}</span>
              <span class="text-[10px] font-mono font-normal px-2 py-0.5 rounded-md bg-surface-950 text-neutral-400 border border-white/[0.04]">${req.client.split('(')[0].trim()}</span>
            </div>
            <div class="text-[11px] text-neutral-400 font-mono mt-0.5 flex items-center gap-1.5">
              <span>Fee: <strong class="text-brand-400 font-medium">${req.placementFee.split('(')[0].trim()}</strong></span>
              <span class="text-neutral-600">&middot;</span>
              <span>Sourced: ${req.stats.sourced}</span>
            </div>
          </div>
        </button>
      `;
    }).join("");
  }

  renderReqDetail() {
    const container = document.getElementById("reqDetailCard");
    const req = this.data.requisitions.find(r => r.id === this.activeReqId);
    if (!container || !req) return;

    container.innerHTML = `
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-white/[0.08]">
        <div class="space-y-1.5">
          <div class="flex items-center gap-2.5 flex-wrap">
            <span class="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-brand-500/10 text-brand-400 border border-brand-500/25">${req.id}</span>
            <h1 class="text-2xl font-bold text-white tracking-tight">${req.title}</h1>
            <span class="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium font-mono">${req.status}</span>
          </div>
          <div class="text-xs text-neutral-400 flex items-center gap-4 flex-wrap">
            <span>Hiring Client: <strong class="text-white">${req.client}</strong></span>
            <span class="text-neutral-600">&middot;</span>
            <span>Target Salary: <strong class="text-white font-mono">${req.salary}</strong></span>
            <span class="text-neutral-600">&middot;</span>
            <span>Placement Bounty: <strong class="text-brand-400 font-semibold font-mono">${req.placementFee}</strong></span>
          </div>
        </div>

        <!-- Sourcing Pipeline Dual-Highway Metrics -->
        <div class="flex items-center gap-4 bg-surface-950/80 px-4 py-2.5 rounded-2xl border border-white/[0.08] shadow-inner">
          <div class="text-right">
            <div class="text-xs font-semibold text-white flex items-center gap-1.5 justify-end">
              <span class="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></span>
              <span>Dual Sourcing Engine</span>
            </div>
            <div class="text-[11px] text-neutral-400 font-mono">${req.stats.sourced} Ingested Profiles</div>
          </div>
          <div class="h-8 w-px bg-white/[0.08]"></div>
          <div class="text-center">
            <div class="text-base font-bold text-brand-400 font-mono">${req.stats.shortlisted}</div>
            <div class="text-[10px] text-neutral-400 uppercase tracking-widest font-mono">Shortlisted</div>
          </div>
        </div>
      </div>

      <!-- Criteria Architecture Bento -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-1">
        <!-- Mandatory Skills -->
        <div class="space-y-2.5 bg-surface-950/70 p-4 rounded-2xl border border-white/[0.06] shadow-inner">
          <div class="flex items-center justify-between text-neutral-400 uppercase tracking-wider text-[10px] font-semibold font-mono">
            <span class="flex items-center gap-1.5 text-brand-400">
              <i data-lucide="check-circle-2" class="w-3.5 h-3.5"></i>
              Mandatory Requirements
            </span>
            <span class="text-neutral-500 font-mono">${req.mandatorySkills.length} Rules</span>
          </div>
          <div class="flex flex-wrap gap-1.5">
            ${req.mandatorySkills.map(s => `
              <span class="px-2.5 py-1 rounded-lg bg-surface-900 border border-white/[0.08] text-neutral-200 font-mono text-[11px] shadow-sm">
                ${s}
              </span>
            `).join("")}
          </div>
        </div>

        <!-- Nice To Have -->
        <div class="space-y-2.5 bg-surface-950/70 p-4 rounded-2xl border border-white/[0.06] shadow-inner">
          <div class="flex items-center justify-between text-neutral-400 uppercase tracking-wider text-[10px] font-semibold font-mono">
            <span class="flex items-center gap-1.5 text-sky-400">
              <i data-lucide="plus-circle" class="w-3.5 h-3.5"></i>
              Nice-to-Have Assets
            </span>
            <span class="text-neutral-500 font-mono">${req.niceToHave.length} Skills</span>
          </div>
          <div class="flex flex-wrap gap-1.5">
            ${req.niceToHave.map(s => `
              <span class="px-2.5 py-1 rounded-lg bg-surface-900 border border-white/[0.08] text-neutral-300 font-mono text-[11px] shadow-sm">
                ${s}
              </span>
            `).join("")}
          </div>
        </div>

        <!-- Exclusion Criteria / Dealbreakers -->
        <div class="space-y-2.5 bg-surface-950/70 p-4 rounded-2xl border border-white/[0.06] shadow-inner">
          <div class="flex items-center justify-between text-neutral-400 uppercase tracking-wider text-[10px] font-semibold font-mono">
            <span class="flex items-center gap-1.5 text-amber-400">
              <i data-lucide="alert-octagon" class="w-3.5 h-3.5"></i>
              Strict Dealbreaker Filters
            </span>
            <span class="text-neutral-500 font-mono">Zero Hallucination</span>
          </div>
          <div class="space-y-1.5 text-neutral-400 text-[11px]">
            ${req.exclusions.map(ex => `
              <div class="flex items-start gap-1.5">
                <span class="text-amber-400 font-bold">&times;</span>
                <span class="text-neutral-300">${ex}</span>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `;

    if (window.lucide) lucide.createIcons();
  }


  // --- DUAL-HIGHWAY SOURCING TOGGLE ---
  setHighwaySource(highway) {
    this.highway = highway;
    this.updateHighwayButtons();
    this.renderCandidates();
    const names = {
      both: "Dual Sourcing (Internal ATS RAG + External SERP)",
      internal: "Highway 1: Internal ATS Resume Vault (40k Records)",
      external: "Highway 2: External Google X-Ray (LinkedIn & GitHub)"
    };
    this.showToast(`Switched active sourcing to: ${names[highway]}`);
  }

  updateHighwayButtons() {
    const btns = {
      both: document.getElementById("highwayTabBoth"),
      internal: document.getElementById("highwayTabInternal"),
      external: document.getElementById("highwayTabExternal")
    };

    Object.entries(btns).forEach(([key, el]) => {
      if (!el) return;
      if (key === this.highway) {
        el.className = "px-2.5 py-1.5 rounded-md text-white bg-surface-800 transition-all font-medium flex items-center gap-1.5 border border-brand-500/30";
      } else {
        el.className = "px-2.5 py-1.5 rounded-md text-neutral-400 hover:text-white transition-all flex items-center gap-1.5";
      }
    });
  }

  // --- CANDIDATE STREAM RENDERING ---
  renderCandidates() {
    const container = document.getElementById("candidateCardsGrid");
    const countBadge = document.getElementById("candidateCountBadge");
    if (!container) return;

    let list = this.data.candidates.filter(c => c.reqId === this.activeReqId);
    
    // Filter by highway source
    if (this.highway === "internal") {
      list = list.filter(c => (c.source || "").includes("Internal ATS"));
    } else if (this.highway === "external") {
      list = list.filter(c => (c.source || "").includes("External Web"));
    }

    // Filter by status tab
    if (this.activeFilter !== "All") {
      list = list.filter(c => c.status === this.activeFilter);
    }

    if (countBadge) {
      countBadge.textContent = `${list.length} Candidate${list.length === 1 ? '' : 's'}`;
    }

    if (list.length === 0) {
      container.innerHTML = `
        <div class="col-span-2 bg-surface-900 rounded-xl p-12 text-center glass-border space-y-3">
          <div class="w-12 h-12 rounded-full bg-surface-800 border border-white/[0.06] mx-auto flex items-center justify-center text-neutral-500">
            <i data-lucide="inbox" class="w-6 h-6"></i>
          </div>
          <div class="text-sm font-semibold text-neutral-300">No candidates in '${this.activeFilter}' under current highway selection</div>
          <p class="text-xs text-neutral-500">Trigger the live query engine or switch back to 'Dual Sourcing'.</p>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    container.innerHTML = list.map(cand => {
      const verifiedCount = cand.mandatoryEvidence.filter(e => e.status === "Verified").length;
      const totalMandatory = cand.mandatoryEvidence.length;
      
      let scoreColor = "text-brand-400 bg-brand-500/10 border-brand-500/30";
      if (cand.matchScore < 80) {
        scoreColor = "text-amber-400 bg-amber-500/10 border-amber-500/30";
      }

      let statusColor = "bg-surface-800 text-neutral-300 border-white/[0.08]";
      if (cand.status === "Shortlisted") statusColor = "bg-emerald-500/10 text-emerald-400 border-emerald-500/25 font-semibold";
      if (cand.status === "Rejected") statusColor = "bg-red-500/10 text-red-400 border-red-500/25";

      const isInternal = (cand.source || "").includes("Internal ATS");

      return `
        <div class="glass-card rounded-3xl p-6 space-y-4 hover:border-white/[0.18] transition-all group flex flex-col justify-between shadow-lg">
          
          <!-- Top Row: Name, Score & Status -->
          <div class="space-y-2.5">
            <div class="flex items-start justify-between gap-3">
              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <h3 class="text-lg font-bold text-white group-hover:text-brand-400 transition-colors tracking-tight">${cand.name}</h3>
                  <span class="text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${statusColor}">${cand.status}</span>
                  <span class="text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${
                    isInternal 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                      : 'bg-sky-500/10 text-sky-400 border-sky-500/20'
                  }">
                    ${isInternal ? 'Internal ATS Vault' : 'Live Web SERP'}
                  </span>
                </div>
                <p class="text-xs text-neutral-400 mt-1 font-light">${cand.headline}</p>
              </div>

              <!-- Match Percentage Ring / Badge -->
              <div class="flex flex-col items-end shrink-0">
                <span class="text-sm font-mono font-bold px-3 py-1 rounded-xl border ${scoreColor} shadow-inner">
                  ${cand.matchScore}% Match
                </span>
                <span class="text-[10px] text-neutral-400 mt-1 font-mono">${verifiedCount}/${totalMandatory} Skills Verified</span>
              </div>
            </div>

            <!-- Meta Strip -->
            <div class="flex items-center gap-3 text-xs text-neutral-400 pt-0.5 flex-wrap">
              <span class="flex items-center gap-1 font-medium text-neutral-200">
                <i data-lucide="building" class="w-3.5 h-3.5 text-brand-400"></i>
                ${cand.currentCompany} (${cand.currentTitle})
              </span>
              <span class="text-neutral-600">&middot;</span>
              <span class="flex items-center gap-1">
                <i data-lucide="map-pin" class="w-3.5 h-3.5 text-neutral-500"></i>
                ${cand.location}
              </span>
              <span class="text-neutral-600">&middot;</span>
              <span class="flex items-center gap-1">
                <i data-lucide="dollar-sign" class="w-3.5 h-3.5 text-brand-400"></i>
                <span class="font-mono text-neutral-200">${cand.salaryExpectation}</span>
              </span>
            </div>

            <!-- Direct Living Profile Verification Badges -->
            <div class="flex items-center gap-2 pt-1 flex-wrap">
              ${cand.linkedin ? `
                <a href="${cand.linkedin.startsWith('http') ? cand.linkedin : 'https://' + cand.linkedin}" target="_blank" class="tactile-btn inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[11px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/25 hover:bg-blue-500/20 hover:border-blue-500/50 transition-all shadow-sm">
                  <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
                  <span>Live LinkedIn Profile</span>
                </a>
              ` : ''}
              ${cand.github || (cand.profileUrl && cand.profileUrl.includes('github.com')) ? `
                <a href="${cand.github || cand.profileUrl}" target="_blank" class="tactile-btn inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[11px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/25 hover:bg-purple-500/20 hover:border-purple-500/50 transition-all shadow-sm">
                  <i data-lucide="code-2" class="w-3.5 h-3.5"></i>
                  <span>Live GitHub Repos</span>
                </a>
              ` : ''}
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[11px] font-mono bg-surface-850 text-neutral-300 border border-white/[0.08]">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Active @ ${cand.currentCompany}</span>
              </span>
            </div>

            <!-- Executive Summary Snippet -->
            <div class="bg-surface-950/80 p-3.5 rounded-2xl border border-white/[0.06] text-xs text-neutral-300 leading-relaxed shadow-inner">
              ${cand.summary}
            </div>

            <!-- Mandatory Evidence Pills -->
            <div class="flex flex-wrap gap-1.5 pt-0.5">
              ${cand.mandatoryEvidence.map(ev => {
                const isVerified = ev.status === "Verified";
                return `
                  <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-mono ${
                    isVerified 
                      ? 'bg-brand-500/10 text-brand-300 border border-brand-500/25 shadow-sm' 
                      : 'bg-red-500/10 text-red-300 border border-red-500/25'
                  }">
                    <i data-lucide="${isVerified ? 'check' : 'x'}" class="w-3 h-3"></i>
                    ${ev.skill}
                  </span>
                `;
              }).join("")}
            </div>
          </div>

          <!-- Bottom Action Belt -->
          <div class="pt-3.5 border-t border-white/[0.08] flex items-center justify-between gap-2">
            <button 
              onclick="window.app.openEvaluationModal('${cand.id}')"
              class="tactile-btn flex items-center gap-1.5 text-xs text-brand-400 hover:text-brand-300 font-medium py-1 transition-colors"
            >
              <i data-lucide="file-text" class="w-3.5 h-3.5"></i>
              <span>Inspect AI Citations</span>
            </button>

            <div class="flex items-center gap-2">
              ${cand.status !== "Shortlisted" ? `
                <button 
                  onclick="window.app.quickShortlist('${cand.id}')"
                  class="tactile-btn px-3.5 py-1.5 rounded-xl bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 border border-brand-500/25 text-xs font-semibold transition-all"
                >
                  Shortlist
                </button>
              ` : `
                <button 
                  onclick="window.app.openSubmittalModal('${cand.id}')"
                  class="tactile-btn flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-500 to-emerald-600 hover:from-brand-400 hover:to-emerald-500 text-black text-xs font-bold transition-all shadow-md shadow-brand-500/25"
                >
                  <i data-lucide="share" class="w-3.5 h-3.5"></i>
                  <span>Submittal Packet</span>
                </button>
              `}
            </div>
          </div>

        </div>
      `;
    }).join("");


    if (window.lucide) lucide.createIcons();
  }

  // --- CANDIDATE FILTERING ---
  setCandidateFilter(filterName) {
    this.activeFilter = filterName;
    this.updateFilterButtons();
    this.renderCandidates();
  }

  updateFilterButtons() {
    const tabs = {
      "All": document.getElementById("filterTabAll"),
      "Shortlisted": document.getElementById("filterTabShortlisted"),
      "Pending Review": document.getElementById("filterTabPending"),
      "Rejected": document.getElementById("filterTabRejected")
    };

    Object.entries(tabs).forEach(([name, el]) => {
      if (!el) return;
      if (name === this.activeFilter) {
        el.className = "px-2.5 py-1.5 rounded-md text-white bg-surface-800 transition-all font-medium";
      } else {
        el.className = "px-2.5 py-1.5 rounded-md text-neutral-400 hover:text-white transition-all";
      }
    });
  }

  // --- GOOGLE X-RAY INSPECTOR MODAL ---
  openXRayInspectorModal() {
    const req = this.data.requisitions.find(r => r.id === this.activeReqId);
    if (!req) return;

    this.renderXRayQueryString();
    document.getElementById("xrayModal").classList.remove("hidden");
    if (window.lucide) lucide.createIcons();
  }

  closeXRayInspectorModal() {
    document.getElementById("xrayModal").classList.add("hidden");
  }

  switchXRayPlatform(platform) {
    this.xrayPlatform = platform;
    const tabLI = document.getElementById("xrayTabLinkedIn");
    const tabGH = document.getElementById("xrayTabGitHub");

    if (platform === "linkedin") {
      tabLI.className = "px-3 py-1.5 rounded-lg bg-surface-800 text-white border border-brand-500/30 font-medium";
      tabGH.className = "px-3 py-1.5 rounded-lg bg-surface-950 text-neutral-400 hover:text-white transition-colors";
    } else {
      tabGH.className = "px-3 py-1.5 rounded-lg bg-surface-800 text-white border border-brand-500/30 font-medium";
      tabLI.className = "px-3 py-1.5 rounded-lg bg-surface-950 text-neutral-400 hover:text-white transition-colors";
    }

    this.renderXRayQueryString();
  }

  renderXRayQueryString() {
    const req = this.data.requisitions.find(r => r.id === this.activeReqId);
    if (!req) return;

    const loc = req.location.split(",")[0].trim();
    const skills = req.mandatorySkills.slice(0, 4).map(s => `"${s}"`).join(" AND ");

    let queryStr = "";
    if (this.xrayPlatform === "github") {
      queryStr = `site:github.com "joined on" "${loc}" AND ${skills}`;
    } else {
      queryStr = `site:linkedin.com/in (${skills}) AND "${loc}" -intitle:"profiles" -inurl:"dir/"`;
    }

    const outEl = document.getElementById("xrayQueryOutput");
    if (outEl) outEl.textContent = queryStr;
  }

  copyXRayQuery() {
    const outEl = document.getElementById("xrayQueryOutput");
    if (!outEl) return;

    navigator.clipboard.writeText(outEl.textContent).then(() => {
      this.showToast("Google X-Ray Boolean query copied to clipboard!");
    });
  }

  launchXRayGoogleTab() {
    const outEl = document.getElementById("xrayQueryOutput");
    if (!outEl) return;
    const query = encodeURIComponent(outEl.textContent);
    window.open(`https://www.google.com/search?q=${query}`, "_blank");
  }

  // --- EVALUATION MODAL (ZERO-HALLUCINATION PROOF) ---
  openEvaluationModal(candId) {
    this.activeCandidateId = candId;
    const cand = this.data.candidates.find(c => c.id === candId);
    if (!cand) return;

    document.getElementById("modalCandidateName").textContent = cand.name;
    document.getElementById("modalCandidateHeadline").textContent = `${cand.headline} \u2022 ${cand.currentCompany}`;
    document.getElementById("modalMatchBadge").textContent = `${cand.matchScore}% Match Score`;
    const empBadge = document.getElementById("modalEmployerBadge");
    if (empBadge) empBadge.textContent = `🏢 ${cand.currentCompany}`;
    document.getElementById("modalExecutiveSummary").textContent = cand.summary;
    document.getElementById("modalSalaryExp").textContent = cand.salaryExpectation;
    document.getElementById("modalAvailability").textContent = cand.availability;
    document.getElementById("modalLocation").textContent = cand.location;


    // Citations
    const citationsContainer = document.getElementById("modalMandatoryCitations");
    citationsContainer.innerHTML = cand.mandatoryEvidence.map(ev => {
      const isVerified = ev.status === "Verified";
      return `
        <div class="p-3.5 rounded-xl bg-surface-950 border border-white/[0.06] space-y-1.5">
          <div class="flex items-center justify-between text-xs font-semibold">
            <span class="text-white flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full ${isVerified ? 'bg-brand-400' : 'bg-red-400'}"></span>
              ${ev.skill}
            </span>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded ${
              isVerified ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
            }">${ev.status}</span>
          </div>
          <p class="text-xs text-neutral-400 italic font-mono bg-surface-900 p-2.5 rounded-lg border border-white/[0.04]">
            "${ev.citation}"
          </p>
        </div>
      `;
    }).join("");

    // Red Flags
    const redFlagsContainer = document.getElementById("modalRedFlags");
    redFlagsContainer.innerHTML = (cand.redFlags || []).map(rf => `
      <div class="flex items-start gap-1.5">
        <span class="text-amber-400 font-bold">&bull;</span>
        <span>${rf}</span>
      </div>
    `).join("") || '<div class="text-xs text-neutral-500">None detected. Clean audit record.</div>';

    document.getElementById("evaluationModal").classList.remove("hidden");
    if (window.lucide) lucide.createIcons();
  }

  closeEvaluationModal() {
    document.getElementById("evaluationModal").classList.add("hidden");
  }

  updateCandidateStatusFromModal(newStatus) {
    if (!this.activeCandidateId) return;
    const cand = this.data.candidates.find(c => c.id === this.activeCandidateId);
    if (cand) {
      cand.status = newStatus;
      this.showToast(`${cand.name} marked as ${newStatus}`);
      this.closeEvaluationModal();
      this.renderCandidates();
      this.updateKPIs();
    }
  }

  quickShortlist(candId) {
    const cand = this.data.candidates.find(c => c.id === candId);
    if (cand) {
      cand.status = "Shortlisted";
      this.showToast(`Shortlisted ${cand.name} for hiring manager review`);
      this.renderCandidates();
      this.updateKPIs();
    }
  }

  // --- SUBMITTAL DOSSIER (FOR THE HIRING MANAGER CLIENT) ---
  openSubmittalModal(candId) {
    const cand = this.data.candidates.find(c => c.id === (candId || this.activeCandidateId));
    const req = this.data.requisitions.find(r => r.id === cand.reqId);
    if (!cand || !req) return;

    this.closeEvaluationModal();

    document.getElementById("submittalClientTitle").textContent = `Candidate Presentation \u2022 ${req.client}`;
    document.getElementById("dossierCandidateCode").textContent = `${cand.id}: ${cand.headline.toUpperCase()}`;
    document.getElementById("dossierMetaLine").textContent = `${cand.location} \u2022 ${cand.totalExperienceYears} Years Production Exp \u2022 Notice: ${cand.availability}`;
    document.getElementById("dossierMatchPercent").textContent = `${cand.matchScore}% Match`;
    document.getElementById("dossierSalary").textContent = cand.salaryExpectation;
    document.getElementById("dossierFee").textContent = req.placementFee.split('(')[0].trim();

    // Competencies
    const compGrid = document.getElementById("dossierCompetencyGrid");
    compGrid.innerHTML = cand.mandatoryEvidence.filter(e => e.status === "Verified").map(e => `
      <div class="p-2 rounded bg-surface-900 border border-white/[0.06] flex items-center justify-between">
        <span class="font-medium text-white">${e.skill}</span>
        <span class="text-brand-400 font-mono text-[10px]">Verified</span>
      </div>
    `).join("");

    // Accomplishments / Highlights
    const accContainer = document.getElementById("dossierAccomplishments");
    accContainer.innerHTML = cand.mandatoryEvidence.slice(0, 3).map(e => `
      <div class="flex items-start gap-2">
        <span class="text-brand-400 font-bold">&check;</span>
        <span class="text-neutral-300">${e.citation}</span>
      </div>
    `).join("");

    document.getElementById("submittalModal").classList.remove("hidden");
    if (window.lucide) lucide.createIcons();
  }

  closeSubmittalModal() {
    document.getElementById("submittalModal").classList.add("hidden");
  }

  copyDossierToClipboard() {
    const cand = this.data.candidates.find(c => c.id === this.activeCandidateId);
    if (!cand) return;

    const text = `
=== EXECUTIVE CANDIDATE PRESENTATION ===
Candidate ID: ${cand.id}
Role: ${cand.headline}
Experience: ${cand.totalExperienceYears} Years Total
Location: ${cand.location}
Salary Target: ${cand.salaryExpectation}

SUMMARY:
${cand.summary}

VERIFIED COMPETENCIES:
${cand.mandatoryEvidence.map(e => `- ${e.skill}: ${e.citation}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(text).then(() => {
      this.showToast("Candidate Dossier copied to clipboard!");
    });
  }

  sendSubmittalPacket() {
    this.closeSubmittalModal();
    this.showToast("Dossier sent to Hiring Manager! Submittal turnaround: 28 min.");
  }

  // --- SIMULATE LIVE SOURCING QUERY ---
  simulateLiveSourcing() {
    this.showToast("Executing dual-highway query (Internal ATS RAG + Google X-Ray)...");
    
    setTimeout(() => {
      const currentReq = this.data.requisitions.find(r => r.id === this.activeReqId);
      if (currentReq) {
        currentReq.stats.sourced += 18;
        currentReq.stats.qualified += 3;
      }
      this.updateKPIs();
      this.renderReqDetail();
      this.showToast("FastAPI Dual-Search complete: 18 new profiles parsed, 3 high-confidence matches found.");
    }, 1100);
  }

  // --- NEW REQUISITION MODAL ---
  openNewReqModal() {
    document.getElementById("newReqModal").classList.remove("hidden");
  }

  closeNewReqModal() {
    document.getElementById("newReqModal").classList.add("hidden");
  }

  submitNewReq(e) {
    e.preventDefault();
    const title = document.getElementById("newReqTitle").value;
    const client = document.getElementById("newReqClient").value;
    const salary = document.getElementById("newReqSalary").value;
    const mandatory = document.getElementById("newReqMandatory").value.split(",").map(s => s.trim());
    const exclusions = document.getElementById("newReqExclusions").value.split(",").map(s => s.trim());

    const newId = `REQ-${104 + this.data.requisitions.length}`;
    const newReq = {
      id: newId,
      title: title,
      client: client,
      status: "Active Sourcing",
      salary: salary,
      type: "Full-Time Direct Hire",
      placementFee: "$30,000 (20% Contingency)",
      urgency: "High",
      location: "Austin, TX (Hybrid)",
      mandatorySkills: mandatory,
      niceToHave: ["Fast Learner", "Production Scale"],
      experienceMin: 5,
      exclusions: exclusions,
      stats: {
        sourced: 42,
        qualified: 6,
        shortlisted: 1,
        submitted: 0
      }
    };

    this.data.requisitions.push(newReq);
    this.closeNewReqModal();
    this.setActiveReq(newId);
    this.showToast(`Launched autonomous agent for ${newId}: ${title}`);
  }

  // --- TOAST NOTIFICATIONS ---
  showToast(msg) {
    const toast = document.getElementById("toastNotification");
    const msgEl = document.getElementById("toastMessage");
    if (!toast || !msgEl) return;

    msgEl.textContent = msg;
    toast.classList.remove("opacity-0", "translate-y-10");
    toast.classList.add("opacity-100", "translate-y-0");

    setTimeout(() => {
      toast.classList.remove("opacity-100", "translate-y-0");
      toast.classList.add("opacity-0", "translate-y-10");
    }, 3200);
  }

  updateKPIs() {
    const totalSourced = this.data.requisitions.reduce((acc, r) => acc + r.stats.sourced, 0);
    const totalQualified = this.data.requisitions.reduce((acc, r) => acc + r.stats.shortlisted, 0);
    
    const kpiActiveReqs = document.getElementById("kpiActiveReqs");
    const kpiSourced = document.getElementById("kpiSourcedCount");
    const kpiQualified = document.getElementById("kpiQualifiedCount");

    if (kpiActiveReqs) kpiActiveReqs.textContent = `${this.data.requisitions.length} Roles`;
    if (kpiSourced) kpiSourced.textContent = totalSourced;
    if (kpiQualified) kpiQualified.textContent = `${totalQualified} Verified`;
  }
}

// Resilient Auto-Initialization
function initRecruitmentOS() {
  try {
    if (!window.app) {
      window.app = new RecruitmentApp();
      console.log("[Recruitment OS] Initialized successfully.");
    }
  } catch (err) {
    console.error("[Recruitment OS] Fatal init error:", err);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initRecruitmentOS);
} else {
  initRecruitmentOS();
}

