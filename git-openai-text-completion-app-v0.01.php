<?php
require __DIR__ . '/vendor/autoload.php';
use Orhanerday\OpenAi\OpenAi;
require 'src/OpenAi.php';
require 'src/Url.php';
use Orhanerday\OpenAi\OpenAi;
$open_ai = new OpenAi('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');
$prompt = $_GET['prompt'];
$complete = $open_ai->completion([
    // parameters here
], function($curl_info, $data){
    // response here
});
// parameters
'model' => 'text-davinci-003',
'prompt' => $prompt,
'temperature' => 0.7,
'max_tokens' => 256,
'top_p' => 1,
'frequency_penalty' => 0,
'presence_penalty' => 0,
'stream' => true
// response
echo $data;
echo PHP_EOL;
ob_flush();
flush();
return strlen($data);
?>