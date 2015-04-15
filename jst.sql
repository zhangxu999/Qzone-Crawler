select distinct from qq
SELECT  (SELECT come_id FROM  fetchqzone_comment WHERE `to_id`=738285867 UNION SELECT  `to_id` FROM fetchqzone_comment WHERE `come_id`=738285867) AS FRI

SELECT come_id FROM  fetchqzone_comment WHERE `to_id` IN FRI) UNION
  `id``id``id`(SELECT `to_id` FROM fetchqzone_comment WHERE `come_id` IN  ((SELECT come_id FROM  fetchqzone_comment WHERE `to_id`=738285867) UNION (SELECT  `to_id` FROM fetchqzone_comment WHERE `come_id`=738285867)) AS fri)


#二度人脉
INSERT  INTO fri SELECT *  FROM (SELECT come_id FROM  fetchqzone_comment WHERE `to_id`=738285867 UNION SELECT  `to_id` FROM fetchqzone_comment WHERE `come_id`=738285867) AS fr
INSERT INTO fri2 SELECT DISTINCT  * FROM ((SELECT come_id FROM  fetchqzone_comment WHERE `to_id` IN (SELECT qq FROM fri)) UNION (SELECT  `to_id` FROM fetchqzone_comment WHERE `come_id` IN (SELECT qq FROM fri))) AS fr2
SELECT * FROM fri2 WHERE qq NOT IN (SELECT qq FROM fri);

#共同好友
INSERT  INTO fri SELECT *  FROM (SELECT come_id FROM  fetchqzone_comment WHERE `to_id`=738285867 AND come_id!=to_id UNION SELECT  `to_id` FROM fetchqzone_comment WHERE `come_id`=738285867 AND to_id!=come_id) AS fr
INSERT  INTO mate SELECT *  FROM (SELECT come_id FROM  fetchqzone_comment WHERE `to_id`=1083024576 AND come_id!=to_id  UNION SELECT  `to_id` FROM fetchqzone_comment WHERE `come_id`=1083024576 AND come_id!=to_id ) AS fr
SELECT * FROM fri WHERE qq IN (SELECT qq FROM mate)
