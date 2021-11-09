delete from `hotel`;
insert into `hotel` (`name`, `rooms`, `amenities`, `standard_price`, `queen_price`, `king_price`, `weekend_differential`,`hotel_image`)
values
    ("The Magnolia All Suites", 20, 15, 100, 150, 250, 0.25, LOAD_FILE("./hotel1.JPG")),
    ("The Lofts at Town Centre", 60, 13, 105, 120, 190, 0.35),
    ("Park North Hotel", 100, 12, 50, 75, 90, 0.15),
    ("The Courtyard Suites", 20, 15, 100, 150, 250, 0.25),
    ("The Regency Rooms", 20, 15, 100, 150, 250, 0.25),
    ("Town Inn Budget Rooms", 150, 8, 25, 50, 60, 0.15),
    ("The Comfy Motel Place", 50, 0, 30, 50, null, 0.1),
    ("Sun Palace Inn", 50, 12, 40, 60, 80, 0.25),
    ("HomeAway Inn", 30, 9, 40, 60, 80, 0.25),
    ("Rio Inn", 50, 8, 25, 55, 89, 0.2);