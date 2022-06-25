let bulletsYes = document.querySelector(".setting-box .show-bullets .yes"),
    bulletsNo = document.querySelector(".setting-box .show-bullets .no"),
    bulletsLinks = document.querySelector(".links");

// set links bullets from localstorage
if (localStorage.getItem("displayBullets") != null) {
    if (localStorage.getItem("displayBullets") == "block") {
        bulletsNo.classList.remove("active");
        bulletsYes.classList.add("active");
        bulletsLinks.style.display = "block";
    } else {
        bulletsYes.classList.remove("active");
        bulletsNo.classList.add("active");
        bulletsLinks.style.display = "none";
    };
};

// display bullets
bulletsYes.onclick = function () {
    bulletsNo.classList.remove("active");
    this.classList.add("active");
    bulletsLinks.style.display = "block";
    localStorage.setItem("displayBullets", "block");
};
bulletsNo.onclick = function () {
    bulletsYes.classList.remove("active");
    this.classList.add("active");
    bulletsLinks.style.display = "none";
    localStorage.setItem("displayBullets", "none");
};

// set color from localstorage
let jsMainColor = localStorage.getItem("color");
document.documentElement.style.setProperty('--mainColor', jsMainColor);
document.querySelectorAll(".setting-box .color-list li").forEach(function (e) {
    e.classList.remove("active");
    if (e.dataset.color == jsMainColor) {
        e.classList.add("active")
    };
});


// toggle settings menu
document.querySelector(".setting-box .icon i").onclick = function () {
    this.classList.toggle("fa-spin");
    document.querySelector(".setting-box").classList.toggle("left");
};


// change mainColor 
let colorlis = document.querySelectorAll(".setting-box .color-list li");
colorlis.forEach(e => {
    e.addEventListener("click", function () {
        document.documentElement.style.setProperty('--mainColor', this.dataset.color);
        localStorage.setItem("color", this.dataset.color);
        this.parentElement.querySelectorAll(".active").forEach(function (e) {
            e.classList.remove("active");
        });
        this.classList.add("active");
    })
});

// stop landing background img changing
let backInterval,
    backBoolean = true,
    spanYes = document.querySelector(".setting-box .random-back .yes"),
    spanNo = document.querySelector(".setting-box .random-back .no");

if (localStorage.getItem("backBoolean") !== null) {
    if (localStorage.getItem("backBoolean") === "true") {
        spanNo.classList.remove("active");
        spanYes.classList.add("active");
        backBoolean = true;
    } else {
        spanYes.classList.remove("active");
        spanNo.classList.add("active");
        backBoolean = false;
    };
};

spanYes.addEventListener("click", function () {
    spanNo.classList.remove("active");
    spanYes.classList.add("active");
    backBoolean = true;
    randomBack();
    localStorage.setItem("backBoolean", true);
});
spanNo.addEventListener("click", function () {
    spanYes.classList.remove("active");
    spanNo.classList.add("active");
    clearInterval(backInterval);
    backBoolean = false;
    localStorage.setItem("backBoolean", false);
});

// change landing background-image
let landing = document.querySelector(".landing"),
    landingArr =
        [
            "url('images/01.jpg')",
            "url('images/02.jpg')",
            "url('images/03.jpg')",
            "url('images/04.jpg')",
            "url('images/05.jpg')"
        ];

function randomBack() {
    if (backBoolean === true) {
        backInterval = setInterval(() => {
            landing.style.backgroundImage = landingArr[Math.floor(Math.random() * landingArr.length)];
        }, 10000);
    };
};

randomBack();

// fill span on scroll
let ourSkills = document.querySelector(".our-skills"),
    ourSkillsSpan = document.querySelectorAll(".our-skills span");
window.onscroll = function () {
    if (window.scrollY >= ourSkills.offsetTop - 170) {
        ourSkillsSpan.forEach(span => {
            span.style.width = span.dataset.width
        });
    };
};

// image overlay on click
let imgs = document.querySelectorAll(".gallery img");
imgs.forEach(i => {
    i.onclick = function () {
        let div = document.createElement("div"),
            imgPopup = document.createElement("div");
        div.classList.add("imgOverlay");
        imgPopup.classList.add("imgPopup");
        imgPopup.innerHTML = `<span class="exit">x</span><h2>${this.getAttribute("alt")}</h2><img src="${this.getAttribute("src")}" alt="${this.getAttribute("alt")}">`
        document.body.append(div);
        document.body.append(imgPopup);
    };
});

document.addEventListener("click", function (e) {
    if (e.target.className == "exit") {
        document.querySelector(".imgOverlay").remove();
        document.querySelector(".imgPopup").remove();
    };
});


// reset button
document.querySelector(".setting-box .reset").onclick = function () {
    document.querySelector(".setting-box .color-list li:first-child").click()
    spanYes.click();
    bulletsYes.click();
    localStorage.clear(); //or removeItem("string")
    // location.reload();
};

// toggle menu
let bugerIcon = document.querySelector(".landing .header .toggle-menu"),
    megaMenu = document.querySelector(".landing .header .toggle-menu ul");
bugerIcon.onclick = function (e) {
    e.stopPropagation();
    megaMenu.classList.toggle("show-menu");
};
megaMenu.onclick = function (e) {
    e.stopPropagation();
};

document.addEventListener("click", function (e) {
    if (e.target !== bugerIcon && e.target !== megaMenu) {
        if (megaMenu.classList.contains("show-menu")) {
            megaMenu.classList.remove("show-menu");
        };
    };
});


// form session storage
let inputName = document.querySelector(".contact-us .left #name"),
    inputPhone = document.querySelector(".contact-us .left input[type='number']"),
    inputEmail = document.querySelector(".contact-us .left input[type='email']"),
    inputText = document.querySelector(".contact-us .left #sub"),
    inputTextArea = document.querySelector(".contact-us .right textarea"),
    sessionArr = [inputName, inputPhone, inputEmail, inputText, inputTextArea];

sessionArr.forEach(input => {
    input.addEventListener("keyup", function () {
        sessionStorage.setItem(this.id, this.value);
    });
});

sessionArr.forEach(input => {
    input.value = sessionStorage.getItem(input.id);
});


// text area count down span
let countDownSapn = document.querySelector(".contact-us .right span");
inputTextArea.onkeyup = function () {
    countDownSapn.textContent = inputTextArea.getAttribute("maxlength") - inputTextArea.value.length;
};












/*// scroll to section pure js
let arr = document.querySelectorAll("element");

function scrollToSection (parr) {
    parr.forEach(el => {
        el.addEventListener("click", e => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior : "smooth"
            });
        });
    });
};
scrollToSection (arr);*/