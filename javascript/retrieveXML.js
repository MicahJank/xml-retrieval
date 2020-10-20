document.addEventListener('DOMContentLoaded', () => {
    let url = 'books.xml';
    fetch(url)
    .then(response => response.text())
    .then(data => {
        // console.log(data);
        let parser = new DOMParser();
        let xml = parser.parseFromString(data, "application/xml");
        // document.getElementById('data').textContent = data;
        console.log(xml);
        createCards(xml);
    })
})


// creates the cards from the xml
function createCards(data) {
    const cardContainer = document.getElementById('cards')
    let books = data.getElementsByTagName('book');
    // console.log(books[0])

    for (let i=0; i<books.length; i++) {
        const card = document.createElement('div');
        const book = books[i].children;
        // console.log(book[0].tagName)
        for (let j=0; j<book.length; j++) {
            const eleContainer = document.createElement('div');
            const tag = book[j].tagName;
            // console.log(book[j]);
            const elementType = document.createElement('h3');
            elementType.textContent = tag.toUpperCase();
            const element = document.createElement('h4');
            element.textContent = book[j].tagName === 'price' ? `$${book[j].firstChild.nodeValue}` : `${book[j].firstChild.nodeValue}`;
            eleContainer.appendChild(elementType);
            eleContainer.appendChild(element);

            card.appendChild(eleContainer);
        }
        
        cardContainer.appendChild(card);
    }
}