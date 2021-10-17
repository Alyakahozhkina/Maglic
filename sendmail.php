<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'phpMailer/src/Exception.php';
    require 'phpMailer/src/PHPMailer.php';

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('ru', 'phpMailer/language/');
    $mail->IsHTML(true);

    //От кого письмо
    $mail->setFrom('info@gmail.com', 'MaglicSite');
    //Кому отправить
    $mail->addAddress('alya.finko@gmail.com');
    //Тема письма
    $mail->Subject = 'Письмо сайта Maglic';


    //Тело письма
    $body = '<h1>Письмо от пользователя</h1>';

    if(trim(!empty($_POST['name']))){
        $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
    }
    if(trim(!empty($_POST['email']))){
        $body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
    }
    if(trim(!empty($_POST['subject']))){
        $body.='<p><strong>Тема письма:</strong> '.$_POST['subject'].'</p>';
    }
    if(trim(!empty($_POST['message']))){
        $body.='<p><strong>Текст:</strong> '.$_POST['message'].'</p>';
    }


    $mail->Body = $body;


    //Отправляем
    if(!$mail->send()) {
        $message = 'Ошибка';
    } else {
        $message = 'Данные отправлены';
    }

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);
?>