<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $json = file_get_contents("php://input");
    $data = json_decode($json, true);

    if (!isset($data["nombre"], $data["email"], $data["mensaje"])) {
        echo json_encode(["error" => "Todos los campos son obligatorios"]);
        http_response_code(400);
        exit;
    }

    $nombre = htmlspecialchars($data["nombre"]);
    $email = filter_var($data["email"], FILTER_VALIDATE_EMAIL);
    $mensaje = htmlspecialchars($data["mensaje"]);

    if (!$email) {
        echo json_encode(["error" => "Email inválido"]);
        http_response_code(400);
        exit;
    }

    // Configurar conexión con PostgreSQL
    $host = "localhost";
    $port = "5432";
    $dbname = "geomagia";
    $user = "geomagia_user";
    $password = ".Ggeomagia_91";

    try {
        $pdo = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $user, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Insertar datos en la tabla
        $stmt = $pdo->prepare("INSERT INTO contactos (nombre, email, mensaje) VALUES (:nombre, :email, :mensaje)");
        $stmt->execute([
            ":nombre" => $nombre,
            ":email" => $email,
            ":mensaje" => $mensaje
        ]);

        echo json_encode(["success" => "Mensaje guardado correctamente"]);
    } catch (PDOException $e) {
        echo json_encode(["error" => "Error en la base de datos: " . $e->getMessage()]);
        http_response_code(500);
    }
} else {
    echo json_encode(["error" => "Método no permitido"]);
    http_response_code(405);
}
?>
