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

    // submit form
    document.querySelector(".drink-form").addEventListener("submit", function(e){
        e.preventDefault();
        const name = document.querySelector(".input-name").value;
        const lastName = document.querySelector(".input-lastName").value;
        const email = document.querySelector(".input-email").value;

        let value = ui.checkEmpty(name, lastName, email);

        if(value){
            let customer = new Customer(name, lastName, email)
            ui.showFeedback("Customer added to the list", "success");
            console.log(customer);
            ui.addCustomer(customer);
            ui.clearInputFields();
        } else {
            ui.showFeedback("Some form values are empty", "error");
        }
    })

    // display modal
    const links = document.querySelectorAll(".work-item_icon");
    // event listener for all icon links using for each value
    links.forEach(function(item){
        item.addEventListener("click", function(e){
            ui.showModal(e);
        })
    });

    // close modal
    document.querySelector(".work-modal_close").addEventListener("click", function(){
        ui.closeModal();
    })
}


// constructor function
function UI(){

}

// hide preloader
UI.prototype.hidePreloader = function(){
    document.querySelector(".preloader").style.display = "none";
}

// show nav
UI.prototype.showNavClass = function(){
    document.querySelector(".nav").classList.toggle("nav-showClass");
}

// play/pause video
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

// check for empty values
UI.prototype.checkEmpty = function(name, lastName, email){
    let result;
    if(name === "" || lastName === "" || email === ""){
        result = false;
    } else {
        result = true;
    }
    return result;
}

// show feedback function
UI.prototype.showFeedback = function(text, type){
    const feedback = document.querySelector(".drink-form_feedback");
    if(type === "success"){
        feedback.classList.add("success");
        feedback.innerText = text;
        this.removeAlert("success");
    } else if (type === "error"){
        feedback.classList.add("error");
        feedback.innerText = text;
        this.removeAlert("error");
    }
}

// remove alert
UI.prototype.removeAlert = function(type){
    setTimeout(function(){
        document.querySelector(".drink-form_feedback").classList.remove("error");
    }, 3000);
}

// add customer to UI Object
UI.prototype.addCustomer = function(customer){
    const imagesArray = [1,2,3,4,5];
    let random = Math.floor(Math.random() * imagesArray.length);
    console.log(random);
    const div = document.createElement("div");
    div.classList.add("person");
    div.innerHTML = `
        <img src="img/person-${random}.jpeg" class="person_thumbnail" alt="person">
        <h4 class="person_name">${customer.name}</h4>
        <h4 class="person_last-name">${customer.lastName}</h4>
    `;
    document.querySelector(".drink-card_list").appendChild(div);
}

// clear input fields
UI.prototype.clearInputFields = function(){
    document.querySelector(".input-name").value = "";
    document.querySelector(".input-lastName").value = "";
    document.querySelector(".input-email").value = "";
}

// show modal
UI.prototype.showModal = function(e){
    e.preventDefault();
    if(e.target.parentElement.classList.contains("work-item_icon")){
        let id = e.target.parentElement.dataset.id;
        // console.log(id);
        const modal = document.querySelector(".work-modal");
        const modalItem = document.querySelector(".work-modal_item");
        modal.classList.add("work-modal-show");
        modalItem.style.backgroundImage = `url(img/work-${id}.jpeg)`;
    }
}

// close modal
UI.prototype.closeModal = function(){
    document.querySelector(".work-modal").classList.remove("work-modal-show");
}

// customer object construction
function Customer(name, lastName, email){
    this.name = name,
    this.lastName = lastName,
    this.email = email;
}



