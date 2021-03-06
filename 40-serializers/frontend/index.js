const sideBarDiv = document.querySelector("#sidebar")
const classroomContainer = document.querySelector("#classrooms")
const classroomsListUl = classroomContainer.querySelector(".list-group")
const gradesTable = document.querySelector("#grade_table")


let showLoginForm = () => {
    sideBarDiv.innerHTML = ""
    
    let loginForm = document.createElement("form")
        loginForm.classList.add("centered")

    let usernameDiv = document.createElement('div')
        usernameDiv.className = "form-group"
    let usernameLabel = document.createElement("label")
        usernameLabel.htmlFor = "username"
        usernameLabel.innerText = "Username"

    let usernameInput = document.createElement("input")
        usernameInput.type = "text"
        usernameInput.className = "form-control"
        usernameInput.id = "username"
        usernameInput.placeholder = "Enter Username"
        usernameInput.autocomplete = "off"

    usernameDiv.append(usernameLabel, usernameInput)
    
    let submitButton = document.createElement('button')
        submitButton.type = "submit"
        submitButton.className = "btn btn-primary"
        submitButton.innerText = "Login"

    loginForm.append(usernameDiv, submitButton)
  
    sideBarDiv.append(loginForm)
    loginForm.addEventListener("submit", handleLoginForm)

}   

let handleLoginForm = (evt) => {
    evt.preventDefault()
    let email = evt.target.username.value
    fetch("", {})
        .then(res => res.json())
        .then(response => {
            if(response.id){
                showTeacherInformation(response)
            } else {
                console.log(response)
            }

        })
}

fetch("http://localhost:3000/teachers/2")
    .then(res => res.json())
    .then((singleTeacher) => {
        console.log(singleTeacher)
        showTeacherInformation(singleTeacher)
    })



// ------------ WHAT TO DO WITH TEACHER RESPONSE ------------
let showTeacherInformation = (teacher) => {
    setSideBar(teacher)
    setClassrooms(teacher)
}

// ------------ SET SIDE BAR AFTER LOGIN ------------

let setSideBar = (teacher) => {
    sideBarDiv.innerHTML = ""
    let teacherUsername = document.createElement("p")
        teacherUsername.className = "font-weight-bold text-center"
        teacherUsername.innerText = `Logged in as ${teacher.name}`
    
    let logOutButton = document.createElement("button")
        logOutButton.className = "btn btn-danger"
        logOutButton.innerText = "Logout"
    
    sideBarDiv.append(teacherUsername, logOutButton)
    logOutButton.addEventListener("click", (evt) => {
        logOut()
    })
}

let logOut = () => {
    showLoginForm()
    classroomContainer.innerHTML = ""
    gradesTable.innerHTML = ""
}


// ------------ SET MAIN CONTAINER AFTER LOGIN ------------
let setClassrooms = (teacher) => {
    classroomsListUl.innerHTML = ""
    teacher.classrooms.forEach(makeClassroomLi)
}

let makeClassroomLi = (classroom) => {

    let classroomLi = document.createElement("li")
        classroomLi.className = "list-group-item d-flex justify-content-between align-items-center"
    let classroomSpan = document.createElement("span")
        classroomSpan.className = "badge badge-primary badge-pill"
        classroomSpan.innerText = classroom.assignments.length

    classroomLi.append(classroom.name, classroomSpan)

    classroomsListUl.append(classroomLi)

    classroomLi.addEventListener("click", (evt) => {
        gradesTable.innerText = `SHOW ASSIGNMENTS FOR ${classroom.name}`
    })

}




showLoginForm()