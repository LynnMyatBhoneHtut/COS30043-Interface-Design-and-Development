<?php
/*
 * Lab 10 - the only file that talks to MySQL.
 * The Vue app calls it with fetch() and always gets JSON back.
 *
 *   GET                                  -> all destinations       (Read)
 *   POST { action: 'create', ... }       -> add a destination      (Create)
 *   POST { action: 'update', id, ... }   -> change a destination   (Update)
 *   POST { action: 'delete', id }        -> remove a destination   (Delete)
 */

header('Content-Type: application/json');
require_once 'settings.php';

// Make mysqli throw an error we can catch (same on PHP 7 and PHP 8)
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$CATEGORIES = ['Beach', 'City', 'Mountain', 'Ocean'];

// Send a JSON answer and stop
function reply($data, $status = 200) {
  http_response_code($status);
  echo json_encode($data);
  exit;
}

// Check the values sent from the form. Returns an error message, or '' if all good.
function checkDestination($d, $categories) {
  if ($d['name'] === '' || strlen($d['name']) > 100) return 'Name is required (max 100 characters).';
  if ($d['country'] === '' || strlen($d['country']) > 60) return 'Country is required (max 60 characters).';
  if (!in_array($d['category'], $categories, true)) return 'Please choose a valid category.';
  if ($d['description'] === '' || strlen($d['description']) > 255) return 'Description is required (max 255 characters).';
  if (!is_numeric($d['rating']) || $d['rating'] < 0 || $d['rating'] > 5) return 'Rating must be a number from 0 to 5.';
  return '';
}

try {
  $conn = new mysqli($host, $user, $password, $database);
  $conn->set_charset('utf8mb4');

  // ---------- READ ----------
  if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $conn->query('SELECT id, name, country, category, description, rating FROM travel ORDER BY id');
    $rows = [];
    while ($row = $result->fetch_assoc()) {
      $row['id'] = (int) $row['id'];
      $row['rating'] = (float) $row['rating'];
      $rows[] = $row;
    }
    reply($rows);
  }

  if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    reply(['error' => 'Only GET and POST are allowed.'], 405);
  }

  // The app sends JSON in the request body
  $input  = json_decode(file_get_contents('php://input'), true) ?: [];
  $action = $input['action'] ?? '';
  $id     = (int) ($input['id'] ?? 0);

  $d = [
    'name'        => trim($input['name'] ?? ''),
    'country'     => trim($input['country'] ?? ''),
    'category'    => trim($input['category'] ?? ''),
    'description' => trim($input['description'] ?? ''),
    'rating'      => $input['rating'] ?? ''
  ];

  // ---------- CREATE ----------
  if ($action === 'create') {
    $error = checkDestination($d, $CATEGORIES);
    if ($error) reply(['error' => $error], 400);

    // Prepared statement: the ? values are sent separately, so no SQL injection
    $stmt = $conn->prepare('INSERT INTO travel (name, country, category, description, rating) VALUES (?, ?, ?, ?, ?)');
    $stmt->bind_param('ssssd', $d['name'], $d['country'], $d['category'], $d['description'], $d['rating']);
    $stmt->execute();
    reply(['message' => 'Destination added.', 'id' => $conn->insert_id]);
  }

  // ---------- UPDATE ----------
  if ($action === 'update') {
    if ($id <= 0) reply(['error' => 'Missing destination id.'], 400);
    $error = checkDestination($d, $CATEGORIES);
    if ($error) reply(['error' => $error], 400);

    $stmt = $conn->prepare('UPDATE travel SET name = ?, country = ?, category = ?, description = ?, rating = ? WHERE id = ?');
    $stmt->bind_param('ssssdi', $d['name'], $d['country'], $d['category'], $d['description'], $d['rating'], $id);
    $stmt->execute();
    reply(['message' => 'Destination updated.']);
  }

  // ---------- DELETE ----------
  if ($action === 'delete') {
    if ($id <= 0) reply(['error' => 'Missing destination id.'], 400);

    $stmt = $conn->prepare('DELETE FROM travel WHERE id = ?');
    $stmt->bind_param('i', $id);
    $stmt->execute();
    if ($stmt->affected_rows === 0) reply(['error' => 'That destination no longer exists.'], 404);
    reply(['message' => 'Destination deleted.']);
  }

  reply(['error' => 'Unknown action.'], 400);

} catch (mysqli_sql_exception $e) {
  reply(['error' => 'Database error: ' . $e->getMessage()], 500);
}
