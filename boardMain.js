(function () { //Onload flow.
    let index=0;
    

   getTasksArrayFromLocalStorage()
//On page load GET tasksArray that might be on stored from befor.
        if (tasksArray == null)
        {//if ther are no saved tasks? make place for new, using 'Constractor'.
        tasksArray = new Array;
        }
   displayTasksOnBoard();
//Display on load, Tasks from storage or NOT if there isn't display "blank".
})();

function onAddClick() {//Main flow start.
  let task = getTaskFromUI();//extract task Object made from UI data.
 
    
    if (!isValidUI(task)) 
    {//"you shall NOT pass!".
    //Checks the boolean outcome value ,Is task attributes holds valid data.
    return;
    }//Getting here means task is good for use.
    
    updateArray(task);
    //CallBack to func: gets {Object} argument and save it in [{ArrayObjects},{...}].

    clearInputs();
    //cleaning the UI fields after getting the data confirmed and saved.

    setArrayStrLocalStorage(tasksArray);
    //Function do: get argument [{tasks},{Array},{Objects}]
    //Convert to 'JSON', for storring in localStorage.

    getTasksArrayFromLocalStorage();
    //Taking Array out of storage by 'KEY' reference,
    //converting from JSON format 'string' back to Array of 'logical' Objects is requiered. 

    displayTasksOnBoard();
    //Update the client view, with new Task DOM Object on screen.
} 

function getTaskFromUI() 
{//Gets data from client side.
    let task = {//"task" is an object made of UI entered values.
                    id: index,//use 'index' as 'ID' for easy access.
                    mission: document.getElementById("missionInput").value,
                    date: document.getElementById("dateInput").value,
                    time: document.getElementById("timeInput").value
                };
    index++;//Counter as ID making them Unique.
    return task;
    //Function OUTcome : full Object holds values as attributes.
}

function updateArray(task) 
{//Gets 'task' as argument and turns 'tasksArray' as outcome.
    tasksArray.push(task);//Save object 'task' in 'tasksArray' of (Objects).
    return tasksArray;
    //Updated array..
}

function setArrayStrLocalStorage() {
    localStorage.setItem("allTasks", JSON.stringify(tasksArray));//save [{tasks},{Array},{Objects}] as 'JSON String'.
    // 'Value'  in  'Storage'.
    //   with    a    'Key'. 
}

function isValidUI(task)
 {//Asks given 'object' are you bolean laying by setting some Conditions  ? MUST BE TRUE TO CONTINUE...(פה חשדתי!) 
    var valid = true;
    initBackgroundInputs();
    //Starting data test as 'true', initilazed fields. 
    if (!task.mission) {//Condition : text input("mission") MUST have Value.
        document.getElementById("missionInput").style.backgroundColor="red";
        //Set to 'red' so client notice, the field that is BAD.
        alert("Write down your task first !");
        valid = false;
        //NOT cool data wont pass this conditions.  
    }
    if (!task.date) {//Condition : Must have date at all.
        document.getElementById("dateInput").style.backgroundColor="red";
        alert("date is requierd !");
        //Making sure client notice,  Field is BAD & i'll Be MAD get 'red' And Shout at him!! ;)
        valid = false;
    }
    if (new Date() > new Date(task.date)){//Date input must not be past already.
        document.getElementById("dateInput").style.backgroundColor="red";
        alert("Date value is Wrong!");//'Mad-and-Red'
        valid = false;
    }
    if (!task.time) {//just kidding.
        alert("Time is fiction! dont be late..!");
    }
    return valid;
}

function displayTasksOnBoard() 
{
    let tasksOnBoard = document.getElementById("tasksOnBoard");
    //'tasksOnBoard' pointer for area where displayed Tasks placed. 
    tasksOnBoard.innerHTML = "";
    //Initializing the area before placing the objects.
    for (let i = 0; i < tasksArray.length; i++) 
    {//loop that search in range of 'tasksArray'.
    createPinnedTask(tasksArray[i]);
    //Callback/Create DOM objects for each index, in tasksArray (on Screen view).
    }
}

function getTasksArrayFromLocalStorage() {
    let tasksArrayStr = localStorage.getItem("allTasks");//extract the "string"-'value' under "allTasks" 'key' reference.
    tasksArray = JSON.parse(tasksArrayStr);//parsing the extracted 'JSON' back into objects array.
    return tasksArray;
}

function createPinnedTask(task) {
   
        let pinnedTask = document.createElement("div");
        pinnedTask.className="fade-in";
//create father DOM element for displayed task "body", to view.
        let missionOutput = document.createElement("output");
        missionOutput.className = "mission";//give class name attribute to created DOM element.('string')
        pinnedTask.appendChild(missionOutput);
//inside father element append (add new <Tag>) sub element for output display, this one for text data.
        let dateOutput = document.createElement("output");
        dateOutput.className = "date";
        pinnedTask.appendChild(dateOutput);
//2nd children element of div named 'pinnedTask' carry the date value at buttom of "pinnedTask".
        let timeOutput = document.createElement("output");
        timeOutput.className = "time";//optional to the client to add time for the task.
        pinnedTask.appendChild(timeOutput);
//3th child of pinned Div carry the time showen at buttom of pinnedTask (if supplyed).
        let closeIcon = document.createElement("img");
//also make this <IMG> tag of close 'X'icon.  
        pinnedTask.id = task.id;
        missionOutput.value = task.mission;
        dateOutput.value = task.date.split("-").reverse().join("-");
//flipping date 'string' to fix direction missbehave
        timeOutput.value = task.time;
        closeIcon.id = task.id;
//extract data from Object task to DOM object Pinned Task.

        tasksOnBoard.appendChild(pinnedTask);
//put the created element in the rightful place 

        pinnedTask.appendChild(closeIcon);
        closeIcon.onclick = closePinnedTask;
//added pinnedTask to board gets close icon 'x', with same id as the task it appears on.
}

function closePinnedTask()  
{//Callback for Icon X OnClick event.
    for (index = 0; index < tasksArray.length; index++) 
    {//Search a given task over the array.(for same id)
        if (tasksArray[index].id == this.id) 
        {
            tasksArray.splice(index, 1);
            //Delete task from the array
            setArrayStrLocalStorage(); // Update the array in storage minus spesific task.  ????
            displayTasksOnBoard(); // Display...????
        }
    }
}

function clearInputs() 
{// Initializing feilds
    var now = new Date();
    document.getElementById("missionInput").value="";
    document.getElementById("dateInput").value=now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
    document.getElementById("timeInput").value=now.getHours() + ':' + now.getMinutes();
    initBackgroundInputs();
}

function initBackgroundInputs()
{// Clear fields attributes
    document.getElementById("missionInput").style.backgroundColor="";
    document.getElementById("dateInput").style.backgroundColor="";
    document.getElementById("timeInput").style.backgroundColor="";
}



//more directly, official and better way to run search on tasks Array wich is orgenized Array 
//??? why is it called "Desert Lion"???
/*
binaricSearch(taskId)
{ // Return position of task id in tasksarray
    var i = 0;
    var j = tasksArray.length;
    while ((j >= 0) && (j < )
    {
        if (tasksArray[j / 2].id == taskId)
        {
            return j / 2;
        }
        else
            if (tasksArray[j / 2].id < taskId)
            {
                j = j * 3 / 4;
            }
            else
            {
                j = j / 4;
            }
    }
    for (i = 0; (i < tasksArray.length); i++)
    {
        if (tasksArray[i].id < taskId)
    }
}
*/