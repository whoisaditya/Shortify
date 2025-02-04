new fullpage('#fullpage', {
	//options here
	autoScrolling:true,
    scrollHorizontally: true,
    navigation:true,
    fadingEffect: true,
    fitToSectionDelay: 1000,
    navigationTooltips: ['Home', 'Uses','card'],
    anchors:['first', 'second','third'],
    scrollingSpeed:1000,
    onLeave: (origin,destination,direction)=>{
        const navLink = document.querySelectorAll("nav ul li");
        for(let i=0;i<navLink.length;i++) navLink[i].classList.remove('nav-active');
        navLink[destination.index].classList.add('nav-active');
        if(destination.index===2){
            document.querySelector(".paper-upper").classList.remove('effect');
        }
        if(destination.index===1){
            document.querySelector('.bar-graph').classList.add('bg-active');
            document.querySelectorAll('.cont')[0].classList.add('cont-active');
            document.querySelectorAll('.cont')[1].classList.add('cont-active');
            document.querySelector('.manage').classList.add('ma-active');
            document.getElementById("Vector_2").style.animation="V2 1s ease forwards 1.5s";
            document.getElementById("Vector_21").style.animation="start 0.5s ease forwards 1s";
            document.getElementById("Vector_22").style.animation="start 0.5s ease forwards 1.5s";
            (setTimeout(()=>{document.querySelector('#knowMore .arrow').classList.add('ar-active');},500));
        }
        if(destination.index===0){
            document.querySelector('.arrow').classList.add('ar-active');
        }
        if(origin.index===0){
            document.querySelector('.arrow').classList.remove('ar-active');
        }
        if(origin.index===1){
            document.querySelector('.bar-graph').classList.remove('bg-active');
            document.querySelectorAll('.cont')[0].classList.remove('cont-active');
            document.querySelectorAll('.cont')[1].classList.remove('cont-active');
            document.querySelector('.manage').classList.remove('ma-active');
            document.querySelector('#knowMore .arrow').classList.remove('ar-active');
            document.getElementById("Vector_2").style.animation="";
            document.getElementById("Vector_21").style.animation="";
            document.getElementById("Vector_22").style.animation="";
        }
        if(origin.index===2){
            document.querySelector(".paper-upper").classList.add('effect');
        }
    },
    afterRender:()=>{
        document.querySelector('#home h1 .head-h1').style.animation=`start 0.7s ease forwards`;
        document.querySelector('#home h1 .home-head').style.animation=`start 0.7s ease forwards 0.5s`;
        document.querySelector('#home button').style.animation=`start 0.7s ease forwards 0.8s`;
        document.querySelector('.cranes').classList.add('crane-start');
        document.querySelector('nav h1').style.animation=`startLink 0.7s ease forwards`
        document.querySelectorAll('nav>ul>li').forEach((link,index)=>{
                link.style.animation = `startLink 0.5s ease forwards ${index/7 + 0.2}s`
        });
        document.querySelector('.arrow').classList.add('ar-active');
    }
	
});
fullpage_api.setAllowScrolling(true);
let ctc = null;
let userId=null;
document.querySelector(".card-submit").addEventListener("click",function(){
    document.querySelector(".paper-upper").classList.toggle('effect');
    if(document.querySelector(".card-submit").innerHTML=="Try Again"){
        setTimeout(()=>{
            document.querySelector(".card-text").innerHTML="Enter your link here!";
            document.querySelector(".paper-lower input").readOnly = false;
            document.querySelector(".paper-lower input").value = "";
            ctc=null;
            document.querySelector(".card-submit").innerHTML="Submit";
            document.querySelector(".paper-upper").classList.toggle('effect');
        },1000)
    }
    else{
        var data = {
            "oldUrl":document.querySelector(".paper-lower input").value,
            "id":userId
        }
         console.log(data.oldUrl) 
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "https://git.heroku.com/codechef-shortify.git/generate/shortUrl");
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader("Authorization", "JWT "+userToken);
            xhr.send(JSON.stringify(data));
            xhr.onload=function() {
                  if(this.status==200 || this.status==201){
                    setTimeout(()=>{
                        let newData = JSON.parse(this.responseText)
                        document.querySelector(".card-text").innerHTML="Click on the link to copy";
                        document.querySelector(".paper-lower input").value = newData.shortUrl;
                        document.querySelector(".paper-lower input").readOnly = true;
                        ctc = document.querySelector('.c-to-c');
                        document.querySelector(".card-submit").innerHTML="Try Again";
                        document.querySelector(".paper-upper").classList.toggle('effect');
                    },0)
                  }
                  else{
                    let newData = JSON.parse(this.responseText)
                    document.querySelector(".card-text").innerHTML=newData.message;
                    document.querySelector(".paper-lower input").value = "";
                    ctc = document.querySelector('.c-to-c');
                    document.querySelector(".card-submit").innerHTML="Submit";
                    document.querySelector(".paper-upper").classList.toggle('effect');
                  }
              }
    }
});
const copyfn=()=>{
    var copyText = document.querySelector(".paper-lower input");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
}
document.querySelector('.cranes').addEventListener('mouseover',()=>{
    console.log('k')
    document.querySelector('.crane-start').style.animation='craneMove 1s ease infinite';
    document.querySelector('.wing').style.animation='wingMove 1s ease infinite'
})
document.querySelector('.cranes').addEventListener('mouseout',()=>{
    document.querySelector('.crane-start').style.animation='';
    document.querySelector('.wing').style.animation=''
})
const mobNavToggler = ()=>{
    const navLinks = document.querySelectorAll('nav ul li')
    document.querySelector('nav').classList.toggle('nv-active');
    document.querySelector('nav').classList.remove('nv-active-login');
    document.querySelector('.modal').classList.toggle('modal-active');
    document.querySelector('.hamburger').classList.toggle('ham-active');
    navLinks.forEach((link,index)=>{
        if(link.style.animation.includes('slideLink')){
            link.style.animation =''
        }
        else{
            link.style.animation = `slideLink 0.5s ease forwards ${index/7 + 0.5}s`
        }
    });
}
const mobNavMobile = ()=>{
    document.querySelector('nav.nv-active').classList.toggle('nv-active-login');
}
const navbar = ()=>{
    document.querySelector('.hamburger').addEventListener('click',()=>{
        mobNavToggler();
});
    document.querySelector('.modal').addEventListener('click',()=>{
        mobNavToggler();
});
    document.querySelector('.login').addEventListener('click',()=>{
        mobNavMobile();
    })
};

const local = ()=>{
    let user=JSON.parse(localStorage.getItem('userInfo'))
    
    let loginLi = document.querySelector(".login");
    console.log(user)
    if(user){
        userId=user._id
        userToken=JSON.parse(localStorage.getItem('userToken'))
        loginLi.innerHTML='<a href="#">'+user.name+'</a><ul><li><a href="./allUrl.html">My URLs</a></li><li class="login-drop">Logout</li></ul>';
        document.querySelector(".login-drop").addEventListener("click",()=>{
            localStorage.removeItem('userInfo');
            localStorage.removeItem('userToken');
            local();
        });
    }
    else{
        loginLi.innerHTML='<a href="./login.html">Login</a>'
    }

}
local();
navbar();