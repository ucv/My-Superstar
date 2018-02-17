<?php
$beaches = [
    ['Bondi Beach', -33.890542, 151.274856, 4],
    ['Coogee Beach', -33.923036, 151.259052, 5],
    ['Cronulla Beach', -34.028249, 151.157507, 3],
    ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
    ['Maroubra Beach', -33.950198, 151.259302, 1]
];

$beaches = [
    [
        'name' => 'My Casa',
        'lat'  => -33.890542,
        'lng'  => 151.274856,
        'id'   =>4
    ],
    [
        'name' => 'Loco Amblade',
        'lat' => -33.923036,
        'lng'  => 151.259052,
        'id'   =>5
    ],
    [
        'name' => 'Matador',
        'lat'  => -34.028249,
        'lng'  => 151.157507,
        'id'   =>3
    ],
    [
        'name' => 'Excuse me caffe',
        'lat'  => -33.80010128657071,
        'lng'  => 151.28747820854187,
        'id'   =>2
    ],
    [
        'name' => 'Last supper',
        'lat'  => -33.950198,
        'lng'  => 151.259302,
        'id'   =>1
    ]
];

$reviews = [
    [
        'id' => 1,
        'restaurant_id' => 1,
        'reviewer_name' => 'Lonely Heart',
        'reviewer_comment' => 'This is a fantastic place to spend a day alone! Will come back for sure',
        'reviewer_stars' => 5
    ],
    [
        'id' => 2,
        'restaurant_id' => 3,
        'reviewer_name' => 'Someone Important',
        'reviewer_comment' => 'Not the best place to setup a meeting, nice place dough!',
        'reviewer_stars' => 4
    ]
];

$beaches_json = json_encode($beaches);

$myfile = fopen("restaurants.json", "w") or die("Unable to open file!".json_encode(error_get_last()));
fwrite($myfile, $beaches_json);
fclose($myfile);

$myfile = fopen("reviews.json", "w") or die("Unable to open file!".json_encode(error_get_last()));
fwrite($myfile, json_encode($reviews));
fclose($myfile);

echo $beaches_json;

