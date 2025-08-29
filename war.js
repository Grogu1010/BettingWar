import React, { useEffect, useMemo, useState } from "https://cdn.skypack.dev/react@17";
import ReactDOM from "https://cdn.skypack.dev/react-dom@17";

// Self-contained 4-player War game component (no external CSS, no ReactDOM)
// Exports a React component for canvas preview.

// ---------- Styles (injected) ----------
const css = `
:root {
  --bg: #0f1115; --panel: #161a22; --panel-2: #1d2230; --text: #e7ecf3;
  --muted: #9aa3b2; --accent: #7aa2f7; --win: #3fb950; --lose: #ef4444; --warn: #f59e0b;
  --card: #f8fafc; --radius: 14px; --shadow: 0 8px 24px rgba(0,0,0,0.35);
}
*{box-sizing:border-box}
.container{max-width:1100px;margin:24px auto;padding:0 16px 60px;color:var(--text);font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial}
.header{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px}
.h1{font-size:24px;font-weight:800;margin:0}
.controls{display:flex;flex-wrap:wrap;gap:10px;background:linear-gradient(180deg,var(--panel),var(--panel-2));border:1px solid #202637;padding:12px;border-radius:var(--radius);box-shadow:var(--shadow)}
.btn,select,input[type="range"]{background:#0b1220;color:var(--text);border:1px solid #22304a;border-radius:10px;padding:10px 14px;font-weight:700;cursor:pointer}
.btn:hover{border-color:#30508f}
.btn.primary{background:#0a162e;border-color:#2c4a85}
.btn.green{background:#112516;border-color:#244f2f}
.btn.danger{background:#2a1111;border-color:#5a2727}
.btn:disabled{opacity:.6;cursor:not-allowed}
.status{margin:10px 0;color:var(--muted);font-size:14px}
.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin:16px 0 8px}
.player{background:linear-gradient(180deg,#121722,#0e141f);border:1px solid #1f2636;border-radius:var(--radius);padding:14px;box-shadow:var(--shadow)}
.player.you{border-color:#304c7a}
.player.out{opacity:.45;filter:grayscale(.2)}
.head{display:flex;align-items:center;justify-content:space-between;gap:10px}
.name{font-weight:800}
.badge{font-size:12px;padding:3px 8px;border-radius:999px;border:1px solid #2a354e;color:var(--muted);background:#0c121d}
.badge.win{color:#d1fae5;background:#0f2a18;border-color:#254e34}
.badge.war{color:#fff7ed;background:#2d1f0a;border-color:#6b4e1a}
.counts{color:var(--muted);font-size:13px}
.cards{display:grid;grid-template-columns:1fr auto;align-items:center;gap:10px;margin-top:10px}
.faceup{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.pileinfo{text-align:right;font-size:13px;color:var(--muted)}
.card{width:70px;height:100px;border-radius:10px;background:var(--card);border:1px solid #e5e7eb;box-shadow:0 3px 10px rgba(0,0,0,.25);position:relative;display:grid;place-items:center;font-weight:800}
.rank{font-size:18px;position:absolute;top:6px;left:8px}
.suit{font-size:26px}
.red{color:#d12c2c}
.back{width:54px;height:78px;border-radius:8px;background:repeating-linear-gradient(45deg,#1a2a4a,#1a2a4a 6px,#0f1a33 6px,#0f1a33 12px);border:1px solid #1f2f57;box-shadow:0 2px 8px rgba(0,0,0,.25)}
.backs{display:flex;gap:4px;align-items:center;flex-wrap:wrap}
.pot{margin-top:18px;background:linear-gradient(180deg,#121821,#0f1623);border:1px dashed #2a3552;color:var(--muted);padding:12px;border-radius:var(--radius)}
.log{margin-top:18px;background:#0e1420;border:1px solid #1c2438;border-radius:var(--radius);padding:10px 12px;max-height:220px;overflow:auto}
.log h3{margin:6px 0 10px;font-size:14px;color:var(--muted);font-weight:700}
.log-entry{font-size:13px;color:#cdd6e6;margin-bottom:6px}
.flex{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.spacer{flex:1}
@media(max-width:880px){.grid{grid-template-columns:1fr}}
`;

// ---------- Card helpers ----------
const SUITS = ["♠","♥","♦","♣"]; // spade/heart/diamond/club
const RANKS = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
const RANK_VALUE = Object.fromEntries(RANKS.map((r,i)=>[r, i+2])); // 2..14
const suitColor = (s) => (s==="♥"||s==="♦") ? "red" : "";
const pretty = (c) => c ? `${c.rank}${c.suit}` : "—";

