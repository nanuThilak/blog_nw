const signInNowEle = document.getElementById("signInNow")
const signUpNowEle = document.getElementById("signUpNow")
const signUpUserNameEle = document.getElementById("userName");
const signUpEmailEle = document.getElementById("email");
const signUpPasswordEle = document.getElementById("password");
const signUpCPasswordEle = document.getElementById("confirmPassword");
const signUpDateEle = document.getElementById("dateOfBirth");
const termsAConditionsEle = document.getElementById("termsConditions");
const signUpBtnEle = document.querySelector("#signup_btn");
const signupMessage = document.getElementsByClassName("input_wrapper")
const tAC_wrapper = document.getElementById("tAC_wrapper")
const formErrorEle = document.getElementById("formError")
const profileImgEle = document.getElementById("profileImg")
const profileInpEle = document.getElementById("profileInp")
const maleEle = document.getElementById("male")
const femaleEle = document.getElementById("female")

const modelBackDropEle = document.getElementById("staticBackdrop")
const navCurrentUser = document.getElementById("nav_currentUser")
const signInModel = document.querySelector(".launch_btn");
const signupFormEle = document.querySelector("#signUpForm");
const signInFormEle = document.querySelector("#signInForm");
const signInBtnEle = document.getElementById("signin_btn");

const signInUserEmailEle = document.getElementById("signIn_email");
const signInUserPasswordEle = document.getElementById("signIn_password");
const signInFullFormError = document.getElementById("signin_full_form_error")

const loginUserNav = document.querySelector(".login_user");
const loginUserImg = document.querySelector(".login_user_img")

const logoutBtnEle = document.getElementById("confirmLogout") 

const blogContainerEle = document.getElementById("blog_container");
const blogModelBtnEle = document.getElementById("blog_model_btn");
const addBlocksSecEle = document.getElementById("allBlogs");
const addBlocksSec2Ele = document.getElementById("allBlogs2");
const preventScrollUserBlockSecEle = document.getElementById("prevent_scroll");
const blogHeadingEle = document.getElementById("blog_heading");
const blogContentEle = document.getElementById("blog_text");
const addBlogBtnEle = document.getElementById("addBlog");
const blogImgInputEle = document.getElementById("blog_img");
const updateBlogBtnEle = document.getElementById("editBlog");
const blogFormEle = document.getElementById("blog_form");

let signUpUsers = JSON.parse(localStorage.getItem("users")) || [];
let currentLoginUser = JSON.parse(getCookie("loginUser") || "{}");

