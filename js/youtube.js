// Interactive 5-Agent Horizontal Chain, Step Telemetry, and Lightbox logic for YouTube Content Factory
(function () {
  'use strict';

  var agentsData = {
    'agent-1': {
      title: 'Agent 1: Trend & Hook Strategist',
      tag: 'reddit-api-webhook-discovery',
      desc: 'Mines community discussions and trending subreddit threads, identifies high-engagement audience questions, and formulates high-retention hook angles.',
      input: 'Subreddit API payload / webhook topic keywords',
      output: 'Validated concept & 3 retention hook angles',
      tool: 'Reddit API / Google Gemini 1.5 Pro',
      stage: 'Topic Discovery & Angle Formulation'
    },
    'agent-2': {
      title: 'Agent 2: Script & Scene Architect',
      tag: 'structured-scene-scripting',
      desc: 'Expands the selected hook into a full structured script, breaking narration into precise 8-second visual scenes with exact b-roll prompts and pacing cues.',
      input: 'Approved hook angle & audience target',
      output: 'Full scene script with visual directions',
      tool: 'OpenAI GPT-4o / LangChain schema',
      stage: 'Script Writing & Scene Breakdown'
    },
    'agent-3': {
      title: 'Agent 3: ElevenLabs Voiceover Engine',
      tag: 'elevenlabs-voice-synthesis',
      desc: 'Normalizes narration pacing and breathing tags, dispatches text to ElevenLabs dynamic voice API, and receives studio-quality audio buffers.',
      input: 'Sanitized narration script blocks',
      output: 'High-bitrate MP3 / WAV narration track',
      tool: 'ElevenLabs Dynamic Voice API',
      stage: 'Voiceover Synthesis & Timing'
    },
    'agent-4': {
      title: 'Agent 4: Video Assembly Specifier',
      tag: 'programmatic-timeline-spec',
      desc: 'Calculates exact scene durations, audio timestamps, transition points, and JSON specs for automated renderers like Shotstack, Remotion, or Creatomate.',
      input: 'Audio timestamps & scene asset prompts',
      output: 'Render JSON specification payload',
      tool: 'n8n Code Node / Shotstack / Remotion API',
      stage: 'Timeline Calculation & Render Spec'
    },
    'agent-5': {
      title: 'Agent 5: Packaging & SEO Specialist',
      tag: 'high-ctr-metadata-generation',
      desc: 'Evaluates the finished script to generate 3 high-CTR title variations, search-optimized description copy, tags, and timestamped chapter markers.',
      input: 'Complete video script & theme taxonomy',
      output: 'Titles, description, tags, chapter markers',
      tool: 'OpenAI GPT-4o / YouTube Data API',
      stage: 'Metadata & Packaging Generation'
    }
  };

  // Packet animation path definitions
  var packetPaths = {
    'agent-1': 'M 60 90 H 80',
    'agent-2': 'M 80 90 H 220',
    'agent-3': 'M 220 90 H 360',
    'agent-4': 'M 360 90 H 500',
    'agent-5': 'M 500 90 H 640'
  };

  // DOM Elements
  var inspectTitle = document.getElementById('inspect-title');
  var inspectTag = document.getElementById('inspect-tag');
  var inspectDesc = document.getElementById('inspect-desc');
  var inspectInput = document.getElementById('inspect-input');
  var inspectOutput = document.getElementById('inspect-output');
  var inspectTool = document.getElementById('inspect-tool');
  var stageName = document.getElementById('stage-name');
  var livePacket = document.getElementById('live-packet');
  var agentNodes = document.querySelectorAll('.agent-node-group');

  function updateAgent(id) {
    var data = agentsData[id];
    if (!data) return;

    if (inspectTitle) inspectTitle.textContent = data.title;
    if (inspectTag) inspectTag.textContent = data.tag;
    if (inspectDesc) inspectDesc.textContent = data.desc;
    if (inspectInput) inspectInput.textContent = data.input;
    if (inspectOutput) inspectOutput.textContent = data.output;
    if (inspectTool) inspectTool.textContent = data.tool;
    if (stageName) stageName.textContent = data.stage;

    // Update active class
    agentNodes.forEach(function (n) {
      if (n.getAttribute('data-agent') === id) {
        n.classList.add('active');
      } else {
        n.classList.remove('active');
      }
    });

    // Update SVG packet traveling path
    if (livePacket && packetPaths[id]) {
      livePacket.setAttribute('d', packetPaths[id]);
    }
  }

  agentNodes.forEach(function (node) {
    var id = node.getAttribute('data-agent');
    node.addEventListener('mouseenter', function () { updateAgent(id); });
    node.addEventListener('focus', function () { updateAgent(id); });
    node.addEventListener('click', function () { updateAgent(id); });
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
