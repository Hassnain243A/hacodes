<?php
$server = "localhost";
$user = "root";
$pass = "";
$database = "auth_system";
$con = mysqli_connect($server, $user, $pass);
$db = mysqli_select_db($con, $database);
if(!$con){
    echo "Server Error";
}
if(!$db){
    echo "Database Error";
}

// auth file
include("db_connection.php");
session_start();

if($_SERVER["REQUEST_METHOD"] == "POST"){
    // write here
}

if(isset($_POST["create_account"])){
    // when create account button clicked
}

if($stmt = $con->prepare("INSERT INTO users VALUES (Null, ?, ?)")){
    $stmt->bind_param("ss", $username, $password);
    $username = $_POST["new_username"];
    $password = password_hash($_POST["new_password"], PASSWORD_DEFAULT);
    $stmt->execute();
    login($_POST["new_username"], $_POST["new_password"]);
}

function login($user, $pass){
    session_regenerate_id();
    $_SESSION["login_timestamp"] = time();
    $_SESSION["loggedin"] = TRUE;
    $_SESSION["user_name"] = $user;
    $_SESSION["password"] = $pass;
    header("Location: dashboard.php");
}

if(isset($_POST["login"])){
    // when login button clicked
}

if($stmt = $con->prepare("SELECT password FROM users WHERE user_name = ?")){
    $stmt->bind_param("s", $_POST["log_username"]);
    $stmt->execute();
    $stmt->store_result();
    if($stmt->num_rows > 0){
        $stmt->bind_result($password);
        $stmt->fetch();
        if(password_verify($_POST["log_password"], $password)){
            login($_POST["log_username"], $_POST["log_password"]);
        }
    }
}

// check login
session_start();
if(isset($_SESSION["loggedin"])){
    if(time() - $_SESSION["login_timestamp"] >= 60*60*24){
        header("Location: logout.php");
    }
}else{
    header("Location: auth.php");
}

// dashboard
include("check_login.php");
echo round(24 - (((time() - $_SESSION["login_timestamp"])/60)/24), 2) . " Hours available for this session";

// logout
session_start();
session_destroy();
header("Location: auth.php");

?>

<!-- dashboard -->
<h3>User Name: <u><?php echo $_SESSION["user_name"]; ?></u></h3>
<h3>User Password: <u><?php echo $_SESSION['password']; ?></u></h3>
<h2><a href="logout.php">Logout</a></h2>