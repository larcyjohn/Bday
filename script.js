/* ---------- EDIT THIS PART ---------- */
var CONFIG = {
  name: "Gracelle",
  from: "Juan",
  birthday: "11/09/06",            /* her real birthday as mm/dd/yy, e.g. "03/14/04". Leave "" to accept any valid date. */
  heroPhoto: "0492afcb-eaf2-4d40-a1cb-90f86b3e21ab.jpg",           /* our photo beside the cake (image link or data: URI) */
  heroCaption: "Ganda",
  reasons: [
    "The way you laugh at my jokes kahit di siguro nakakatawa",
    "How you make time to chat with me even though busy ka po minsan",
    "Your kindness po, understanding kahit walang kwenta mga sinasabi ko minsan",
    "The way you make me feel special, special child EME HAHAHAHA",
    "You, exactly as you are. IKAW NA PO YAN EH"
  ],
  photos: [                /* album: add { src: "...", caption: "..." } for each picture */
    { src: "0ec6981f-d16b-4694-91c3-7295cef3d193.jpg", caption: "kita mo yan? super gandaa" }, { src: "a1976404-bacd-494d-af25-ff8412f52443.jpg", caption: "ganda ng kasama ko" }, { src: "us.jpg", caption: "cutieee" },
    { src: "b771a635-a28c-429c-af2c-2780d1709fd7.jpg", caption: "kahit si mimi gandang ganda sa iyo oh" }, { src: "8a376b26-74f1-48a7-be32-e1cd9dd4e963.jpg", caption: "yiee tangos ilong ni ganda" }, { src: "78a31e12-6bc1-4089-b344-ccf88e7549d4.jpg", caption: "pers date HAWADAHDHA " }
  ],
  letter: [
    "Happy birthday, Gracelle. Ingatan at samahan nawa po palagi",
    "Thank you for being patient with me kahit laging nang aasar HAHAHA, and for making me smile on the hardest days.",
    "Salamat sa Dios sa panibagong taon na ipinagkaloob po sa iyo, loobin mas marami pa sanang madagdag"
  ],
  footer: "Happy Birthday po ulit hehe" 
  ,secret: "I wanna be your endgame"
};
/* ------------------------------------ */

function $(id){return document.getElementById(id);}
$("name").textContent = CONFIG.name;
document.title = "Happy Birthday, " + CONFIG.name;

/* photo beside the cake */
(function(){
  var f = $("heroFrame"), box = document.createElement("div");
  if(CONFIG.heroPhoto){ box.className="pic"; var im=document.createElement("img"); im.src=CONFIG.heroPhoto; im.alt=CONFIG.heroCaption||"Our photo"; box.appendChild(im); }
  else { box.className="ph"; box.style.aspectRatio="4/5"; box.textContent="Our photo goes here"; }
  f.appendChild(box);
  var c=document.createElement("figcaption"); c.textContent=CONFIG.heroCaption||""; f.appendChild(c);
})();

CONFIG.reasons.forEach(function(r){var li=document.createElement("li");li.textContent=r;$("reasons").appendChild(li);});
CONFIG.letter.forEach(function(t){var p=document.createElement("p");p.textContent=t;$("letter").appendChild(p);});
$("sign").textContent = "<3" + CONFIG.from;
$("foot").textContent = CONFIG.footer;
$("secretMsg").textContent = CONFIG.secret;
$("secret").addEventListener("click", function(){
  var m = $("secretMsg");
  if (m.hidden) { m.hidden = false; confetti(); } else { m.hidden = true; }
});

