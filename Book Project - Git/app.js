class Book {
    constructor(title, author, isbn){
        this.title = title; 
        this.author = author; 
        this.isbn = isbn; 
    }
}

class UI {
    addBook(book){
        const bookList = document.querySelector('#book-list')
        const newBook = document.createElement('tr'); 
        
        newBook.innerHTML = `
        <td class="bookAuthor">${book.title}</td>
        <td class="bookTitle">${book.author}</td>
        <td class="bookisbn">${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
        <td><a href="#" class="edit">edit</a></td>
        `
    //appending new element to DOM 
    bookList.appendChild(newBook);
    }

    clearFields(){
        document.querySelector('#title').value = "";
        document.querySelector('#author').value = "";
        document.querySelector('#isbn').value = "";
    }

    delete(target){
        target.parentElement.parentElement.remove();
    }

    edit(target){
        //creating new edit box// 
        const editField = document.createElement('tr'); 

        editField.innerHTML = `
        <tr>
        <td><input class="inputTitle" ></input></td>
        <td><input class="inputAuthor" ></input></td>
        <td><input class="inputisbn" ></input></td>
        <td></td>
        <td><a href="#" class="submit">submit</a></td>
        </tr>
        `
        target.parentElement.parentElement.parentElement.insertBefore(editField, target.parentElement.parentElement);
    }

    submit(target){
        const ui = new UI ();
        let inputTitle = document.querySelector('.inputTitle').value,
              inputAuthor = document.querySelector('.inputAuthor').value,
              inputisbn = document.querySelector('.inputisbn').value;
        
        if(inputTitle != "" && inputAuthor != "" && inputisbn != ""){
            //instantiate new book object 
            const book = new Book(inputTitle, inputAuthor, inputisbn);
            //updating list item// 
            //removing current list item
            target.parentElement.parentElement.nextElementSibling.remove();
            //removing edit box
            target.parentElement.parentElement.remove();
            //recalling addBook to add edited on
            ui.addBook(book)
        
        }

        else{
            
            ui.showAlert("error", "submit failed")
        }
    
    }

    showAlert(className, message){
        const container = document.querySelector('.container'); 
        const errorLog = document.createElement('div'); 
        errorLog.className = `${className}`;
        errorLog.textContent = `${message}`;

        container.appendChild(errorLog);

        setTimeout(function(){errorLog.remove()}, 2000)
    }

}

document.getElementById('book-form').addEventListener("submit", (e)=>{

    e.preventDefault(); 

    //grabbing UI elements// 
    const title = document.querySelector('#title').value,
          author = document.querySelector('#author').value,
          isbn = document.querySelector('#isbn').value; 
    //instantiating classes// 

    const book = new Book (title, author, isbn); 
    const ui = new UI ();

    //validating form submit 

    if (title != "" && author != "" && isbn != ""){
        console.log("if triggered")
        ui.addBook(book); 
        ui.clearFields(); 
        ui.showAlert("success", "You have added the book");
    }

    else{
        console.log("else triggered")
        ui.clearFields(); 
        ui.showAlert("error", "Please fill in the whole form");
    }

})

//deleting items// 

window.addEventListener("click", (e)=>{

    const ui = new UI ()
    
    if(e.target.classList.contains('delete')){
        ui.delete(e.target)
    }

    //updating items
    else if (e.target.classList.contains('edit')){
        ui.edit(e.target)
    }
    //submitting updates 
    else if (e.target.classList.contains('submit')){
        ui.submit(e.target);
    }

})



