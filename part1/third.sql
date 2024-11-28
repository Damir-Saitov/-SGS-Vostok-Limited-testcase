DECLARE @container_id INT;

SET @container_id = 1;


SELECT * FROM Operations
WHERE (container_id = @container_id)
FOR JSON PATH;
