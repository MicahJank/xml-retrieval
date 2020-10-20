// The only way i will be able to get a file loaded into the javascript dynamically is to create a backend api for this
// i will need to create a node.js backend that and set up a route that can then take in the data that a form on the front end will send it
// after the form sends the backend the file from the computer the backend needs to parse the data and send it back to the front end so the front end can do what it needs to with the data

// function sendXML(xml, name) {
//     const xhttp = new XMLHttpRequest();
//     xhttp.open("POST", "http://localhost:5000'");
//     xhttp.onreadystatechange = () => {
//       if (xhttp.readyState == 4 && xhttp.status == 200) {
//         const res = xhttp.response;
//         alert(`${res}: ${name}`);
//       }
//     };
//     xhttp.setRequestHeader("Content-Type", "text/xml");
//     xhttp.send(xml);
//   }

const input = document.getElementById('fileUpload');
const submit = document.getElementById('submit-btn');
console.log(input)
const upload = data => {
    // console.log("file",data)
    // fetch('http://localhost:5000', {
    //     method: 'POST',
    //     body: data,
    //     headers: {
    //         'Content-Type': 'text/xml'
    //     }
    //     })
    //     .then(res => {
    //         return res.json();
    //     })
    //     .then(success => {
    //         console.log("success", success)
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
    reader.onload = function(e) {
        const xml = e.target.result;
        // sendXML(xml, name);
        fetch('http://localhost:5000', {
        method: 'POST',
        body: xml
        })
        .then(res => {
            return res.json();
        })
        .then(success => {
            console.log("success", success)
        })
        .catch(err => {
            console.log(err);
        })
    }
    
}

// Event handler executed when a file is selected
const onSelectFile = () => {
    // console.log(input.files)
    const reader = new FileReader();
    reader.readAsText(input.files[0])
    let data;
    reader.onload = function(e) {
        data = e.target.result;
        return upload(data);
    } 
}

// Add a listener on your input
// It will be triggered when a file will be selected
input.addEventListener('change', onSelectFile, false);

// document.addEventListener('DOMContentLoaded', () => {
//     let url = 'books.xml';
//     fetch(url)
//     .then(response => response.text())
//     .then(data => {
//         // console.log(data);
//         let parser = new DOMParser();
//         let xml = parser.parseFromString(data, "application/xml");
//         // document.getElementById('data').textContent = data;
//         console.log(xml);
//         createCards(xml);
//     })
// })


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