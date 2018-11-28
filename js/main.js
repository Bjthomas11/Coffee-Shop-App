// hide preloader
// all the images scripts links have finished loading

eventListeners();
function eventListeners(){
    const ui = new UI()
    // window event listener
    window.addEventListener("load", function(){
        ui.hidePreloader();
    });

    // nav btn
    document.querySelector(".navBtn").addEventListener("click", function(){
        ui.showNavClass();
    });

    // control video toggle
    document.querySelector(".video_switch").addEventListener("click", function(){
        ui.videoControls();
    });
}

function UI(){

}

UI.prototype.hidePreloader = function(){
    document.querySelector(".preloader").style.display = "none";
}

UI.prototype.showNavClass = function(){
    document.querySelector(".nav").classList.toggle("nav-showClass");
}

UI.prototype.videoControls = function(){
    let btn = document.querySelector(".video_switch-btn");
    if(!btn.classList.contains("btnSlide")){
        btn.classList.add("btnSlide");
        document.querySelector(".video_item").pause();
    } else {
        btn.classList.remove("btnSlide"); 
        document.querySelector(".video_item").play();
    }
}

