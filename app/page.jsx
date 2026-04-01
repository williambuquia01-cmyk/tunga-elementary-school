'use client';
import { useState, useEffect, useCallback, useRef } from "react";

/* ═══ FIXED STORAGE HOOK (no stale closures) ═══ */
function useStore(key, init) {
  const [val, setVal] = useState(init);
  const ref = useRef(val);
  ref.current = val;
  useEffect(() => {
    try { const d = localStorage.getItem(key); if (d) { const p = JSON.parse(d); setVal(p); ref.current = p; } } catch {}
  }, [key]);
  const save = useCallback((v) => {
    const nv = typeof v === "function" ? v(ref.current) : v;
    ref.current = nv;
    setVal(nv);
    try { localStorage.setItem(key, JSON.stringify(nv)); } catch {}
  }, [key]);
  return [val, save];
}

/* ═══ CONSTANTS ═══ */
const SYS = Array.from({length:16},(_,i)=>`${2025+i}-${2026+i}`);
const LOGO = "/logo.jpg"; // school logo
const _LOGO_B64 = "data:image/jpeg;base64,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";
const PPSSH=[{id:1,name:"Leading strategically",color:"#1B4D7E",strands:["1.1 Vision & Mission","1.2 Data-Driven Planning","1.3 SIP","1.4 Research-Based","1.5 Curriculum Leadership","1.6 External Relations","1.7 Policy Implementation"]},{id:2,name:"Managing operations & resources",color:"#2E6B4F",strands:["2.1 MOOE","2.2 HRD","2.3 Facilities","2.4 Compliance","2.5 Transparency","2.6 Technology"]},{id:3,name:"Teaching & learning",color:"#7B3F00",strands:["3.1 Instructional Supervision","3.2 Assessment","3.3 Contextualization","3.4 Learning Environment","3.5 Learner Support","3.6 ICT","3.7 Phil-IRI","3.8 Action Research"]},{id:4,name:"Developing self & others",color:"#5B2C6F",strands:["4.1 Professional Dev","4.2 Performance Mgmt","4.3 Coaching","4.4 Learning Communities","4.5 Personal Growth","4.6 RPMS","4.7 Recognition","4.8 PRAISE"]},{id:5,name:"Building connections",color:"#943126",strands:["5.1 Stakeholder Engagement","5.2 Partnership","5.3 Community","5.4 Alumni","5.5 Networking"]},{id:6,name:"Learner-centered culture",color:"#1A5276",strands:["6.1 Child Protection","6.2 Gender-Responsive","6.3 Inclusive Ed","6.4 Values","6.5 DRRM","6.6 Health & Nutrition"]}];
const COLORS=["#1B4D7E","#2E6B4F","#7B3F00","#5B2C6F","#943126","#1A5276","#7D6608","#1E8449"];
const MONTHS=["July","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May","Jun"];
const DEF_GRADES=["Kinder","Grade 1","Grade 2","Grade 3","Grade 4","Grade 5","Grade 6"];

/* ═══ ICONS ═══ */
const sv=(d,w=20)=><svg width={w} height={w} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{d}</svg>;
const IC={
  home:sv(<><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>),
  users:sv(<><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/></>),
  chat:sv(<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>),
  file:sv(<><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></>),
  folder:sv(<path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>),
  shield:sv(<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>),
  upload:sv(<><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></>),
  plus:sv(<><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,16),
  trash:sv(<><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></>,16),
  x:sv(<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>),
  menu:sv(<><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>,24),
  back:sv(<polyline points="15 18 9 12 15 6"/>,16),
  grid:sv(<><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></>),
  dollar:sv(<><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></>),
  clip:sv(<path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>),
  star:sv(<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>),
  log:sv(<><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>),
  student:sv(<><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5"/></>),
  board:sv(<><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></>),
  download:sv(<><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>),
  key:sv(<><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></>),
};

/* ═══ HELPERS ═══ */
const now=()=>new Date().toLocaleDateString("en-PH",{year:"numeric",month:"long",day:"numeric"});
const nowS=()=>new Date().toLocaleDateString("en-PH",{year:"numeric",month:"short",day:"numeric"});
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);

