(function waitForSkibidi(){
  if (!window._skibidi) { setTimeout(waitForSkibidi, 180); return; }
  const ctx = window._skibidi;
  function esc(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function prettifyTrait(t){ if(!t) return 'Base'; return String(t).replace(/([A-Z])/g, ' $1').replace(/[_\-]/g,' ').replace(/^\s*/,'').replace(/\s+/g,' ').replace(/(^|\s)\S/g, l=>l.toUpperCase()); }

  function makeThumb(it){
    const u = (ctx && ctx.unitDatabase && ctx.unitDatabase[it.key]) ? ctx.unitDatabase[it.key] : (window.unitDatabase && window.unitDatabase[it.key]) || {};
    const img = u.unitId ? `url('https://corsproxy.io/?https://drive.google.com/thumbnail?id=${u.unitId}')` : '';
    const rcls = (u.rarity||'').toLowerCase().replace(/\s+/g,'-') || '';
    const traitLabel = (it.trait && it.trait !== 'base') ? `<div class="trait-badge">${esc(prettifyTrait(it.trait))}</div>` : '';
    const qtyLabel = (it.qty && it.qty > 1) ? `<div class="qty-badge">x${it.qty}</div>` : '';
    const demand = (u.baseStats && u.baseStats.demand) ? `<div class="demand-small">${esc(u.baseStats.demand)}</div>` : '';
    return `<div class="calc-thumb ${rcls}" data-id="${it.id}" title="${esc(u.name)}">`+
           `<div class="img" style="background-image:${img}"></div>`+
           `<div class="thumb-remove" data-id="${it.id}">×</div>`+
           `${traitLabel}${qtyLabel}${demand}`+
           `</div>`;
  }

  function newRenderThumbs(){
    try{
      const leftEl = document.getElementById('left-items');
      const rightEl = document.getElementById('right-items');
      leftEl.innerHTML = (ctx.leftItems||[]).map(makeThumb).join('');
      rightEl.innerHTML = (ctx.rightItems||[]).map(makeThumb).join('');
      document.querySelectorAll('.thumb-remove').forEach(btn=>{
        btn.removeEventListener('click', onThumbRemove);
        btn.addEventListener('click', function(e){
          const id = e.currentTarget.getAttribute('data-id');
          // call original handler if available
          if (typeof window.onThumbRemove === 'function') { window.onThumbRemove({ currentTarget: { getAttribute: ()=>id } }); return; }
          // fallback: modify arrays in ctx and re-render
          const li = (ctx.leftItems||[]); const ri = (ctx.rightItems||[]);
          const idx = li.findIndex(x=>x.id===id); if(idx>=0) li.splice(idx,1);
          const idx2 = ri.findIndex(x=>x.id===id); if(idx2>=0) ri.splice(idx2,1);
          if (typeof ctx.persistTrade === 'function') ctx.persistTrade();
          newRenderThumbs();
          if (typeof ctx.updateTotalsAndVerdict === 'function') ctx.updateTotalsAndVerdict();
        });
      });
    }catch(err){ console.warn('render override failed', err); }
  }

  try{ ctx.renderThumbs = newRenderThumbs; }catch(e){/* ignore */}
  newRenderThumbs();
  let lastLeft = JSON.stringify(ctx.leftItems||[]);
  let lastRight = JSON.stringify(ctx.rightItems||[]);
  setInterval(()=>{
    const a = JSON.stringify(ctx.leftItems||[]); const b = JSON.stringify(ctx.rightItems||[]);
    if (a !== lastLeft || b !== lastRight) { lastLeft = a; lastRight = b; newRenderThumbs(); }
  }, 500);

})();
