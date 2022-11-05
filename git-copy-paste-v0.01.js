copyButton.onclick = function(){
    const content = document.getElementById('copy-text').innerHTML;
    navigator.clipboard.writeText(content);
}
pasteButton.addEventListener('click', async (event) => {
    const data = await navigator.clipboard.read();
    const clipboardContent = data[0];
    const type = clipboardContent.types[0];
    if(type == 'text/plain'){
        // code here to paste text
    }else{
        // code here to paste image
    }
})
// for text
const blob = await clipboardContent.getType('text/plain');
var text = await blob.text();
var p = document.createElement('p');
p.innerHTML = text;
document.getElementById('paste-here').appendChild(p);
//for image
const blob = await clipboardContent.getType('image/png');
const url = window.URL.createObjectURL(blob);
const img = document.createElement('img');
img.src = url;
img.style.maxHeight = '200px';
document.getElementById('paste-here').appendChild(img);