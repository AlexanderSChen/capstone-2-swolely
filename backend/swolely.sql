\echo 'Delete and recreate swolely db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE swolely;
CREATE DATABASE swolely;
\connect swolely

\i swolely-schemas.sql
\i swolely-seed.sql

-- \echo 'Delete and recreate swolely_test db?'
-- \prompt 'Return for yes or control-C to cancel > ' foo

-- DROP DATABASE swolely_test;
-- CREATE DATABASE swolely_test;
-- \connect swolely_test

-- \i swolely-schema.sql