function addingBlog() {
    signUpUsers = JSON.parse(localStorage.getItem("users")) || [];
    currentLoginUser = JSON.parse(getCookie("loginUser") || "{}");

    const allBlogs = JSON.parse(localStorage.getItem("blogs") || "[]");

    if (currentLoginUser.userName && allBlogs) {
        addBlocksSecEle.innerHTML = "";
        addBlocksSec2Ele.innerHTML = "";
        preventScrollUserBlockSecEle.innerHTML = "";
        blogContainerEle.classList.remove("active_ele");
        navCurrentUser.classList.remove("active_ele")

        const loginUserBlogs = allBlogs.filter(
            (b) => b.userName === currentLoginUser.userName
        );

        for (let i = 0; i < loginUserBlogs.length; i++) {
            const br = document.createElement("br");
            const editBtn = document.createElement("button");
            editBtn.classList.add("btn", "btn-secondary", "btn-sm");
            editBtn.setAttribute("data-bs-toggle", "modal");
            editBtn.setAttribute("data-bs-whatever", "@mdo");
            editBtn.setAttribute("data-bs-target", "#exampleModal");
            editBtn.setAttribute("data-id", loginUserBlogs[i].id);

            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("btn", "btn-danger", "btn-sm");
            deleteBtn.style.marginRight = "20px";
            deleteBtn.setAttribute("data-id", loginUserBlogs[i].id);

            const divCardFooter = document.createElement("div");
            divCardFooter.classList.add("card-footer");
            editBtn.innerText = "Edit";
            deleteBtn.innerText = "Delete";

            divCardFooter.append(deleteBtn);
            divCardFooter.appendChild(editBtn);

            const divCard = document.createElement("div");
            divCard.classList.add("card", "individual_blog");

            const divImg = document.createElement("div");
            divImg.classList.add("img_wrapper");

            const img = document.createElement("img");
            img.src = loginUserBlogs[i].imgUrl;

            img.setAttribute("alt", "blogImg");
            divImg.append(img);

            const spanEleUserName = document.createElement("span");
            const spanDateEle = document.createElement("span");

            spanEleUserName.style.fontSize = "12px";
            spanEleUserName.style.color = "gray";
            spanEleUserName.innerText = ` Author: ${loginUserBlogs[i].userName}`;
            spanDateEle.style.fontSize = "12px";
            spanDateEle.style.color = "gray";
            spanDateEle.innerText = ` Date: ${loginUserBlogs[i].blogDate}`;

            const divCardBody = document.createElement("div");
            divCardBody.classList.add("card-body");
            const h5CardHeading = document.createElement("h5");
            h5CardHeading.classList.add("card-title");
            h5CardHeading.innerText = loginUserBlogs[i].blogHeading;
            h5CardHeading.append(br);
            h5CardHeading.appendChild(spanEleUserName);
            h5CardHeading.appendChild(spanDateEle);

            const pCardContent = document.createElement("p");
            pCardContent.classList.add("card-text");
            pCardContent.innerText = loginUserBlogs[i].blogContent;
            divCardBody.append(h5CardHeading, pCardContent);

            divCard.append(divImg);
            divCard.appendChild(divCardBody);
            divCard.appendChild(divCardFooter);

            preventScrollUserBlockSecEle.append(divCard);

            deleteBtn.onclick = function (e) {
                const deleteId = e.target.getAttribute("data-id");
                console.log(allBlogs);
                const filterBlogs = allBlogs.filter((b) => {
                    return b.id !== deleteId;
                });
                console.log(filterBlogs);
                localStorage.removeItem("blogs");
                localStorage.setItem("blogs", JSON.stringify(filterBlogs));
                addingBlog();
            };

            editBtn.onclick = function (e) {
                const editId = e.target.getAttribute("data-id");
                const currentBlog = allBlogs.filter((b) => {
                    return b.id === editId;
                });

                blogHeadingEle.value = currentBlog[0].blogHeading;
                blogContentEle.value = currentBlog[0].blogContent;

                addBlogBtnEle.classList.add("active_ele");
                updateBlogBtnEle.classList.remove("active_ele");

                let imgUrl;

                blogImgInputEle.addEventListener("change", (e) => {
                    console.log("hi");
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.onload = function (event) {
                        const base64String = event.target.result;
                        imgUrl = base64String;
                    };
                    reader.readAsDataURL(file);
                });

                updateBlogBtnEle.onclick = function () {
                    const filterBlogs = allBlogs.filter((b) => {
                        return b.id !== editId;
                    });
                    const blogHeading = blogHeadingEle.value;
                    const blogContent = blogContentEle.value;
                    const id = crypto.randomUUID();

                    filterBlogs.push({
                        id,
                        userName: currentBlog[0].userName,
                        blogDate: currentBlog[0].blogDate,
                        blogHeading: blogHeading,
                        blogContent: blogContent,
                        imgUrl,
                    });

                    localStorage.removeItem("blogs");
                    localStorage.setItem("blogs", JSON.stringify(filterBlogs));
                    blogFormEle.reset();
                    addingBlog();
                };
            };
        }
    } else {
        addBlocksSecEle.innerHTML = "";
        preventScrollUserBlockSecEle.innerHTML = "";
        addBlocksSec2Ele.innerHTML = "";
        blogContainerEle.classList.add("active_ele");

        for (let i = 0; i < allBlogs.length; i++) {
            const divCard = document.createElement("div");
            divCard.classList.add("card", "individual_blog");
            const br = document.createElement("br");

            const divImg = document.createElement("div");
            divImg.classList.add("img_wrapper");

            const img = document.createElement("img");
            img.src = allBlogs[i].imgUrl;

            img.setAttribute("alt", "blogImg");
            divImg.append(img);

            const spanEleUserName = document.createElement("span");
            const spanDateEle = document.createElement("span");

            spanEleUserName.style.fontSize = "12px";
            spanEleUserName.style.color = "gray";
            spanEleUserName.innerText = ` Author: ${allBlogs[i].userName}`;
            spanDateEle.style.fontSize = "12px";
            spanDateEle.style.color = "gray";
            spanDateEle.innerText = ` Date: ${allBlogs[i].blogDate}`;

            const divCardBody = document.createElement("div");
            divCardBody.classList.add("card-body");
            const h5CardHeading = document.createElement("h5");
            h5CardHeading.classList.add("card-title");
            h5CardHeading.innerText = allBlogs[i].blogHeading;
            h5CardHeading.append(br);
            h5CardHeading.appendChild(spanEleUserName);
            h5CardHeading.appendChild(spanDateEle);

            const pCardContent = document.createElement("p");
            pCardContent.classList.add("card-text");
            pCardContent.innerText = allBlogs[i].blogContent;
            divCardBody.append(h5CardHeading, pCardContent);

            divCard.append(divImg);
            divCard.appendChild(divCardBody);
            addBlocksSecEle.appendChild(divCard);
            addBlocksSec2Ele.appendChild(divCard.cloneNode(true));
        }
    }
}

