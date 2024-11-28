SELECT * FROM Containers FOR JSON PATH;


-- Альтернативный вариант
DECLARE @result varchar(MAX);
SELECT @result = ISNULL(@result, '') + '{' + (
    '"id":' + CONVERT(VARCHAR(20), id)
    + ',' +
    '"number":' + CONVERT(VARCHAR(20), number)
    + ',' +
    '"type":' + '"' + type + '"'
    + ',' +
    '"length":' + CONVERT(VARCHAR(20), length)
    + ',' +
    '"width":' + CONVERT(VARCHAR(20), width)
    + ',' +
    '"height":' + CONVERT(VARCHAR(20), height)
    + ',' +
    '"weight":' + CONVERT(VARCHAR(20), weight)
    + ',' +
    '"empty":' + CONVERT(VARCHAR(20), empty)
    + ',' +
    '"receipt_date":' + '"' + CONVERT(VARCHAR(20), receipt_date, 126) + '"'
) + '},'
FROM Containers;

SELECT result = '[' + substring(@result, 0, len(@result)) + ']';
