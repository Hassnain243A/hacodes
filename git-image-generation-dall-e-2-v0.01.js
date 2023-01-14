button.onclick = () => {
    if (input.value) {
        // make POST request here
    }
}

var http = new XMLHttpRequest();
var data = new FormData()
data.append('prompt', input.value)
http.open('POST', 'request.php', true)
http.send(data)
// Assign a function to the onload property
http.onload = () => {
    imgContainer.innerHTML = ''
    var response = JSON.parse(http.response).data
    response.forEach(e => {
        var img = document.createElement('img')
        img.src = 'data:image/jpeg;base64,' + e.b64_json
        imgContainer.appendChild(img)
    });
}