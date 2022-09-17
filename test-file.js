    var enc_file = document.querySelectorAll('.encoding input')[0]
    var enc_text = document.querySelectorAll('.encoding input')[1]
    var enc_button = document.querySelectorAll('.encoding input')[2]
    var base64Output = document.querySelector('.encoding .base64-output')

    var dec_text = document.querySelector('.decoding textarea')
    var dec_button = document.querySelector('.decoding input')

    // for encoding
    enc_button.onclick = () => {
        if(enc_file.value !== '' || enc_text.value !== ''){
            if(enc_file.value !== ''){
                base64Encoder(enc_file.files[0])
            }else{
                const http = new XMLHttpRequest();
                http.onload = function(){
                    base64Encoder(http.response)
                }
                http.responseType = 'blob'
                http.open('GET', enc_text.value, true)
                http.send()
            }
        }
    }

    // encode function
    function base64Encoder(blob){
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
            base64Output.innerHTML = reader.result
        }
    }

    // for decoding
    dec_button.onclick = () => {
        if(dec_text.value !== ''){
            base64Decoder(dec_text.value)
        }
    }
    // decode function
    function base64Decoder(base64){
        const http = new XMLHttpRequest();
        http.onload = function() {
            var url = window.URL.createObjectURL(http.response)
            var link = document.createElement('a')
            link.href = url
            link.download = 'image-from-base64.png'
            link.click()
        }
        http.responseType = 'blob'
        http.open('GET', base64, true)
        http.send()
    }
