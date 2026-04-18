"use client";
import { useState } from "react";

const jobs = [
  { title:"Prompt Engineer", cat:"Core AI", inr:"₹8L – ₹28L", usd:"$80K – $175K", pop:94, demand:"Explosive", growth:340, skills:["ChatGPT","Claude","LangChain","Gemini"] },
  { title:"LLM Fine-tuning Engineer", cat:"Core AI", inr:"₹14L – ₹40L", usd:"$120K – $250K", pop:88, demand:"Very High", growth:290, skills:["LoRA","QLoRA","Hugging Face","PEFT"] },
  { title:"Generative AI Developer", cat:"Engineering", inr:"₹10L – ₹35L", usd:"$100K – $200K", pop:90, demand:"Explosive", growth:320, skills:["RAG","LangChain","Vector DBs","APIs"] },
  { title:"ML Engineer", cat:"Engineering", inr:"₹12L – ₹45L", usd:"$110K – $220K", pop:91, demand:"Very High", growth:210, skills:["PyTorch","TensorFlow","Python","MLOps"] },
  { title:"AI/ML Researcher", cat:"Research", inr:"₹15L – ₹60L", usd:"$130K – $300K", pop:78, demand:"High", growth:180, skills:["Transformers","RLHF","CUDA","Papers"] },
  { title:"AI Product Manager", cat:"Product", inr:"₹18L – ₹50L", usd:"$140K – $260K", pop:82, demand:"High", growth:160, skills:["Roadmapping","AI Ethics","GPT APIs","Analytics"] },
  { title:"AI Data Scientist", cat:"Data", inr:"₹9L – ₹32L", usd:"$90K – $180K", pop:86, demand:"High", growth:140, skills:["Pandas","SQL","Scikit-learn","Tableau"] },
  { title:"NLP Engineer", cat:"Engineering", inr:"₹10L – ₹36L", usd:"$100K – $195K", pop:80, demand:"High", growth:150, skills:["BERT","SpaCy","Transformers","NLTK"] },
  { title:"Computer Vision Engineer", cat:"Engineering", inr:"₹11L – ₹38L", usd:"$105K – $210K", pop:75, demand:"Steady", growth:120, skills:["OpenCV","YOLO","Diffusion Models","GANs"] },
  { title:"AI Ethics & Policy Lead", cat:"Strategy", inr:"₹20L – ₹55L", usd:"$150K – $280K", pop:65, demand:"Emerging", growth:190, skills:["Policy","Bias Auditing","Governance","Research"] },
];

const demandCfg = {
  "Explosive":  { bg:"#FF40EB",  border:"rgba(255,64,235,0.35)",  color:"#FFffff", pulse:true  },
  "Very High":  { bg:"rgba(255,64,235,0.10)", border:"rgba(255,64,235,0.30)", color:"#FF40EB", pulse:false },
  "High":       { bg:"rgba(255,255,255,0.07)", border:"rgba(255,255,255,0.20)", color:"#fff",    pulse:false },
  "Steady":     { bg:"rgba(150,150,150,0.08)", border:"rgba(150,150,150,0.20)", color:"#888",    pulse:false },
  "Emerging":   { bg:"rgba(255,64,235,0.10)", border:"rgba(255,64,235,0.30)", color:"#FF40EB", pulse:false },
};

const catColor = {
  "Core AI":     ["rgba(255,64,235,0.12)",  "rgba(255,64,235,0.3)",   "#FF40EB"],
  "Engineering": ["rgba(255,255,255,0.07)", "rgba(255,255,255,0.2)",  "#fff"],
  "Research":    ["rgba(255,64,235,0.1)",  "rgba(255,64,235,0.3)",  "#FF40EB"],
  "Product":     ["rgba(255,64,235,0.08)",  "rgba(255,64,235,0.2)",   "#FF40EB"],
  "Data":        ["rgba(255,64,235,0.1)",  "rgba(255,64,235,0.25)", "#FF40EB"],
  "Strategy":    ["rgba(255,255,255,0.06)", "rgba(255,255,255,0.15)", "rgba(255,255,255,0.6)"],
};

