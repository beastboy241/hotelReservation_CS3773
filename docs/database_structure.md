```txt
+-------------------+
| Tables_in_hoteldb |
+-------------------+
| hotel             |
| reservations      |
| user              |
+-------------------+
```

## hotel

```txt
+----------------------+------------------+------+-----+---------+----------------+
| Field                | Type             | Null | Key | Default | Extra          |
+----------------------+------------------+------+-----+---------+----------------+
| id                   | int(11)          | NO   | PRI | NULL    | auto_increment |
| name                 | varchar(200)     | NO   |     | NULL    |                |
| rooms                | int(11)          | NO   |     | NULL    |                |
| amenities            | int(10) unsigned | YES  |     | NULL    |                |
| standard_price       | float            | YES  |     | NULL    |                |
| queen_price          | float            | YES  |     | NULL    |                |
| king_price           | float            | YES  |     | NULL    |                |
| weekend_differential | float            | YES  |     | NULL    |                |
+----------------------+------------------+------+-----+---------+----------------+
```

## reservations

```txt
+----------+---------+------+-----+---------+----------------+
| Field    | Type    | Null | Key | Default | Extra          |
+----------+---------+------+-----+---------+----------------+
| id       | int(11) | NO   | PRI | NULL    | auto_increment |
| hotel_id | int(11) | NO   |     | NULL    |                |
| usr_id   | int(11) | NO   |     | NULL    |                |
| room     | int(11) | NO   |     | NULL    |                |
| type     | char(1) | NO   |     | NULL    |                |
| start_dt | date    | NO   |     | NULL    |                |
| end_dt   | date    | NO   |     | NULL    |                |
+----------+---------+------+-----+---------+----------------+
```

## user

```txt
+-----------+--------------+------+-----+---------+----------------+
| Field     | Type         | Null | Key | Default | Extra          |
+-----------+--------------+------+-----+---------+----------------+
| id        | int(11)      | NO   | PRI | NULL    | auto_increment |
| firstName | varchar(100) | YES  |     | NULL    |                |
| lastName  | varchar(100) | YES  |     | NULL    |                |
| email     | varchar(100) | NO   | UNI | NULL    |                |
| phone     | int(11)      | YES  |     | NULL    |                |
| type      | char(1)      | YES  |     | u       |                |
| password  | varchar(200) | NO   |     | NULL    |                |
+-----------+--------------+------+-----+---------+----------------+
```


## hotels populated

```txt
+----+--------------------------+-------+-----------+----------------+-------------+------------+----------------------+
| id | name                     | rooms | amenities | standard_price | queen_price | king_price | weekend_differential |
+----+--------------------------+-------+-----------+----------------+-------------+------------+----------------------+
|  1 | The Magnolia All Suites  |    20 |        15 |            100 |         150 |        250 |                 0.25 |
|  2 | The Lofts at Town Centre |    60 |        13 |            105 |         120 |        190 |                 0.35 |
|  3 | Park North Hotel         |   100 |        12 |             50 |          75 |         90 |                 0.15 |
|  4 | The Courtyard Suites     |    20 |        15 |            100 |         150 |        250 |                 0.25 |
|  5 | The Regency Rooms        |    20 |        15 |            100 |         150 |        250 |                 0.25 |
|  6 | Town Inn Budget Rooms    |   150 |         8 |             25 |          50 |         60 |                 0.15 |
|  7 | The Comfy Motel Place    |    50 |         0 |             30 |          50 |       NULL |                  0.1 |
|  8 | Sun Palace Inn           |    50 |        12 |             40 |          60 |         80 |                 0.25 |
|  9 | HomeAway Inn             |    30 |         9 |             40 |          60 |         80 |                 0.25 |
| 10 | Rio Inn                  |    50 |         8 |             25 |          55 |         89 |                  0.2 |
+----+--------------------------+-------+-----------+----------------+-------------+------------+----------------------+
```
