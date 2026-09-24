import {useEffect,useRef,useState,type ReactNode} from "react";

const projects=[
 {no:"01",name:"THE APPROACH",meta:"Arrival / 2026",desc:"A slow reveal from the garden wall to the private court.",image:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=90"},
 {no:"02",name:"THE FORM",meta:"Architecture / 2026",desc:"Monolithic planes, deep apertures and a measured relationship with light.",image:"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2400&q=90"},
 {no:"03",name:"THE INTERIOR",meta:"Living / 2026",desc:"A restrained interior palette designed to make the landscape the artwork.",image:"https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=90"}
];

function Reveal({children,className=""}:{children:ReactNode;className?:string}){
 const r=useRef<HTMLDivElement>(null);const[v,setV]=useState(false);
 useEffect(()=>{const o=new IntersectionObserver(([e])=>e.isIntersecting&&setV(true),{threshold:.12});if(r.current)o.observe(r.current);return()=>o.disconnect()},[]);
 return <div ref={r} className={className+" reveal "+(v?"visible":"")}>{children}</div>
}

function Magnetic({children,className=""}:{children:ReactNode;className?:string}){
 const ref=useRef<HTMLAnchorElement>(null);
 useEffect(()=>{const el=ref.current;if(!el)return;const move=(e:MouseEvent)=>{const r=el.getBoundingClientRect();const x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;el.style.transform=`translate(${x*.08}px,${y*.08}px)`};const leave=()=>el.style.transform="";el.addEventListener("mousemove",move);el.addEventListener("mouseleave",leave);return()=>{el.removeEventListener("mousemove",move);el.removeEventListener("mouseleave",leave)}},[]);
 return <a ref={ref} className={className}>{children}</a>
}

export default function App(){
 const[active,setActive]=useState(0);const[progress,setProgress]=useState(0);
 useEffect(()=>{
  const onMove=(e:MouseEvent)=>{document.documentElement.style.setProperty("--mx",`${e.clientX}px`);document.documentElement.style.setProperty("--my",`${e.clientY}px`)};
  const onScroll=()=>{const max=document.documentElement.scrollHeight-window.innerHeight;const p=max?window.scrollY/max:0;setProgress(p);document.documentElement.style.setProperty("--scroll",String(Math.min(window.scrollY/900,1)))};
  window.addEventListener("mousemove",onMove);window.addEventListener("scroll",onScroll,{passive:true});onScroll();
  return()=>{window.removeEventListener("mousemove",onMove);window.removeEventListener("scroll",onScroll)}
 },[]);
 return <main>
  <div className="cursor"/><div className="grain"/>
  <div className="progress"><span style={{transform:`scaleX(${progress})`}}/></div>
  <header className="nav"><a className="logo" href="#">MONUMENT<span>®</span></a><nav><a href="#residence">Residence</a><a href="#architecture">Architecture</a><a href="#details">Details</a></nav><a className="menu" href="#contact">Inquire <b>↗</b></a></header>

  <section className="hero">
   <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2800&q=92"/>
   <div className="heroShade"/><div className="heroVignette"/>
   <div className="coordinates">31° 28' 14.2&quot; N &nbsp; / &nbsp; 74° 20' 03.8&quot; E</div>
   <div className="heroTitle"><p>PRIVATE RESIDENCE · LAHORE · 2026</p><h1>A HOUSE<br/><i>BUILT AROUND</i><br/>SILENCE.</h1><Magnetic className="heroLink" href="#residence">Explore residence <b>↓</b></Magnetic></div>
   <div className="heroCenter">001 <span>PRIVATE COMMISSION</span></div>
   <div className="heroBottom"><span>MONUMENT / 001</span><span>SCROLL TO ENTER</span><span>LAHORE · PK</span></div>
  </section>

  <section className="statement" id="residence">
   <div className="statementIndex">01 — THE IDEA</div>
   <Reveal><p className="kicker">MONUMENTAL, NOT OSTENTATIOUS</p><h2>Architecture<br/><i>with nothing</i><br/>to prove.</h2><div className="leadRow"><span>01 / 04</span><p className="lead">A private residence conceived as a quiet composition of stone, light and proportion. Every room is measured against the landscape; every material chosen to age with grace.</p></div></Reveal>
  </section>

  <section className="sequence" id="architecture">
   <div className="sequenceSticky">
    <div className="seqImage"><img key={projects[active].image} src={projects[active].image}/><div className="seqShade"/></div>
    <div className="seqMeta"><span>MONUMENT / 001</span><span>PRIVATE RESIDENCE</span></div>
    <div className="seqCopy"><span>0{active+1}</span><h2>{projects[active].name}</h2><p>{projects[active].meta}</p><div className="seqDesc">{projects[active].desc}</div></div>
    <div className="seqNav">{projects.map((p,i)=><button key={p.no} onClick={()=>setActive(i)} className={active===i?"on":""}><span>{p.no}</span>{p.name}<i/></button>)}</div>
    <div className="seqCounter">0{active+1} <em>/ 03</em></div>
   </div>
  </section>

  <section className="plan" id="details">
   <Reveal><div className="planTop"><span>02 — SPATIAL LOGIC</span><span>1,240 M² / 13,347 FT²</span></div><div className="planVisual"><div className="planLabel labelA">NORTH GARDEN</div><div className="planLabel labelB">WEST LIGHT</div><div className="floor"><span>COURTYARD</span><span>LIVING</span><span>DINING</span><span>PRIVATE</span><span>POOL</span></div></div><div className="planText"><h2>Spaces that<br/><i>frame life.</i></h2><p>Long axial views connect the house from entrance to garden. Light enters from courtyards rather than windows alone, creating a sequence of changing atmospheres throughout the day.</p></div></Reveal>
  </section>

  <section className="materials"><div className="materialImage"><img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2400&q=90"/><span>03 / MATERIAL STUDY</span></div><div className="materialCopy"><p className="kicker">03 — MATERIAL PALETTE</p><h2>Stone.<br/>Oak.<br/><i>Shadow.</i></h2><p>Travertine underfoot. Smoked oak at touch. Patinated bronze where hand meets architecture. Nothing polished beyond what time can improve.</p><div className="materialList"><span><b>01</b> TRAVERTINE <i>WARM / HONEST</i></span><span><b>02</b> SMOKED OAK <i>TACTILE / DEEP</i></span><span><b>03</b> PATINATED BRONZE <i>AGED / QUIET</i></span><span><b>04</b> NATURAL LINEN <i>SOFT / RAW</i></span></div></div></section>

  <section className="numbers"><div><span>LAND</span><strong>2,800</strong><small>M²</small></div><div><span>RESIDENCE</span><strong>1,240</strong><small>M²</small></div><div><span>COURTYARD</span><strong>04</strong><small>LIGHT WELLS</small></div><div><span>ORIENTATION</span><strong>360°</strong><small>GARDEN VIEWS</small></div></section>

  <section className="gallery"><Reveal><div className="galleryHead"><p className="kicker">04 — THE RESIDENCE</p><span>A STUDY IN QUIET LUXURY</span></div><div className="galleryGrid"><figure><img src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2000&q=90"/><figcaption>01 / ARRIVAL COURT</figcaption></figure><figure><img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=90"/><figcaption>02 / LIVING ROOM</figcaption></figure><figure><img src="https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=2000&q=90"/><figcaption>03 / PRIVATE WING</figcaption></figure></div></Reveal></section>

  <section className="contact" id="contact"><div className="contactTop"><span>MONUMENT / PRIVATE RESIDENCE 001</span><span>BY APPOINTMENT ONLY</span></div><div><p>PRIVATE VIEWING</p><h2>Come<br/><i>inside.</i></h2></div><a className="contactLink" href="mailto:studio@monument.example">Request private viewing <b>↗</b></a></section>
  <footer><span>MONUMENT®</span><span>LAHORE / PAKISTAN</span><span>© 2026 / PRIVATE COMMISSION</span></footer>
 </main>
}