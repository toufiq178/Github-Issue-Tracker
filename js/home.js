// console.log("home");

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



const displayAllIssue = (issues) => {

    
    const issueTab = document.getElementById("issue-card-container");
    issueTab.innerHTML = ""

    issues.forEach(issue => {

        console.log(issue);
        

        const div = document.createElement("div");
        div.className = " bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"

        div.innerHTML = `
        
            <div class="p-4  border-t-4 border-green-600">

                                <!-- Header -->
                                <div class="flex justify-between items-start">


                                    <div class="w-6 h-6 bg-green-100  rounded-full "> 


                                        <img src="./assets/Open-Status.png" alt="">
                                    </div>




                                    <span class="text-xs font-semibold bg-red-100 text-black-500 px-2 py-1 rounded-full">
                                        ${issue.priority}
                                    </span>

                                </div>

                                <h3 class="font-semibold text-gray-800 text-sm mt-3 ">
                                    ${issue.title}
                                </h3>
                                <!-- Description -->
                                <p class="text-sm text-gray-500 mt-2 line-clamp-2">
                                    ${issue.description}
                                </p>

                                <!-- Tags -->
                                <div class="flex gap-2 mt-3">
                                    <span class="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                                        BUG
                                    </span>

                                    <span class="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                                        HELP WANTED
                                    </span>
                                </div>


                                <div class="border-t mt-4 pt-2 text-xs text-gray-400 space-y-2 flex justify-between">
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

loadAllIssue()