<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
require 'vendor/autoload.php';

$mail->Host = 'email-host-name';
$mail->Username   = 'sender-email';
$mail->Password   = 'email-password';
$mail->Port       = 465;
$mail->setFrom('sender-email', 'Mailer Name');
$mail->addAddress('receiver-email', 'Receiver Name');
$mail->addAttachment('demo.zip', 'Demo Zip File');
$mail->Subject = 'Here is the subject';
$mail->msgHTML(file_get_contents("email-content.html"), __DIR__);
$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';