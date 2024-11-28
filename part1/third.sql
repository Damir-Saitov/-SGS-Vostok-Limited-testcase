DECLARE @container_id INT;

SET @container_id = 1;


SELECT * FROM Operations
WHERE (container_id = @container_id)
FOR JSON PATH;


-- Альтернативный вариант
DECLARE @result varchar(MAX);
SELECT @result = ISNULL(@result, '') + '{' + (
    '"id":' + CONVERT(VARCHAR(20), id)
    + ',' +
    '"container_id":' + CONVERT(VARCHAR(20), container_id)
    + ',' +
    '"start_date":' + '"' + CONVERT(VARCHAR(20), start_date, 126) + '"'
    + ',' +
    '"end_date":' + '"' + CONVERT(VARCHAR(20), end_date, 126) + '"'
    + ',' +
    '"type":' + '"' + type + '"'
    + ',' +
    '"operators_fullname":' + '"' + operators_fullname + '"'
    + ',' +
    '"inspection_place":' + '"' + inspection_place + '"'
) + '},'
FROM Operations
WHERE (container_id = @container_id);

SELECT result = '[' + substring(@result, 0, len(@result)) + ']';