const text = document.getElementById("text");
const addTaskButton = document.getElementById("add-task-btn");
const saveTaskButton = document.getElementById("save-todo-btn");

const listBox = document.getElementById("listBox");
const saveInd = document.getElementById("saveIndex");

const deleteAllBtn = document.getElementById("deleteAllButton");
// const records = document.getElementsByTagName("norecord");
const norec = document.getElementById("norecord");


let todoArray = [];
displayTodo();
recordsCheck();


// checkTodos();


addTaskButton.addEventListener("click", (e) => {
  e.preventDefault();
  let todo = localStorage.getItem("todo");
  if (text.value.trim() === "" || text === null || text.value === undefined) {
    // console.log("Please");
    alert("Please Enter your Task");
    
  // todoArray = [];
  } else {
  // todoArray = JSON.parse(todo);
  todoArray.push({"text":text.value,"Id":Date.now()});
  text.value = "";
  localStorage.setItem("todo", JSON.stringify(todoArray));
  }
  
  displayTodo();
  });

  function displayTodo() {
    let todo = localStorage.getItem("todo");
    if (todo === null) {
      deleteAllBtn.style.visibility = "hidden";
      
    todoArray = [];
    } else {
      deleteAllBtn.style.visibility = "visible";
    todoArray = JSON.parse(todo);
    }
    let htmlCode = "";
    todoArray.forEach(({text,Id}, ind) => {
    htmlCode += `<div class='flex mb-4 items-center'>
    <p class='w-full text-grey-darkest'>${text}</p>
    <button onclick='edit(${ind})' class='flex-no-shrink p-2 ml-4 mr-2 border-2 rounded text-white text-grey bg-green-600'>Edit</button>
    <button onclick='deleteTodo(${ind})' class='flex-no-shrink p-2 ml-2 border-2 rounded text-white bg-red-500'>Delete</button>
    </div>`;
    });
    listBox.innerHTML = htmlCode;
    recordsCheck();
    }

    function deleteTodo(ind) {
      let todo = localStorage.getItem("todo");
      todoArray = JSON.parse(todo);
      todoArray.splice(ind, 1);
      localStorage.setItem("todo", JSON.stringify(todoArray));
      displayTodo();
      recordsCheck();
      
     
      };

      function edit(ind) {
        
        saveInd.value = ind;
        let todo = localStorage.getItem("todo");
        todoArray = JSON.parse(todo);
        text.value = todoArray[ind].text;
        addTaskButton.style.display = "none";
        saveTaskButton.style.display = "block";
        };

        saveTaskButton.addEventListener("click", () => {
          let todo = localStorage.getItem("todo");
          if(text.value.trim() ===""){
            alert("Sorry You cannot create a task with an empty text")
          }else{
          todoArray = JSON.parse(todo);
          let id = saveInd.value;
          todoArray[id].text = text.value;
          addTaskButton.style.display = "block";
          saveTaskButton.style.display = "none";
          text.value = "";
          localStorage.setItem("todo", JSON.stringify(todoArray));
          displayTodo();
          }
          });

//deleteall button
          deleteAllBtn.addEventListener("click", function(e) {
            // console.log("working");
            localStorage.clear();
            displayTodo();
            recordsCheck();
          
          });


//recordsCheck
function recordsCheck(){
  let todo = localStorage.getItem("todo");

  if(todoArray.length === 0){
  
    norec.style.display ="block"

  }
  else{
    norec.style.display ="none"
   
  }

}
     




            
    