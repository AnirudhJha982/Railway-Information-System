// =======================================
// Railway Assistant - script.js
// =======================================

// Loader
const form = document.getElementById("pnrForm");
const loader = document.getElementById("loader");
const checkBtn = document.getElementById("checkBtn");

if(form){

    form.addEventListener("submit",function(){

        loader.style.display="block";

        checkBtn.disabled=true;

        checkBtn.innerHTML="Checking...";

    });

}

// Clear Form

function clearForm(){

    document.getElementById("pnr").value="";

    document.getElementById("pnr").focus();

}

// Print Ticket

function printTicket(){

    window.print();

}

// Download PDF

function downloadPDF(){

    const ticket=document.getElementById("ticket");

    if(ticket){

        html2pdf(ticket,{

            margin:0.5,

            filename:"PNR_Status.pdf",

            image:{type:"jpeg",quality:1},

            html2canvas:{scale:2},

            jsPDF:{

                unit:"in",

                format:"a4",

                orientation:"portrait"

            }

        });

    }

}

// Hide Loader

window.onload=function(){

    if(loader){

        loader.style.display="none";

    }

}

// =============================
// Dark Mode
// =============================

function toggleDarkMode(){

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        localStorage.setItem("theme","dark");

    }

    else{

        localStorage.setItem("theme","light");

    }

}

window.addEventListener("load",function(){

    const theme=localStorage.getItem("theme");

    if(theme==="dark"){

        document.body.classList.add("dark");

    }

});

// =============================
// Search History
// =============================

function saveHistory(pnr){

    if(!pnr) return;

    let history=JSON.parse(localStorage.getItem("history"))||[];

    if(!history.includes(pnr)){

        history.unshift(pnr);

    }

    if(history.length>5){

        history.pop();

    }

    localStorage.setItem("history",JSON.stringify(history));

}

if(form){

    form.addEventListener("submit",function(){

        saveHistory(document.getElementById("pnr").value);

    });

}

function showHistory(){

    let history=JSON.parse(localStorage.getItem("history"))||[];

    if(history.length===0){

        toast("No Search History");

        return;

    }

    alert("Recent Searches:\n\n"+history.join("\n"));

}

// =============================
// Toast Message
// =============================

function toast(message){

    let t=document.createElement("div");

    t.className="toast";

    t.innerHTML=message;

    document.body.appendChild(t);

    setTimeout(()=>{

        t.classList.add("show");

    },100);

    setTimeout(()=>{

        t.remove();

    },3000);

}

// =============================
// PNR Validation
// =============================

const pnr=document.getElementById("pnr");

if(pnr){

pnr.addEventListener("input",function(){

this.value=this.value.replace(/[^0-9]/g,'');

});

}

// =============================
// Enter Key Animation
// =============================

document.addEventListener("keypress",function(e){

if(e.key==="Enter"){

if(checkBtn){

checkBtn.classList.add("clicked");

setTimeout(()=>{

checkBtn.classList.remove("clicked");

},300);

}

}

});

// =============================
// Welcome Toast
// =============================

window.addEventListener("load",()=>{

setTimeout(()=>{

toast("Welcome to Railway Assistant 🚆");

},500);

});