function newDeck(){
  const deck=[]; for(const s of SUITS) for(const r of RANKS) deck.push({rank:r,suit:s,id:`${r}${s}-${Math.random().toString(36).slice(2,7)}`});
  return shuffle(deck);
}
function shuffle(a){const arr=a.slice(); for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]];} return arr;}
const draw = (p)=>p.deck.shift();
const addToBottom=(p,cards)=>{p.deck.push(...cards)};

// ---------- Game setup ----------
const BOT_NAMES=["Rogue Bot","Tinker Bot","Echo Bot"];
function deal(players=4){const deck=newDeck(); const per=Math.floor(deck.length/players); return Array.from({length:players},(_,i)=>deck.slice(i*per,(i+1)*per));}
function deepClonePlayers(players){return players.map(p=>({...p, deck:p.deck.slice(), inPlay:p.inPlay.slice()}));}

export default function WarGame(){
  const [faceDownCount,setFaceDownCount]=useState(3);
  const [players,setPlayers]=useState(()=>initPlayers(faceDownCount));
  const [round,setRound]=useState(0);
  const [auto,setAuto]=useState(false);
  const [speed,setSpeed]=useState(350);
  const [lastWinner,setLastWinner]=useState(null);
  const [status,setStatus]=useState("New game ready.");
  const [log,setLog]=useState([]);

  const gameOver=useMemo(()=>players.filter(p=>p.deck.length>0).length<=1,[players]);
  const potSize=useMemo(()=>players.reduce((n,p)=>n+p.inPlay.length,0),[players]);

  useEffect(()=>{ if(!auto) return; if(gameOver){setAuto(false);return;} const id=setTimeout(()=>playRound(),speed); return ()=>clearTimeout(id); },[auto,round,gameOver,speed]);

  function initPlayers(fd=3){
    const dealt=deal(4);
    const you={id:0,name:"You",human:true,deck:dealt[0],inPlay:[],out:false};
    const bots=BOT_NAMES.map((n,i)=>({id:i+1,name:n,human:false,deck:dealt[i+1],inPlay:[],out:false}));
    return [you,...bots];
  }
  function reset(fd=faceDownCount){ setPlayers(initPlayers(fd)); setRound(0); setAuto(false); setLastWinner(null); setStatus("New game ready."); setLog([]); }

  function lastFaceUp(p){ return p.inPlay[p.inPlay.length-1]||null; }

  function resolveWar(P,participants,N){
    let notes=[]; let contenders=participants.slice();
    while(true){
      const visible=contenders.map(i=>({i,card:lastFaceUp(P[i])})).filter(x=>!!x.card);
      const maxVal=Math.max(...visible.map(x=>RANK_VALUE[x.card.rank]));
      const top=visible.filter(x=>RANK_VALUE[x.card.rank]===maxVal).map(x=>x.i);
      if(top.length===1){ return {winner:top[0],details:notes.join("\n"),updated:P}; }
      notes.push(`WAR between ${top.map(i=>P[i].name).join(", ")} (rank ${visible.find(v=>v.i===top[0]).card.rank}).`);
      const continuing=[];
      top.forEach(i=>{
        const needDown=Math.max(0, Math.min(N, Math.max(0, P[i].deck.length-1)));
        for(let k=0;k<needDown;k++){ const d=draw(P[i]); if(d) P[i].inPlay.push(d); }
        const up=draw(P[i]); if(up){ P[i].inPlay.push(up); continuing.push(i);} else { notes.push(`${P[i].name} cannot continue the war (out of cards).`);} 
      });
      if(continuing.length===0){
        const allVisible=participants.map(i=>({i,card:lastFaceUp(P[i])})).filter(x=>!!x.card);
        const byVal=allVisible.sort((a,b)=>RANK_VALUE[b.card.rank]-RANK_VALUE[a.card.rank]);
        if(byVal.length>0){ notes.push(`All tied players ran out. Fallback: ${P[byVal[0].i].name} takes the pot.`); return {winner:byVal[0].i,details:notes.join("\n"),updated:P}; }
        return {winner:null,details:notes.join("\n"),updated:P};
      }
      contenders=continuing.slice();
    }
  }

  function playRound(){
    if(gameOver) return;
    let P=deepClonePlayers(players);
    const activeIdx=P.map((p,idx)=>[p,idx]).filter(([p])=>p.deck.length>0).map(([_,idx])=>idx);
    if(activeIdx.length<2) return;
    activeIdx.forEach(i=>{ const c=draw(P[i]); if(c) P[i].inPlay.push(c); });
    const {winner,details,updated}=resolveWar(P,activeIdx,faceDownCount);
    P=updated; const pot=P.flatMap(p=>p.inPlay);
    if(winner!=null){ addToBottom(P[winner], shuffle(pot)); setLastWinner(winner); }
    P.forEach(p=>{ p.inPlay=[]; if(p.deck.length===0) p.out=true; });
    const activeLeft=P.filter(p=>p.deck.length>0).length;
    const winnerName=winner!=null?P[winner].name:"—";
    const roundMsg=winner!=null?`Round ${round+1}: ${winnerName} won ${pot.length} card${pot.length!==1?"s":""}.`:`Round ${round+1}: No winner.`;
    setPlayers(P); setRound(r=>r+1);
    setStatus(activeLeft<=1?`Game over — ${winnerName} wins the game!`:roundMsg);
    setLog(prev=>[roundMsg, ...(details?details.split("\n").filter(Boolean).map(x=>`· ${x}`):[]), ...prev].slice(0,200));
  }

  return (
    <div className="container">
      {/* inject styles once */}
      <style>{css}</style>

      <div className="header">
        <h1 className="h1">War — 4 Players</h1>
        <div className="controls">
          <button className="btn primary" onClick={playRound} disabled={auto||gameOver}>Flip</button>
          <button className="btn green" onClick={()=>setAuto(a=>!a)} disabled={gameOver}>{auto?"Stop Auto-Play":"Auto-Play"}</button>
          <div className="flex">
            <label className="muted">Speed</label>
            <input type="range" min="100" max="1000" step="50" value={speed} onChange={e=>setSpeed(+e.target.value)} />
            <span className="muted">{speed}ms/round</span>
          </div>
          <div className="flex">
            <label className="muted">Face-down per war</label>
            <select value={faceDownCount} onChange={e=>{const v=+e.target.value; setFaceDownCount(v); reset(v);}}>
              <option value={3}>3 (classic)</option>
              <option value={2}>2</option>
              <option value={1}>1</option>
              <option value={0}>0</option>
            </select>
          </div>
          <button className="btn danger" onClick={()=>reset()}>New Game</button>
          <div className="spacer"/>
          <div className="status">Round <b>{round}</b> • Active: <b>{players.filter(p=>p.deck.length>0).length}</b></div>
        </div>
      </div>

      <div className="status">
        {players.filter(p=>p.deck.length>0).length===1 
          ? (()=>{const winner=players.find(p=>p.deck.length>0); return <b style={{color:"var(--win)"}}>Game over — {winner?winner.name:""} wins!</b>;})()
          : status}
      </div>

      <div className="grid">
        {players.map((p,idx)=>{
          const last=p.inPlay[p.inPlay.length-1]||null;
          const backs=p.inPlay.length?Math.max(0,p.inPlay.length-1):0;
          const wonLast=lastWinner===idx;
          const inWar=players.some(pp=>pp.inPlay.length>1)&&p.inPlay.length>1;
          return (
            <div key={p.id} className={`player ${p.human?"you":""} ${p.out?"out":""}`}>
              <div className="head">
                <div className="name">{p.name}</div>
                <div className="flex">
                  {wonLast && players.filter(pp=>pp.deck.length>0).length>1 && <span className="badge win">won last</span>}
                  {inWar && <span className="badge war">in war</span>}
                  <span className="badge">deck: {p.deck.length}</span>
                </div>
              </div>
              <div className="counts">on table: {p.inPlay.length}</div>
              <div className="cards">
                <div className="faceup">
                  {last ? (
                    <div className="card">
                      <div className={`rank ${suitColor(last.suit)}`}>{last.rank}</div>
                      <div className={`suit ${suitColor(last.suit)}`}>{last.suit}</div>
                    </div>
                  ) : (
                    <div className="card" style={{opacity:.25}}><div className="suit">—</div></div>
                  )}
                  <div className="backs">
                    {Array.from({length:backs}).map((_,i)=>(<div key={i} className="back"/>))}
                  </div>
                </div>
                <div className="pileinfo">
                  <div>Last: <b>{pretty(last)}</b></div>
                  <div>Out: <b style={{color: p.deck.length===0 && !p.inPlay.length ? "var(--lose)":"var(--muted)"}}>{p.deck.length===0 && !p.inPlay.length?"Yes":"No"}</b></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pot">Pot on table: <b>{potSize}</b> card{potSize!==1?"s":""}</div>

      <div className="log">
        <h3>Game Log</h3>
        {log.length===0 && <div style={{color:"var(--muted)"}}>No events yet.</div>}
        {log.map((line,i)=>(<div key={i} className="log-entry">{line}</div>))}
      </div>
    </div>
  );
}

// If running directly in a browser environment without a bundler,
// attempt to mount automatically when a root element is present.
if (typeof document !== "undefined" && document.getElementById("root")) {
  ReactDOM.render(<WarGame />, document.getElementById("root"));
}
