<?php
require __DIR__ . '/vendor/autoload.php';
use Orhanerday\OpenAi\OpenAi;
$open_ai = new OpenAi('your-api-key');
$prompt = $_POST['prompt'];
// prepare object for request
[
    "prompt" => $prompt,
    "n" => 3,
    "size" => "256x256",
    "response_format" => "b64_json",
]
$complete = $open_ai->image(
// object goes here
);
echo $complete;
?>
