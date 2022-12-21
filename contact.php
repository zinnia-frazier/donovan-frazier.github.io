<!DOCTYPE html>
<html>
<body>

<?php
if(isset($_POST["submit"])){

    $to = "contact@donovanfrazier.com"; // this is your Email address
    $from = $_POST["email"]; // this is the sender's Email address

    $fullname = $_POST["fullname"];

    $subject = "Form submission";
    $subject2 = "Copy of your form submission";

    $message = $fullname . " " . "wrote the following:" . "\n\n" . $_POST["message"];
    $message2 = "Here is a copy of your message" . $fullname . "\n\n" . $_POST["message"];

    $headers = "From:" . $from;
    $headers2 = "From:" . $to;

    mail($to,$subject,$message,$headers);
    mail($from,$subject2,$message2,$headers2); // sends a copy of the message to the sender
    header("Location: https://profile.donovanfrazier.com/thank_you.html") . $fullname . ", I will contact you shortly.";
    // You can also use header('Location: thank_you.php'); to redirect to another page.
    }
?>

</body>
</html>