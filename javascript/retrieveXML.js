
const inputLabel = document.getElementById('fileLabel');
const form = document.getElementById('submit-form');
const input = document.getElementById('fileUpload');
const submitBtn = document.getElementById('submit-btn');
const links = document.getElementById('links');
let file;
function convertXML() {
    let formData = new FormData(form);
    axios.post('https://xmlto-json.herokuapp.com', formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        },
        responseType: 'blob'
    })
    .then(res => {
        let filename = file.name.replace(/\.[^/.]+$/, "") // removes the file extension from the name
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.innerText = 'Download File - ' + filename + '.json'
        link.setAttribute('download', `${filename}.json`);
        link.classList.add('download-link')
        links.appendChild(link);
        // link.click();
        console.log(res)
        inputLabel.innerText = 'Select an xml file to convert.'
    })
    .catch(err => {
        console.log(err)
    })
}
 

input.addEventListener('change', (e) => {
    console.log(inputLabel)
    console.log(e.target.files[0])
    file = e.target.files[0]; 
    inputLabel.textContent = e.target.files[0].name;
})

form.onsubmit = e => {
    e.preventDefault();
    convertXML()
}

// submitBtn.addEventListener('click', (e) => {
//     e.preventDefault();
//     convertXML()
// })