-- Detective Log SQL Queries for the Bakery Heist

-- 1. Look in crime scene reports for information about the crime on July 28, 2023
SELECT csr.description
FROM crime_scene_reports AS csr
WHERE csr.year = 2023 AND csr.month = 7 AND csr.day = 28;

-- 2. Look for the three witnesses and find their interviews on July 2, 2023
SELECT i.name, i.transcript
FROM interviews AS i
WHERE i.year = 2023 AND i.month = 7 AND i.day = 2;

-- 3. Look at security logs for activity between 10:15 and 10:25 on July 28, 2023
SELECT bsl.license_plate, bsl.hour, bsl.minute, bsl.activity
FROM bakery_security_logs AS bsl
WHERE bsl.day = 28 AND bsl.year = 2023 AND bsl.month = 7
  AND bsl.hour = 10 AND bsl.minute BETWEEN 15 AND 25;

-- 4. Look for the names of the people whose license plates were seen exiting between 10:15 and 10:25
SELECT p.name
FROM people AS p
WHERE p.license_plate IN (
    SELECT bsl.license_plate
    FROM bakery_security_logs AS bsl
    WHERE bsl.day = 28 AND bsl.year = 2023 AND bsl.month = 7
      AND bsl.hour = 10 AND bsl.minute BETWEEN 15 AND 25
);

-- 5. Look if those people have a bank account
SELECT ba.account_number
FROM bank_accounts AS ba
WHERE ba.person_id IN (
    SELECT p.id
    FROM people AS p
    WHERE p.license_plate IN (
        SELECT bsl.license_plate
        FROM bakery_security_logs AS bsl
        WHERE bsl.day = 28 AND bsl.year = 2023 AND bsl.month = 7
          AND bsl.hour = 10 AND bsl.minute BETWEEN 15 AND 25
    )
);

-- 6. Look if those people withdrew money earlier that day (July 28, 2023) at the Leggett Street ATM
SELECT at.account_number
FROM atm_transactions AS at
WHERE at.transaction_type = 'withdraw'
  AND at.atm_location = 'Leggett Street'
  AND at.year = 2023 AND at.month = 7 AND at.day = 28
  AND at.account_number IN (
    SELECT ba.account_number
    FROM bank_accounts AS ba
    WHERE ba.person_id IN (
        SELECT p.id
        FROM people AS p
        WHERE p.license_plate IN (
            SELECT bsl.license_plate
            FROM bakery_security_logs AS bsl
            WHERE bsl.day = 28 AND bsl.year = 2023 AND bsl.month = 7
              AND bsl.hour = 10 AND bsl.minute BETWEEN 15 AND 25
        )
    )
);

-- 7. Lookup the names of those people who withdrew money at Leggett Street on July 28, 2023
SELECT p.name
FROM people AS p
WHERE p.id IN (
    SELECT ba.person_id
    FROM bank_accounts AS ba
    WHERE ba.account_number IN (
        SELECT at.account_number
        FROM atm_transactions AS at
        WHERE at.transaction_type = 'withdraw'
          AND at.atm_location = 'Leggett Street'
          AND at.year = 2023 AND at.month = 7 AND at.day = 28
          AND at.account_number IN (
            SELECT ba2.account_number
            FROM bank_accounts AS ba2
            WHERE ba2.person_id IN (
                SELECT p2.id
                FROM people AS p2
                WHERE p2.license_plate IN (
                    SELECT bsl.license_plate
                    FROM bakery_security_logs AS bsl
                    WHERE bsl.day = 28 AND bsl.year = 2023 AND bsl.month = 7
                      AND bsl.hour = 10 AND bsl.minute BETWEEN 15 AND 25
                )
            )
        )
    )
);

-- 8. Look if they called someone on July 28, 2023, with a call duration less than 60 seconds
--    (using the phone numbers of the suspects identified by the ATM withdrawal)
SELECT pc.caller, pc.receiver
FROM phone_calls AS pc
WHERE pc.year = 2023 AND pc.month = 7 AND pc.day = 28 AND pc.duration < 60
  AND pc.caller IN (
    SELECT p.phone_number
    FROM people AS p
    WHERE p.id IN (
        SELECT ba.person_id
        FROM bank_accounts AS ba
        WHERE ba.account_number IN (
            SELECT at.account_number
            FROM atm_transactions AS at
            WHERE at.transaction_type = 'withdraw'
              AND at.atm_location = 'Leggett Street'
              AND at.year = 2023 AND at.month = 7 AND at.day = 28
              AND at.account_number IN (
                SELECT ba2.account_number
                FROM bank_accounts AS ba2
                WHERE ba2.person_id IN (
                    SELECT p2.id
                    FROM people AS p2
                    WHERE p2.license_plate IN (
                        SELECT bsl.license_plate
                        FROM bakery_security_logs AS bsl
                        WHERE bsl.day = 28 AND bsl.year = 2023 AND bsl.month = 7
                          AND bsl.hour = 10 AND bsl.minute BETWEEN 15 AND 25
                    )
                )
            )
        )
    )
);

-- 9. Find the names of the callers and receivers from the short phone calls
--    (This would likely involve another join or subquery based on the results of the previous query)
--    Example (assuming the previous query returned 'caller' and 'receiver' phone numbers):
SELECT p_caller.name AS caller_name, p_receiver.name AS receiver_name
FROM phone_calls AS pc
JOIN people AS p_caller ON pc.caller = p_caller.phone_number
JOIN people AS p_receiver ON pc.receiver = p_receiver.phone_number
WHERE pc.year = 2023 AND pc.month = 7 AND pc.day = 28 AND pc.duration < 60
  AND pc.caller IN (
    SELECT p.phone_number
    FROM people AS p
    WHERE p.id IN (
        SELECT ba.person_id
        FROM bank_accounts AS ba
        WHERE ba.account_number IN (
            SELECT at.account_number
            FROM atm_transactions AS at
            WHERE at.transaction_type = 'withdraw'
              AND at.atm_location = 'Leggett Street'
              AND at.year = 2023 AND at.month = 7 AND at.day = 28
              AND at.account_number IN (
                SELECT ba2.account_number
                FROM bank_accounts AS ba2
                WHERE ba2.person_id IN (
                    SELECT p2.id
                    FROM people AS p2
                    WHERE p2.license_plate IN (
                        SELECT bsl.license_plate
                        FROM bakery_security_logs AS bsl
                        WHERE bsl.day = 28 AND bsl.year = 2023 AND bsl.month = 7
                          AND bsl.hour = 10 AND bsl.minute BETWEEN 15 AND 25
                    )
                )
            )
        )
    )
);
