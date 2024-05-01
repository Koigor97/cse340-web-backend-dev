-- SQL command to create enum type for the account types

CREATE TYPE public.account_type AS ENUM
    ('Clients', 'Employee', 'Admin'); 

-- ALTERING the public.account_type
ALTER TYPE public.account_type
    OWNER TO cse340db;

    