const cats = ["All","Core AI","Engineering","Research","Product","Data","Strategy"];

function barGradient(pop) {
  if (pop >= 88) return "linear-gradient(90deg,#FF40EB,#FF40EB)";
  if (pop >= 78) return "linear-gradient(90deg,rgba(255,64,235,0.5),#FF40EB)";
  return "linear-gradient(90deg,rgba(255,64,235,0.4),#FF40EB)";
}

export default function AIJobsSection() {
  const [sortKey, setSortKey] = useState("popularity");
  const [filter, setFilter] = useState("All");

  const sorted = [...jobs]
    .filter(j => filter === "All" || j.cat === filter)
    .sort((a, b) => {
      if (sortKey === "popularity") return b.pop - a.pop;
      if (sortKey === "growth")     return b.growth - a.growth;
      if (sortKey === "salary")     return parseInt(b.inr.replace(/[^0-9]/g,"")) - parseInt(a.inr.replace(/[^0-9]/g,""));
      return 0;
    });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        .ns-wrap { background:#0a0a0a; border-radius:16px; overflow:hidden; font-family:'Poppins',sans-serif; border:1px solid rgba(255,255,255,0.08); }
        .ns-hero { background:linear-gradient(135deg,#130810 0%,#0a0a0a 70%); padding:36px 32px 28px; border-bottom:1px solid rgba(255,255,255,0.07); position:relative; overflow:hidden; }
        .ns-hero::before { content:''; position:absolute; top:-60px; right:-60px; width:300px; height:300px; border-radius:50%; background:radial-gradient(circle,rgba(255,64,235,0.1) 0%,transparent 70%); }
        .ns-badge { display:inline-flex; align-items:center; gap:7px; background:rgba(255,64,235,0.1); border:1px solid rgba(255,64,235,0.3); border-radius:100px; padding:5px 14px; font-size:11px; letter-spacing:1.8px; text-transform:uppercase; color:#FF40EB; font-family:'JetBrains Mono',monospace; margin-bottom:18px; }
        .ns-dot { width:5px; height:5px; border-radius:50%; background:#FF40EB; animation:ns-blink 1.4s ease-in-out infinite; }
        @keyframes ns-blink { 0%,100%{opacity:1} 50%{opacity:0.2} }
        .ns-h1 { font-family:'Poppins',sans-serif; font-size:clamp(24px,4vw,34px); font-weight:800; color:#fff; letter-spacing:-0.5px; line-height:1.15; margin-bottom:10px; }
        .ns-h1 span { color:#FF40EB; }
        .ns-sub { font-size:13px; color:rgba(255,255,255,0.38); line-height:1.65; max-width:500px; font-family:'Poppins',sans-serif; }
        .ns-stats { display:flex; border-bottom:1px solid rgba(255,255,255,0.07); background:#0d0d0d; }
        .ns-stat { flex:1; padding:16px 20px; text-align:center; border-right:1px solid rgba(255,255,255,0.06); }
        .ns-stat:last-child { border-right:none; }
        .ns-sn { font-family:'Poppins',sans-serif; font-size:18px; font-weight:700; color:#FF40EB; }
        .ns-sl { font-size:10px; letter-spacing:1.2px; text-transform:uppercase; color:rgba(255,255,255,0.22); font-family:'JetBrains Mono',monospace; margin-top:3px; }
        .ns-ctrl { display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap; padding:14px 28px; border-bottom:1px solid rgba(255,255,255,0.05); background:rgba(0,0,0,0.2); }
        .ns-pills { display:flex; gap:6px; flex-wrap:wrap; }
        .ns-pill { padding:5px 13px; border-radius:100px; border:1px solid rgba(255,255,255,0.1); background:transparent; color:rgba(255,255,255,0.35); font-size:11px; font-family:'JetBrains Mono',monospace; cursor:pointer; transition:all 0.18s; }
        .ns-pill:hover { border-color:rgba(255,64,235,0.4); color:#FF40EB; }
        .ns-pill.on { background:rgba(255,64,235,0.12); border-color:#FF40EB; color:#FF40EB; }
        .ns-sorts { display:flex; gap:6px; align-items:center; }
        .ns-slbl { font-size:10px; letter-spacing:1px; text-transform:uppercase; color:rgba(255,255,255,0.22); font-family:'JetBrains Mono',monospace; }
        .ns-sbtn { padding:5px 11px; border-radius:7px; border:1px solid rgba(255,255,255,0.07); background:rgba(255,255,255,0.03); color:rgba(255,255,255,0.38); font-size:11px; font-family:'JetBrains Mono',monospace; cursor:pointer; transition:all 0.18s; }
        .ns-sbtn.on { border-color:rgba(255,64,235,0.5); background:rgba(255,64,235,0.12); color:#FF40EB; }
        .ns-tbl { overflow-x:auto; }
        .ns-tbl table { width:100%; border-collapse:collapse; min-width:820px; }
        .ns-tbl thead tr { background:#0d0d0d; border-bottom:1px solid rgba(255,255,255,0.07); }
        .ns-tbl th { padding:12px 16px; font-size:9.5px; letter-spacing:1.8px; text-transform:uppercase; color:rgba(255,255,255,0.2); font-family:'JetBrains Mono',monospace; font-weight:500; text-align:left; white-space:nowrap; }
        .ns-tbl th:first-child { padding-left:28px; } .ns-tbl th:last-child { padding-right:28px; }
        .ns-tbl tbody tr { border-bottom:1px solid rgba(255,255,255,0.04); transition:background 0.15s; }
        .ns-tbl tbody tr:last-child { border-bottom:none; }
        .ns-tbl tbody tr:hover { background:rgba(255,64,235,0.04); }
        .ns-tbl td { padding:15px 16px; vertical-align:middle; font-family:'Poppins',sans-serif; }
        .ns-tbl td:first-child { padding-left:28px; } .ns-tbl td:last-child { padding-right:28px; }
        .ns-rank { font-family:'JetBrains Mono',monospace; font-size:11px; color:rgba(255,255,255,0.16); font-weight:500; }
        .ns-jname { font-size:14px; font-weight:600; color:#fff; margin-bottom:4px; font-family:'Poppins',sans-serif; }
        .ns-jcat { display:inline-block; font-size:9.5px; padding:2px 7px; border-radius:100px; font-family:'JetBrains Mono',monospace; }
        .ns-inr { font-size:13px; font-weight:600; color:#fff; font-family:'Poppins',sans-serif; margin-bottom:2px; }
        .ns-usd { font-size:10.5px; color:rgba(255,255,255,0.25); font-family:'JetBrains Mono',monospace; }
        .ns-pbar { display:flex; align-items:center; gap:8px; }
        .ns-pbg { flex:1; height:4px; border-radius:100px; background:rgba(255,255,255,0.07); overflow:hidden; min-width:70px; }
        .ns-pfill { height:100%; border-radius:100px; }
        .ns-pnum { font-family:'JetBrains Mono',monospace; font-size:12px; color:rgba(255,255,255,0.4); min-width:30px; text-align:right; }
        .ns-dbadge { display:inline-flex; align-items:center; gap:5px; padding:3px 9px; border-radius:100px; font-size:10.5px; font-family:'Poppins',sans-serif; font-weight:500; }
        .ns-ddot { width:4px; height:4px; border-radius:50%; display:inline-block; }
        .ns-grow { font-family:'Poppins',sans-serif; font-size:13px; font-weight:700; color:#FF40EB; }
        .ns-stags { display:flex; gap:4px; flex-wrap:wrap; }
        .ns-stag { font-size:9.5px; padding:2px 7px; border-radius:5px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08); color:rgba(255,255,255,0.4); font-family:'JetBrains Mono',monospace; white-space:nowrap; }
        .ns-footer { padding:14px 32px; text-align:center; font-family:'Poppins',sans-serif; font-size:10.5px; color:rgba(255,255,255,0.16); border-top:1px solid rgba(255,255,255,0.05); background:#0d0d0d; }
        .ns-footer b { color:#FF40EB; font-weight:600; }
        @media(max-width:700px){ .ns-hero{padding:28px 20px 22px} .ns-ctrl{padding:12px 16px} .ns-footer{padding:12px 20px} }
      `}</style>

      <section className="ns-wrap mb-8">
        {/* Hero */}
        <div className="ns-hero">
          <div className="ns-badge"><span className="ns-dot" />NIGAPE · GK2 Delhi · 2025</div>
          <h1 className="ns-h1">AI Career <span>Landscape</span></h1>
          <p className="ns-sub">Top AI roles, salary packages, and growth trajectories shaping India's future workforce — curated by NIGAPE Research Desk.</p>
        </div>

        {/* Stats */}
        <div className="ns-stats">
          {[["10+","AI Roles"],["₹8L+","Avg Entry CTC"],["290%","Avg YoY Growth"],["2025","Data Updated"]].map(([n,l])=>(
            <div className="ns-stat" key={l}><div className="ns-sn">{n}</div><div className="ns-sl">{l}</div></div>
          ))}
        </div>

        {/* Controls */}
        <div className="ns-ctrl">
          <div className="ns-pills">
            {cats.map(c=>(
              <button key={c} className={`ns-pill${filter===c?" on":""}`} onClick={()=>setFilter(c)}>{c}</button>
            ))}
          </div>
          <div className="ns-sorts">
            <span className="ns-slbl">Sort:</span>
            {["popularity","growth","salary"].map(k=>(
              <button key={k} className={`ns-sbtn${sortKey===k?" on":""}`} onClick={()=>setSortKey(k)}>
                {k.charAt(0).toUpperCase()+k.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="ns-tbl">
          <table>
            <thead>
              <tr>
                <th>#</th><th>Job Role</th><th>India Package</th><th>Global Package</th>
                <th>Popularity</th><th>Demand</th><th>YoY Growth</th><th>Key Skills</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((j,i)=>{
                const d=demandCfg[j.demand];
                const cc=catColor[j.cat]||["rgba(255,255,255,0.07)","rgba(255,255,255,0.2)","#fff"];
                return (
                  <tr key={j.title}>
                    <td><span className="ns-rank">{String(i+1).padStart(2,"0")}</span></td>
                    <td>
                      <div className="ns-jname">{j.title}</div>
                      <span className="ns-jcat" style={{background:cc[0],border:`1px solid ${cc[1]}`,color:cc[2]}}>{j.cat}</span>
                    </td>
                    <td><div className="ns-inr">{j.inr}</div><div className="ns-usd">per annum</div></td>
                    <td><div className="ns-inr" style={{fontSize:"12px",color:"#FF40EB"}}>{j.usd}</div><div className="ns-usd">USD / yr</div></td>
                    <td>
                      <div className="ns-pbar">
                        <div className="ns-pbg"><div className="ns-pfill" style={{width:`${j.pop}%`,background:barGradient(j.pop)}} /></div>
                        <span className="ns-pnum">{j.pop}%</span>
                      </div>
                    </td>
                    <td>
                      <span className="ns-dbadge" style={{background:d.bg,border:`1px solid ${d.border}`,color:d.color}}>
                        <span className="ns-ddot" style={{background:d.color,animation:d.pulse?"ns-blink 1.2s ease-in-out infinite":"none"}} />
                        {j.demand}
                      </span>
                    </td>
                    <td><span className="ns-grow">+{j.growth}%</span></td>
                    <td><div className="ns-stags">{j.skills.map(s=><span className="ns-stag" key={s}>{s}</span>)}</div></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="ns-footer">
          Data from LinkedIn · Naukri · Glassdoor · Industry Reports &nbsp;·&nbsp; <b>NIGAPE Research Desk 2025</b>
        </div>
      </section>
    </>
  );
}