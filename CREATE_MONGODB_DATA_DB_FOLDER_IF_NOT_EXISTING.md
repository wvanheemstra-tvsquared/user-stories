MongoDB

See also https://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/

The following example command creates the default /data/db directory:

mkdir -p /data/db

Before running mongod for the first time, ensure that the user account running mongod has read and write permissions for the directory.

If your system PATH variable includes the location of the mongod binary and if you use the default data directory (i.e., /data/db), simply enter mongod at the system prompt:

mongod

If you do not use the default data directory (i.e., /data/db), specify the path to the data directory using the --dbpath option:

mongod --dbpath <path to data directory>

Later, to stop MongoDB, press Control+C in the terminal where the mongod instance is running.