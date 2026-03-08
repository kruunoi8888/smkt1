<?php
require_once 'db.php';

$type = $_GET['type'] ?? '';
$action = $_SERVER['REQUEST_METHOD'];
$id = $_GET['id'] ?? null;

// Helper to handle JSON fields
function encode_json_fields(&$item, $fields) {
    foreach ($fields as $field) {
        if (isset($item[$field]) && is_array($item[$field])) {
            $item[$field] = json_encode($item[$field], JSON_UNESCAPED_UNICODE);
        }
    }
}

function decode_json_fields(&$item, $fields) {
    foreach ($fields as $field) {
        if (isset($item[$field]) && is_string($item[$field])) {
            $item[$field] = json_decode($item[$field], true);
        }
    }
}

// Map types to tables
$tables = [
    'news' => 'news',
    'achievements' => 'achievements',
    'personnel' => 'personnel',
    'journals' => 'journals',
    'menus' => 'menus',
    'events' => 'events',
    'grade_stats' => 'grade_stats',
    'slides' => 'slides',
    'widgets' => 'widgets',
    'shortcuts' => 'shortcuts',
    'hero_shortcuts' => 'hero_shortcuts',
    'admin_users' => 'admin_users'
];

if (!isset($tables[$type]) && $type !== 'config' && $type !== 'init') {
    send_response(["error" => "Invalid type"], 400);
}

$table = $tables[$type] ?? '';

if ($type === 'init') {
    // This is a one-time setup script
    // In a real app, you'd protect this or remove it
    try {
        $sql = file_get_contents('schema.sql');
        $pdo->exec($sql);
        send_response(["success" => true, "message" => "Database initialized"]);
    } catch (Exception $e) {
        send_response(["error" => $e->getMessage()], 500);
    }
}

if ($type === 'config') {
    if ($action === 'GET') {
        $stmt = $pdo->query("SELECT * FROM school_config LIMIT 1");
        $config = $stmt->fetch();
        
        if (!$config) {
            send_response(["error" => "Config not found"], 404);
        }

        // Fetch related data for config object
        $stmt = $pdo->prepare("SELECT * FROM personnel WHERE id = ?");
        $stmt->execute([$config['director_id']]);
        $config['director'] = $stmt->fetch();

        $config['stats'] = [
            'totalStudents' => 0,
            'maleStudents' => 0,
            'femaleStudents' => 0,
            'totalStaff' => 0,
            'gradeStats' => $pdo->query("SELECT * FROM grade_stats")->fetchAll()
        ];
        
        foreach ($config['stats']['gradeStats'] as $gs) {
            $config['stats']['totalStudents'] += ($gs['male'] + $gs['female']);
            $config['stats']['maleStudents'] += $gs['male'];
            $config['stats']['femaleStudents'] += $gs['female'];
        }
        
        $config['stats']['totalStaff'] = $pdo->query("SELECT COUNT(*) FROM personnel")->fetchColumn();
        
        $config['slides'] = $pdo->query("SELECT * FROM slides")->fetchAll();
        
        $widgets = $pdo->query("SELECT * FROM widgets")->fetchAll();
        foreach ($widgets as &$w) {
            $stmt = $pdo->prepare("SELECT * FROM shortcuts WHERE widget_id = ?");
            $stmt->execute([$w['id']]);
            $w['shortcuts'] = $stmt->fetchAll();
        }
        $config['widgets'] = $widgets;
        
        $config['heroShortcuts'] = $pdo->query("SELECT * FROM hero_shortcuts")->fetchAll();
        
        $config['visitorStats'] = [
            'today' => (int)$config['visitor_today'],
            'thisMonth' => (int)$config['visitor_month'],
            'total' => (int)$config['visitor_total']
        ];

        send_response($config);
    } elseif ($action === 'POST') {
        $input = get_json_input();
        // Update school_config table
        $fields = ['name', 'area', 'videoUrl', 'primaryColor', 'secondaryColor', 'logo', 'address', 'phone', 'email', 'facebook', 'bannerImage', 'bannerSlogan', 'bannerTextColor', 'sloganBorderColor', 'sloganTextColor', 'bodyBackgroundColor', 'bodyTextColor', 'footerBackgroundColor', 'footerTextColor', 'fontFamily'];
        
        $sets = [];
        $params = [];
        foreach ($fields as $f) {
            if (isset($input[$f])) {
                $sets[] = "$f = ?";
                $params[] = $input[$f];
            }
        }
        
        if (isset($input['director']['id'])) {
            $sets[] = "director_id = ?";
            $params[] = $input['director']['id'];
        }

        if (isset($input['visitorStats'])) {
            $sets[] = "visitor_today = ?";
            $params[] = $input['visitorStats']['today'];
            $sets[] = "visitor_month = ?";
            $params[] = $input['visitorStats']['thisMonth'];
            $sets[] = "visitor_total = ?";
            $params[] = $input['visitorStats']['total'];
        }

        if (!empty($sets)) {
            $sql = "UPDATE school_config SET " . implode(', ', $sets) . " WHERE id = 1";
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
        }
        
        send_response(["success" => true]);
    }
}

// Generic CRUD for other tables
if ($action === 'GET') {
    if ($id) {
        $stmt = $pdo->prepare("SELECT * FROM $table WHERE id = ?");
        $stmt->execute([$id]);
        $item = $stmt->fetch();
        if ($item) {
            decode_json_fields($item, ['images']);
            send_response($item);
        } else {
            send_response(["error" => "Not found"], 404);
        }
    } else {
        $items = $pdo->query("SELECT * FROM $table")->fetchAll();
        foreach ($items as &$item) {
            decode_json_fields($item, ['images']);
        }
        send_response($items);
    }
} elseif ($action === 'POST') {
    $input = get_json_input();
    encode_json_fields($input, ['images']);
    
    $columns = array_keys($input);
    $placeholders = array_fill(0, count($columns), '?');
    
    $sql = "INSERT INTO $table (" . implode(',', $columns) . ") VALUES (" . implode(',', $placeholders) . ") 
            ON DUPLICATE KEY UPDATE " . implode('=?,', $columns) . "=?";
    
    $params = array_values($input);
    // Add params for the UPDATE part
    $params = array_merge($params, array_values($input));
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    send_response(["success" => true, "id" => $input['id'] ?? $pdo->lastInsertId()]);
} elseif ($action === 'DELETE') {
    if (!$id) send_response(["error" => "ID required"], 400);
    $stmt = $pdo->prepare("DELETE FROM $table WHERE id = ?");
    $stmt->execute([$id]);
    send_response(["success" => true]);
}
?>