function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + d.toUTCString();
    document.cookie =
        name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
}

function getCookie(name) {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split("; ");
    for (let c of cookies) {
        const [key, value] = c.split("=");
        if (key === name) return value;
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}



if (currentLoginUser.userName) {
    loginUserNav.textContent = `Hi, ${currentLoginUser.userName}`;
    signInModel.classList.add("active_ele");
    blogModelBtnEle.classList.remove("active_ele");
}

signUpNowEle.onclick = function () {
    signupFormEle.classList.remove("active_ele")
    signInFormEle.classList.add("active_ele")
}



signInNowEle.onclick = function () {
    signupFormEle.classList.add("active_ele")
    signInFormEle.classList.remove("active_ele")

}

let profile
profileInpEle.addEventListener("change", (e) => {
    const file = e.target.files[0];
    profileImgEle.src = URL.createObjectURL(file)
    const reader = new FileReader();
    reader.onload = function (event) {
        const base64String = event.target.result;
        profile = base64String;
    };
    reader.readAsDataURL(file);


});


signUpBtnEle.addEventListener("click", function (e) {
    e.preventDefault();
    // const modelEle = document.getElementById('model_main')
    // const backDrop = document.querySelector(".modal-backdrop")
    // const staticBackdrop = document.getElementById("staticBackdrop")

    const userName = signUpUserNameEle.value;
    const email = signUpEmailEle.value;
    const password = signUpPasswordEle.value;
    const cPassword = signUpCPasswordEle.value;
    const dateOfBirth = signUpDateEle.value;
    profile ? profile : profile = undefined
    let gender


    if (femaleEle.checked) {
        gender = femaleEle.value
    }
    else if (maleEle.checked) {
        gender = maleEle.value
    }


    if (!userName) {
        signUpUserNameEle.setAttribute("placeholder", "Please Enter Your Name!")
        signupMessage[3].classList.add("error")
        return;
    }
    else {
        signUpUserNameEle.setAttribute("placeholder", "Name")
        signupMessage[3].classList.remove("error")
    }



    if (!email) {
        signUpEmailEle.setAttribute("placeholder", "Please Enter Your Email!")
        signupMessage[4].classList.add("error")
        return

    }
    else {
        signUpEmailEle.setAttribute("placeholder", "Email")
        signupMessage[4].classList.remove("error")
    }

    if (!password) {
        signUpPasswordEle.setAttribute("placeholder", "Please Enter Your Password!")
        signupMessage[5].classList.add("error")
        return

    }
    else {
        signUpPasswordEle.setAttribute("placeholder", "Password")
        signupMessage[5].classList.remove("error")
    }

    if (!cPassword) {
        signUpCPasswordEle.setAttribute("placeholder", "Re-Enter Your Password!")
        signupMessage[6].classList.add("error")
        return

    }
    else {
        signUpCPasswordEle.setAttribute("placeholder", "Confirm Password!")
        signupMessage[6].classList.remove("error")
    }

    if (!dateOfBirth) {
        signupMessage[7].classList.add("error")
        return

    }
    else {
        signupMessage[7].classList.remove("error")
    }
    if (!gender) {
        signupMessage[8].classList.add("error")

        return
    }
    else {
        signupMessage[8].classList.remove("error")

    }

    if (!termsAConditionsEle.checked) {
        tAC_wrapper.style.border = "1px solid red"
        return;
    }
    else {
        tAC_wrapper.style.border = "none"
    }

    if (password !== cPassword) {
        signupMessage[5].classList.add("error")
        signupMessage[6].classList.add("error")
        formErrorEle.innerText = "Password And Confirm Password Doesn't Match!"

        return;
    }
    else {
        signUpPasswordEle.setAttribute("placeholder", "Password")
        signupMessage[5].classList.remove("error")
        signUpCPasswordEle.setAttribute("placeholder", "Confirm Password")
        signupMessage[6].classList.remove("error")
    }


    if (password.length < 6) {
        formErrorEle.innerText = "Password Must Be 6 Charectors Long!"
        signupMessage[5].classList.add("error")
        return

    }
    else {
        formErrorEle.innerText = ""
        signupMessage[5].classList.remove("error")

    }

    const emailExists = signUpUsers.some((user) => user.email === email);

    if (emailExists) {
        formErrorEle.innerText = "Email Was Already Registered Please SignIn!"
        return;
    }
    else {
        formErrorEle.innerText = ""

    }

    signInModel.classList.add("active_ele");

    signUpUsers.push({ profile, userName, email, password, dateOfBirth, gender });
    localStorage.setItem("users", JSON.stringify(signUpUsers));

    deleteCookie("loginUser");
    setCookie(
        "loginUser",
        JSON.stringify({ userName, email, dateOfBirth, gender }),

    );
    let currentLoginUser = JSON.parse(getCookie("loginUser") || "{}");

    profileImgEle.src = "./img/user.png"
    loginUserNav.textContent = `Hi, ${currentLoginUser.userName}`;
    loginUserImg.src = profile
    blogModelBtnEle.classList.remove("active_ele");
    navCurrentUser.classList.remove("active_ele")
    signupFormEle.reset();

    // modelEle.classList.add("active_ele")
    // backDrop.style.display = "none"
    // staticBackdrop.style.display = "none"
    addingBlog();

    return;
});

signInBtnEle.addEventListener("click", function (e) {
    e.preventDefault();

    const email = signInUserEmailEle.value;
    const password = signInUserPasswordEle.value;

    if (!email) {
        signInUserEmailEle.setAttribute("placeholder", "Please Enter Your Email!")
        signupMessage[0].classList.add("error")
        return;
    }
    else {
        signUpUserNameEle.setAttribute("placeholder", "Email")
        signupMessage[0].classList.remove("error")
    }
    if (!password) {
        signInUserPasswordEle.setAttribute("placeholder", "Please Enter Your Password!")
        signupMessage[1].classList.add("error")
        return;
    }
    else {
        signUpUserNameEle.setAttribute("placeholder", "Password")
        signupMessage[1].classList.remove("error")
    }

    const user = signUpUsers.find(
        (u) => u.email === email
    );
    if (!user) {
        signInFullFormError.innerText = "User Not Found Please SignUp!"
        return
    }
    else {
        signInFullFormError.innerText = ""

    }

    if (user.password !== password) {
        signInFullFormError.innerText = "Invalid credentials!"
        return;
    } else {
        signInFullFormError.innerText = ""

    }
    console.log(user)
    deleteCookie("loginUser");
    setCookie(
        "loginUser",
        JSON.stringify({
            userName: user.userName,
            email: user.email,
            gender: user.gender,
            dateOfBirth: user.dateOfBirth
        })
    );
    let currentLoginUser = JSON.parse(getCookie("loginUser") || "{}");
    loginUserNav.textContent = `Hi, ${currentLoginUser.userName}`;
    loginUserImg.src = user.profile

    signInFormEle.reset();
    signInModel.classList.add("active_ele");
    loginUserNav.classList.remove("active_ele");
    blogModelBtnEle.classList.remove("active_ele");
    
    addingBlog();


    return;
});

logoutBtnEle.addEventListener("click", function () {
    deleteCookie("loginUser");
    let currentLoginUser = JSON.parse(getCookie("loginUser") || "{}");
    if (!currentLoginUser.userName) {
        loginUserNav.textContent = "";
        signInModel.classList.remove("active_ele");
        blogModelBtnEle.classList.add("active_ele");


        addingBlog();

    }
    return;
});

blogModelBtnEle.addEventListener("click", function (e) {
    blogFormEle.reset();

    updateBlogBtnEle.classList.add("active_ele");
    addBlogBtnEle.classList.remove("active_ele");
    currentLoginUser = JSON.parse(getCookie("loginUser") || "{}");
    e.preventDefault();

    let imgUrl;

    blogImgInputEle.addEventListener("change", (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function (event) {
            const base64String = event.target.result;
            imgUrl = base64String;
        };
        reader.readAsDataURL(file);
    });

    addBlogBtnEle.onclick = function (e) {
        e.preventDefault();

        const blogHeading = blogHeadingEle.value;
        const blogContent = blogContentEle.value;
        const id = crypto.randomUUID();
        const date = new Date();
        const m = date.getMonth();
        const d = date.getDate();
        const y = date.getFullYear();
        const blogDate = ` ${d}/${m + 1}/${y}`;
        const myBlogs = JSON.parse(localStorage.getItem("blogs") || "[]");
        myBlogs.push({
            id,
            userName: currentLoginUser.userName,
            blogDate,
            blogHeading,
            blogContent,
            imgUrl,
        });

        localStorage.removeItem("blogs");
        localStorage.setItem("blogs", JSON.stringify(myBlogs));
        addBlocksSecEle.innerHTML = "";
        addBlocksSec2Ele.innerHTML = "";
        preventScrollUserBlockSecEle.innerHTML = "";
        addingBlog();
        blogFormEle.reset();
    };
});

addingBlog();
