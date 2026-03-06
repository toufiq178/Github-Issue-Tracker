// console.log("home");







const createElement = (arr) => {


    const htmlElement = arr.map(elem => `<span class="text-xs bg-yellow-100 text-gray-600 px-2 py-1 rounded-full"> ${elem} </span>`)
    return htmlElement.join(" ")

}

function togglingIssue(id) {


    const issueBtnContainer = document.querySelectorAll("#issue-btn-container  .btn")

    console.log(issueBtnContainer);

    issueBtnContainer.forEach(btn => {

        btn.classList.remove("btn-primary")

        if (btn.id == id) {

            btn.classList.add("btn-primary")

        }
    });
}



const loadAllIssue = async () => {

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();

    displayAllIssue(data.data)
}


const loadModalIssue = async (id) => {

    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const data = await res.json();

    displayModalIssue(data.data);

}



// all tree object
// {
//     "id": 37,
//     "title": "Improve mobile responsiveness",
//     "description": "Several pages are not mobile-friendly. Need to improve responsive design across the application.",
//     "status": "open",
//     "labels": [
//         "bug",
//         "help wanted"
//     ],
//     "priority": "medium",
//     "author": "mobile_mike",
//     "assignee": "emma_ui",
//     "createdAt": "2024-02-04T12:45:00Z",
//     "updatedAt": "2024-02-04T12:45:00Z"
// }


// modal object
// {
//     "id": 46,
//     "title": "Implement data backup system",
//     "description": "Set up automated daily backups of database with retention policy and restore procedures.",
//     "status": "open",
//     "labels": [
//         "enhancement"
//     ],
//     "priority": "high",
//     "author": "backup_bruce",
//     "assignee": "db_admin",
//     "createdAt": "2024-02-08T09:15:00Z",
//     "updatedAt": "2024-02-08T09:15:00Z"
// }



const displayAllIssue = (issues) => {
    
    
    const issueTab = document.getElementById("issue-card-container");
    issueTab.innerHTML = ""
    
    
    
    // 
    const priorityColor = {
        
        high: "bg-red-100 text-red-500",
        medium: "bg-yellow-100 text-yellow-500",
        low: "bg-green-100 text-green-500"
    }
    
    
    
    issues.forEach(issue => {
        
        // console.log(issue.labels);
        
        
        const div = document.createElement("div");
        
        
        // priority set 
        
        
        
        div.className = " bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
        
        div.innerHTML = `

                            <div onclick = "loadModalIssue(${issue.id})"  class="p-4  border-t-6  ${issue.status === "open" ? "border-green-600" : "border-purple-600"}">

                                <!-- Header -->
                                <div  class="flex justify-between items-start">


                                    <div id = "status-container">
                                    
                                        ${issue.status === "open" ?
                                            `<div  class="w-6 h-6 bg-green-100  rounded-full ">
                                                <img src="./assets/Open-Status.png" alt="">
                                            </div>`
                                            :
                                            `<div  class="w-6 h-6 bg-purple-100  rounded-full ">
                                                <img src="./assets/Closed-Status.png" alt="">
                                            </div>`
                                        }
                                                                       
                                    </div>




                                    <span class="text-xs font-semibold ${priorityColor[issue.priority]} px-2 py-1 rounded-full">
                                        ${issue.priority}
                                    </span>

                                </div>

                                <h3  class="font-semibold text-gray-800 text-sm mt-3 ">
                                    ${issue.title}
                                </h3>
                                <!-- Description -->
                                <p class="text-sm text-gray-500 mt-2 line-clamp-2">
                                    ${issue.description}
                                </p>

                                <!-- Tags -->
                                <div class="flex gap-2 mt-3 flex-wrap">

                                    ${createElement(issue.labels)}
                                    
                                </div>


                                <div class="border-t mt-4 pt-2 text-xs text-gray-400 space-y-2 ">
                                    <div class="">
                                        <p># ${issue.id} ${issue.author}</p>
                                        <p>${issue.createdAt}</p>
                                    </div>
                                    <div class="">
                                        <p>assignee : ${issue.assignee}</p>
                                        <p>update : ${issue.updatedAt}</p>
                                    </div>
                                </div>

                            </div>
        
        `
        

        
        issueTab.appendChild(div)
    });

}


const displayModalIssue = (modalIssue) => {

    // console.log(modalIssue);

    // priority set 
    const priorityColor = {

        high: "bg-red-100 text-red-500",
        medium: "bg-yellow-100 text-yellow-500",
        low: "bg-green-100 text-green-500"
    }

    const modalContainer = document.getElementById("modalContainer");
    modalContainer.innerHTML = `
        <dialog id="my_modal_1" class="modal">
                    <div class="modal-box">
                        <div class="p-6 space-y-5">
                            <h2 class="text-2xl font-bold text-gray-800">
                                ${modalIssue.title}
                            </h2>

                            <div class="flex items-center gap-3 mt-2 text-sm text-gray-500">
                                <div>
                                    
                                    ${modalIssue.status === "open" ?
            `<div  class="w-6 h-6 bg-green-100  rounded-full ">
                                        <img src="./assets/Open-Status.png" alt="">
                                    </div>`
            :
            `<div  class="w-6 h-6 bg-purple-100  rounded-full ">
                                        <img src="./assets/Closed-Status.png" alt="">
                                    </div>`}
                                                                       
                                </div>
                                <span>${modalIssue.status} by ${modalIssue.assignee}  </span>
                                <span>•</span>
                                <span>${modalIssue.createdAt}</span>
                            </div>

                            
                            <div class="flex gap-2 mt-3 flex-wrap">

                                    ${createElement(modalIssue.labels)}
                                    
                            </div>

                            
                            <p class="mt-4 text-gray-600">
                                ${modalIssue.description}
                            </p>

                            <div class="bg-gray-100 px-6 py-4 flex justify-between items-center">

                                <div class="flex gap-20">
                                    <div>
                                        <p class="text-sm text-gray-500">Assignee:</p>
                                        <p class="font-semibold">${modalIssue.assignee}</p>
                                    </div>

                                    <div>
                                        <p class="text-sm text-gray-500">Priority:</p>
                                        <span class="text-xs font-semibold ${priorityColor[modalIssue.priority]} px-2 py-1 rounded-full">
                                            ${modalIssue.priority}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-action">
                                <form method="dialog">
                                    
                                    <button class="btn btn-primary border-none">Close</button>
                                </form>
                            </div>
                        </div>
                </dialog>
    
    `
    document.getElementById("my_modal_1").showModal()

}


loadAllIssue()