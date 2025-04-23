SELECT DISTINCT p.name
FROM people AS p
JOIN stars AS s ON p.id = s.person_id
WHERE s.movie_id IN (
    SELECT m.id
    FROM movies AS m
    JOIN stars AS skb ON m.id = skb.movie_id
    JOIN people AS pkb ON skb.person_id = pkb.id
    WHERE pkb.name = 'Kevin Bacon' AND pkb.birth = 1958
)
AND p.name != 'Kevin Bacon';
