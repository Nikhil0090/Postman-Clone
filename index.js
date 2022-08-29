//Utility function to get DOM element from string
function getElementFromString(string) {
    let div = document.createElement('div')
    div.innerHTML = string
    return div.firstElementChild
}


//1// Initially hide the parametersBox
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';



//2 If user clicks on json radio, hide custom box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('parametersBox').style.display = 'none';
    document.getElementById('requestJsonBox').style.display = 'block';
})


// 3. If user clicks on customRadio , hide json box
let customRadio = document.getElementById('customRadio');
customRadio.addEventListener('click', () => {
    document.getElementById('parametersBox').style.display = 'block';
    document.getElementById('requestJsonBox').style.display = 'none';
})



//4. If the user click on + button , ad more parameters
//Initializing no of parameters
let parametersCount = 0;
let addParam = document.getElementById('addParam')
addParam.addEventListener('click', () => {
    let params = document.getElementById('params')

    let string = ` <div id="parametersBox">
                        <div class="form-row my-2">
                            <label for="url" class="col-sm-2 col-form-label">Parameter ${parametersCount + 2}</label>
                            <div class="col-md-4">
                                <input type="text" class="form-control" id="parameterKey${parametersCount + 2}" placeholder="Enter Parameter ${parametersCount + 2} Key">
                            </div>
                            <div class="col-md-4">
                                <input type="text" class="form-control" id="parameterValue${parametersCount + 2}" placeholder="Enter Parameter ${parametersCount + 2} Value">
                            </div>
                            <button  class="btn btn-primary deleteBtn">-</button>
                        </div>
                    </div>`

    parametersCount += 1;

    //5. Convert element string to DOM  node
    let paramElement = getElementFromString(string) //called utility function
    params.appendChild(paramElement)


    //6. Add event listeners to deleteBtn
    let deleteBtn = document.getElementsByClassName("deleteBtn")
    for (let item of deleteBtn) {
        item.addEventListener("click", (element) => {
            element.target.parentElement.remove();
        });
    }
})


// If user clicks on submit button 
let submit = document.getElementById('submit');
submit.addEventListener("click", () => {
    // Show please wait text when submit is clicked
    // document.getElementById("responseJsonText").value = "Please wait.. Fetching response...";
    document.getElementById('responsePrism').innerHTML = "Please wait.. Fetching response...";


    //Fetch all the values user has entered
    let url = document.getElementById('url').value;
    let requestType = document.querySelector('input[name="requestType"]:checked').value;
    let contentType = document.querySelector('input[name="contentType"]:checked').value;



    //If user has used custom params option instead if Josn, collect all the parameters in an object
    if (contentType == "custom") {
        data = {};
        for (let i = 0; i < parametersCount + 1; i++) {
            if (document.getElementById("parameterKey" + (i + 1)) != undefined) {
                let key = document.getElementById("parameterKey" + (i + 1)).value;
                let value = document.getElementById("parameterValue" + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById("requestJsonText").value;
    }
    // console.log(url);
    // console.log(requestType);
    // console.log(contentType);
    console.log("data is ", data);

    //If the reques type is get , invoke fetch api to create a get request
    if (requestType == "GET") {
        fetch(url,
            {
                method: "GET"
            }).then(response => response.text())
            .then((text) => {
                // document.getElementById('responseJsonText').value = text;
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();

            })
    }

    else {
        fetch(url,
            {
                method: "POST",
                body: data,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }).then(response => response.text())
            .then((text) => {
                // document.getElementById('responseJsonText').value = text
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();

            });
    }

});