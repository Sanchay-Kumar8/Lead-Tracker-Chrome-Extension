let myLead = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");

const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
// localStorage.setItem("myLeads", "www.examplelead.com")
//console.log(localStorage.getItem("myLead"))
//localStorage.clear()
const leadsfromLocalStorage = JSON.parse(localStorage.getItem("myLead"));
const tabBtn = document.getElementById("tab-btn");

if(leadsfromLocalStorage){
    myLead = leadsfromLocalStorage
    render(myLead)
}


tabBtn.addEventListener("click",function(){
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    myLead.push(tabs[0].url)
    localStorage.setItem("myLead",JSON.stringify( myLead ))
    render(myLead)         
    })
})

function render(leads) {
    let listItems = "";
        for(let i = 0 ; i < leads.length; i++){
            //ulEl.innerHTML += "<li>" + myLead[i] + "</li>"
            //listItems += "<li><a target = '_blank' href = '"+myLead[i] + "'>" + myLead[i] + "</a></li>";
            listItems += `
            <li>
                <a target = '_blank' href = '${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>`
            
            // const li = document.createElement("li");
            // li.textContent = myLead[i];
            // ulEl.append(li);
        }
        ulEl.innerHTML = listItems;
}


deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLead = [];
    render(myLead);
})

inputBtn.addEventListener("click",function() {
    
    myLead.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLead",JSON.stringify(myLead));
    
    render(myLead);
});




