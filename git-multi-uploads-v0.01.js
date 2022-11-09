upload.onclick = () => {
    // write code here
}
var http = new XMLHttpRequest()
http.open('POST', 'multi-uploads.php', true)
// now send file data
var data = new FormData()
for(var i = 0; i < input.files.length; i++){
    data.append('file'+i, input.files[i])
}
data.append('files_length', input.files.length)
// send request
http.send(data)
// now show progress
http.upload.onprogress = (e) => {
    var percent_complete = (e.loaded / e.total)*100
    percent.innerHTML = Math.floor(percent_complete) + '%'
    progressBar.style.width = percent_complete + '%'
}
http.onload = () => {
    console.log('Completed');
}