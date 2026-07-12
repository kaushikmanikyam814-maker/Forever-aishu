/* ==========================
   Forever • Kaushik ❤️ Aishu
   Part 3A
========================== */

const pages = document.querySelectorAll(".page");

function showPage(id){

    pages.forEach(page=>page.classList.remove("active"));

    document.getElementById(id).classList.add("active");

}

/* -------------------------
      TYPEWRITER INTRO
------------------------- */

const introLines=[

"Hey Aishu...",

"Before you leave...",

"I have something I want to ask you."

];

const ids=["type1","type2","type3"];

let current=0;

function typeWriter(text,id,speed=70){

    return new Promise(resolve=>{

        let i=0;

        const el=document.getElementById(id);

        el.innerHTML="";

        const interval=setInterval(()=>{

            el.innerHTML+=text.charAt(i);

            i++;

            if(i>=text.length){

                clearInterval(interval);

                resolve();

            }

        },speed);

    });

}

async function playIntro(){

    await typeWriter(introLines[0],ids[0]);

    await new Promise(r=>setTimeout(r,500));

    await typeWriter(introLines[1],ids[1]);

    await new Promise(r=>setTimeout(r,700));

    await typeWriter(introLines[2],ids[2]);

    document.getElementById("continueBtn").classList.remove("hidden");

}

playIntro();

/* -------------------------
      CONTINUE
------------------------- */

document.getElementById("continueBtn").onclick=()=>{

    showPage("question");

}

/* -------------------------
       BUTTONS
------------------------- */

const yes=document.getElementById("yesBtn");

const no=document.getElementById("noBtn");

const funny=document.getElementById("funnyText");

let scale=1;

const messages=[

"Are you sure? 🥺",

"Think again ❤️",

"That's illegal 😂",

"Nope 😌",

"Nice try, Aishu ❤️",

"The answer is obvious 🤭",

"Come on babyyy 🩷"

];

let count=0;

function moveButton(){

    const maxX=window.innerWidth-150;

    const maxY=window.innerHeight-80;

    no.style.position="fixed";

    no.style.left=Math.random()*maxX+"px";

    no.style.top=Math.random()*maxY+"px";

}

no.addEventListener("mouseover",()=>{

    moveButton();

});

no.addEventListener("click",()=>{

    scale+=0.2;

    yes.style.transform=`scale(${scale})`;

    funny.innerHTML=messages[count%messages.length];

    count++;

    moveButton();

});

/* -------------------------
       YES CLICK
------------------------- */

yes.onclick=()=>{

    confetti({

        particleCount:220,

        spread:90,

        origin:{y:.6}

    });

    setTimeout(()=>{

        showPage("loading");

    },800);

}
/* ==========================
   PART 3B
========================== */

/* Loading Screen */

setTimeout(() => {}, 1);

yes.addEventListener("click", () => {

    setTimeout(() => {

        showPage("result");

        setTimeout(() => {

            document
                .getElementById("artImage")
                .classList.add("show");

            playStory();

        },600);

    },3500);

});

/* Story Animation */

const storyLines=[

"I don't know where life will take us.",

"I just know that wherever it does...",

"a part of my heart will always be walking beside you.",

"I'm proud of the woman you're becoming.",

"No matter how many cities stand between us...",

"I'll never stop choosing you.",

"Every phone call.",

"Every visit.",

"Every goodbye.",

"Until one day...",

"there are no more goodbyes."

];

let storyIndex=0;

function playStory(){

    const p=document.querySelector("#storyText p");

    p.innerHTML="";

    function next(){

        if(storyIndex>=storyLines.length)return;

        p.innerHTML+=storyLines[storyIndex]+"<br><br>";

        storyIndex++;

        setTimeout(next,1700);

    }

    next();

}

/* Open Letter */

document
.getElementById("letterButton")
.addEventListener("click",()=>{

showPage("letterPage");

typeLetter();

});

/* Letter */

const letter=`

Dear Aishu,

If you're reading this...

then you finally pressed

"Yes Baby."

(I knew you would ❤️)

You're about to begin

a completely new chapter.

A new city.

New people.

New memories.

I hope you chase every dream

with everything you've got.

And on the days

when it feels overwhelming...

I hope you remember

there's someone

who's incredibly proud of you.

Distance may change

where we are.

But it could never change

what you mean to me.

I'll keep choosing you.

Again.

And again.

And again.

Forever yours,

Kaushik ❤️

`;

function typeLetter(){

    const target=document.getElementById("letterContent");

    target.innerHTML="";

    let i=0;

    function type(){

        if(i>=letter.length)return;

        target.innerHTML+=letter.charAt(i);

        i++;

        setTimeout(type,32);

    }

    type();

}

/* Floating Hearts */

const heartContainer=document.getElementById("heartContainer");

for(let i=0;i<35;i++){

    createHeart();

}

function createHeart(){

    const h=document.createElement("div");

    h.className="heart";

    h.innerHTML=Math.random()>0.5?"🤍":"🩷";

    h.style.left=Math.random()*100+"vw";

    h.style.animationDuration=
    6+Math.random()*8+"s";

    h.style.fontSize=
    14+Math.random()*18+"px";

    heartContainer.appendChild(h);

    setTimeout(()=>{

        h.remove();

        createHeart();

    },14000);

}

/* Cursor Avoid for NO button */

document.addEventListener("mousemove",(e)=>{

const rect=no.getBoundingClientRect();

const dx=e.clientX-(rect.left+rect.width/2);

const dy=e.clientY-(rect.top+rect.height/2);

const dist=Math.sqrt(dx*dx+dy*dy);

if(dist<120){

moveButton();

}

});

/* Ending */

setTimeout(()=>{},1);

document
.getElementById("letterContent")
.addEventListener("click",()=>{

if(letter.length>0){

setTimeout(()=>{

showPage("ending");

},1500);

}

});