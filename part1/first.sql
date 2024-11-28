DROP TABLE IF EXISTS Operations;
DROP TABLE IF EXISTS Containers;


CREATE TABLE Containers(
    id INT PRIMARY KEY IDENTITY(1, 1),
    number INT,
    type VARCHAR(32),
    length INT,
    width INT,
    height INT,
    weight INT,
    empty BIT,
    receipt_date DATETIME
);


CREATE TABLE Operations(
    id INT PRIMARY KEY IDENTITY(1, 1),
    container_id INT REFERENCES Containers(id),
    start_date DATETIME,
    end_date DATETIME,
    type VARCHAR(32),
    operators_fullname VARCHAR(255),
    inspection_place VARCHAR(255)
);


-- Test Data
INSERT INTO Containers VALUES
(
    1,
    'Type 1',
    100,
    100,
    100,
    100,
    0,
    '2000-01-01 12:00'
),
(
    2,
    'Type 2',
    200,
    200,
    200,
    200,
    1,
    '2020-10-10 5:00'
),
(
    3,
    'Type 1',
    50,
    50,
    50,
    50,
    1,
    '2010-06-06 13:00'
)

INSERT INTO Operations VALUES
(
    1,
    '2000-01-01 12:00',
    '2000-01-02 12:00',
    'Type 1',
    'He-he Ha-ha Ho-ho',
    'Inspection place'
),
(
    2,
    '2021-11-15 12:00',
    '2021-11-15 13:00',
    'Type 2',
    'FirstName LastName',
    'Inspection place'
),
(
    3,
    '2010-07-30 12:00',
    '2010-07-30 12:01',
    'Type 3',
    'R2D2',
    'Inspection place'
)
