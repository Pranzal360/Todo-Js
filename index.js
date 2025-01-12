

const inputField = document.getElementById('text')
// to listen for enter key
const enterEventListener = inputField.addEventListener('keydown',
    function (event) {
        if (event.key === 'Enter')
            add()
    }
)
// declaring a global local storage 
let inputsArray = []

function add() {
    
    // getting the value of placeholder
    const textValue = document.getElementById('text').value.trim()
    
    //checking for spaces
    if (textValue === "") {
        return
    }

    //appending the input value directly to the inputsArray
    inputsArray.push(textValue)
    //storing the item into local storage
    localStorage.setItem('todolist',JSON.stringify(inputsArray))


    // creating a new list element & adding value to the list item
    const list = document.createElement('li')
    const listItems = document.createTextNode(textValue)

    // appending the list 
    list.appendChild(listItems)
    
    //create a new button to remove the text
    const deleteBtn = document.createElement('button')
    deleteBtn.id = "deleteBtn"
    deleteBtn.className = "fa fa-trash"
    deleteBtn.style.marginLeft = "10px"
    deleteBtn.addEventListener('click',deleteItem)

    // create a new div to add delete btn next to the list element 
    const listDiv = document.createElement('div')
    listDiv.id = "listDiv"
    listDiv.style.display = "flex"
    listDiv.append(list,deleteBtn)


    // getting the ol tag and appending it 
    const ol = document.getElementById('list')
    ol.append(listDiv)

    // resetting the input value to empty
    document.getElementById('text').value = ""

}

function deleteItem(event) {
    // remove from the list
    event.target.parentElement.remove()

    // find the item to delete
    const itemToDelete = event.target.parentElement
    const itemText = itemToDelete.querySelector('li').textContent

    // remove the item from array 
    const indexOfItemToRemove = inputsArray.indexOf(itemText)
    console.log(indexOfItemToRemove)

    // returns -1 when item is not found 
    // need to learn about splice more
    if (indexOfItemToRemove !== -1) {
        inputsArray.splice(indexOfItemToRemove,1)
    }

    localStorage.setItem('todolist',JSON.stringify(inputsArray))
    

}



function retrieveItems() {
    console.warn('loaded')
    let list = []
    list = JSON.parse(localStorage.getItem('todolist'))
    if ( list != []) {
        let count = 0
        const length = list.length
        while (count !== length){
            inputsArray.push(list[count])
            createForNewInstance(list[count])
            count++
            
        }
    }
}


function createForNewInstance (textValue) {

    // creating a new list element & adding value to the list item
    const list = document.createElement('li')
    const listItems = document.createTextNode(textValue)

    // appending the list 
    list.appendChild(listItems)
    
    //create a new button to remove the text
    const deleteBtn = document.createElement('button')
    deleteBtn.id = "deleteBtn"
    deleteBtn.className = "fa fa-trash"
    deleteBtn.style.marginLeft = "10px"
    deleteBtn.addEventListener('click',deleteItem)

    // create a new div to add delete btn next to the list element 
    const listDiv = document.createElement('div')
    listDiv.id = "listDiv"
    listDiv.style.display = "flex"
    listDiv.append(list,deleteBtn)


    // getting the ol tag and appending it 
    const ol = document.getElementById('list')
    ol.append(listDiv)
}

window.onload = retrieveItems

