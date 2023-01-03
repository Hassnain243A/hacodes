button.onclick = () => {
    var prompt = input.value
    if(prompt != ''){
        // all communication with server here
    }
}
var source = new SSE("request.php?prompt=" + prompt);
source.addEventListener('message', function (e) {
    // server response here
})
source.stream()
// process the response
if(e.data){
    if(e.data != '[DONE]'){
        var tokens = JSON.parse(e.data).choices[0].text
        textarea.innerHTML += tokens
    }else{
        console.log('Completed');
    }
}