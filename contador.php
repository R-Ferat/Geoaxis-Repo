<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Configurar conexión con PostgreSQL
$host = "localhost";
$port = "5432";
$dbname = "geomagia";
$user = "geomagia_user";
$password = ".Ggeomagia_91";

try {
    $pdo = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Insertar nueva visita
    $pdo->exec("INSERT INTO visitas DEFAULT VALUES");

    // Obtener el total de visitas
    $stmt = $pdo->query("SELECT COUNT(*) AS total FROM visitas");
    $total = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

    echo json_encode(["visitas" => $total]);
} catch (PDOException $e) {
    echo json_encode(["error" => "Error en la base de datos: " . $e->getMessage()]);
    http_response_code(500);
}
?>
