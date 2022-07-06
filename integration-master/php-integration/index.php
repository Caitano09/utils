<?php
    require __DIR__ . '/vendor/autoload.php';

    use \Firebase\JWT\JWT;

    $user = 'Daniel';
    $userId = 1000;
    
    $secret = 'socket.io-devpleno';
    $payload = array(
        'user' => $user,
        'userId' => $userId
    );

    $token = JWT::encode($payload, $secret);

?>

<script src="http://localhost:3000/socket.io/socket.io.js"></script>
<script>
    const socket = io('http://localhost:3000?token=<?php echo $token ?>')
    socket.on('connect', ()=>{
        console.log('connect')
    })
    socket.on('msg', msg =>{
        console.log(msg)
    })
</script>