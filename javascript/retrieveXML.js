
const inputLabel = document.getElementById('fileLabel');
const form = document.getElementById('submit-form');
const input = document.getElementById('fileUpload');
const submitBtn = document.getElementById('submit-btn');
let file;
function convertXML() {
    let formData = new FormData(form);
    axios.post('http://localhost:5000', formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    .then(res => {
        console.log(res)
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