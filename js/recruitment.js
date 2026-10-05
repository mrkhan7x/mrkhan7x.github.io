// Interactive Inspector, Score Bar Telemetry, and Lightbox logic for Recruitment Architecture
(function () {
  'use strict';

  var nodesData = {
    'webhook': {
      title: 'Inbound Webhook Listener',
      tag: 'intake-trigger',
      desc: 'Receives applicant payloads directly from LinkedIn, careers forms, or job boards in real time without manual entry.',
      input: 'JSON / multi-part applicant payload',
      output: 'Normalized candidate object to extractor',
      score: 15,
      status: 'Payload received & validated'
    },
    'format-input': {
      title: 'Data Normalization Node',
      tag: 'payload-cleansing',
      desc: 'Standardizes resume text, contact details, and applicant notes into a clean schema before sending to the model.',
      input: 'Raw disparate form fields',
      output: 'Cleaned candidate markdown string',
      score: 30,
      status: 'Text stripped & formatted'
    },
    'extractor': {
      title: 'AI Competency Extractor',
      tag: 'langchain-openai-engine',
      desc: 'Evaluates applicant background against job criteria using a rigid JSON schema, extracting skills, leadership years, and fit score.',
      input: 'Normalized applicant text + job rubric',
      output: 'Structured scorecard { skills, score, qualified }',
      score: 85,
      status: 'Score calculated & verified'
    },
    'openai': {
      title: 'OpenAI Chat Model',
      tag: 'structured-evaluation',
      desc: 'Supplies reasoning capabilities to the LangChain extractor to interpret unstructured project histories and portfolios.',
      input: 'System rubric prompt + candidate profile',
      output: 'Strictly typed JSON output',
      score: 75,
      status: 'Semantic evaluation completed'
    },
    'format-record': {
      title: 'Record Formatter',
      tag: 'schema-structuring',
      desc: 'Maps the extracted score and contact fields into standardized tabular rows for spreadsheet logging and database persistence.',
      input: 'Extracted candidate scorecard',
      output: 'Formatted row array for Google Sheets',
      score: 88,
      status: 'Row payload generated'
    },
    'sheets': {
      title: 'Google Sheets & ATS Sync',
      tag: 'centralized-ledger',
      desc: 'Appends a permanent candidate record into the hiring ledger, establishing a synchronized applicant log in real time.',
      input: 'Formatted candidate row payload',
      output: 'Appended row index & timestamp',
      score: 92,
      status: 'Ledger synchronized'
    },
    'decision': {
      title: 'Deterministic Fit Router',
      tag: 'conditional-switch',
      desc: 'Branches candidates based on qualification score. Passing applicants dispatch alerts; others route to background archiving.',
      input: 'Qualified boolean flag & fit score',
      output: 'True (Slack + Gmail) / False (Archive)',
      score: 95,
      status: 'Routing decision executed'
    },
    'slack': {
      title: 'Recruiter Slack Dispatch',
      tag: 'team-alerting',
      desc: 'Posts an actionable candidate summary card to the hiring channel with quick review buttons and calendar booking links.',
      input: 'Qualified applicant summary & score',
      output: 'Rich Slack Block Kit notification',
      score: 98,
      status: 'Team notified in hiring channel'
    },
    'gmail': {
      title: 'Automated Gmail Confirmation',
      tag: 'candidate-messaging',
      desc: 'Dispatches personalized confirmation email to the applicant with interview scheduling links or transparent next steps.',
      input: 'Applicant contact email & template',
      output: 'SMTP email dispatched via Gmail API',
      score: 100,
      status: 'Confirmation email delivered'
    },
    'archive': {
      title: 'Unqualified Archive Route',
      tag: 'clean-archival',
      desc: 'Tags and saves non-matching applicants to the archive tab without cluttering active hiring notification channels.',
      input: 'Disqualified applicant record',
      output: 'Archived row in historical sheet',
      score: 40,
      status: 'Record safely stored in archive'
    }
  };

  // DOM Elements
  var inspectTitle = document.getElementById('inspect-title');
  var inspectTag = document.getElementById('inspect-tag');
  var inspectDesc = document.getElementById('inspect-desc');
  var inspectInput = document.getElementById('inspect-input');
  var inspectOutput = document.getElementById('inspect-output');
  var scoreFill = document.getElementById('score-fill');
  var scoreVal = document.getElementById('score-val');
  var packetStatus = document.getElementById('packet-status');
  var inspectNodes = document.querySelectorAll('.arch-node-group');

  function updateInspector(id) {
    var data = nodesData[id];
    if (!data) return;

    if (inspectTitle) inspectTitle.textContent = data.title;
    if (inspectTag) inspectTag.textContent = data.tag;
    if (inspectDesc) inspectDesc.textContent = data.desc;
    if (inspectInput) inspectInput.textContent = data.input;
    if (inspectOutput) inspectOutput.textContent = data.output;

    if (scoreFill) scoreFill.style.width = data.score + '%';
    if (scoreVal) scoreVal.textContent = data.score + ' / 100';
    if (packetStatus) packetStatus.textContent = data.status;

    inspectNodes.forEach(function (n) {
      if (n.getAttribute('data-node') === id) {
        n.classList.add('active');
      } else {
        n.classList.remove('active');
      }
    });
  }

  inspectNodes.forEach(function (node) {
    var id = node.getAttribute('data-node');
    node.addEventListener('mouseenter', function () { updateInspector(id); });
    node.addEventListener('focus', function () { updateInspector(id); });
    node.addEventListener('click', function () { updateInspector(id); });
  });

  // Lightbox Modal
  var canvasCard = document.getElementById('open-canvas-lightbox');
  var canvasDialog = document.getElementById('canvas-dialog');
  var closeDialogBtn = document.getElementById('close-canvas-dialog');

  if (canvasCard && canvasDialog) {
    canvasCard.addEventListener('click', function () {
      if (typeof canvasDialog.showModal === 'function') {
        canvasDialog.showModal();
      } else {
        canvasDialog.setAttribute('open', '');
      }
    });
    canvasCard.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        canvasCard.click();
      }
    });
  }

  if (closeDialogBtn && canvasDialog) {
    closeDialogBtn.addEventListener('click', function () {
      if (typeof canvasDialog.close === 'function') {
        canvasDialog.close();
      } else {
        canvasDialog.removeAttribute('open');
      }
    });
  }

  if (canvasDialog) {
    canvasDialog.addEventListener('click', function (e) {
      var rect = canvasDialog.getBoundingClientRect();
      var isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
      if (!isInDialog) {
        if (typeof canvasDialog.close === 'function') {
          canvasDialog.close();
        } else {
          canvasDialog.removeAttribute('open');
        }
      }
    });
  }
})();
