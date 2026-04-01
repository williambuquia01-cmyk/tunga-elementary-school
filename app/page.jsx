'use client';
const LOGO = '/logo.jpg';
import { useState, useEffect, useCallback } from "react";

/* ═══ STORAGE ═══ */
function useStore(key, init) {
  const [val, setVal] = useState(init);
  useEffect(() => {
    (async () => { try { const r = await window.storage.get(key); if (r) setVal(JSON.parse(r.value)); } catch {} })();
  }, [key]);
  const save = useCallback((v) => { const nv = typeof v === "function" ? v(val) : v; setVal(nv); window.storage.set(key, JSON.stringify(nv)).catch(() => {}); }, [key, val]);
  return [val, save];
}

/* ═══ CONSTANTS ═══ */
const SYS = Array.from({ length: 16 }, (_, i) => `${2025 + i}-${2026 + i}`);
// Logo embedded
const LOGO_UNUSED = "data:image/jpeg;base64,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";

const PPSSH = [
  { id:1, name:"Leading strategically", color:"#1B4D7E", strands:["1.1 Vision & Mission","1.2 Data-Driven Planning","1.3 SIP","1.4 Research-Based","1.5 Curriculum Leadership","1.6 External Relations","1.7 Policy Implementation"] },
  { id:2, name:"Managing operations & resources", color:"#2E6B4F", strands:["2.1 MOOE","2.2 HRD","2.3 Facilities","2.4 Compliance","2.5 Transparency","2.6 Technology"] },
  { id:3, name:"Teaching & learning", color:"#7B3F00", strands:["3.1 Instructional Supervision","3.2 Assessment","3.3 Contextualization","3.4 Learning Environment","3.5 Learner Support","3.6 ICT","3.7 Phil-IRI","3.8 Action Research"] },
  { id:4, name:"Developing self & others", color:"#5B2C6F", strands:["4.1 Professional Dev","4.2 Performance Mgmt","4.3 Coaching","4.4 Learning Communities","4.5 Personal Growth","4.6 RPMS","4.7 Recognition","4.8 PRAISE"] },
  { id:5, name:"Building connections", color:"#943126", strands:["5.1 Stakeholder Engagement","5.2 Partnership","5.3 Community","5.4 Alumni","5.5 Networking"] },
  { id:6, name:"Learner-centered culture", color:"#1A5276", strands:["6.1 Child Protection","6.2 Gender-Responsive","6.3 Inclusive Ed","6.4 Values","6.5 DRRM","6.6 Health & Nutrition"] },
];

const COLORS = ["#1B4D7E","#2E6B4F","#7B3F00","#5B2C6F","#943126","#1A5276","#7D6608","#1E8449"];
const MONTHS = ["July","August","September","October","November","December","January","February","March","April","May","June"];
const DEFAULT_GRADES = ["Kinder","Grade 1","Grade 2","Grade 3","Grade 4","Grade 5","Grade 6"];

