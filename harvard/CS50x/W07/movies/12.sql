SELECT m.title
FROM movies AS m
JOIN stars AS sb ON m.id = sb.movie_id
JOIN people AS pb ON sb.person_id = pb.id
WHERE pb.name = 'Bradley Cooper'
INTERSECT
SELECT m.title
FROM movies AS m
JOIN stars AS sj ON m.id = sj.movie_id
JOIN people AS pj ON sj.person_id = pj.id
WHERE pj.name = 'Jennifer Lawrence';
