/////////// USED TRY AND CATCH FOR ERRORS //////////////

document.body.innerHTML += `<section class="books-list"></section>`;

///// ASYNC FUNCTION FOR GETTING DATA OF BOOKS //////
async function getbooks() {
    const data = await fetch("https://www.anapioficeandfire.com/api/books");

    // BOOKS GETS ALL THE DETAILS FROM DATA BY CONVERTING INTO JSON //
    
    const books = await data.json();
    
    const bookcontainer = document.querySelector(".books-list");
    let i = 0;
    books.forEach((book) => {

    // BOOK IS A SINGLE OBJECT OUT OF ALL THE BOOKS WE GET BY FOREACH LOOP  //
        
        bookcontainer.innerHTML += `
        <div class="book-container book-container-${i}">    
            <h1 class="book-name">${book.name}</h1>
            <h3 class="book-"><i>${book.authors}</i></h3>
            <div class="book-details">
                <h4 class="book-"><b>Publisher:-</b> <i> ${book.publisher} </i></h4>
                <p class="book-"><b>Number of Pages:-</b> ${book.numberOfPages}</p>
                <div class="book-date book-date-${i}"></div>
                <p class="book-"><b>ISBN -</b> ${book.isbn}</p>
                <button class="button-chara" onclick="togglechara(${i})"><b>CHARACTERS</b></button>
                <!--    <button class="button-delete" onclick="deleteB(${i})"><b>DELETE</b></button>    -->
                    <div class="chara-list chara-list-${i}">
                    </div> 
                
            </div>
        </div>
            `;
        

        
        // UPDATING THE TIME ON THE WEBSITE NOT THE API
        bookdate(book.released,i);
        
        // GETTING BOOK CHARACTERS USING ANOTHER ASYNC FUNCTION //
        getchara(book, i);
        i++;




    })

}
async function geteach(bookchara) {
    const data3 = await fetch(`${bookchara}`);
    const charac = await data3.json();
    return charac;
}

async function getchara(bookchara, i) {
    

    // USING PROMISE.ALL TO GET EACH CHARACTERS API NAME INTO THE BOOK DETAILS // 

    const data2 = await Promise.all([geteach(bookchara.characters[0]), geteach(bookchara.characters[1]), geteach(bookchara.characters[2]), geteach(bookchara.characters[3]), geteach(bookchara.characters[4]), geteach(bookchara.characters[5]), geteach(bookchara.characters[6]), geteach(bookchara.characters[7]), geteach(bookchara.characters[8]), geteach(bookchara.characters[9]), geteach(bookchara.characters[10]), geteach(bookchara.characters[11])]);
   
    data2.forEach(data => {
        const characontainer = document.querySelector(`.chara-list-${i}`);
        characontainer.innerHTML += `
                
                    <p>${data.name}</p>
                
                `;
    })
}

getbooks();



function togglechara(i) {

    // TOGGLING CHARACTER BUTTON MAKING DISPLAY TOGGLE BETWEEN BLOCK AND NONE AND CHANGING HEIGHT OF BOOK CONTAINER

    const charabut = document.querySelector(`.chara-list-${i}`);
    
    charabut.style.display = charabut.style.display === "block" ? "none" : "block";
    const bookcont = document.querySelector(`.book-container-${i}`);
    bookcont.style.height = bookcont.style.height === "52rem" ? "25rem" : "52rem";

}


// TO PRINT ONLY THE DATE AND NOT THE TIME AS IT WAS UNNNECESSARY ///
function bookdate(date, i){
    
    const datename = document.querySelector(`.book-date-${i}`);
    datename.innerHTML = `<span class="date-update"><b> Date Published:-</b></span>`
    for(let j=0;j<(10);j++){
        console.log(date[j]);
        const newdate = document.querySelector(`.book-date-${i}`);
        newdate.innerHTML += `<span>${date[j]}</span>`;
    }

}








////////////// DELETING API. CODE IS CORRECT BUT NOT ABLE TO DELETE //////////////////////////

// async function deleteB(i){
//     console.log(i,"Deleting");
//     i++; // AS i DOESNT START FROM ZERO
//     const data = await fetch("https://www.anapioficeandfire.com/api/books/" + i,
//     {method: "DELETE"}
//     );
//     getbooks();
// }
