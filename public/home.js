const toggleSquareButton = (e) => {

    const squareButtons = document.getElementsByClassName('square_button')
    const keyWords = ['add', 'view', 'grow', 'report']

    for (y = 0; y < squareButtons.length; y++){
        squareButtons[y].anchor = keyWords[y]
    }

    for (x = 0; x < squareButtons.length; x++){
        squareButtons[x].classList.remove('square_button_active')
    }
    

    e.classList.add('square_button_active')

    const forms = []
    const addCandidateContainer = document.getElementById('add_candidate_container')
    const viewCandidatesContainer = document.getElementById('view_candidates_container')
    const growthTrackerContainer = document.getElementById('growth_tracker_container')
    forms.push(addCandidateContainer)
    forms.push(viewCandidatesContainer)
    forms.push(growthTrackerContainer)

    const deToggleForms = () => {
        for (x = 0; x < forms.length; x++) {
            forms[x].style.display = 'none'
        }
    }
    deToggleForms()

    switch (e.anchor){
        case 'add':
            addCandidateContainer.style.display = 'flex'
            break
        case 'view':
            viewCandidatesContainer.style.display = 'flex'
            break
        case 'grow':
            growthTrackerContainer.style.display = 'flex'
            break
        case 'report':
            break
    }
}

const showMoreInfo = (e) => {
    
    const moreInfoContainer = e.parentElement.parentElement.nextElementSibling
    const interviewToggleButtons = e.parentElement.parentElement.nextElementSibling.children[0].children
    for (x = 0; x < interviewToggleButtons.length; x++){
        interviewToggleButtons[x].style.backgroundColor = 'white'
        interviewToggleButtons[x].style.color = 'black'
    }
    const InterviewForms = []
    const phoneInterviewForm = e.parentElement.parentElement.nextElementSibling.children[1]
    const f2fInterviewForm = e.parentElement.parentElement.nextElementSibling.children[2]
    const finalInterviewForm = e.parentElement.parentElement.nextElementSibling.children[3]
    InterviewForms.push(phoneInterviewForm, f2fInterviewForm, finalInterviewForm)
    for (x = 0; x < InterviewForms.length; x++){
        InterviewForms[x].style.display = 'none'
    }

    switch (e.toggled){
        case undefined:
            e.toggled = true
            e.style.backgroundColor = '#E51636'
            e.style.color = 'white'
            moreInfoContainer.style.display = 'flex'
            break
        case true:
            e.toggled = false
            e.style.backgroundColor = 'white'
            e.style.color = '#E51636'
            moreInfoContainer.style.display = 'none'
            break
        case false:
            e.toggled = true
            e.style.backgroundColor = '#E51636'
            e.style.color = 'white'
            moreInfoContainer.style.display = 'flex'
            break
    }


}

const toggleHireAndReject = (e) => {
    switch (e.id){
        case 'hire_button':
            e.parentElement.nextElementSibling.style.display = 'flex'
            e.parentElement.nextElementSibling.nextElementSibling.style.display = 'none'
            e.style.backgroundColor = '#E51636'
            e.style.color = 'white'
            e.nextElementSibling.style.backgroundColor = 'white'
            e.nextElementSibling.style.color = "#E51636"
            break
        case 'reject_button':
            e.parentElement.nextElementSibling.style.display = 'none'
            e.parentElement.nextElementSibling.nextElementSibling.style.display = 'flex'
            e.style.backgroundColor = '#E51636'
            e.style.color = 'white'
            e.previousElementSibling.style.backgroundColor = 'white'
            e.previousElementSibling.style.color = '#E51636'
            break
        case 'cancel_button':
            e.parentElement.parentElement.style.display = 'none'
            document.getElementById('hire_button').style.backgroundColor = 'white'
            document.getElementById('hire_button').style.color = '#E51636'
            document.getElementById('reject_button').style.backgroundColor = 'white'
            document.getElementById('reject_button').style.color = '#E51636'
            break
    }
}

const hireCandidate = async (e) => {
    const body = document.getElementsByTagName('body')[0]
    const NODE_ENV = body.getAttribute('id')
    const candidateInfo = e.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.parentElement.parentElement
    console.log(candidateInfo)
    switch(NODE_ENV){
        case 'development':
            try{
                const url = 'http://localhost:5000/user/home/hire/' + String(e.id)
                const res = await fetch(url, {method: "PUT"})
                console.log(res)
                candidateInfo.remove()
            } catch (err) {
                console.log(err)
            }
            break
        default:
            try{
                const productionURL = 'https://frozen-atoll-38990.herokuapp.com/user/home/hire/' + String(e.id)
                const res = await fetch(productionURL, {method: "PUT"})
                console.log(res)
                candidateInfo.remove()
            } catch (err) {
                console.log(err)
            }
            break
    }
    
}

const rejectCandidate = async (e) => {
    const body = document.getElementsByTagName('body')[0]
    const NODE_ENV = body.getAttribute('id')
    const candidateInfo = e.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.parentElement.parentElement
    switch(NODE_ENV){
        case 'development':
            const url = 'http://localhost:5000/user/home/reject/' + String(e.id)
            try{
                const res = await fetch(url, {method: "PUT"})
                candidateInfo.remove()
                console.log(res)
            } catch (err) {
                console.log(err)
            }
            break
        default:
            const productionURL = 'https://frozen-atoll-38990.herokuapp.com/user/home/reject/' + String(e.id)
            try{
                const res = await fetch(productionURL, {method: "PUT"})
                console.log(res)
                candidateInfo.remove()
            } catch (err) {
                console.log(err)
            }
            break
    }
}

const positions = ['In Training', 'Team Member', 'Senior Team Member', 'Team Trainer', 'Team Leader', 'Senior Team Leader', 'Manager', 'Senior Manager', 'Director', 'Senior Director', 'Executive Director', 'Terminate Employee']