/* ═══ UI COMPONENTS ═══ */
function Modal({open,onClose,title,children}){if(!open)return null;return(<div style={{position:"fixed",inset:0,zIndex:1e3,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,.5)",padding:16}} onClick={onClose}><div style={{background:"#fff",borderRadius:14,width:"100%",maxWidth:540,maxHeight:"88vh",overflow:"auto",padding:24,boxShadow:"0 20px 60px rgba(0,0,0,.25)"}} onClick={e=>e.stopPropagation()}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><h3 style={{margin:0,fontSize:18,fontWeight:700}}>{title}</h3><button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",color:"#999"}}>{IC.x}</button></div>{children}</div></div>);}

const sI={width:"100%",padding:"9px 12px",border:"1.5px solid #e4e7ec",borderRadius:8,fontSize:14,fontFamily:"inherit",outline:"none"};
const Inp=({label,value,onChange,ph,ta,type})=>(<div style={{marginBottom:12}}>{label&&<label style={{display:"block",fontSize:13,fontWeight:500,color:"#666",marginBottom:3}}>{label}</label>}{ta?<textarea style={{...sI,minHeight:70,resize:"vertical"}} value={value} onChange={e=>onChange(e.target.value)} placeholder={ph}/>:<input style={sI} type={type||"text"} value={value} onChange={e=>onChange(e.target.value)} placeholder={ph}/>}</div>);

const Btn=({children,onClick,color,sm,outline,full,disabled})=>(<button disabled={disabled} onClick={onClick} style={{display:"inline-flex",alignItems:"center",gap:5,padding:sm?"6px 12px":"9px 16px",background:outline?"transparent":(color||"#1B4D7E"),color:outline?(color||"#1B4D7E"):"#fff",border:outline?`2px solid ${color||"#1B4D7E"}`:"none",borderRadius:8,fontSize:sm?12:13,fontWeight:600,cursor:disabled?"not-allowed":"pointer",opacity:disabled?.5:1,width:full?"100%":undefined,justifyContent:"center",fontFamily:"inherit"}}>{children}</button>);

const Badge=({children,color})=><span style={{display:"inline-block",padding:"2px 9px",borderRadius:16,fontSize:11,fontWeight:600,background:color||"#e8f0fe",color:color?"#fff":"#1B4D7E"}}>{children}</span>;

const Sel=({label,value,onChange,options})=>(<div style={{marginBottom:12}}>{label&&<label style={{display:"block",fontSize:13,fontWeight:500,color:"#666",marginBottom:3}}>{label}</label>}<select style={sI} value={value} onChange={e=>onChange(e.target.value)}>{options.map(o=>typeof o==="string"?<option key={o} value={o}>{o}</option>:<option key={o.value} value={o.value}>{o.label}</option>)}</select></div>);

/* ═══ LOGIN ═══ */
function LoginPage({onLogin,users}){
  const[u,setU]=useState("");const[p,setP]=useState("");const[err,setErr]=useState("");
  const go=()=>{
    if(u==="admin"&&p==="admin123"){onLogin({role:"admin",name:"William A. Buquia",id:"admin"});return;}
    const found=users.find(x=>x.username===u.toLowerCase()&&x.password===p);
    if(found){onLogin({...found});return;}
    setErr("Invalid credentials");
  };
  return(<div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg,#0E2240,#1B4D7E 50%,#2E6B4F)",padding:16}}><div style={{background:"#fff",borderRadius:20,padding:32,width:"100%",maxWidth:380,boxShadow:"0 20px 60px rgba(0,0,0,.3)"}}><div style={{textAlign:"center",marginBottom:20}}><img src={LOGO} alt="" style={{width:80,height:80,borderRadius:"50%",border:"3px solid #1B4D7E",objectFit:"cover"}}/><h1 style={{fontSize:20,fontWeight:700,margin:"10px 0 2px",color:"#0E2240"}}>Tunga Elementary School</h1><div style={{fontSize:12,color:"#999"}}>School Management System</div></div>{err&&<div style={{background:"#fde8e8",color:"#c0392b",padding:"8px 12px",borderRadius:8,fontSize:13,marginBottom:12}}>{err}</div>}<Inp label="Username" value={u} onChange={v=>{setU(v);setErr("");}} ph="Enter username"/><Inp label="Password" value={p} onChange={v=>{setP(v);setErr("");}} ph="Enter password" type="password"/><Btn onClick={go} full>Sign in</Btn><div style={{fontSize:11,color:"#bbb",textAlign:"center",marginTop:12}}>Admin: admin / admin123</div></div></div>);
}

/* ═══════════════ MAIN APP ═══════════════ */
export default function App(){
  const[auth,setAuth]=useState(null);
  const[page,setPage]=useState("home");
  const[sy,setSy]=useStore("current_sy","2025-2026");
  const[sideOpen,setSideOpen]=useState(false);
  const[modal,setModal]=useState(null);
  const[f,setF]=useState({});
  const ff=(k,v)=>setF(p=>({...p,[k]:v}));
  const fr=()=>setF({});

  // ── GLOBAL STORES (SY-scoped) ──
  const[users,setUsers]=useStore("users",[]);
  const[grades,setGrades]=useStore(`grades_${sy}`,DEF_GRADES.map(g=>({grade:g,sections:[{id:uid(),name:"Section A",adviser:"",students:[]}]})));
  const[announcements,setAnnouncements]=useStore(`ann_${sy}`,[]);
  const[memos,setMemos]=useStore(`memos_${sy}`,[]);
  const[bulletins,setBulletins]=useStore(`bull_${sy}`,[]);
  const[coordinators,setCoordinators]=useStore(`coords_${sy}`,[]);
  const[mooe,setMooe]=useStore(`mooe_${sy}`,{});
  const[reportMods,setReportMods]=useStore(`rmod_${sy}`,[]);
  const[ppsMov,setPpsMov]=useStore(`ppssh_${sy}`,{});
  const[tmovCats,setTmovCats]=useStore(`tmov_${sy}`,[]);
  const[formTemplates,setFormTemplates]=useStore(`forms_${sy}`,[]);

  if(!auth) return <LoginPage onLogin={setAuth} users={users}/>;

  // ── COMPUTED (always fresh from current grades) ──
  const totalStudents=grades.reduce((a,g)=>a+g.sections.reduce((b,s)=>b+(s.students?.length||0),0),0);
  const totalM=grades.reduce((a,g)=>a+g.sections.reduce((b,s)=>b+(s.students?.filter(x=>x.sex==="M").length||0),0),0);
  const totalF=totalStudents-totalM;
  const totalSections=grades.reduce((a,g)=>a+g.sections.length,0);
  const isAdmin=auth.role==="admin";

  // ── ACCESS CONTROL: filter what teacher sees ──
  const canAccess=(navId)=>{
    if(isAdmin) return true;
    const always=["home","announcements","memos","bulletins"];
    if(always.includes(navId)) return true;
    if(navId==="students"||navId==="grades") return (auth.assignedSections||[]).length>0;
    if(navId==="reports"||navId==="tmov"||navId==="forms") return (auth.coordinatorOf||[]).length>0;
    if(navId==="ppssh") return (auth.coordinatorOf||[]).length>0;
    return false;
  };

  const nav=[
    {id:"home",label:"Dashboard",icon:"home"},
    {id:"students",label:"Students",icon:"student"},
    {id:"grades",label:"Sections & Advisers",icon:"grid"},
    {id:"personnel",label:"Personnel & Accounts",icon:"key"},
    {id:"coordinators",label:"Coordinators",icon:"star"},
    {id:"announcements",label:"Announcements",icon:"chat"},
    {id:"memos",label:"Memos",icon:"file"},
    {id:"bulletins",label:"Bulletins",icon:"board"},
    {id:"mooe",label:"MOOE Transparency",icon:"dollar"},
    {id:"reports",label:"Report Modules",icon:"folder"},
    {id:"ppssh",label:"PPSSH MOVs",icon:"shield"},
    {id:"tmov",label:"Teacher MOV Uploads",icon:"upload"},
    {id:"forms",label:"Form Templates",icon:"clip"},
  ].filter(n=>isAdmin||canAccess(n.id));

  /* ═══ HOME ═══ */
  const HomePage=()=>(<>
    <div style={{background:"linear-gradient(135deg,#0E2240,#1B4D7E 50%,#2E6B4F)",borderRadius:16,padding:24,color:"#fff",marginBottom:16}}>
      <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:8}}>
        <img src={LOGO} alt="" style={{width:64,height:64,borderRadius:"50%",border:"2px solid rgba(255,255,255,.25)",objectFit:"cover"}}/>
        <div><div style={{fontSize:10,letterSpacing:2,opacity:.6,textTransform:"uppercase"}}>DepEd · Schools Division of Cebu Province · Region VII</div>
          <h1 style={{fontSize:22,margin:"2px 0",fontWeight:700}}>Tunga Elementary School</h1>
          <div style={{fontSize:12,opacity:.75}}>Brgy. Tunga, Moalboal, Cebu · ID: 119502 · SY {sy}</div></div></div></div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:10,marginBottom:16}}>
      {[{l:"Students",v:totalStudents,s:`${totalM}M / ${totalF}F`,c:"#1B4D7E"},{l:"Teachers",v:users.filter(u=>u.role==="teacher").length,c:"#2E6B4F"},{l:"Non-Teaching",v:users.filter(u=>u.role==="non-teaching").length,c:"#5B2C6F"},{l:"Sections",v:totalSections,c:"#943126"}].map(s=><div key={s.l} style={{background:"#fff",borderRadius:12,padding:14,borderLeft:`4px solid ${s.c}`}}>
        <div style={{fontSize:11,color:"#999"}}>{s.l}</div><div style={{fontSize:26,fontWeight:700,color:s.c}}>{s.v}</div>
        {s.s&&<div style={{fontSize:11,color:"#888"}}>{s.s}</div>}</div>)}</div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
      <div style={{background:"#fff",borderRadius:12,padding:14}}><div style={{fontSize:14,fontWeight:600,marginBottom:4}}>Logged in as</div><div style={{fontSize:15,fontWeight:700,color:"#1B4D7E"}}>{auth.name}</div><div style={{fontSize:12,color:"#999"}}>{auth.role==="admin"?"Administrator":auth.role} {auth.coordinatorOf?.length>0&&`· Coordinator: ${auth.coordinatorOf.join(", ")}`}</div></div>
      <div style={{background:"#fff",borderRadius:12,padding:14}}><div style={{fontSize:14,fontWeight:600,marginBottom:4}}>Quick actions</div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{isAdmin&&<Btn sm onClick={()=>setPage("students")}>{IC.student} Students</Btn>}{isAdmin&&<Btn sm onClick={()=>setPage("personnel")} color="#2E6B4F">{IC.key} Personnel</Btn>}</div></div></div>
  </>);

  /* ═══ STUDENTS (fixed: uses save function correctly) ═══ */
  const StudentsPage=()=>{
    const[sg,setSg]=useState(null);const[ss,setSs]=useState(null);
    const addSt=()=>{if(!f.sn?.trim())return;
      const st={id:uid(),name:f.sn.trim(),lrn:f.sl||"",sex:f.sx||"M",dob:f.sd||""};
      setGrades(prev=>prev.map((g,i)=>i===sg?{...g,sections:g.sections.map((s,j)=>j===ss?{...s,students:[...(s.students||[]),st]}:s)}:g));
      fr();setModal(null);};
    const delSt=(gi,si,sid)=>setGrades(prev=>prev.map((g,i)=>i===gi?{...g,sections:g.sections.map((s,j)=>j===si?{...s,students:(s.students||[]).filter(x=>x.id!==sid)}:s)}:g));
    const sec=sg!==null&&ss!==null?grades[sg]?.sections[ss]:null;
    const sts=sec?.students||[];

    // For non-admin, filter to assigned sections only
    const visibleGrades=isAdmin?grades:grades.map(g=>({...g,sections:g.sections.filter(s=>(auth.assignedSections||[]).includes(s.id))})).filter(g=>g.sections.length>0);

    return(<>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}><h2 style={{fontSize:20,fontWeight:700}}>Students <Badge>{totalStudents}</Badge></h2></div>
      {!sec?visibleGrades.map((g,gi)=>{const realGi=grades.findIndex(x=>x.grade===g.grade);return<div key={gi} style={{background:"#fff",borderRadius:12,padding:14,marginBottom:10}}>
        <h3 style={{fontSize:15,fontWeight:600,color:"#1B4D7E",marginBottom:8}}>{g.grade}</h3>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{g.sections.map((s,si)=>{const realSi=grades[realGi].sections.findIndex(x=>x.id===s.id);const m=(s.students||[]).filter(x=>x.sex==="M").length;
          return<button key={si} onClick={()=>{setSg(realGi);setSs(realSi);}} style={{background:"#f0f4f8",border:"1px solid #e4e7ec",borderRadius:10,padding:"10px 16px",cursor:"pointer",textAlign:"left",minWidth:150,fontFamily:"inherit"}}>
            <div style={{fontWeight:600,fontSize:14}}>{s.name}</div><div style={{fontSize:11,color:"#888"}}>Adviser: {s.adviser||"—"}</div>
            <div style={{fontSize:12,color:"#1B4D7E",fontWeight:600,marginTop:4}}>{(s.students||[]).length} ({m}M / {(s.students||[]).length-m}F)</div></button>})}</div></div>})
      :(<><button onClick={()=>{setSg(null);setSs(null);}} style={{background:"none",border:"none",cursor:"pointer",fontSize:13,color:"#666",display:"flex",alignItems:"center",gap:4,marginBottom:10,fontFamily:"inherit"}}>{IC.back} Back</button>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div><h3 style={{fontSize:18,fontWeight:700}}>{grades[sg].grade} — {sec.name}</h3>
            <div style={{fontSize:12,color:"#888"}}>Adviser: {sec.adviser||"—"} · {sts.length} ({sts.filter(x=>x.sex==="M").length}M/{sts.filter(x=>x.sex==="F").length}F)</div></div>
          <Btn sm onClick={()=>{fr();ff("sx","M");setModal("addSt");}}>{IC.plus} Add student</Btn></div>
        {["M","F"].map(sex=>{const list=sts.filter(x=>x.sex===sex);return<div key={sex} style={{marginBottom:14}}>
          <div style={{fontSize:13,fontWeight:600,color:sex==="M"?"#1B4D7E":"#943126",marginBottom:6,padding:"4px 10px",background:sex==="M"?"#e8f0fe":"#fde8e8",borderRadius:6,display:"inline-block"}}>{sex==="M"?"MALE":"FEMALE"} ({list.length})</div>
          {list.map((s,i)=><div key={s.id} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 12px",background:"#fff",borderRadius:8,marginBottom:3,border:"1px solid #f0f0f0"}}>
            <span style={{fontSize:12,color:"#999",width:24}}>{i+1}.</span><div style={{flex:1}}><div style={{fontSize:13,fontWeight:500}}>{s.name}</div><div style={{fontSize:11,color:"#999"}}>LRN: {s.lrn||"—"}</div></div>
            <button onClick={()=>delSt(sg,ss,s.id)} style={{background:"none",border:"none",cursor:"pointer",color:"#c0392b"}}>{IC.trash}</button></div>)}</div>})}
        <Modal open={modal==="addSt"} onClose={()=>setModal(null)} title="Add student">
          <Inp label="Full name (Last, First, Middle)" value={f.sn||""} onChange={v=>ff("sn",v)} ph="ALEGADO, ARC FRITZ, MACASAOL"/>
          <Inp label="LRN" value={f.sl||""} onChange={v=>ff("sl",v)} ph="12-digit LRN"/>
          <div style={{marginBottom:12}}><label style={{fontSize:13,fontWeight:500,color:"#666",display:"block",marginBottom:3}}>Sex</label>
            <div style={{display:"flex",gap:8}}>{["M","F"].map(s=><button key={s} onClick={()=>ff("sx",s)} style={{padding:"7px 20px",borderRadius:8,border:f.sx===s?"2px solid #1B4D7E":"2px solid #e4e7ec",background:f.sx===s?"#1B4D7E":"#fff",color:f.sx===s?"#fff":"#333",fontWeight:600,cursor:"pointer",fontSize:13}}>{s==="M"?"Male":"Female"}</button>)}</div></div>
          <Btn onClick={addSt} full>Add student</Btn></Modal></>)}</>);
  };

  /* ═══ SECTIONS (fixed) ═══ */
  const GradesPage=()=>{
    const addSec=gi=>{if(!f.sn2?.trim())return;setGrades(prev=>prev.map((g,i)=>i===gi?{...g,sections:[...g.sections,{id:uid(),name:f.sn2.trim(),adviser:f.sa2||"",students:[]}]}:g));fr();setModal(null);};
    const delSec=(gi,si)=>setGrades(prev=>prev.map((g,i)=>i===gi?{...g,sections:g.sections.filter((_,j)=>j!==si)}:g));
    const updAdv=(gi,si,v)=>setGrades(prev=>prev.map((g,i)=>i===gi?{...g,sections:g.sections.map((s,j)=>j===si?{...s,adviser:v}:s)}:g));
    return(<><h2 style={{fontSize:20,fontWeight:700,marginBottom:12}}>Sections & Advisers <Badge>{totalSections} sections</Badge></h2>
      {grades.map((g,gi)=><div key={gi} style={{background:"#fff",borderRadius:12,padding:14,marginBottom:10}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
          <h3 style={{fontSize:15,fontWeight:600,color:"#1B4D7E"}}>{g.grade}</h3>
          {isAdmin&&<Btn sm onClick={()=>{fr();setModal(`sc_${gi}`);}}>{IC.plus} Add</Btn>}</div>
        {g.sections.map((s,si)=><div key={s.id} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",background:"#f9f9fb",borderRadius:8,marginBottom:4}}>
          <div style={{width:8,height:8,borderRadius:"50%",background:"#2E6B4F"}}/><div style={{flex:1,fontWeight:600,fontSize:14}}>{s.name}</div>
          <input style={{border:"1px solid #e4e7ec",borderRadius:6,padding:"4px 8px",fontSize:12,width:160}} placeholder="Adviser..." value={s.adviser} onChange={e=>updAdv(gi,si,e.target.value)}/>
          <span style={{fontSize:11,color:"#999"}}>{(s.students||[]).length} students</span>
          {isAdmin&&<button onClick={()=>delSec(gi,si)} style={{background:"none",border:"none",cursor:"pointer",color:"#c0392b"}}>{IC.trash}</button>}</div>)}
        <Modal open={modal===`sc_${gi}`} onClose={()=>setModal(null)} title={`Add — ${g.grade}`}>
          <Inp label="Section" value={f.sn2||""} onChange={v=>ff("sn2",v)} ph="e.g. Orchid"/>
          <Inp label="Adviser" value={f.sa2||""} onChange={v=>ff("sa2",v)} ph="e.g. Carmen E. Trinidad"/>
          <Btn onClick={()=>addSec(gi)} full>Add</Btn></Modal></div>)}</>);
  };

  /* ═══ PERSONNEL & ACCOUNTS (admin only, with role-based access) ═══ */
  const PersonnelPage=()=>{
    // Build options for section assignment
    const allSections=[];
    grades.forEach(g=>g.sections.forEach(s=>allSections.push({id:s.id,label:`${g.grade} - ${s.name}`})));

    const add=()=>{if(!f.pn?.trim())return;
      const ln=f.pn.trim().split(/[, ]+/)[0].toLowerCase().replace(/[^a-z]/g,"");
      const u={id:uid(),name:f.pn.trim(),role:f.pr||"teacher",position:f.pp||"",username:ln,password:ln+"123",
        assignedSections:f.pSections?f.pSections.split(",").map(s=>s.trim()).filter(Boolean):[],
        coordinatorOf:f.pCoord?f.pCoord.split(",").map(s=>s.trim()).filter(Boolean):[]};
      setUsers(prev=>[...prev,u]);fr();setModal(null);};
    const delUser=uid2=>setUsers(prev=>prev.filter(x=>x.id!==uid2));

    const editUser=(userId)=>{
      const user=users.find(u=>u.id===userId);
      if(!user)return;
      ff("eu_id",userId);ff("eu_name",user.name);ff("eu_pos",user.position);ff("eu_role",user.role);
      ff("eu_secs",(user.assignedSections||[]).join(", "));ff("eu_coord",(user.coordinatorOf||[]).join(", "));
      setModal("editUser");
    };
    const saveEdit=()=>{
      setUsers(prev=>prev.map(u=>u.id===f.eu_id?{...u,name:f.eu_name||u.name,position:f.eu_pos||u.position,role:f.eu_role||u.role,
        assignedSections:f.eu_secs?f.eu_secs.split(",").map(s=>s.trim()).filter(Boolean):[],
        coordinatorOf:f.eu_coord?f.eu_coord.split(",").map(s=>s.trim()).filter(Boolean):[]}:u));
      fr();setModal(null);
    };

    return(<><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
      <h2 style={{fontSize:20,fontWeight:700}}>Personnel & Accounts</h2><Btn sm onClick={()=>{fr();ff("pr","teacher");setModal("addP");}}>{IC.plus} Add</Btn></div>

      <div style={{background:"#e8f0fe",borderRadius:10,padding:12,marginBottom:14,fontSize:13,color:"#1B4D7E"}}>
        <strong>Role-based access:</strong> Assign sections and coordinator roles to control what each user can see when they log in. Username = family name, Password = familyname + 123.</div>

      {[{t:"Teaching",r:"teacher",c:"#1B4D7E"},{t:"Non-Teaching",r:"non-teaching",c:"#5B2C6F"}].map(sec=><div key={sec.t} style={{marginBottom:16}}>
        <h3 style={{fontSize:15,fontWeight:600,color:sec.c,marginBottom:8}}>{sec.t} ({users.filter(u=>u.role===sec.r).length})</h3>
        {users.filter(u=>u.role===sec.r).map(u=><div key={u.id} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:"#fff",borderRadius:10,marginBottom:4}}>
          <div style={{width:36,height:36,borderRadius:"50%",background:sec.c,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:14}}>{u.name[0]}</div>
          <div style={{flex:1}}>
            <div style={{fontSize:14,fontWeight:600}}>{u.name} <span style={{fontSize:11,color:"#999"}}>({u.position})</span></div>
            <div style={{fontSize:11,color:"#888"}}>Login: <strong>{u.username}</strong> / <strong>{u.password}</strong></div>
            {(u.assignedSections||[]).length>0&&<div style={{fontSize:11,color:"#2E6B4F"}}>Sections: {u.assignedSections.map(sid=>{const found=allSections.find(x=>x.id===sid);return found?found.label:sid;}).join(", ")}</div>}
            {(u.coordinatorOf||[]).length>0&&<div style={{fontSize:11,color:"#7D6608"}}>Coordinator: {u.coordinatorOf.join(", ")}</div>}
          </div>
          <Btn sm outline onClick={()=>editUser(u.id)}>Edit</Btn>
          <button onClick={()=>delUser(u.id)} style={{background:"none",border:"none",cursor:"pointer",color:"#c0392b"}}>{IC.trash}</button></div>)}
        {users.filter(u=>u.role===sec.r).length===0&&<div style={{fontSize:13,color:"#ccc",fontStyle:"italic",padding:8}}>No {sec.t.toLowerCase()} staff</div>}</div>)}

      {/* ADD MODAL */}
      <Modal open={modal==="addP"} onClose={()=>setModal(null)} title="Add personnel">
        <Inp label="Full name" value={f.pn||""} onChange={v=>ff("pn",v)} ph="e.g. Carmen E. Trinidad"/>
        <Inp label="Position" value={f.pp||""} onChange={v=>ff("pp",v)} ph="e.g. Master Teacher II"/>
        <div style={{marginBottom:12,display:"flex",gap:8}}>{["teacher","non-teaching"].map(r=><button key={r} onClick={()=>ff("pr",r)} style={{padding:"7px 16px",borderRadius:8,border:f.pr===r?"2px solid #1B4D7E":"2px solid #e4e7ec",background:f.pr===r?"#1B4D7E":"#fff",color:f.pr===r?"#fff":"#333",fontWeight:600,cursor:"pointer",fontSize:12,textTransform:"capitalize",fontFamily:"inherit"}}>{r}</button>)}</div>
        <div style={{marginBottom:12}}><label style={{fontSize:13,fontWeight:500,color:"#666",display:"block",marginBottom:3}}>Assign sections (select)</label>
          <div style={{maxHeight:120,overflow:"auto",border:"1px solid #e4e7ec",borderRadius:8,padding:6}}>
            {allSections.map(s=><label key={s.id} style={{display:"flex",alignItems:"center",gap:6,padding:"3px 0",fontSize:12,cursor:"pointer"}}>
              <input type="checkbox" checked={(f.pSections||"").includes(s.id)} onChange={e=>{const cur=(f.pSections||"").split(",").filter(Boolean);if(e.target.checked)ff("pSections",[...cur,s.id].join(","));else ff("pSections",cur.filter(x=>x!==s.id).join(","));}}/>
              {s.label}</label>)}</div></div>
        <Inp label="Coordinator of (comma-separated)" value={f.pCoord||""} onChange={v=>ff("pCoord",v)} ph="e.g. GAD, Reading, DRRM"/>
        <div style={{background:"#f0f4f8",borderRadius:8,padding:10,fontSize:12,color:"#555",marginBottom:12}}>Auto: username = <strong>{f.pn?f.pn.trim().split(/[, ]+/)[0].toLowerCase().replace(/[^a-z]/g,""):"familyname"}</strong> · password = <strong>{f.pn?f.pn.trim().split(/[, ]+/)[0].toLowerCase().replace(/[^a-z]/g,"")+"123":"familyname123"}</strong></div>
        <Btn onClick={add} full>Create account</Btn></Modal>

      {/* EDIT MODAL */}
      <Modal open={modal==="editUser"} onClose={()=>setModal(null)} title="Edit user access">
        <Inp label="Name" value={f.eu_name||""} onChange={v=>ff("eu_name",v)}/>
        <Inp label="Position" value={f.eu_pos||""} onChange={v=>ff("eu_pos",v)}/>
        <div style={{marginBottom:12}}><label style={{fontSize:13,fontWeight:500,color:"#666",display:"block",marginBottom:3}}>Assign sections</label>
          <div style={{maxHeight:120,overflow:"auto",border:"1px solid #e4e7ec",borderRadius:8,padding:6}}>
            {allSections.map(s=><label key={s.id} style={{display:"flex",alignItems:"center",gap:6,padding:"3px 0",fontSize:12,cursor:"pointer"}}>
              <input type="checkbox" checked={(f.eu_secs||"").includes(s.id)} onChange={e=>{const cur=(f.eu_secs||"").split(",").filter(Boolean);if(e.target.checked)ff("eu_secs",[...cur,s.id].join(","));else ff("eu_secs",cur.filter(x=>x!==s.id).join(","));}}/>
              {s.label}</label>)}</div></div>
        <Inp label="Coordinator of" value={f.eu_coord||""} onChange={v=>ff("eu_coord",v)} ph="GAD, Reading, DRRM"/>
        <Btn onClick={saveEdit} full>Save changes</Btn></Modal>
    </>);
  };

  /* ═══ GENERIC LIST PAGE ═══ */
  const ListPage=({title,items,setItems,fields})=>{
    const add=()=>{if(!f.title?.trim())return;setItems(prev=>[{id:uid(),date:now(),...Object.fromEntries(fields.map(x=>[x.key,f[x.key]||""]))},...prev]);fr();setModal(null);};
    return(<><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
      <h2 style={{fontSize:20,fontWeight:700}}>{title}</h2><Btn sm onClick={()=>{fr();setModal("addL");}}>{IC.plus} New</Btn></div>
      {items.length===0&&<div style={{textAlign:"center",padding:32,color:"#ccc"}}>No {title.toLowerCase()} yet.</div>}
      {items.map(item=><div key={item.id} style={{background:"#fff",borderRadius:12,padding:14,marginBottom:8,borderLeft:"4px solid #2E6B4F"}}>
        <div style={{display:"flex",justifyContent:"space-between"}}><div><h3 style={{fontSize:15,fontWeight:600,margin:0}}>{item.title}</h3>
          <div style={{fontSize:11,color:"#999",marginTop:2}}>{item.date}{item.from&&` · From: ${item.from}`}{item.to&&` · To: ${item.to}`}</div></div>
          {isAdmin&&<button onClick={()=>setItems(prev=>prev.filter(x=>x.id!==item.id))} style={{background:"none",border:"none",cursor:"pointer",color:"#999"}}>{IC.trash}</button>}</div>
        {item.body&&<p style={{margin:"6px 0 0",fontSize:13,color:"#555",lineHeight:1.5}}>{item.body}</p>}</div>)}
      <Modal open={modal==="addL"} onClose={()=>setModal(null)} title={`New ${title.slice(0,-1)}`}>
        {fields.map(x=><Inp key={x.key} label={x.label} value={f[x.key]||""} onChange={v=>ff(x.key,v)} ph={x.ph} ta={x.ta}/>)}
        <Btn onClick={add} full>Save</Btn></Modal></>);
  };

  /* ═══ COORDINATORS ═══ */
  const CoordsPage=()=>{
    const add=()=>{if(!f.cn?.trim())return;setCoordinators(prev=>[...prev,{id:uid(),name:f.cn.trim(),des:f.cd||""}]);fr();setModal(null);};
    return(<><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
      <h2 style={{fontSize:20,fontWeight:700}}>Coordinators</h2>{isAdmin&&<Btn sm onClick={()=>{fr();setModal("addC");}}>{IC.plus} Add</Btn>}</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:10}}>
        {coordinators.map(c=><div key={c.id} style={{background:"#fff",borderRadius:12,padding:14,borderLeft:"4px solid #7D6608",display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:40,height:40,borderRadius:"50%",background:"#7D6608",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700}}>{c.name[0]}</div>
          <div style={{flex:1}}><div style={{fontWeight:600}}>{c.name}</div><div style={{fontSize:11,color:"#999"}}>{c.des}</div></div>
          {isAdmin&&<button onClick={()=>setCoordinators(prev=>prev.filter(x=>x.id!==c.id))} style={{background:"none",border:"none",cursor:"pointer",color:"#c0392b"}}>{IC.trash}</button>}</div>)}</div>
      {coordinators.length===0&&<div style={{textAlign:"center",padding:32,color:"#ccc"}}>Add coordinators (GAD, DRRM, Reading, ICT)</div>}
      <Modal open={modal==="addC"} onClose={()=>setModal(null)} title="Add coordinator">
        <Inp label="Name" value={f.cn||""} onChange={v=>ff("cn",v)} ph="Name"/><Inp label="Designation" value={f.cd||""} onChange={v=>ff("cd",v)} ph="e.g. GAD Coordinator"/>
        <Btn onClick={add} full>Add</Btn></Modal></>);
  };

  /* ═══ MOOE ═══ */
  const MooePage=()=>{
    const add=()=>{if(!f.mm)return;setMooe(prev=>({...prev,[f.mm]:{amount:f.ma||"",details:f.md2||"",date:nowS()}}));fr();setModal(null);};
    return(<><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
      <h2 style={{fontSize:20,fontWeight:700}}>MOOE Transparency Board</h2>{isAdmin&&<Btn sm onClick={()=>{fr();setModal("addM2");}}>{IC.plus} Add</Btn>}</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))",gap:10}}>
        {MONTHS.map(m=>{const d=mooe[m];return<div key={m} style={{background:d?"#fff":"#f9f9fb",borderRadius:12,padding:14,border:`2px solid ${d?"#2E6B4F":"#e4e7ec"}`}}>
          <div style={{fontSize:13,fontWeight:700,color:d?"#2E6B4F":"#ccc"}}>{m}</div>
          {d?<><div style={{fontSize:20,fontWeight:700,color:"#1B4D7E",margin:"4px 0"}}>₱{Number(d.amount||0).toLocaleString()}</div><div style={{fontSize:11,color:"#999"}}>{d.date}</div></>
            :<div style={{fontSize:12,color:"#ccc",marginTop:4}}>—</div>}</div>})}</div>
      <Modal open={modal==="addM2"} onClose={()=>setModal(null)} title="MOOE Entry">
        <Sel label="Month" value={f.mm||""} onChange={v=>ff("mm",v)} options={["Select...",...MONTHS]}/>
        <Inp label="Amount (₱)" value={f.ma||""} onChange={v=>ff("ma",v)} type="number" ph="50000"/>
        <Inp label="Details" value={f.md2||""} onChange={v=>ff("md2",v)} ta ph="Breakdown..."/>
        <Btn onClick={add} full color="#2E6B4F">Save</Btn></Modal></>);
  };

  /* ═══ REPORT MODULES ═══ */
  const ReportsPage=()=>{
    const[vm,setVm]=useState(null);const cur=reportMods.find(m=>m.id===vm);
    const addM=()=>{if(!f.rn?.trim())return;setReportMods(prev=>[...prev,{id:uid(),name:f.rn.trim(),color:f.rc||"#1B4D7E",subs:[],files:[]}]);fr();setModal(null);};
    const addS=mid=>{if(!f.rs?.trim())return;setReportMods(prev=>prev.map(m=>m.id===mid?{...m,subs:[...m.subs,{id:uid(),name:f.rs.trim(),files:[]}]}:m));fr();setModal(null);};
    const addF=(mid,sid)=>{if(!f.rf?.trim())return;const fi={id:uid(),name:f.rf.trim(),date:nowS()};
      setReportMods(prev=>prev.map(m=>{if(m.id!==mid)return m;if(sid)return{...m,subs:m.subs.map(s=>s.id===sid?{...s,files:[...s.files,fi]}:s)};return{...m,files:[...m.files,fi]};}));fr();setModal(null);};
    return(<><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
      <h2 style={{fontSize:20,fontWeight:700}}>Report Modules</h2>{isAdmin&&<Btn sm onClick={()=>{fr();setModal("addRM");}}>{IC.plus} New</Btn>}</div>
      {!cur?<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))",gap:10}}>
        {reportMods.map(m=><div key={m.id} onClick={()=>setVm(m.id)} style={{background:m.color,borderRadius:14,padding:"18px 14px",cursor:"pointer",textAlign:"center",color:"#fff"}}>
          <div style={{fontSize:13,fontWeight:700}}>{m.name}</div><div style={{fontSize:11,opacity:.7}}>{m.subs.length} sub-reports</div></div>)}
        {reportMods.length===0&&<div style={{gridColumn:"1/-1",textAlign:"center",padding:32,color:"#ccc"}}>Create DRRM, GAD, SBFP, etc.</div>}</div>
      :(<><button onClick={()=>setVm(null)} style={{background:"none",border:"none",cursor:"pointer",fontSize:13,color:"#666",display:"flex",alignItems:"center",gap:4,marginBottom:10,fontFamily:"inherit"}}>{IC.back} Back</button>
        <div style={{display:"flex",gap:8,marginBottom:12}}><Btn sm onClick={()=>{fr();setModal("addRS");}} color={cur.color}>{IC.plus} Sub-report</Btn>
          <Btn sm outline onClick={()=>{fr();setModal("addRF_r");}} color={cur.color}>{IC.upload} Upload</Btn></div>
        {cur.subs.map(sub=><div key={sub.id} style={{background:"#fff",borderRadius:10,padding:12,marginBottom:8}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
            <div style={{fontWeight:600}}>{sub.name} ({sub.files.length})</div>
            <Btn sm outline onClick={()=>{fr();setModal(`addRF_${sub.id}`);}} color={cur.color}>{IC.upload}</Btn></div>
          {sub.files.map(fi=><div key={fi.id} style={{display:"flex",gap:6,padding:"4px 10px",background:"#f9f9fb",borderRadius:6,marginBottom:2}}>
            <span style={{color:cur.color}}>{IC.file}</span><span style={{fontSize:13,flex:1}}>{fi.name}</span><span style={{fontSize:11,color:"#999"}}>{fi.date}</span></div>)}</div>)}</>)}
      <Modal open={modal==="addRM"} onClose={()=>setModal(null)} title="Create module">
        <Inp label="Name" value={f.rn||""} onChange={v=>ff("rn",v)} ph="e.g. DRRM"/>
        <div style={{marginBottom:12,display:"flex",gap:5}}>{COLORS.map(c=><button key={c} onClick={()=>ff("rc",c)} style={{width:28,height:28,borderRadius:6,background:c,border:f.rc===c?"3px solid #333":"3px solid transparent",cursor:"pointer"}}/>)}</div>
        <Btn onClick={addM} full color={f.rc||"#1B4D7E"}>Create</Btn></Modal>
      <Modal open={modal==="addRS"} onClose={()=>setModal(null)} title="Add sub-report">
        <Inp label="Name" value={f.rs||""} onChange={v=>ff("rs",v)} ph="e.g. Earthquake Drill"/><Btn onClick={()=>cur&&addS(cur.id)} full>Add</Btn></Modal>
      <Modal open={modal?.startsWith("addRF")} onClose={()=>setModal(null)} title="Upload">
        <Inp label="File name" value={f.rf||""} onChange={v=>ff("rf",v)} ph="Document name"/>
        <Btn onClick={()=>{if(!cur)return;const sid=modal.split("_")[1];addF(cur.id,sid==="r"?null:sid);}} full>Save</Btn></Modal></>);
  };

  /* ═══ PPSSH ═══ */
  const PPSSHPage=()=>{
    const[sel,setSel]=useState(null);const dom=sel!==null?PPSSH.find(d=>d.id===sel):null;
    const add=(did,strand)=>{if(!f.mn?.trim())return;const k=`${did}-${strand}`;
      setPpsMov(prev=>({...prev,[k]:[...(prev[k]||[]),{id:uid(),name:f.mn.trim(),teacher:f.mt||"Principal",date:nowS()}]}));fr();setModal(null);};
    return(<><h2 style={{fontSize:20,fontWeight:700,marginBottom:12}}>PPSSH MOVs — 6 Domains</h2>
      {!dom?<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",gap:10}}>
        {PPSSH.map(d=>{const tot=Object.keys(ppsMov).filter(k=>k.startsWith(`${d.id}-`)).reduce((a,k)=>a+ppsMov[k].length,0);
          return<div key={d.id} onClick={()=>setSel(d.id)} style={{background:"#fff",borderRadius:14,padding:16,cursor:"pointer",borderLeft:`5px solid ${d.color}`}}>
            <Badge>Domain {d.id}</Badge><div style={{fontSize:14,fontWeight:600,marginTop:6,textTransform:"capitalize"}}>{d.name}</div>
            <div style={{fontSize:11,color:"#999",marginTop:4}}>{d.strands.length} strands · {tot} MOVs</div></div>})}</div>
      :(<><button onClick={()=>setSel(null)} style={{background:"none",border:"none",cursor:"pointer",fontSize:13,color:"#666",display:"flex",alignItems:"center",gap:4,marginBottom:10,fontFamily:"inherit"}}>{IC.back} Back</button>
        <h3 style={{fontSize:17,fontWeight:700,marginBottom:10}}>Domain {dom.id}: {dom.name}</h3>
        {dom.strands.map(strand=>{const k=`${dom.id}-${strand}`;const sm=ppsMov[k]||[];
          return<div key={strand} style={{background:"#fff",borderRadius:10,padding:"10px 14px",marginBottom:6}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:14,fontWeight:600}}>{strand} <span style={{fontSize:11,color:"#999"}}>({sm.length})</span></span>
              <button onClick={()=>{fr();setModal(`pp_${dom.id}_${strand}`);}} style={{width:26,height:26,borderRadius:6,background:dom.color,color:"#fff",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>{IC.plus}</button></div>
            {sm.map(m=><div key={m.id} style={{display:"flex",gap:6,padding:"4px 10px",marginTop:4,background:"#f9f9fb",borderRadius:6}}>
              <span style={{color:dom.color}}>{IC.file}</span><span style={{fontSize:13,flex:1}}>{m.name}</span><span style={{fontSize:11,color:"#999"}}>{m.teacher}·{m.date}</span></div>)}
            <Modal open={modal===`pp_${dom.id}_${strand}`} onClose={()=>setModal(null)} title={strand}>
              <Inp label="MOV" value={f.mn||""} onChange={v=>ff("mn",v)} ph="Document"/><Inp label="By" value={f.mt||""} onChange={v=>ff("mt",v)} ph="Teacher"/>
              <Btn onClick={()=>add(dom.id,strand)} full color={dom.color}>Add</Btn></Modal></div>})}</>)}</>);
  };

  /* ═══ TEACHER MOVs ═══ */
  const TmovPage=()=>{
    const addC=()=>{if(!f.tc?.trim())return;setTmovCats(prev=>[...prev,{id:uid(),name:f.tc.trim(),color:f.tcc||"#1B4D7E",docs:[]}]);fr();setModal(null);};
    const addD=cid=>{if(!f.td?.trim())return;setTmovCats(prev=>prev.map(c=>c.id===cid?{...c,docs:[...c.docs,{id:uid(),name:f.td.trim(),teacher:f.tdt||"",date:nowS()}]}:c));fr();setModal(null);};
    return(<><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
      <h2 style={{fontSize:20,fontWeight:700}}>Teacher MOVs</h2>{isAdmin&&<Btn sm onClick={()=>{fr();setModal("addTC");}}>{IC.plus} New</Btn>}</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:10}}>
        {tmovCats.map(cat=><div key={cat.id} style={{background:"#fff",borderRadius:14,padding:14,borderTop:`4px solid ${cat.color}`}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
            <div style={{fontWeight:700}}>{cat.name} ({cat.docs.length})</div>
            <div style={{display:"flex",gap:4}}>
              <button onClick={()=>{fr();setModal(`tu_${cat.id}`);}} style={{width:26,height:26,borderRadius:6,background:cat.color,color:"#fff",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>{IC.plus}</button>
              {isAdmin&&<button onClick={()=>setTmovCats(prev=>prev.filter(c=>c.id!==cat.id))} style={{background:"none",border:"none",cursor:"pointer",color:"#c0392b"}}>{IC.trash}</button>}</div></div>
          {cat.docs.map(d=><div key={d.id} style={{display:"flex",gap:6,padding:"4px 10px",background:"#f9f9fb",borderRadius:6,marginBottom:2}}>
            <span style={{color:cat.color}}>{IC.file}</span><span style={{fontSize:13,flex:1}}>{d.name}</span><span style={{fontSize:11,color:"#999"}}>{d.date}</span></div>)}
          <Modal open={modal===`tu_${cat.id}`} onClose={()=>setModal(null)} title="Upload">
            <Inp label="Document" value={f.td||""} onChange={v=>ff("td",v)} ph="Name"/><Inp label="Teacher" value={f.tdt||""} onChange={v=>ff("tdt",v)} ph="Teacher"/>
            <Btn onClick={()=>addD(cat.id)} full>Upload</Btn></Modal></div>)}</div>
      {tmovCats.length===0&&<div style={{textAlign:"center",padding:32,color:"#ccc"}}>Create IPCRF, COT Sheets, etc.</div>}
      <Modal open={modal==="addTC"} onClose={()=>setModal(null)} title="Create category">
        <Inp label="Name" value={f.tc||""} onChange={v=>ff("tc",v)} ph="e.g. IPCRF"/>
        <div style={{marginBottom:12,display:"flex",gap:5}}>{COLORS.map(c=><button key={c} onClick={()=>ff("tcc",c)} style={{width:26,height:26,borderRadius:6,background:c,border:f.tcc===c?"3px solid #333":"3px solid transparent",cursor:"pointer"}}/>)}</div>
        <Btn onClick={addC} full color={f.tcc||"#1B4D7E"}>Create</Btn></Modal></>);
  };

  /* ═══ FORMS ═══ */
  const FormsPage=()=>{
    const addForm=()=>{if(!f.fn?.trim())return;setFormTemplates(prev=>[...prev,{id:uid(),name:f.fn.trim(),type:f.ft||"SF5",grade:f.fg||"",date:nowS(),records:[]}]);fr();setModal(null);};
    const addRec=fid=>{if(!f.frn?.trim())return;
      setFormTemplates(prev=>prev.map(t=>t.id===fid?{...t,records:[...t.records,{id:uid(),name:f.frn.trim(),lrn:f.frl||"",avg:f.fra||"",action:f.frac||"",sex:f.frs||"M"}]}:t));fr();setModal(null);};
    return(<><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
      <h2 style={{fontSize:20,fontWeight:700}}>Form Templates</h2><Btn sm onClick={()=>{fr();setModal("addFT");}}>{IC.plus} New form</Btn></div>
      {formTemplates.map(t=><div key={t.id} style={{background:"#fff",borderRadius:12,padding:14,marginBottom:10}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div><Badge>{t.type}</Badge> <span style={{fontWeight:700,marginLeft:6}}>{t.name}</span>
            <div style={{fontSize:11,color:"#999",marginTop:2}}>{t.grade} · {t.records.length} records · {t.date}</div></div>
          <div style={{display:"flex",gap:6}}>
            <Btn sm onClick={()=>{fr();ff("frs","M");setModal(`fr_${t.id}`);}} color="#2E6B4F">{IC.plus} Record</Btn>
            <Btn sm outline onClick={()=>{
              const hdr=`School: Tunga ES | ID: 119502 | ${t.grade} | SY ${sy}\n`;
              const csv=hdr+["LRN,Name,Sex,Average,Action",...t.records.map(r=>`${r.lrn},"${r.name}",${r.sex},${r.avg},${r.action}`)].join("\n");
              const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));a.download=`${t.name.replace(/\s+/g,"_")}.csv`;a.click();
            }}>{IC.download} CSV</Btn>
            {isAdmin&&<button onClick={()=>setFormTemplates(prev=>prev.filter(x=>x.id!==t.id))} style={{background:"none",border:"none",cursor:"pointer",color:"#c0392b"}}>{IC.trash}</button>}</div></div>
        {t.records.length>0&&<div style={{marginTop:10,maxHeight:200,overflow:"auto"}}>
          <table style={{width:"100%",fontSize:12,borderCollapse:"collapse"}}>
            <thead><tr style={{background:"#f0f4f8"}}>{["#","LRN","Name","Sex","Avg","Action"].map(h=><th key={h} style={{padding:"6px 8px",textAlign:"left",fontWeight:600,borderBottom:"1px solid #e4e7ec"}}>{h}</th>)}</tr></thead>
            <tbody>{t.records.map((r,i)=><tr key={r.id}><td style={{padding:"5px 8px",color:"#999"}}>{i+1}</td><td style={{padding:"5px 8px"}}>{r.lrn}</td><td style={{padding:"5px 8px",fontWeight:500}}>{r.name}</td><td style={{padding:"5px 8px"}}>{r.sex}</td><td style={{padding:"5px 8px"}}>{r.avg}</td><td style={{padding:"5px 8px"}}>{r.action}</td></tr>)}</tbody></table></div>}
        <Modal open={modal===`fr_${t.id}`} onClose={()=>setModal(null)} title={`Record — ${t.name}`}>
          <Inp label="Name" value={f.frn||""} onChange={v=>ff("frn",v)} ph="LAST, FIRST, MIDDLE"/>
          <Inp label="LRN" value={f.frl||""} onChange={v=>ff("frl",v)} ph="LRN"/>
          <div style={{display:"flex",gap:8,marginBottom:12}}>{["M","F"].map(s=><button key={s} onClick={()=>ff("frs",s)} style={{padding:"6px 16px",borderRadius:8,border:f.frs===s?"2px solid #1B4D7E":"2px solid #e4e7ec",background:f.frs===s?"#1B4D7E":"#fff",color:f.frs===s?"#fff":"#333",fontWeight:600,cursor:"pointer",fontSize:12}}>{s==="M"?"Male":"Female"}</button>)}</div>
          <Inp label="Average" value={f.fra||""} onChange={v=>ff("fra",v)} ph="85"/>
          <Inp label="Action" value={f.frac||""} onChange={v=>ff("frac",v)} ph="PROMOTED"/>
          <Btn onClick={()=>addRec(t.id)} full>Add</Btn></Modal></div>)}
      {formTemplates.length===0&&<div style={{textAlign:"center",padding:32,color:"#ccc"}}>Create form templates (SF5, Nutritional Status, etc.)</div>}
      <Modal open={modal==="addFT"} onClose={()=>setModal(null)} title="Create form">
        <Inp label="Form name" value={f.fn||""} onChange={v=>ff("fn",v)} ph="e.g. SF5 Grade 1"/>
        <Sel label="Type" value={f.ft||"SF5"} onChange={v=>ff("ft",v)} options={["SF5","SF10","Nutritional Status","Phil-IRI","Enrollment","Custom"]}/>
        <Sel label="Grade" value={f.fg||""} onChange={v=>ff("fg",v)} options={["Select...",...DEF_GRADES]}/>
        <div style={{background:"#f0f4f8",borderRadius:8,padding:10,fontSize:12,color:"#555",marginBottom:12}}>Auto-filled: Tunga ES · 119502 · Moalboal · Region VII · SY {sy}</div>
        <Btn onClick={addForm} full>Create</Btn></Modal></>);
  };

  /* ═══ RENDER ═══ */
  const pages={home:<HomePage/>,students:<StudentsPage/>,grades:<GradesPage/>,personnel:<PersonnelPage/>,coordinators:<CoordsPage/>,
    announcements:<ListPage title="Announcements" items={announcements} setItems={setAnnouncements} fields={[{key:"title",label:"Title",ph:"Title"},{key:"body",label:"Details",ph:"Details...",ta:true}]}/>,
    memos:<ListPage title="Memos" items={memos} setItems={setMemos} fields={[{key:"title",label:"Subject",ph:"Subject"},{key:"from",label:"From",ph:"William A. Buquia"},{key:"to",label:"To",ph:"All Teachers"},{key:"body",label:"Body",ph:"Content...",ta:true}]}/>,
    bulletins:<ListPage title="Bulletins" items={bulletins} setItems={setBulletins} fields={[{key:"title",label:"Title",ph:"Title"},{key:"body",label:"Content",ph:"Content...",ta:true}]}/>,
    mooe:<MooePage/>,reports:<ReportsPage/>,ppssh:<PPSSHPage/>,tmov:<TmovPage/>,forms:<FormsPage/>};

  return(
    <div style={{display:"flex",minHeight:"100vh",fontFamily:"'Segoe UI',system-ui,sans-serif",background:"#f4f6f8"}}>
      {sideOpen&&<div onClick={()=>setSideOpen(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.4)",zIndex:998}}/>}
      <aside className="tes-sidebar" style={{width:240,background:"#0E2240",color:"#fff",position:"fixed",top:0,bottom:0,left:0,zIndex:999,overflowY:"auto",transition:"transform .25s",transform:sideOpen?"translateX(0)":"translateX(-240px)"}}>
        <div style={{padding:"14px 12px",borderBottom:"1px solid rgba(255,255,255,.08)",display:"flex",alignItems:"center",gap:10}}>
          <img src={LOGO} alt="" style={{width:42,height:42,borderRadius:"50%",border:"2px solid rgba(255,255,255,.2)",objectFit:"cover"}}/>
          <div><div style={{fontSize:13,fontWeight:700}}>Tunga ES</div><div style={{fontSize:10,opacity:.5}}>Moalboal, Cebu</div></div></div>
        <div style={{padding:"8px 10px"}}><select value={sy} onChange={e=>setSy(e.target.value)} style={{width:"100%",padding:"7px 8px",borderRadius:6,border:"1px solid rgba(255,255,255,.15)",background:"rgba(255,255,255,.08)",color:"#fff",fontSize:12,fontFamily:"inherit"}}>
          {SYS.map(s=><option key={s} value={s} style={{color:"#333"}}>SY {s}</option>)}</select></div>
        <nav style={{padding:"4px 8px"}}>{nav.map(n=>(
          <button key={n.id} onClick={()=>{setPage(n.id);setSideOpen(false);}} style={{display:"flex",alignItems:"center",gap:8,width:"100%",padding:"9px 10px",background:page===n.id?"rgba(255,255,255,.12)":"transparent",border:"none",borderRadius:7,color:page===n.id?"#fff":"rgba(255,255,255,.5)",cursor:"pointer",fontSize:12,fontWeight:page===n.id?600:400,textAlign:"left",marginBottom:1,fontFamily:"inherit"}}>
            <span style={{width:18,display:"flex"}}>{IC[n.icon]}</span>{n.label}</button>))}</nav>
        <div style={{padding:12,borderTop:"1px solid rgba(255,255,255,.08)",position:"absolute",bottom:0,left:0,right:0}}>
          <button onClick={()=>{setAuth(null);setPage("home");}} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",color:"rgba(255,255,255,.4)",cursor:"pointer",fontSize:12,fontFamily:"inherit"}}>{IC.log} Sign out</button>
          <div style={{fontSize:10,opacity:.3,marginTop:6}}>{auth.name} ({auth.role})</div></div></aside>
      <main style={{flex:1,marginLeft:0,minWidth:0}}>
        <header style={{background:"#fff",padding:"10px 16px",display:"flex",alignItems:"center",gap:10,borderBottom:"1px solid #e4e7ec",position:"sticky",top:0,zIndex:100}}>
          <button onClick={()=>setSideOpen(!sideOpen)} style={{background:"none",border:"none",cursor:"pointer",color:"#333",padding:2}}>{IC.menu}</button>
          <h2 style={{margin:0,fontSize:16,fontWeight:600,flex:1}}>{nav.find(n=>n.id===page)?.label||"Dashboard"}</h2>
          <Badge color="#1B4D7E">SY {sy}</Badge>
          <Badge color={isAdmin?"#2E6B4F":"#5B2C6F"}>{auth.role}</Badge></header>
        <div style={{padding:16,maxWidth:960,margin:"0 auto"}}>{pages[page]||<HomePage/>}</div></main>
      <style>{`@media(min-width:769px){.tes-sidebar{transform:translateX(0)!important}main{margin-left:240px!important}}`}</style>
    </div>);
}