/* album */
var lb = $("lb");
CONFIG.photos.forEach(function(ph){
  var t=document.createElement("figure"), pic=document.createElement("div");
  t.className="tile"; pic.className="pic";
  if(ph.src){
    t.classList.add("has");
    var im=document.createElement("img"); im.src=ph.src; im.alt=ph.caption||"Our photo"; im.loading="lazy";
    pic.appendChild(im); pic.tabIndex=0; pic.setAttribute("role","button"); pic.setAttribute("aria-label","View photo bigger");
    var open=function(){ $("lbImg").src=ph.src; $("lbImg").alt=ph.caption||""; $("lbCap").textContent=ph.caption||""; lb.showModal(); };
    pic.addEventListener("click",open);
    pic.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();open();}});
  } else { pic.textContent="Photo coming soon"; }
  t.appendChild(pic);
  if(ph.caption){var c=document.createElement("figcaption");c.textContent=ph.caption;t.appendChild(c);}
  $("grid").appendChild(t);
});
lb.addEventListener("click",function(){lb.close();});

/* birthday gate */
var bday=$("bday"), err=$("err"), hint=$("hint"), cake=$("cake");
var candles=Array.prototype.slice.call(document.querySelectorAll(".candle"));
bday.addEventListener("input",function(){
  var d=bday.value.replace(/\D/g,"").slice(0,6), out=d; 
  if(d.length>4) out=d.slice(0,2)+"/"+d.slice(2,4)+"/"+d.slice(4);
  else if(d.length>2) out=d.slice(0,2)+"/"+d.slice(2);
  bday.value=out; err.textContent="";
});
function validDate(s){
  var m=/^(\d{2})\/(\d{2})\/(\d{2})$/.exec(s); if(!m) return false;
  var mo=+m[1], da=+m[2], yy=+m[3], yr=yy<=26?2000+yy:1900+yy, d=new Date(yr,mo-1,da);
  return d.getFullYear()===yr && d.getMonth()===mo-1 && d.getDate()===da;
}
$("gate").addEventListener("submit",function(e){
  e.preventDefault();
  var v=bday.value.trim();
  if(!validDate(v)){ err.textContent="Please enter it like this: mm/dd/yy."; return; }
  if(CONFIG.birthday && v!==CONFIG.birthday){ err.textContent="ENGK MALI PO, TRY MO ULIT GANDA"; return; }
  $("gate").hidden=true;
  cake.classList.add("lit");
  candles.forEach(function(c){c.tabIndex=0;});
  hint.textContent="Tap each candle to blow it out.";
});

/* candles */
function blow(c){
  if(c.classList.contains("out")||!cake.classList.contains("lit")) return;
  c.classList.add("out");
  var left=candles.filter(function(x){return !x.classList.contains("out");}).length;
  if(left===2) hint.textContent="dalawa pa.";
  if(left===1) hint.textContent="last one po.";
  if(left===0) finish();
}
candles.forEach(function(c){
  c.addEventListener("click",function(){blow(c);});
  c.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();blow(c);}});
});
function finish(){
  $("lead").textContent="Make a wish,";
  hint.textContent="Happy birthday po!";
  document.body.classList.add("unlocked");
  confetti();
}
$("go").addEventListener("click",function(){
  document.body.classList.add("opened");
  requestAnimationFrame(function(){$("main").scrollIntoView({behavior:"smooth"});});
});

/* confetti */
function confetti(){
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var cv=$("fx"), ctx=cv.getContext("2d"); cv.width=innerWidth; cv.height=innerHeight;
  var cols=["#f77f7d","#f8c9bd","#d49c91","#fffaf7"], ps=[];
  for(var i=0;i<150;i++) ps.push({x:cv.width/2,y:cv.height*0.55,vx:(Math.random()-.5)*14,vy:-Math.random()*14-4,s:4+Math.random()*6,r:Math.random()*6,c:cols[i%4]});
  var t=0;
  (function step(){
    ctx.clearRect(0,0,cv.width,cv.height);
    ps.forEach(function(p){p.vy+=.32;p.x+=p.vx;p.y+=p.vy;p.r+=.2;
      ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.r);ctx.fillStyle=p.c;ctx.fillRect(-p.s/2,-p.s/2,p.s,p.s*.6);ctx.restore();});
    if(++t<150) requestAnimationFrame(step); else ctx.clearRect(0,0,cv.width,cv.height);
  })();
}