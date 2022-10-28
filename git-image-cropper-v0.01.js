// upload image
actionButton[0].onclick = () => hiddenUpload.click()
hiddenUpload.onchange = () => {
    // put all code here
}

document.querySelector('.image-workspace').innerHTML = `<img src="" alt="">`
var image_workspace = document.querySelector('.image-workspace img')
var file = hiddenUpload.files[0]
var url = window.URL.createObjectURL(new Blob([file], { type : 'image/jpg' }))
image_workspace.src = url

var options = {
    dragMode: 'move',
    preview: '.img-preview',
    viewMode: 2,
    modal: false,
    background: false,
    ready: function(){
        // all controls here
    }
}

// zoom for image
zoom[0].onclick = () => cropper.zoom(0.1)
zoom[1].onclick = () => cropper.zoom(-0.1)

// rotate image
rotate[0].onclick = () => cropper.rotate(45)
rotate[1].onclick = () => cropper.rotate(-45)

// flip image
var flipX = -1
var flipY = -1
flip[0].onclick = () => {
    cropper.scale(flipX, 1)
    flipX = -flipX
}
flip[1].onclick = () => {
    cropper.scale(1, flipY)
    flipY = -flipY
}

// move image
move[0].onclick = () => cropper.move(0, -1)
move[1].onclick = () => cropper.move(-1, 0)
move[2].onclick = () => cropper.move(1, 0)
move[3].onclick = () => cropper.move(0, 1)

// set aspect ratio
aspectRatio[0].onclick = () => cropper.setAspectRatio(1.7777777777777777)
aspectRatio[1].onclick = () => cropper.setAspectRatio(1.3333333333333333)
aspectRatio[2].onclick = () => cropper.setAspectRatio(1)
aspectRatio[3].onclick = () => cropper.setAspectRatio(0.6666666666666666)
aspectRatio[4].onclick = () => cropper.setAspectRatio(0) // free

// cropper control
controlCropper[0].onclick = () => cropper.clear()
controlCropper[1].onclick = () => cropper.crop()

// lock cropper
lockCropper[0].onclick = () => cropper.disable()
lockCropper[1].onclick = () => cropper.enable()

// drag mode
dargMode[0].onclick = () => cropper.setDragMode("crop")
dargMode[1].onclick = () => cropper.setDragMode("move")

// download cropped image
actionButton[1].onclick = () => {
    actionButton[1].innerText = '...'
    cropper.getCroppedCanvas().toBlob((blob) => {
        var downloadUrl = window.URL.createObjectURL(blob)
        var a = document.createElement('a')
        a.href = downloadUrl
        a.download = 'cropped-image.jpg' // output image name
        a.click()
        actionButton[1].innerText = 'Download'
    })
}

var cropper = new Cropper(image_workspace, options)

    