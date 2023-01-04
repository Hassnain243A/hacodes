<?php
require __DIR__ . '/vendor/autoload.php';
use Orhanerday\OpenAi\OpenAi;
require 'src/OpenAi.php';
require 'src/Url.php';
use Orhanerday\OpenAi\OpenAi;
$open_ai = new OpenAi('your-api-key');
$prompt = $_GET['prompt'];
$complete = $open_ai->completion(
    // parameter object here
, function($curl_info, $data){
    // response here
});
// object with all parameters
[
    'model' => 'text-davinci-003',
    'prompt' => $prompt,
    'temperature' => 0.7,
    'max_tokens' => 256,
    'top_p' => 1,
    'frequency_penalty' => 0,
    'presence_penalty' => 0,
    'stream' => true
]
// response
echo $data;
echo PHP_EOL;
ob_flush();
flush();
return strlen($data);
?>
