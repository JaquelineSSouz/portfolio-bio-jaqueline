<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); //permite requisições de qualquer origem (ajuste em produção)
header('Access-Control-Allow-Methods: POST');
header('Acess-Control-Allow-Headers: Content-Type');

//Configurações do Banco de Dados (MySQL via XAMPP)
//Assumindo as configurações padrão do XAMPP e o nome do banco de dados "database"
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "database";
$tablename = "contato";

//Conexão com o banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);

//Verifica a conexão
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Falha na conexão com o banco de dados: " . $conn->connect_error]);
    exit();
}

//Receber e decodificar os dados JSON do formulário
$json_data = file_get_contents("php://input");
$data = json_decode($json_data, true);

//Validação básica dos dados recebidos 
if ($_SERVER["REQUEST_METHOD"] !== "POST" || empty($data)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Requisição inválida ou dados vazios."]);
    exit();
}

// Mapeamento dos campos do formulário (name, email, message)
$nome = $data['name'] ?? '';
$email = $data['email'] ?? '';
$mensagem = $data['message'] ?? '';

// Preparar a query SQL para inserção
// Assumindo que a tabela 'contato' tenha as colunas: nome, email, mensagem
$stmt = $conn->prepare("INSERT INTO $tablename (nome, email, mensagem) VALUES (?, ?, ?, ?)");

// Verifica se a preparação da query foi bem-sucedida
if ($smt === false) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Erro na preparação da query: " . $conn->error]);
    exit();
}

// sss indica que os três parâmetros são strings
$stmt->bind_param("sss", $nome, $email, $mensagem);

// Executar a query
if ($stmt->execute()) {
    http_response_code(200);
    echo json_encode(["success" => true, "message" => "Dados salvos com sucesso na tabela 'contato'!"]);
} else {
    http_response_code(500);
    echo json_encode(["sucess" => false, "message" => "Erro ao salvar os dados: " . $stmt->error]);
}

// fechar conexão
$stmt->close();
$conn->close();
?>
