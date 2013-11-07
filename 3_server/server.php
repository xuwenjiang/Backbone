<?php
//This is a fake server, should save DB and return saved model to front-end
//Instead, I return fake person details
$namePool = array(
    'Abraham',
    'Allan',
    'Alsop',
    'Arnold',
    'Avery',
    'Bailey',
    'Baker',
    'Ball',
    'Blake',
    'Bond',
    'Bower',
    'Brown',
    'Buckland',
    'Burgess',
    'Butler',
    'Cameron',
    'Campbell',
    'Carr',
    'Chapman',
    'Churchill',
    'Clark',
    'Clarkson',
    'Coleman',
    'Cornish',
    'Davidson',
    'Ellison',
    'Grant',
    'Hughes',
    'Hunter',
    'Jackson',
    'James',
    'Jones',
    'Kerr',
    'Knox',
    'Lawrence',
    'MacLeod',
    'Marshall',
    'McLean',
    'McGrath',
    'Metcalfe',
    'Mitchell',
    'Nolan',
    'North',
    'Oliver',
    'Parr',
    'Paterson',
    'Pullman',
    'Reid',
    'Russell',
    'Taylor',
    'Terry',
    'Turner',
    'Underwood',
    'Vaughan',
    'Wilson'
);

$genderPool = array(
    'Male',
    'Female'
);

$now = time();
$randNumberOfSeconds = rand(60 * 60 * 24 * 365 * 25, 60 * 60 * 24 * 365 * 35);

$random = array(
    'name' => $namePool[array_rand($namePool)],
    'gender' => $genderPool[array_rand($genderPool)],
    'dob' => date('Y-m-d', $now-$randNumberOfSeconds),
);

echo json_encode($random);