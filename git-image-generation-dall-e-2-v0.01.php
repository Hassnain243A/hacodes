<?php
require __DIR__ . '/vendor/autoload.php';
use Orhanerday\OpenAi\OpenAi;
$open_ai = new OpenAi('your-api-key');
$prompt = $_POST['prompt'];
$complete = $open_ai->image([
    "prompt" => $prompt,
    "n" => 3,
    "size" => "256x256",
    "response_format" => "b64_json",
]);
echo $complete;
?>