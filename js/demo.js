// Live E-Commerce Sales & COD Chatbot Demo logic
(function () {
  'use strict';

  var chatBox = document.getElementById('chatBox');
  var userInput = document.getElementById('userInput');
  var composerForm = document.getElementById('composerForm');
  var chipButtons = document.querySelectorAll('.quick-chip');

  function getTimeString() {
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    h = h ? h : 12;
    m = m < 10 ? '0' + m : m;
    return h + ':' + m + ' ' + ampm;
  }

  function appendUserMsg(text) {
    if (!chatBox) return;
    var msgDiv = document.createElement('div');
    msgDiv.className = 'chat-msg sent';
    msgDiv.innerHTML = '<div class="bubble"><p>' + escapeHtml(text) + '</p></div>' +
      '<span class="bubble-meta">' + getTimeString() + '</span>';
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function appendBotMsg(html) {
    if (!chatBox) return;
    var msgDiv = document.createElement('div');
    msgDiv.className = 'chat-msg received';
    msgDiv.innerHTML = '<div class="bubble">' + html + '</div>' +
      '<span class="bubble-meta">' + getTimeString() + '</span>';
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function respondBot(query) {
    var replyHTML = '';

    if (query.includes('necklace') || query.includes('gold') || query.includes('3000')) {
      replyHTML = '<p><strong>Best Seller: Solitaire Pendant Necklace</strong></p>' +
        '<div class="product-card-preview">' +
        '<div class="product-icon">✦</div>' +
        '<div>' +
        '<div style="font-weight:700">18K PVD Gold Plated</div>' +
        '<div style="font-family:var(--mono);color:var(--accent);font-weight:700">2,850 PKR <span style="text-decoration:line-through;color:var(--muted);font-weight:400;font-size:0.8em">3,500 PKR</span></div>' +
        '</div>' +
        '</div>' +
        '<p style="margin-top:10px;font-size:0.85em;color:var(--muted)">Includes lifetime anti-tarnish warranty (waterproof and sweatproof).</p>' +
        '<a href="https://zenat.store" target="_blank" rel="noopener" class="btn ink sm" style="margin-top:12px;width:100%;text-align:center">Buy with Cash on Delivery</a>';
    } else if (query.includes('ring') || query.includes('silver')) {
      replyHTML = '<p><strong>Authentic 925 Sterling Silver Ring</strong></p>' +
        '<div class="product-card-preview">' +
        '<div class="product-icon">◇</div>' +
        '<div>' +
        '<div style="font-weight:700">Eternal Sparkle Ring</div>' +
        '<div style="font-family:var(--mono);color:var(--accent);font-weight:700">2,200 PKR</div>' +
        '</div>' +
        '</div>' +
        '<p style="margin-top:10px;font-size:0.85em;color:var(--muted)">Includes luxury gift box and authenticity certificate.</p>' +
        '<a href="https://zenat.store" target="_blank" rel="noopener" class="btn ink sm" style="margin-top:12px;width:100%;text-align:center">Order via Cash on Delivery</a>';
    } else if (query.includes('track') || query.includes('kahan') || query.includes('order')) {
      replyHTML = '<p style="color:var(--ink);font-weight:700">Live Courier Status (Trax Logistics)</p>' +
        '<div style="background:var(--paper-warm);padding:10px 14px;border-radius:6px;border:1px solid var(--line);margin-top:8px;font-family:var(--mono);font-size:0.8em;display:grid;gap:4px">' +
        '<div>Order ID: <b style="color:var(--ink)">#ZN-8492</b></div>' +
        '<div style="color:#22C55E;font-weight:700">Status: Out for Delivery Today</div>' +
        '<div style="color:var(--muted)">Rider: Muhammad Bilal (+92 300-XXXXXXX)</div>' +
        '<div>COD Amount: <b style="color:var(--ink)">2,850 PKR</b></div>' +
        '</div>' +
        '<p style="margin-top:8px;font-size:0.8em;color:var(--muted)">Please keep the exact cash ready for rider handover.</p>';
    } else if (query === '1' || query.includes('confirm') || query.includes('yes')) {
      replyHTML = '<p style="color:#22C55E;font-weight:700">Order #ZN-8492 Confirmed</p>' +
        '<p style="margin-top:6px">Your parcel is packed and scheduled for courier pickup from our Johar Town fulfillment center.</p>' +
        '<div style="background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.3);padding:8px 12px;border-radius:6px;margin-top:8px;font-family:var(--mono);font-size:0.8em;color:#16A34A">' +
        'Tagged COD-Verified in Store CRM' +
        '</div>';
    } else {
      replyHTML = '<p>Our jewelry collection is available online with nationwide Cash on Delivery (2 to 3 business days delivery).</p>' +
        '<p style="margin-top:8px">You can also visit our Lahore showroom opposite Emporium Mall, Johar Town or reach telephone support at <strong>0310 9992393</strong>.</p>';
    }

    appendBotMsg(replyHTML);
  }

  function handleSend() {
    if (!userInput) return;
    var text = userInput.value.trim();
    if (!text) return;

    appendUserMsg(text);
    userInput.value = '';

    setTimeout(function () {
      respondBot(text.toLowerCase());
    }, 450);
  }

  if (composerForm) {
    composerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      handleSend();
    });
  }

  chipButtons.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var text = chip.getAttribute('data-text');
      if (text && userInput) {
        userInput.value = text;
        handleSend();
      }
    });
  });
})();
