<?php
require_once __DIR__ . '/premium_config.php';

class PremiumDB {
    private static $instance = null;
    private $pdo;

    private function __construct() {
        $this->connect();
    }

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function connect() {
        try {
            $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=' . DB_CHARSET;
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4"
            ];
            
            $this->pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        } catch (PDOException $e) {
            error_log('Database connection failed: ' . $e->getMessage());
            http_response_code(500);
            die(json_encode(['error' => 'Database connection failed']));
        }
    }

    public function getPDO() {
        return $this->pdo;
    }

    public function query($sql, $params = []) {
        try {
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute($params);
            return $stmt;
        } catch (PDOException $e) {
            error_log('Query failed: ' . $e->getMessage());
            throw $e;
        }
    }

    public function insert($table, $data) {
        $columns = implode(',', array_keys($data));
        $placeholders = ':' . implode(', :', array_keys($data));
        $sql = "INSERT INTO {$table} ({$columns}) VALUES ({$placeholders})";
        
        $stmt = $this->query($sql, $data);
        return $this->pdo->lastInsertId();
    }

    public function update($table, $data, $where, $whereParams = []) {
        $set = [];
        foreach (array_keys($data) as $key) {
            $set[] = "{$key} = :{$key}";
        }
        $setClause = implode(', ', $set);
        
        $sql = "UPDATE {$table} SET {$setClause} WHERE {$where}";
        $params = array_merge($data, $whereParams);
        
        return $this->query($sql, $params);
    }

    public function select($table, $where = '1=1', $params = [], $columns = '*') {
        $sql = "SELECT {$columns} FROM {$table} WHERE {$where}";
        return $this->query($sql, $params);
    }
}

function db() {
    return PremiumDB::getInstance();
}

function cors() {
    $origins = array_map('trim', explode(',', ALLOWED_ORIGINS));
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '*';
    
    if (in_array($origin, $origins)) {
        header('Access-Control-Allow-Origin: ' . $origin);
    }
    
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-CSRF-Token');
    header('Access-Control-Allow-Credentials: true');
    
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

function jsonResponse($data, $status = 200) {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function validateInput($data, $rules) {
    $errors = [];
    
    foreach ($rules as $field => $rule) {
        $value = $data[$field] ?? null;
        
        if (isset($rule['required']) && $rule['required'] && empty($value)) {
            $errors[$field] = 'This field is required';
            continue;
        }
        
        if (!empty($value)) {
            if (isset($rule['type'])) {
                switch ($rule['type']) {
                    case 'email':
                        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
                            $errors[$field] = 'Invalid email format';
                        }
                        break;
                    case 'mobile':
                        if (!preg_match('/^[6-9]\d{9}$/', preg_replace('/\D/', '', $value))) {
                            $errors[$field] = 'Invalid mobile number';
                        }
                        break;
                }
            }
            
            if (isset($rule['min_length']) && strlen($value) < $rule['min_length']) {
                $errors[$field] = "Minimum {$rule['min_length']} characters required";
            }
            
            if (isset($rule['max_length']) && strlen($value) > $rule['max_length']) {
                $errors[$field] = "Maximum {$rule['max_length']} characters allowed";
            }
        }
    }
    
    return $errors;
}

function sanitizeInput($data) {
    if (is_array($data)) {
        return array_map('sanitizeInput', $data);
    }
    return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
}

function verifyCSRF() {
    $token = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? $_POST['_token'] ?? null;
    if (!$token || !hash_equals($_SESSION['csrf_token'] ?? '', $token)) {
        jsonResponse(['error' => 'Invalid CSRF token'], 403);
    }
}

function rateLimit($identifier, $limit = API_RATE_LIMIT) {
    $key = 'rate_limit_' . md5($identifier);
    $current = apcu_fetch($key, $success);
    
    if (!$success) {
        apcu_store($key, 1, 3600);
        return true;
    }
    
    if ($current >= $limit) {
        jsonResponse(['error' => 'Rate limit exceeded'], 429);
    }
    
    apcu_inc($key);
    return true;
}
?>