const toggleSaveChangesUp = (e) => {
    const positionElement = e.parentElement.parentElement.children[0]
    const currentPosition = positionElement.textContent
    const saveChanges = e.parentElement.parentElement.nextElementSibling
    let currentIndex = positions.indexOf(currentPosition)
    saveChanges.style.display = 'flex'
    if (currentIndex == positions.length-1){
        let newRole = positions[0]
        positionElement.textContent = newRole
        if (newRole == 'Terminate Employee'){
            e.parentElement.parentElement.nextElementSibling.children[0].textContent = "Terminate Employee"
        } else {
            e.parentElement.parentElement.nextElementSibling.children[0].textContent = "Save Changes"
        }
    } else {
        let newRole = positions[currentIndex+1]
        positionElement.textContent = newRole
        if (newRole == 'Terminate Employee'){
            e.parentElement.parentElement.nextElementSibling.children[0].textContent = "Terminate Employee"
        } else {
            e.parentElement.parentElement.nextElementSibling.children[0].textContent = "Save Changes"
        }
    }
}

const toggleSaveChangesDown = (e) => {
    const positionElement = e.parentElement.parentElement.children[0]
    const currentPosition = positionElement.textContent
    const currentIndex = positions.indexOf(currentPosition)
    const saveChanges = e.parentElement.parentElement.nextElementSibling
    saveChanges.style.display = 'flex'
    if (currentIndex == 0){
        let newRole = positions[positions.length-1]
        positionElement.textContent = newRole
        if (newRole == 'Terminate Employee'){
            e.parentElement.parentElement.nextElementSibling.children[0].textContent = "Terminate Employee"
        } else {
            e.parentElement.parentElement.nextElementSibling.children[0].textContent = "Save Changes"
        }
    } else {
        let newRole = positions[currentIndex-1]
        positionElement.textContent = newRole
        if (newRole == 'Terminate Employee'){
            e.parentElement.parentElement.nextElementSibling.children[0].textContent = "Terminate Employee"
        } else {
            e.parentElement.parentElement.nextElementSibling.children[0].textContent = "Save Changes"
        }
    }
}

const modifyEmployeeStatus = async (e) => {
    const newRole = e.parentElement.previousElementSibling.children[0].textContent
    e.parentElement.style.display = 'none'
    if (newRole == "Terminate Employee"){
        const finalTerminationContainer = e.parentElement.nextElementSibling
        finalTerminationContainer.style.display = 'flex'
    } else {
        const body = document.getElementsByTagName('body')[0]
        const NODE_ENV = body.getAttribute('id')
        switch(NODE_ENV){
            case 'development':
                try{
                    const url = 'http://localhost:5000/user/home/updateStatus/' + String(e.id) + '/' + newRole
                    const res = await fetch(url, {method: "PUT"})
                    console.log(res)
                } catch (err) {
                    console.log(err)
                }
                break
            default:
                try{
                    const productionURL = 'https://frozen-atoll-38990.herokuapp.com/user/home/updateStatus/' + String(e.id) + '/' + newRole
                    const res = await fetch(productionURL, {method: "PUT"})
                    console.log(res)
                } catch (err) {
                    console.log(err)
                }
        }
    }  
}

const finalTermination = async (e) => {
    const newRole = e.parentElement.parentElement.previousElementSibling.previousElementSibling.children[0].textContent
    const keyword = e.textContent
    const body = document.getElementsByTagName('body')[0]
    const NODE_ENV = body.getAttribute('id')
    switch (keyword) {
        case 'Yes':
            e.parentElement.parentElement.parentElement.remove()
            switch(NODE_ENV){
                case 'development':
                    const url = 'http://localhost:5000/user/home/updateStatus/' + String(e.name) + '/' + newRole
                    try{
                        const res = await fetch(url, {method: "PUT"})
                        console.log(res)
                    } catch (err) {
                        console.log(err)
                    }
                    break
                default:
                    const productionURL = 'https://frozen-atoll-38990.herokuapp.com/user/home/updateStatus/' + String(e.name) + '/' + newRole
                    try{
                        const res = await fetch(productionURL, {method: "PUT"})
                        console.log(res)
                    } catch (err) {
                        console.log(err)
                    }
                    break
            } 
            break
        case 'Cancel':
            e.parentElement.parentElement.style.display = 'none'
            e.parentElement.parentElement.previousElementSibling.style.display = 'flex'
            break
    }
}

const toggleInterview = (e) => {
    const allFormToggleButtons = e.parentElement.children
    const phoneInterviewForm = e.parentElement.nextElementSibling
    const f2fInterviewForm = e.parentElement.nextElementSibling.nextElementSibling
    const finalInterviewForm = e.parentElement.nextElementSibling.nextElementSibling.nextElementSibling
    for (x = 0; x < allFormToggleButtons.length; x++){
        allFormToggleButtons[x].style.backgroundColor = 'white'
        allFormToggleButtons[x].style.color = 'black'
    }
    e.style.backgroundColor = '#E51636'
    e.style.color = 'white'
    switch (e.textContent) {
        case "Phone Interview":
            f2fInterviewForm.style.display = 'none'
            finalInterviewForm.style.display = 'none'
            phoneInterviewForm.style.display = 'flex'
            break
        case "F2F Interview":
            f2fInterviewForm.style.display = 'flex'
            finalInterviewForm.style.display = 'none'
            phoneInterviewForm.style.display ='none'
            break
        case "Final Interview":
            finalInterviewForm.style.display = 'flex'
            f2fInterviewForm.style.display = 'none'
            phoneInterviewForm.style.display ='none'
            break
    }
}
