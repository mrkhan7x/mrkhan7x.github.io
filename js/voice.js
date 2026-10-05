// Interactive Inspector and Lightbox logic for the Voice Receptionist Architecture
(function () {
  'use strict';

  // Node Inspector Data
  var nodesData = {
    'caller': {
      title: 'Inbound Caller',
      tag: 'webrtc-audio-stream',
      desc: 'Prospect or customer initiates a browser audio call or dials a dedicated inbound VoIP phone number.',
      input: 'Microphone PCM audio stream',
      output: 'WebRTC packets to Vapi edge',
      protocol: 'RFC 8835 / Opus 48kHz'
    },
    'vapi': {
      title: 'Vapi Voice Engine',
      tag: 'speech-to-speech-pipeline',
      desc: 'Executes fast Voice Activity Detection (VAD) and speech-to-text. Coordinates natural conversational turn-taking and invokes downstream tool webhooks.',
      input: 'Opus audio stream',
      output: 'Structured function-call webhooks',
      latency: 'sub-800ms turn-taking'
    },
    'router': {
      title: 'n8n Decision Router',
      tag: 'deterministic-switch',
      desc: 'Evaluates caller intent against operating rules. Branches requests to semantic knowledge retrieval, calendar holding, or emergency team notifications.',
      input: 'JSON POST /webhook/vapi-voice-router',
      output: 'Deterministic routing branches',
      logic: 'n8n Switch node / business hours rule'
    },
    'pinecone': {
      title: 'Pinecone Vector Index',
      tag: 'semantic-rag-lookup',
      desc: 'Retrieves relevant business knowledge chunks, pricing sheets, and service FAQs using semantic vector similarity search.',
      input: 'Query embedding vector (1536 dim)',
      output: 'Top-3 verified context documents',
      index: 'Serverless Pinecone namespace'
    },
    'calendar': {
      title: 'Calendar Booking API',
      tag: 'live-slot-reservation',
      desc: 'Checks host calendar availability in real-time, locks the selected appointment slot, and generates meeting invitations.',
      input: 'Requested timestamp & attendee info',
      output: 'Google Calendar event UID',
      conflictCheck: 'Dynamic double-booking prevention'
    },
    'alerts': {
      title: 'Team Dispatch Alert',
      tag: 'realtime-notification',
      desc: 'Dispatches instant notifications to internal Slack channels and email lists with caller intent, appointment time, and full call transcript.',
      input: 'Call summary & contact payload',
      output: 'Slack incoming webhook / SMTP email',
      latency: '< 3 seconds delivery'
    },
    'ledger': {
      title: 'Google Sheets & Database Log',
      tag: 'permanent-record',
      desc: 'Appends a structured row to the client ledger containing caller metadata, intent category, call duration, and booking confirmation.',
      input: 'Final schema row dictionary',
      output: 'Appended row UID',
      storage: 'Google Sheets API / PostgreSQL'
    }
  };

  // Inspect DOM elements
  var inspectTitle = document.getElementById('inspect-title');
  var inspectTag = document.getElementById('inspect-tag');
  var inspectDesc = document.getElementById('inspect-desc');
  var inspectInput = document.getElementById('inspect-input');
  var inspectOutput = document.getElementById('inspect-output');
  var inspectNodes = document.querySelectorAll('.arch-node-group');

  function updateInspector(id) {
    var data = nodesData[id];
    if (!data || !inspectTitle) return;

    inspectTitle.textContent = data.title;
    if (inspectTag) inspectTag.textContent = data.tag;
    if (inspectDesc) inspectDesc.textContent = data.desc;
    if (inspectInput) inspectInput.textContent = data.input;
    if (inspectOutput) inspectOutput.textContent = data.output;
  }

  inspectNodes.forEach(function (node) {
    var id = node.getAttribute('data-node');
    node.addEventListener('mouseenter', function () { updateInspector(id); });
    node.addEventListener('focus', function () { updateInspector(id); });
    node.addEventListener('click', function () { updateInspector(id); });
  });

  // Lightbox Accessible Dialog
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
  }

  if (closeDialogBtn && canvasDialog) {
    closeDialogBtn.addEventListener('click', function () {
      canvasDialog.close();
    });
  }

  if (canvasDialog) {
    canvasDialog.addEventListener('click', function (e) {
      if (e.target === canvasDialog) {
        canvasDialog.close();
      }
    });
  }
})();