/* ═══ ICONS (compact SVG) ═══ */
const sv = (d, w=20) => <svg width={w} height={w} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{d}</svg>;
const IC = {
  home: sv(<><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>),
  users: sv(<><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/></>),
  chat: sv(<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>),
  file: sv(<><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></>),
  folder: sv(<path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>),
  shield: sv(<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>),
  upload: sv(<><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></>),
  plus: sv(<><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>, 16),
  trash: sv(<><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></>, 16),
  x: sv(<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>),
  menu: sv(<><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>,24),
  back: sv(<polyline points="15 18 9 12 15 6"/>, 16),
  grid: sv(<><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></>),
  dollar: sv(<><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></>),
  clip: sv(<><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></>),
  star: sv(<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>),
  lock: sv(<><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></>),
  log: sv(<><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>),
  student: sv(<><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5"/></>),
  board: sv(<><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></>),
  download: sv(<><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>),
};

/* ═══ HELPERS ═══ */
const now = () => new Date().toLocaleDateString("en-PH",{year:"numeric",month:"long",day:"numeric"});
const nowS = () => new Date().toLocaleDateString("en-PH",{year:"numeric",month:"short",day:"numeric"});
const uid = () => Date.now() + Math.random().toString(36).slice(2,6);

/* ═══ UI COMPONENTS ═══ */
function Modal({ open, onClose, title, children, wide }) {
  if (!open) return null;
  return (<div style={{position:"fixed",inset:0,zIndex:1e3,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,.5)",padding:16}} onClick={onClose}>
    <div style={{background:"#fff",borderRadius:14,width:"100%",maxWidth:wide?760:540,maxHeight:"88vh",overflow:"auto",padding:24,boxShadow:"0 20px 60px rgba(0,0,0,.25)"}} onClick={e=>e.stopPropagation()}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <h3 style={{margin:0,fontSize:18,fontWeight:700}}>{title}</h3>
        <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",color:"#999"}}>{IC.x}</button>
      </div>
      {children}
    </div>
  </div>);
}

const inp = {width:"100%",padding:"9px 12px",border:"1.5px solid #e4e7ec",borderRadius:8,fontSize:14,fontFamily:"inherit",outline:"none"};
const Inp = ({label,value,onChange,ph,ta,type}) => (<div style={{marginBottom:12}}>
  {label&&<label style={{display:"block",fontSize:13,fontWeight:500,color:"#666",marginBottom:3}}>{label}</label>}
  {ta?<textarea style={{...inp,minHeight:70,resize:"vertical"}} value={value} onChange={e=>onChange(e.target.value)} placeholder={ph}/>
    :<input style={inp} type={type||"text"} value={value} onChange={e=>onChange(e.target.value)} placeholder={ph}/>}
</div>);

const Btn = ({children,onClick,color,sm,outline,full,disabled}) => (
  <button disabled={disabled} onClick={onClick} style={{display:"inline-flex",alignItems:"center",gap:5,padding:sm?"6px 12px":"9px 16px",background:outline?"transparent":(color||"#1B4D7E"),color:outline?(color||"#1B4D7E"):"#fff",border:outline?`2px solid ${color||"#1B4D7E"}`:"none",borderRadius:8,fontSize:sm?12:13,fontWeight:600,cursor:disabled?"not-allowed":"pointer",opacity:disabled?.5:1,width:full?"100%":undefined,justifyContent:"center",fontFamily:"inherit"}}>{children}</button>
);

const Badge = ({children,color}) => <span style={{display:"inline-block",padding:"2px 9px",borderRadius:16,fontSize:11,fontWeight:600,background:color||"#e8f0fe",color:color?"#fff":"#1B4D7E"}}>{children}</span>;

/* ═══ LOGIN PAGE ═══ */
function LoginPage({ onLogin, users }) {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");
  const attempt = () => {
    if (u==="admin"&&p==="admin123") { onLogin({role:"admin",name:"William A. Buquia"}); return; }
    const found = users.find(x => x.username===u.toLowerCase() && x.password===p);
    if (found) { onLogin({role:found.role,name:found.name}); return; }
    setErr("Invalid credentials");
  };
  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg,#0E2240,#1B4D7E 50%,#2E6B4F)",padding:16}}>
      <div style={{background:"#fff",borderRadius:20,padding:32,width:"100%",maxWidth:380,boxShadow:"0 20px 60px rgba(0,0,0,.3)"}}>
        <div style={{textAlign:"center",marginBottom:20}}>
          <img src={LOGO} alt="Logo" style={{width:80,height:80,borderRadius:"50%",border:"3px solid #1B4D7E",objectFit:"cover"}}/>
          <h1 style={{fontSize:20,fontWeight:700,margin:"10px 0 2px",color:"#0E2240"}}>Tunga Elementary School</h1>
          <div style={{fontSize:12,color:"#999"}}>School Management System</div>
        </div>
        {err && <div style={{background:"#fde8e8",color:"#c0392b",padding:"8px 12px",borderRadius:8,fontSize:13,marginBottom:12}}>{err}</div>}
        <Inp label="Username" value={u} onChange={v=>{setU(v);setErr("");}} ph="Enter username"/>
        <Inp label="Password" value={p} onChange={v=>{setP(v);setErr("");}} ph="Enter password" type="password"/>
        <Btn onClick={attempt} full>Sign in</Btn>
        <div style={{fontSize:11,color:"#bbb",textAlign:"center",marginTop:12}}>Admin: admin / admin123</div>
      </div>
    </div>
  );
}

/* ═══════════════ MAIN APP ═══════════════ */
export default function App() {
  const [auth, setAuth] = useState(null);
  const [page, setPage] = useState("home");
  const [sy, setSy] = useStore("current_sy", "2025-2026");
  const [sideOpen, setSideOpen] = useState(false);
  const [modal, setModal] = useState(null);

  // Global data stores (SY-scoped where needed)
  const [users, setUsers] = useStore("users", []);
  const [grades, setGrades] = useStore(`grades_${sy}`, DEFAULT_GRADES.map(g=>({grade:g,sections:[{id:uid(),name:"Section A",adviser:"",students:[]}]})));
  const [announcements, setAnnouncements] = useStore(`ann_${sy}`, []);
  const [memos, setMemos] = useStore(`memos_${sy}`, []);
  const [bulletins, setBulletins] = useStore(`bull_${sy}`, []);
  const [coordinators, setCoordinators] = useStore(`coords_${sy}`, []);
  const [mooe, setMooe] = useStore(`mooe_${sy}`, {});
  const [reportMods, setReportMods] = useStore(`rmod_${sy}`, []);
  const [ppsMov, setPpsMov] = useStore(`ppssh_${sy}`, {});
  const [tmovCats, setTmovCats] = useStore(`tmov_${sy}`, []);
  const [formTemplates, setFormTemplates] = useStore(`forms_${sy}`, []);

  // Form state helpers
  const [f, setF] = useState({});
  const ff = (k,v) => setF(p=>({...p,[k]:v}));
  const fr = () => setF({});

  if (!auth) return <LoginPage onLogin={setAuth} users={users}/>;

  const totalStudents = grades.reduce((a,g)=>a+g.sections.reduce((b,s)=>b+(s.students?.length||0),0),0);
  const totalMale = grades.reduce((a,g)=>a+g.sections.reduce((b,s)=>b+(s.students?.filter(x=>x.sex==="M").length||0),0),0);
  const totalFemale = totalStudents - totalMale;

  const nav = [
    {id:"home",label:"Dashboard",icon:"home"},
    {id:"students",label:"Students",icon:"student"},
    {id:"grades",label:"Sections & Advisers",icon:"grid"},
    {id:"personnel",label:"Personnel",icon:"users"},
    {id:"coordinators",label:"Coordinators",icon:"star"},
    {id:"announcements",label:"Announcements",icon:"chat"},
    {id:"memos",label:"Memos",icon:"file"},
    {id:"bulletins",label:"Bulletins",icon:"board"},
    {id:"mooe",label:"MOOE Transparency",icon:"dollar"},
    {id:"reports",label:"Report Modules",icon:"folder"},
    {id:"ppssh",label:"PPSSH MOVs",icon:"shield"},
    {id:"tmov",label:"Teacher MOV Uploads",icon:"upload"},
    {id:"forms",label:"Form Templates",icon:"clip"},
  ];

  /* ── HOME ── */
  const HomePage = () => {
    const stats = [
      {label:"Total Students",value:totalStudents,sub:`${totalMale}M / ${totalFemale}F`,color:"#1B4D7E"},
      {label:"Teachers",value:users.filter(u=>u.role==="teacher").length,color:"#2E6B4F"},
      {label:"Non-Teaching",value:users.filter(u=>u.role==="non-teaching").length,color:"#5B2C6F"},
      {label:"Sections",value:grades.reduce((a,g)=>a+g.sections.length,0),color:"#943126"},
    ];
    return (<>
      <div style={{background:"linear-gradient(135deg,#0E2240,#1B4D7E 50%,#2E6B4F)",borderRadius:16,padding:24,color:"#fff",marginBottom:16,position:"relative",overflow:"hidden"}}>
        <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:8}}>
          <img src={LOGO} alt="" style={{width:64,height:64,borderRadius:"50%",border:"2px solid rgba(255,255,255,.25)",objectFit:"cover"}}/>
          <div><div style={{fontSize:10,letterSpacing:2,opacity:.6,textTransform:"uppercase"}}>DepEd · Schools Division of Cebu Province · Region VII</div>
            <h1 style={{fontSize:22,margin:"2px 0",fontWeight:700}}>Tunga Elementary School</h1>
            <div style={{fontSize:12,opacity:.75}}>Brgy. Tunga, Moalboal, Cebu · ID: 119502 · SY {sy}</div></div>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:10,marginBottom:16}}>
        {stats.map(s=><div key={s.label} style={{background:"#fff",borderRadius:12,padding:14,borderLeft:`4px solid ${s.color}`}}>
          <div style={{fontSize:11,color:"#999"}}>{s.label}</div>
          <div style={{fontSize:26,fontWeight:700,color:s.color}}>{s.value}</div>
          {s.sub&&<div style={{fontSize:11,color:"#888"}}>{s.sub}</div>}
        </div>)}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        <div style={{background:"#fff",borderRadius:12,padding:14}}><h3 style={{fontSize:14,fontWeight:600,marginBottom:4}}>School principal</h3>
          <div style={{fontSize:15,fontWeight:700,color:"#1B4D7E"}}>William A. Buquia, Dev.Ed.D.</div>
          <div style={{fontSize:12,color:"#999"}}>School Principal I</div></div>
        <div style={{background:"#fff",borderRadius:12,padding:14}}><h3 style={{fontSize:14,fontWeight:600,marginBottom:4}}>Quick actions</h3>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}><Btn sm onClick={()=>setPage("students")}>{IC.student} Students</Btn><Btn sm onClick={()=>setPage("personnel")} color="#2E6B4F">{IC.users} Personnel</Btn></div></div>
      </div>
    </>);
  };

  /* ── STUDENTS ── */
  const StudentsPage = () => {
    const [selGrade, setSelGrade] = useState(null);
    const [selSec, setSelSec] = useState(null);

    const addStudent = () => {
      if (!f.sname?.trim()) return;
      const student = {id:uid(),name:f.sname.trim(),lrn:f.slrn||"",sex:f.ssex||"M",dob:f.sdob||"",address:f.saddr||""};
      setGrades(grades.map((g,gi)=>gi===selGrade?{...g,sections:g.sections.map((s,si)=>si===selSec?{...s,students:[...(s.students||[]),student]}:s)}:g));
      fr(); setModal(null);
    };
    const removeStudent = (gi,si,sid) => {
      setGrades(grades.map((g,ggi)=>ggi===gi?{...g,sections:g.sections.map((s,ssi)=>ssi===si?{...s,students:(s.students||[]).filter(x=>x.id!==sid)}:s)}:g));
    };

    const sec = selGrade!==null&&selSec!==null ? grades[selGrade]?.sections[selSec] : null;
    const studs = sec?.students||[];

    return (<>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <h2 style={{fontSize:20,fontWeight:700}}>Students <Badge>{totalStudents} enrolled</Badge></h2>
      </div>
      {!sec ? (
        <div>{grades.map((g,gi)=>(
          <div key={gi} style={{background:"#fff",borderRadius:12,padding:14,marginBottom:10}}>
            <h3 style={{fontSize:15,fontWeight:600,color:"#1B4D7E",marginBottom:8}}>{g.grade}</h3>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {g.sections.map((s,si)=>{
                const m=(s.students||[]).filter(x=>x.sex==="M").length;
                const fe=(s.students||[]).length-m;
                return <button key={si} onClick={()=>{setSelGrade(gi);setSelSec(si);}} style={{background:"#f0f4f8",border:"1px solid #e4e7ec",borderRadius:10,padding:"10px 16px",cursor:"pointer",textAlign:"left",minWidth:160,fontFamily:"inherit"}}>
                  <div style={{fontWeight:600,fontSize:14}}>{s.name}</div>
                  <div style={{fontSize:11,color:"#888"}}>Adviser: {s.adviser||"Not assigned"}</div>
                  <div style={{fontSize:12,color:"#1B4D7E",fontWeight:600,marginTop:4}}>{(s.students||[]).length} students <span style={{color:"#2E6B4F"}}>{m}M</span> / <span style={{color:"#943126"}}>{fe}F</span></div>
                </button>;
              })}
            </div>
          </div>
        ))}</div>
      ) : (<>
        <button onClick={()=>{setSelGrade(null);setSelSec(null);}} style={{background:"none",border:"none",cursor:"pointer",fontSize:13,color:"#666",display:"flex",alignItems:"center",gap:4,marginBottom:10,fontFamily:"inherit"}}>{IC.back} Back</button>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
          <div><h3 style={{fontSize:18,fontWeight:700}}>{grades[selGrade].grade} — {sec.name}</h3>
            <div style={{fontSize:12,color:"#888"}}>Adviser: {sec.adviser||"None"} · {studs.length} students ({studs.filter(x=>x.sex==="M").length}M / {studs.filter(x=>x.sex==="F").length}F)</div></div>
          <Btn sm onClick={()=>{fr();setModal("addStudent");}}>{IC.plus} Add student</Btn>
        </div>
        {["M","F"].map(sex=>{
          const list = studs.filter(x=>x.sex===sex);
          return <div key={sex} style={{marginBottom:14}}>
            <div style={{fontSize:13,fontWeight:600,color:sex==="M"?"#1B4D7E":"#943126",marginBottom:6,padding:"4px 10px",background:sex==="M"?"#e8f0fe":"#fde8e8",borderRadius:6,display:"inline-block"}}>{sex==="M"?"MALE":"FEMALE"} ({list.length})</div>
            {list.map((s,i)=>(
              <div key={s.id} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 12px",background:"#fff",borderRadius:8,marginBottom:3,border:"1px solid #f0f0f0"}}>
                <span style={{fontSize:12,color:"#999",width:24}}>{i+1}.</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:500}}>{s.name}</div>
                  <div style={{fontSize:11,color:"#999"}}>LRN: {s.lrn||"—"}</div></div>
                <button onClick={()=>removeStudent(selGrade,selSec,s.id)} style={{background:"none",border:"none",cursor:"pointer",color:"#c0392b"}}>{IC.trash}</button>
              </div>
            ))}
            {list.length===0&&<div style={{fontSize:12,color:"#ccc",padding:8,fontStyle:"italic"}}>No {sex==="M"?"male":"female"} students</div>}
          </div>;
        })}
        <Modal open={modal==="addStudent"} onClose={()=>setModal(null)} title="Add student">
          <Inp label="Full name (Last, First, Middle)" value={f.sname||""} onChange={v=>ff("sname",v)} ph="e.g. ALEGADO, ARC FRITZ, MACASAOL"/>
          <Inp label="LRN" value={f.slrn||""} onChange={v=>ff("slrn",v)} ph="12-digit LRN"/>
          <div style={{marginBottom:12}}><label style={{fontSize:13,fontWeight:500,color:"#666",display:"block",marginBottom:3}}>Sex</label>
            <div style={{display:"flex",gap:8}}>{["M","F"].map(s=><button key={s} onClick={()=>ff("ssex",s)} style={{padding:"7px 20px",borderRadius:8,border:f.ssex===s?"2px solid #1B4D7E":"2px solid #e4e7ec",background:f.ssex===s?"#1B4D7E":"#fff",color:f.ssex===s?"#fff":"#333",fontWeight:600,cursor:"pointer",fontSize:13}}>{s==="M"?"Male":"Female"}</button>)}</div></div>
          <Inp label="Date of birth" value={f.sdob||""} onChange={v=>ff("sdob",v)} type="date"/>
          <Btn onClick={addStudent} full>Add student</Btn>
        </Modal>
      </>)}
    </>);
  };

  /* ── SECTIONS & ADVISERS ── */
  const GradesPage = () => {
    const addSection = (gi) => {
      if (!f.secname?.trim()) return;
      setGrades(grades.map((g,i)=>i===gi?{...g,sections:[...g.sections,{id:uid(),name:f.secname.trim(),adviser:f.secadv||"",students:[]}]}:g));
      fr(); setModal(null);
    };
    const delSection = (gi,si) => setGrades(grades.map((g,i)=>i===gi?{...g,sections:g.sections.filter((_,j)=>j!==si)}:g));
    const updAdv = (gi,si,v) => setGrades(grades.map((g,i)=>i===gi?{...g,sections:g.sections.map((s,j)=>j===si?{...s,adviser:v}:s)}:g));

    return (<>
      <h2 style={{fontSize:20,fontWeight:700,marginBottom:12}}>Sections & advisers</h2>
      {grades.map((g,gi)=>(
        <div key={gi} style={{background:"#fff",borderRadius:12,padding:14,marginBottom:10}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <h3 style={{fontSize:15,fontWeight:600,color:"#1B4D7E"}}>{g.grade}</h3>
            <Btn sm onClick={()=>{fr();setModal(`sec_${gi}`);}}>{IC.plus} Add section</Btn>
          </div>
          {g.sections.map((s,si)=>(
            <div key={si} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",background:"#f9f9fb",borderRadius:8,marginBottom:4}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:"#2E6B4F"}}/>
              <div style={{flex:1,fontWeight:600,fontSize:14}}>{s.name}</div>
              <input style={{border:"1px solid #e4e7ec",borderRadius:6,padding:"4px 8px",fontSize:12,width:160}} placeholder="Adviser..." value={s.adviser} onChange={e=>updAdv(gi,si,e.target.value)}/>
              <span style={{fontSize:11,color:"#999"}}>{(s.students||[]).length} students</span>
              <button onClick={()=>delSection(gi,si)} style={{background:"none",border:"none",cursor:"pointer",color:"#c0392b"}}>{IC.trash}</button>
            </div>
          ))}
          <Modal open={modal===`sec_${gi}`} onClose={()=>setModal(null)} title={`Add section — ${g.grade}`}>
            <Inp label="Section name" value={f.secname||""} onChange={v=>ff("secname",v)} ph="e.g. Orchid"/>
            <Inp label="Adviser" value={f.secadv||""} onChange={v=>ff("secadv",v)} ph="e.g. Carmen E. Trinidad"/>
            <Btn onClick={()=>addSection(gi)} full>Add section</Btn>
          </Modal>
        </div>
      ))}
    </>);
  };

  /* ── PERSONNEL ── */
  const PersonnelPage = () => {
    const addUser = () => {
      if (!f.pname?.trim()) return;
      const lastName = f.pname.trim().split(/[, ]+/)[0].toLowerCase();
      const u = {id:uid(),name:f.pname.trim(),role:f.prole||"teacher",position:f.ppos||"",username:lastName,password:lastName+"123"};
      setUsers([...users,u]); fr(); setModal(null);
    };
    const teachers = users.filter(u=>u.role==="teacher");
    const nonTeaching = users.filter(u=>u.role==="non-teaching");

    return (<>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <h2 style={{fontSize:20,fontWeight:700}}>Personnel</h2>
        <Btn sm onClick={()=>{fr();ff("prole","teacher");setModal("addPerson");}}>{IC.plus} Add personnel</Btn>
      </div>
      {[{title:"Teaching staff",list:teachers,color:"#1B4D7E"},{title:"Non-teaching staff",list:nonTeaching,color:"#5B2C6F"}].map(sec=>(
        <div key={sec.title} style={{marginBottom:16}}>
          <h3 style={{fontSize:15,fontWeight:600,color:sec.color,marginBottom:8}}>{sec.title} ({sec.list.length})</h3>
          {sec.list.map(u=>(
            <div key={u.id} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:"#fff",borderRadius:10,marginBottom:4,border:"1px solid #f0f0f0"}}>
              <div style={{width:36,height:36,borderRadius:"50%",background:sec.color,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:14,fontWeight:700}}>{u.name[0]}</div>
              <div style={{flex:1}}><div style={{fontSize:14,fontWeight:600}}>{u.name}</div>
                <div style={{fontSize:11,color:"#999"}}>{u.position||u.role} · Login: {u.username} / {u.password}</div></div>
              <button onClick={()=>setUsers(users.filter(x=>x.id!==u.id))} style={{background:"none",border:"none",cursor:"pointer",color:"#c0392b"}}>{IC.trash}</button>
            </div>
          ))}
          {sec.list.length===0&&<div style={{fontSize:13,color:"#ccc",fontStyle:"italic",padding:8}}>No {sec.title.toLowerCase()} added</div>}
        </div>
      ))}
      <Modal open={modal==="addPerson"} onClose={()=>setModal(null)} title="Add personnel">
        <Inp label="Full name" value={f.pname||""} onChange={v=>ff("pname",v)} ph="e.g. Carmen E. Trinidad"/>
        <Inp label="Position / Designation" value={f.ppos||""} onChange={v=>ff("ppos",v)} ph="e.g. Master Teacher II"/>
        <div style={{marginBottom:12}}><label style={{fontSize:13,fontWeight:500,color:"#666",display:"block",marginBottom:3}}>Type</label>
          <div style={{display:"flex",gap:8}}>{["teacher","non-teaching"].map(r=><button key={r} onClick={()=>ff("prole",r)} style={{padding:"7px 16px",borderRadius:8,border:f.prole===r?"2px solid #1B4D7E":"2px solid #e4e7ec",background:f.prole===r?"#1B4D7E":"#fff",color:f.prole===r?"#fff":"#333",fontWeight:600,cursor:"pointer",fontSize:12,textTransform:"capitalize"}}>{r==="non-teaching"?"Non-Teaching":r}</button>)}</div></div>
        <div style={{background:"#f0f4f8",borderRadius:8,padding:10,fontSize:12,color:"#555",marginBottom:12}}>
          Auto-credentials: <strong>Username</strong> = family name (lowercase) · <strong>Password</strong> = familyname + 123</div>
        <Btn onClick={addUser} full>Add personnel</Btn>
      </Modal>
    </>);
  };

  /* ── COORDINATORS ── */
  const CoordinatorsPage = () => {
    const add = () => { if(!f.cname?.trim()) return; setCoordinators([...coordinators,{id:uid(),name:f.cname.trim(),designation:f.cdes||""}]); fr(); setModal(null); };
    return (<>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <h2 style={{fontSize:20,fontWeight:700}}>Coordinators</h2>
        <Btn sm onClick={()=>{fr();setModal("addCoord");}}>{IC.plus} Add</Btn></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:10}}>
        {coordinators.map(c=>(
          <div key={c.id} style={{background:"#fff",borderRadius:12,padding:14,borderLeft:"4px solid #7D6608",display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:40,height:40,borderRadius:"50%",background:"#7D6608",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700}}>{c.name[0]}</div>
            <div style={{flex:1}}><div style={{fontWeight:600,fontSize:14}}>{c.name}</div><div style={{fontSize:11,color:"#999"}}>{c.designation}</div></div>
            <button onClick={()=>setCoordinators(coordinators.filter(x=>x.id!==c.id))} style={{background:"none",border:"none",cursor:"pointer",color:"#c0392b"}}>{IC.trash}</button>
          </div>
        ))}
      </div>
      {coordinators.length===0&&<div style={{textAlign:"center",padding:32,color:"#ccc"}}>No coordinators. Add roles like GAD, DRRM, Reading, ICT, etc.</div>}
      <Modal open={modal==="addCoord"} onClose={()=>setModal(null)} title="Add coordinator">
        <Inp label="Name" value={f.cname||""} onChange={v=>ff("cname",v)} ph="e.g. Carmen E. Trinidad"/>
        <Inp label="Designation" value={f.cdes||""} onChange={v=>ff("cdes",v)} ph="e.g. GAD Coordinator, DRRM, Reading"/>
        <Btn onClick={add} full>Add coordinator</Btn>
      </Modal>
    </>);
  };

  /* ── GENERIC LIST PAGE (Announcements, Memos, Bulletins) ── */
  const ListPage = ({title,items,setItems,fields,icon,colors}) => {
    const add = () => {
      if (!f.title?.trim()) return;
      const item = {id:uid(),date:now(),...Object.fromEntries(fields.map(fld=>[fld.key,f[fld.key]||""]))};
      setItems([item,...items]); fr(); setModal(null);
    };
    return (<>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <h2 style={{fontSize:20,fontWeight:700}}>{title}</h2>
        <Btn sm onClick={()=>{fr();setModal("addList");}}>{IC.plus} New</Btn></div>
      {items.length===0&&<div style={{textAlign:"center",padding:32,color:"#ccc"}}>No {title.toLowerCase()} yet.</div>}
      {items.map(item=>(
        <div key={item.id} style={{background:"#fff",borderRadius:12,padding:14,marginBottom:8,borderLeft:`4px solid ${colors?.[item.priority]||"#2E6B4F"}`}}>
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <div><h3 style={{fontSize:15,fontWeight:600,margin:0}}>{item.title}</h3>
              <div style={{fontSize:11,color:"#999",marginTop:2}}>{item.date} {item.from&&`· From: ${item.from}`} {item.to&&`· To: ${item.to}`}</div></div>
            <button onClick={()=>setItems(items.filter(x=>x.id!==item.id))} style={{background:"none",border:"none",cursor:"pointer",color:"#999"}}>{IC.trash}</button>
          </div>
          {item.body&&<p style={{margin:"6px 0 0",fontSize:13,color:"#555",lineHeight:1.5}}>{item.body}</p>}
        </div>
      ))}
      <Modal open={modal==="addList"} onClose={()=>setModal(null)} title={`New ${title.slice(0,-1)}`}>
        {fields.map(fld=><Inp key={fld.key} label={fld.label} value={f[fld.key]||""} onChange={v=>ff(fld.key,v)} ph={fld.ph} ta={fld.ta}/>)}
        <Btn onClick={add} full>Save</Btn>
      </Modal>
    </>);
  };

  /* ── MOOE TRANSPARENCY ── */
  const MooePage = () => {
    const add = () => {
      if (!f.mmonth) return;
      setMooe({...mooe,[f.mmonth]:{amount:f.mamount||"",details:f.mdetails||"",date:nowS()}});
      fr(); setModal(null);
    };
    return (<>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <h2 style={{fontSize:20,fontWeight:700}}>MOOE Transparency Board</h2>
        <Btn sm onClick={()=>{fr();setModal("addMooe");}}>{IC.plus} Add month</Btn></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:10}}>
        {MONTHS.map(m=>{
          const d = mooe[m];
          return <div key={m} style={{background:d?"#fff":"#f9f9fb",borderRadius:12,padding:14,border:`2px solid ${d?"#2E6B4F":"#e4e7ec"}`,cursor:"pointer"}} onClick={()=>{if(d){ff("mmonth",m);ff("mamount",d.amount);ff("mdetails",d.details);setModal("addMooe");}}}>
            <div style={{fontSize:13,fontWeight:700,color:d?"#2E6B4F":"#ccc"}}>{m}</div>
            {d?<><div style={{fontSize:20,fontWeight:700,color:"#1B4D7E",margin:"4px 0"}}>₱{Number(d.amount||0).toLocaleString()}</div><div style={{fontSize:11,color:"#999"}}>{d.date}</div></>
              :<div style={{fontSize:12,color:"#ccc",marginTop:4}}>Not yet posted</div>}
          </div>;
        })}
      </div>
      <Modal open={modal==="addMooe"} onClose={()=>setModal(null)} title="MOOE Entry">
        <div style={{marginBottom:12}}><label style={{fontSize:13,fontWeight:500,color:"#666",display:"block",marginBottom:3}}>Month</label>
          <select style={inp} value={f.mmonth||""} onChange={e=>ff("mmonth",e.target.value)}><option value="">Select month</option>{MONTHS.map(m=><option key={m} value={m}>{m}</option>)}</select></div>
        <Inp label="Amount (₱)" value={f.mamount||""} onChange={v=>ff("mamount",v)} ph="e.g. 50000" type="number"/>
        <Inp label="Details / Breakdown" value={f.mdetails||""} onChange={v=>ff("mdetails",v)} ph="Description of expenditures..." ta/>
        <Btn onClick={add} full color="#2E6B4F">Save MOOE entry</Btn>
      </Modal>
    </>);
  };

  /* ── REPORT MODULES ── */
  const ReportsPage = () => {
    const [viewMod, setViewMod] = useState(null);
    const cur = reportMods.find(m=>m.id===viewMod);
    const addMod = () => { if(!f.rname?.trim()) return; setReportMods([...reportMods,{id:uid(),name:f.rname.trim(),color:f.rcolor||"#1B4D7E",subs:[],files:[]}]); fr(); setModal(null); };
    const addSub = mid => { if(!f.rsub?.trim()) return; setReportMods(reportMods.map(m=>m.id===mid?{...m,subs:[...m.subs,{id:uid(),name:f.rsub.trim(),files:[]}]}:m)); fr(); setModal(null); };
    const addFile = (mid,sid) => { if(!f.rfname?.trim()) return; const fi={id:uid(),name:f.rfname.trim(),notes:f.rfnotes||"",date:nowS()};
      setReportMods(reportMods.map(m=>{if(m.id!==mid) return m; if(sid) return{...m,subs:m.subs.map(s=>s.id===sid?{...s,files:[...s.files,fi]}:s)}; return{...m,files:[...m.files,fi]};})); fr(); setModal(null); };

    return (<>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <h2 style={{fontSize:20,fontWeight:700}}>Report Modules</h2>
        <Btn sm onClick={()=>{fr();setModal("addRmod");}}>{IC.plus} New module</Btn></div>
      {!cur?(<>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))",gap:10}}>
          {reportMods.map(m=><div key={m.id} onClick={()=>setViewMod(m.id)} style={{background:m.color,borderRadius:14,padding:"18px 14px",cursor:"pointer",textAlign:"center",color:"#fff",transition:"transform .15s"}} onMouseOver={e=>e.currentTarget.style.transform="scale(1.03)"} onMouseOut={e=>e.currentTarget.style.transform="scale(1)"}>
            <div style={{width:40,height:40,borderRadius:10,background:"rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 8px"}}>{IC.folder}</div>
            <div style={{fontSize:13,fontWeight:700}}>{m.name}</div>
            <div style={{fontSize:11,opacity:.7,marginTop:2}}>{m.subs.length} sub-reports</div>
          </div>)}
        </div>
        {reportMods.length===0&&<div style={{textAlign:"center",padding:32,color:"#ccc"}}>Create modules like DRRM, GAD, SBFP, Reading.</div>}
      </>):(<>
        <button onClick={()=>setViewMod(null)} style={{background:"none",border:"none",cursor:"pointer",fontSize:13,color:"#666",display:"flex",alignItems:"center",gap:4,marginBottom:10,fontFamily:"inherit"}}>{IC.back} Back</button>
        <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:14}}>
          <div style={{width:44,height:44,borderRadius:12,background:cur.color,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff"}}>{IC.folder}</div>
          <div style={{flex:1}}><h3 style={{fontSize:18,fontWeight:700,margin:0}}>{cur.name}</h3></div>
          <Btn sm onClick={()=>{fr();setModal("addRsub");}} color={cur.color}>{IC.plus} Sub-report</Btn>
          <Btn sm outline onClick={()=>{fr();setModal("addRfile_root");}} color={cur.color}>{IC.upload} Upload</Btn>
        </div>
        {cur.subs.map(sub=><div key={sub.id} style={{background:"#fff",borderRadius:10,padding:12,marginBottom:8,border:"1px solid #f0f0f0"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
            <div style={{fontWeight:600,fontSize:14}}>{sub.name} <span style={{fontSize:11,color:"#999"}}>({sub.files.length})</span></div>
            <Btn sm outline onClick={()=>{fr();setModal(`addRfile_${sub.id}`);}} color={cur.color}>{IC.upload}</Btn></div>
          {sub.files.map(fi=><div key={fi.id} style={{display:"flex",alignItems:"center",gap:6,padding:"5px 10px",background:"#f9f9fb",borderRadius:6,marginBottom:2}}>
            <span style={{color:cur.color}}>{IC.file}</span><span style={{fontSize:13,flex:1}}>{fi.name}</span><span style={{fontSize:11,color:"#999"}}>{fi.date}</span></div>)}
        </div>)}
      </>)}
      <Modal open={modal==="addRmod"} onClose={()=>setModal(null)} title="Create module">
        <Inp label="Name" value={f.rname||""} onChange={v=>ff("rname",v)} ph="e.g. DRRM"/>
        <div style={{marginBottom:12}}><label style={{fontSize:13,fontWeight:500,color:"#666",display:"block",marginBottom:3}}>Color</label>
          <div style={{display:"flex",gap:5}}>{COLORS.map(c=><button key={c} onClick={()=>ff("rcolor",c)} style={{width:28,height:28,borderRadius:6,background:c,border:f.rcolor===c?"3px solid #333":"3px solid transparent",cursor:"pointer"}}/>)}</div></div>
        <Btn onClick={addMod} full color={f.rcolor||"#1B4D7E"}>Create</Btn></Modal>
      <Modal open={modal==="addRsub"} onClose={()=>setModal(null)} title="Add sub-report">
        <Inp label="Name" value={f.rsub||""} onChange={v=>ff("rsub",v)} ph="e.g. Earthquake Drill Report"/>
        <Btn onClick={()=>cur&&addSub(cur.id)} full>Add</Btn></Modal>
      <Modal open={modal?.startsWith("addRfile")} onClose={()=>setModal(null)} title="Upload file">
        <Inp label="File name" value={f.rfname||""} onChange={v=>ff("rfname",v)} ph="Document name"/>
        <Inp label="Notes" value={f.rfnotes||""} onChange={v=>ff("rfnotes",v)} ph="Notes..."/>
        <Btn onClick={()=>{if(!cur) return; const sid=modal.split("_")[1]; addFile(cur.id,sid==="root"?null:sid);}} full>Save</Btn></Modal>
    </>);
  };

  /* ── PPSSH MOVs ── */
  const PPSSHPage = () => {
    const [sel, setSel] = useState(null);
    const dom = sel!==null ? PPSSH.find(d=>d.id===sel) : null;
    const addMov = (did,strand) => {
      if(!f.mname?.trim()) return;
      const k=`${did}-${strand}`;
      setPpsMov({...ppsMov,[k]:[...(ppsMov[k]||[]),{id:uid(),name:f.mname.trim(),teacher:f.mteacher||"Principal",date:nowS()}]});
      fr(); setModal(null);
    };
    return (<>
      <h2 style={{fontSize:20,fontWeight:700,marginBottom:12}}>PPSSH MOVs — 6 Domains</h2>
      {!dom?<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",gap:10}}>
        {PPSSH.map(d=>{const tot=Object.keys(ppsMov).filter(k=>k.startsWith(`${d.id}-`)).reduce((a,k)=>a+ppsMov[k].length,0);
          return <div key={d.id} onClick={()=>setSel(d.id)} style={{background:"#fff",borderRadius:14,padding:16,cursor:"pointer",borderLeft:`5px solid ${d.color}`,transition:"transform .15s"}} onMouseOver={e=>e.currentTarget.style.transform="translateX(4px)"} onMouseOut={e=>e.currentTarget.style.transform=""}>
            <Badge>Domain {d.id}</Badge>
            <div style={{fontSize:14,fontWeight:600,marginTop:6,textTransform:"capitalize"}}>{d.name}</div>
            <div style={{fontSize:11,color:"#999",marginTop:4}}>{d.strands.length} strands · {tot} MOVs</div></div>;})}
      </div>:(<>
        <button onClick={()=>setSel(null)} style={{background:"none",border:"none",cursor:"pointer",fontSize:13,color:"#666",display:"flex",alignItems:"center",gap:4,marginBottom:10,fontFamily:"inherit"}}>{IC.back} Back</button>
        <h3 style={{fontSize:17,fontWeight:700,marginBottom:10,textTransform:"capitalize"}}>Domain {dom.id}: {dom.name}</h3>
        {dom.strands.map(strand=>{const k=`${dom.id}-${strand}`; const sm=ppsMov[k]||[];
          return <div key={strand} style={{background:"#fff",borderRadius:10,padding:"10px 14px",marginBottom:6}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:14,fontWeight:600}}>{strand}</span>
              <div style={{display:"flex",gap:6,alignItems:"center"}}><span style={{fontSize:11,color:"#999"}}>{sm.length}</span>
                <button onClick={()=>{fr();setModal(`pps_${dom.id}_${strand}`);}} style={{width:26,height:26,borderRadius:6,background:dom.color,color:"#fff",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>{IC.plus}</button></div></div>
            {sm.map(m=><div key={m.id} style={{display:"flex",gap:6,padding:"5px 10px",marginTop:4,background:"#f9f9fb",borderRadius:6}}>
              <span style={{color:dom.color}}>{IC.file}</span><span style={{fontSize:13,flex:1}}>{m.name}</span><span style={{fontSize:11,color:"#999"}}>{m.teacher} · {m.date}</span></div>)}
            <Modal open={modal===`pps_${dom.id}_${strand}`} onClose={()=>setModal(null)} title={`Add MOV — ${strand}`}>
              <Inp label="MOV name" value={f.mname||""} onChange={v=>ff("mname",v)} ph="Document name"/>
              <Inp label="By" value={f.mteacher||""} onChange={v=>ff("mteacher",v)} ph="Teacher name"/>
              <Btn onClick={()=>addMov(dom.id,strand)} full color={dom.color}>Add MOV</Btn></Modal>
          </div>;})}
      </>)}
    </>);
  };

  /* ── TEACHER MOV UPLOADS ── */
  const TmovPage = () => {
    const addCat = () => { if(!f.tcn?.trim()) return; setTmovCats([...tmovCats,{id:uid(),name:f.tcn.trim(),color:f.tcc||"#1B4D7E",docs:[]}]); fr(); setModal(null); };
    const addDoc = cid => { if(!f.tdn?.trim()) return; setTmovCats(tmovCats.map(c=>c.id===cid?{...c,docs:[...c.docs,{id:uid(),name:f.tdn.trim(),teacher:f.tdt||"",date:nowS()}]}:c)); fr(); setModal(null); };
    return (<>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <h2 style={{fontSize:20,fontWeight:700}}>Teacher MOV Uploads</h2>
        <Btn sm onClick={()=>{fr();setModal("addTcat");}}>{IC.plus} New category</Btn></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:10}}>
        {tmovCats.map(cat=><div key={cat.id} style={{background:"#fff",borderRadius:14,padding:14,borderTop:`4px solid ${cat.color}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <div style={{fontWeight:700,fontSize:15}}>{cat.name} <span style={{fontSize:11,color:"#999"}}>({cat.docs.length})</span></div>
            <div style={{display:"flex",gap:4}}>
              <button onClick={()=>{fr();setModal(`tup_${cat.id}`);}} style={{width:26,height:26,borderRadius:6,background:cat.color,color:"#fff",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>{IC.plus}</button>
              <button onClick={()=>setTmovCats(tmovCats.filter(c=>c.id!==cat.id))} style={{background:"none",border:"none",cursor:"pointer",color:"#c0392b"}}>{IC.trash}</button></div></div>
          {cat.docs.map(d=><div key={d.id} style={{display:"flex",gap:6,padding:"5px 10px",background:"#f9f9fb",borderRadius:6,marginBottom:2}}>
            <span style={{color:cat.color}}>{IC.file}</span><span style={{fontSize:13,flex:1}}>{d.name}</span><span style={{fontSize:11,color:"#999"}}>{d.date}</span></div>)}
          <Modal open={modal===`tup_${cat.id}`} onClose={()=>setModal(null)} title="Upload MOV">
            <Inp label="Document" value={f.tdn||""} onChange={v=>ff("tdn",v)} ph="Document name"/>
            <Inp label="Teacher" value={f.tdt||""} onChange={v=>ff("tdt",v)} ph="Teacher name"/>
            <Btn onClick={()=>addDoc(cat.id)} full>Upload</Btn></Modal>
        </div>)}
      </div>
      {tmovCats.length===0&&<div style={{textAlign:"center",padding:32,color:"#ccc"}}>Create categories like IPCRF, COT Sheets, Action Research.</div>}
      <Modal open={modal==="addTcat"} onClose={()=>setModal(null)} title="Create category">
        <Inp label="Name" value={f.tcn||""} onChange={v=>ff("tcn",v)} ph="e.g. IPCRF"/>
        <div style={{marginBottom:12,display:"flex",gap:5}}>{COLORS.map(c=><button key={c} onClick={()=>ff("tcc",c)} style={{width:26,height:26,borderRadius:6,background:c,border:f.tcc===c?"3px solid #333":"3px solid transparent",cursor:"pointer"}}/>)}</div>
        <Btn onClick={addCat} full color={f.tcc||"#1B4D7E"}>Create</Btn></Modal>
    </>);
  };

  /* ── FORM TEMPLATES ── */
  const FormsPage = () => {
    const addForm = () => { if(!f.fname?.trim()) return; setFormTemplates([...formTemplates,{id:uid(),name:f.fname.trim(),type:f.ftype||"SF5",grade:f.fgrade||"",date:nowS(),records:[]}]); fr(); setModal(null); };
    const addRecord = (fid) => { if(!f.frname?.trim()) return;
      setFormTemplates(formTemplates.map(t=>t.id===fid?{...t,records:[...t.records,{id:uid(),name:f.frname.trim(),lrn:f.frlrn||"",avg:f.fravg||"",action:f.fraction||"",sex:f.frsex||"M"}]}:t)); fr(); setModal(null); };
    return (<>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <h2 style={{fontSize:20,fontWeight:700}}>Form Templates</h2>
        <Btn sm onClick={()=>{fr();setModal("addForm");}}>{IC.plus} New form</Btn></div>
      <p style={{fontSize:13,color:"#888",margin:"0 0 14px"}}>Create form templates (SF5, Nutritional Status, etc.), add records, and generate downloadable reports auto-filled with school data.</p>
      {formTemplates.map(t=>(
        <div key={t.id} style={{background:"#fff",borderRadius:12,padding:14,marginBottom:10,border:"1px solid #f0f0f0"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div><Badge>{t.type}</Badge> <span style={{fontWeight:700,fontSize:15,marginLeft:6}}>{t.name}</span>
              <div style={{fontSize:11,color:"#999",marginTop:2}}>{t.grade} · {t.records.length} records · {t.date}</div></div>
            <div style={{display:"flex",gap:6}}>
              <Btn sm onClick={()=>{fr();setModal(`frec_${t.id}`);}} color="#2E6B4F">{IC.plus} Record</Btn>
              <Btn sm outline onClick={()=>{
                const csv = ["LRN,Name,Sex,Average,Action",...t.records.map(r=>`${r.lrn},"${r.name}",${r.sex},${r.avg},${r.action}`)].join("\n");
                const blob = new Blob([csv],{type:"text/csv"});
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a"); a.href=url; a.download=`${t.name.replace(/\s+/g,"_")}.csv`; a.click();
              }}>{IC.download} CSV</Btn>
              <button onClick={()=>setFormTemplates(formTemplates.filter(x=>x.id!==t.id))} style={{background:"none",border:"none",cursor:"pointer",color:"#c0392b"}}>{IC.trash}</button>
            </div>
          </div>
          {t.records.length>0&&<div style={{marginTop:10,maxHeight:200,overflow:"auto"}}>
            <table style={{width:"100%",fontSize:12,borderCollapse:"collapse"}}>
              <thead><tr style={{background:"#f0f4f8"}}>{["#","LRN","Name","Sex","Avg","Action"].map(h=><th key={h} style={{padding:"6px 8px",textAlign:"left",fontWeight:600,borderBottom:"1px solid #e4e7ec"}}>{h}</th>)}</tr></thead>
              <tbody>{t.records.map((r,i)=><tr key={r.id} style={{borderBottom:"1px solid #f5f5f5"}}><td style={{padding:"5px 8px",color:"#999"}}>{i+1}</td><td style={{padding:"5px 8px"}}>{r.lrn}</td><td style={{padding:"5px 8px",fontWeight:500}}>{r.name}</td><td style={{padding:"5px 8px"}}>{r.sex}</td><td style={{padding:"5px 8px"}}>{r.avg}</td><td style={{padding:"5px 8px"}}>{r.action}</td></tr>)}</tbody>
            </table></div>}
          <Modal open={modal===`frec_${t.id}`} onClose={()=>setModal(null)} title={`Add record — ${t.name}`}>
            <Inp label="Name" value={f.frname||""} onChange={v=>ff("frname",v)} ph="LAST, FIRST, MIDDLE"/>
            <Inp label="LRN" value={f.frlrn||""} onChange={v=>ff("frlrn",v)} ph="12-digit LRN"/>
            <div style={{display:"flex",gap:8,marginBottom:12}}>{["M","F"].map(s=><button key={s} onClick={()=>ff("frsex",s)} style={{padding:"6px 16px",borderRadius:8,border:f.frsex===s?"2px solid #1B4D7E":"2px solid #e4e7ec",background:f.frsex===s?"#1B4D7E":"#fff",color:f.frsex===s?"#fff":"#333",fontWeight:600,cursor:"pointer",fontSize:12}}>{s==="M"?"Male":"Female"}</button>)}</div>
            <Inp label="General average" value={f.fravg||""} onChange={v=>ff("fravg",v)} ph="e.g. 85"/>
            <Inp label="Action taken" value={f.fraction||""} onChange={v=>ff("fraction",v)} ph="e.g. PROMOTED"/>
            <Btn onClick={()=>addRecord(t.id)} full>Add record</Btn></Modal>
        </div>
      ))}
      <Modal open={modal==="addForm"} onClose={()=>setModal(null)} title="Create form template">
        <Inp label="Form name" value={f.fname||""} onChange={v=>ff("fname",v)} ph="e.g. SF5 Grade 1 RED"/>
        <div style={{marginBottom:12}}><label style={{fontSize:13,fontWeight:500,color:"#666",display:"block",marginBottom:3}}>Form type</label>
          <select style={inp} value={f.ftype||""} onChange={e=>ff("ftype",e.target.value)}>{["SF5","SF10","Nutritional Status","Phil-IRI","Enrollment","Custom"].map(t=><option key={t}>{t}</option>)}</select></div>
        <div style={{marginBottom:12}}><label style={{fontSize:13,fontWeight:500,color:"#666",display:"block",marginBottom:3}}>Grade level</label>
          <select style={inp} value={f.fgrade||""} onChange={e=>ff("fgrade",e.target.value)}><option value="">Select</option>{DEFAULT_GRADES.map(g=><option key={g}>{g}</option>)}</select></div>
        <div style={{background:"#f0f4f8",borderRadius:8,padding:10,fontSize:12,color:"#555",marginBottom:12}}>
          School data auto-filled: Tunga ES · ID 119502 · Moalboal, Cebu · Region VII · SY {sy}</div>
        <Btn onClick={addForm} full>Create form</Btn></Modal>
    </>);
  };

  /* ═══ RENDER PAGE ═══ */
  const pages = {
    home: <HomePage/>,
    students: <StudentsPage/>,
    grades: <GradesPage/>,
    personnel: <PersonnelPage/>,
    coordinators: <CoordinatorsPage/>,
    announcements: <ListPage title="Announcements" items={announcements} setItems={setAnnouncements} fields={[{key:"title",label:"Title",ph:"Title"},{key:"body",label:"Details",ph:"Details...",ta:true}]} colors={{urgent:"#c0392b",important:"#e67e22",normal:"#2E6B4F"}}/>,
    memos: <ListPage title="Memos" items={memos} setItems={setMemos} fields={[{key:"title",label:"Subject",ph:"Subject"},{key:"from",label:"From",ph:"William A. Buquia"},{key:"to",label:"To",ph:"All Teachers"},{key:"body",label:"Body",ph:"Content...",ta:true}]}/>,
    bulletins: <ListPage title="Bulletins" items={bulletins} setItems={setBulletins} fields={[{key:"title",label:"Title",ph:"Bulletin title"},{key:"body",label:"Content",ph:"Bulletin content...",ta:true}]}/>,
    mooe: <MooePage/>,
    reports: <ReportsPage/>,
    ppssh: <PPSSHPage/>,
    tmov: <TmovPage/>,
    forms: <FormsPage/>,
  };

  return (
    <div style={{display:"flex",minHeight:"100vh",fontFamily:"'Segoe UI',system-ui,sans-serif",background:"#f4f6f8"}}>
      {sideOpen&&<div onClick={()=>setSideOpen(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.4)",zIndex:998}}/>}
      <aside style={{width:240,background:"#0E2240",color:"#fff",position:"fixed",top:0,bottom:0,left:0,zIndex:999,overflowY:"auto",transition:"transform .25s",transform:sideOpen?"translateX(0)":"translateX(-240px)","@media(min-width:769px)":{transform:"none"}}}>
        <div style={{padding:"14px 12px",borderBottom:"1px solid rgba(255,255,255,.08)",display:"flex",alignItems:"center",gap:10}}>
          <img src={LOGO} alt="" style={{width:42,height:42,borderRadius:"50%",border:"2px solid rgba(255,255,255,.2)",objectFit:"cover"}}/>
          <div><div style={{fontSize:13,fontWeight:700}}>Tunga ES</div><div style={{fontSize:10,opacity:.5}}>Moalboal, Cebu</div></div>
        </div>
        {/* SY Selector */}
        <div style={{padding:"8px 10px"}}><select value={sy} onChange={e=>setSy(e.target.value)} style={{width:"100%",padding:"7px 8px",borderRadius:6,border:"1px solid rgba(255,255,255,.15)",background:"rgba(255,255,255,.08)",color:"#fff",fontSize:12,fontFamily:"inherit"}}>
          {SYS.map(s=><option key={s} value={s} style={{color:"#333"}}>SY {s}</option>)}</select></div>
        <nav style={{padding:"4px 8px"}}>{nav.map(n=>(
          <button key={n.id} onClick={()=>{setPage(n.id);setSideOpen(false);}} style={{display:"flex",alignItems:"center",gap:8,width:"100%",padding:"9px 10px",background:page===n.id?"rgba(255,255,255,.12)":"transparent",border:"none",borderRadius:7,color:page===n.id?"#fff":"rgba(255,255,255,.5)",cursor:"pointer",fontSize:12,fontWeight:page===n.id?600:400,textAlign:"left",marginBottom:1,fontFamily:"inherit"}}>
            <span style={{width:18,display:"flex",alignItems:"center"}}>{IC[n.icon]}</span>{n.label}
          </button>
        ))}</nav>
        <div style={{padding:12,borderTop:"1px solid rgba(255,255,255,.08)",position:"absolute",bottom:0,left:0,right:0}}>
          <button onClick={()=>setAuth(null)} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",color:"rgba(255,255,255,.4)",cursor:"pointer",fontSize:12,fontFamily:"inherit"}}>{IC.log} Sign out</button>
          <div style={{fontSize:10,opacity:.3,marginTop:6}}>Logged in as {auth.name}</div>
        </div>
      </aside>
      <main style={{flex:1,marginLeft:0,minWidth:0}}>
        <header style={{background:"#fff",padding:"10px 16px",display:"flex",alignItems:"center",gap:10,borderBottom:"1px solid #e4e7ec",position:"sticky",top:0,zIndex:100}}>
          <button onClick={()=>setSideOpen(!sideOpen)} style={{background:"none",border:"none",cursor:"pointer",color:"#333",padding:2}}>{IC.menu}</button>
          <h2 style={{margin:0,fontSize:16,fontWeight:600,flex:1}}>{nav.find(n=>n.id===page)?.label}</h2>
          <Badge color="#1B4D7E">SY {sy}</Badge>
          <img src={LOGO} alt="" style={{width:26,height:26,borderRadius:"50%",objectFit:"cover"}}/>
        </header>
        <div style={{padding:16,maxWidth:960,margin:"0 auto"}}>{pages[page]}</div>
      </main>
      <style>{`@media(min-width:769px){aside{transform:translateX(0)!important}main{margin-left:240px!important}}`}</style>
    </div>
  );
}
