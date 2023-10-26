# STDB-CLI-Docs

Generates Docs for SpacetimeDB CLI

 Assuming STDB is already installed, `npm start` 

> **Current Version**<br/>
> Commit: 37479049891098bb482d2f664a93e078fef0ad37<br/>spacetimedb tool version 0.7.1; spacetimedb-lib version 0.7.1;

<h2>version</h2>

Print the version of the command line tool


```
Usage: spacetime version [OPTIONS]

Options:
  -c, --cli   Prints only the CLI version
  -h, --help  Print help

Run `spacetime help version` for more detailed information.
```

<h2>publish</h2>

Create and update a SpacetimeDB database


```
Usage: spacetime publish [OPTIONS] [name|address]

Arguments:
  [name|address]
          A valid domain or address for this database

Options:
  -t, --host-type <host_type>
          The type of host that should be for hosting this module
          
          [default: wasmer]
          [possible values: wasmer]

  -c, --clear-database
          When publishing a new module to an existing address, also delete all tables associated with the database

  -p, --project-path <path_to_project>
          The system path (absolute or relative) to the module project
          
          [default: .]

      --trace_log
          Turn on diagnostic/performance tracing for this project

  -I, --identity <identity>
          The identity that should own the database. If no identity is provided, your default identity will be used.

  -a, --anon-identity
          Instruct SpacetimeDB to allocate a new identity to own this database

  -S, --skip_clippy
          Skips running clippy on the module before publishing (intended to speed up local iteration, not recommended for CI)
          
          [env: SPACETIME_SKIP_CLIPPY=]

  -d, --debug
          Builds the module using debug instead of release (intended to speed up local iteration, not recommended for CI)

  -s, --server <server>
          The nickname, domain name or URL of the server to host the database.

  -h, --help
          Print help (see a summary with '-h')

Run `spacetime help publish` for more detailed information.
```

<h2>delete</h2>

Deletes a SpacetimeDB database


```
Usage: spacetime delete [OPTIONS] <database>

Arguments:
  <database>
          The domain or address of the database to delete

Options:
  -i, --identity <identity>
          The identity to use for deleting this database. If no identity is provided, the default one will be used.

  -s, --server <server>
          The nickname, host name or URL of the server hosting the database

  -h, --help
          Print help (see a summary with '-h')

Run `spacetime help delete` for more detailed information.
```

<h2>logs</h2>

Prints logs from a SpacetimeDB database


```
Usage: spacetime logs [OPTIONS] <database> [num_lines]

Arguments:
  <database>
          The domain or address of the database to print logs from

  [num_lines]
          The number of lines to print from the start of the log of this database. If no num lines is provided, all lines will be returned.

Options:
  -s, --server <server>
          The nickname, host name or URL of the server hosting the database

  -i, --identity <identity>
          The identity to use for printing logs from this database

  -f, --follow
          A flag that causes logs to not stop when end of the log file is reached, but rather to wait for additional data to be appended to the input.

  -h, --help
          Print help (see a summary with '-h')

Run `spacetime help logs` for more detailed information.
```

<h2>call</h2>

Invokes a reducer function in a database


```
Usage: spacetime call [OPTIONS] <database> <reducer_name> [arguments]...

Arguments:
  <database>      The database domain or address to use to invoke the call
  <reducer_name>  The name of the reducer to call
  [arguments]...  arguments formatted as JSON

Options:
  -s, --server <server>            The nickname, host name or URL of the server hosting the database
  -i, --as-identity <as_identity>  The identity to use for the call
  -a, --anon-identity              If this flag is present, the call will be executed with no identity provided
  -h, --help                       Print help

Run `spacetime help call` for more detailed information.
```

<h2>describe</h2>

Describe the structure of a database or entities within it


```
Usage: spacetime describe [OPTIONS] <database> [entity_type] [entity_name]

Arguments:
  <database>
          The domain or address of the database to describe

  [entity_type]
          Whether to describe a reducer or table
          
          [possible values: reducer, table]

  [entity_name]
          The name of the entity to describe

Options:
  -b, --brief
          If this flag is present, a brief description shall be returned

  -i, --as-identity <as_identity>
          The identity to use to describe the entity. If no identity is provided, the default one will be used.

  -a, --anon-identity
          If this flag is present, no identity will be provided when describing the database

  -s, --server <server>
          The nickname, host name or URL of the server hosting the database

  -h, --help
          Print help (see a summary with '-h')

Run `spacetime help describe` for more detailed information.
```

<h2>identity</h2>

Manage identities stored by the command line tool


```
Usage: spacetime identity
       spacetime identity <COMMAND>

Commands:
  list          List saved identities which apply to a server
  set-default   Set the default identity for a server
  set-email     Associates an email address with an identity
  init-default  Initialize a new default identity if it is missing from a server's config
  new           Creates a new identity
  remove        Removes a saved identity from your spacetime config
  token         Print the token for an identity
  set-name      Set the name of an identity or rename an existing identity nickname
  import        Import an existing identity into your spacetime config
  find          Find an identity for an email
  recover       Recover an existing identity and import it into your local config
  help          Print this message or the help of the given subcommand(s)

Options:
  -h, --help  Print help
```

<details><summary>Sub Commands</summary>

<h3>list</h3>

List saved identities which apply to a server


```
Usage: spacetime identity list [OPTIONS] [server]

Arguments:
  [server]  The nickname, host name or URL of the server to list identities for

Options:
  -a, --all   List all stored identities, regardless of server
  -h, --help  Print help
```

<h3>set-default</h3>

Set the default identity for a server


```
Usage: spacetime identity set-default [OPTIONS] <identity>

Arguments:
  <identity>  The identity string or name that should become the new default identity

Options:
  -s, --server <server>  The server nickname, host name or URL of the server which should use this identity as a default
  -h, --help             Print help
```

<h3>set-email</h3>

Associates an email address with an identity


```
Usage: spacetime identity set-email [OPTIONS] <identity> <email>

Arguments:
  <identity>  The identity string or name that should be associated with the email
  <email>     The email that should be assigned to the provided identity

Options:
  -s, --server <server>  The server that should be informed of the email change
  -a, --all-servers      Inform all known servers of the email change
  -h, --help             Print help
```

<h3>init-default</h3>

Initialize a new default identity if it is missing from a server's config


```
Usage: spacetime identity init-default [OPTIONS]

Options:
  -s, --server <server>  The nickname, host name or URL of the server for which to set the default identity
  -n, --name <name>      The name of the identity that should become the new default identity
  -q, --quiet            Runs command in silent mode
  -h, --help             Print help
```

<h3>new</h3>

Creates a new identity


```
Usage: spacetime identity new [OPTIONS]

Options:
  -s, --server <server>  The nickname, host name or URL of the server from which to request the identity
      --no-save          Don't save save to local config, just create a new identity
  -n, --name <name>      Nickname for this identity
  -e, --email <email>    Recovery email for this identity
      --no-email         Creates an identity without a recovery email
  -d, --default          Make the new identity the default for the server
  -h, --help             Print help
```

<h3>remove</h3>

Removes a saved identity from your spacetime config


```
Usage: spacetime identity remove [OPTIONS] [identity]

Arguments:
  [identity]  The identity string or name to delete

Options:
  -s, --all-server <all-server>  Remove all identities associated with a particular server
  -a, --all                      Remove all identities from your spacetime config
      --force                    Removes all identities without prompting (for CI usage)
  -h, --help                     Print help
```

<h3>token</h3>

Print the token for an identity


```
Usage: spacetime identity token <identity>

Arguments:
  <identity>  The identity string or name that we should print the token for

Options:
  -h, --help  Print help
```

<h3>set-name</h3>

Set the name of an identity or rename an existing identity nickname


```
Usage: spacetime identity set-name <identity> <name>

Arguments:
  <identity>  The identity string or name to be named. If a name is supplied, the corresponding identity will be renamed.
  <name>      The new name for the identity

Options:
  -h, --help  Print help
```

<h3>import</h3>

Import an existing identity into your spacetime config


```
Usage: spacetime identity import [OPTIONS] <identity> <token>

Arguments:
  <identity>  The identity string associated with the provided token
  <token>     The identity token to import. This is used for authenticating with SpacetimeDB

Options:
  -n, --name <name>  A name for the newly imported identity
  -h, --help         Print help
```

<h3>find</h3>

Find an identity for an email


```
Usage: spacetime identity find [OPTIONS] <email>

Arguments:
  <email>  The email associated with the identity that you would like to find

Options:
  -s, --server <server>  The server to search for identities matching the email
  -h, --help             Print help
```

<h3>recover</h3>

Recover an existing identity and import it into your local config


```
Usage: spacetime identity recover [OPTIONS] <email> <identity>

Arguments:
  <email>     The email associated with the identity that you would like to recover.
  <identity>  The identity you would like to recover. This identity must be associated with the email provided.

Options:
  -s, --server <server>  The server from which to request recovery codes
  -h, --help             Print help
```
</details>
<h2>energy</h2>

Invokes commands related to database budgets


```
Usage: spacetime energy
       spacetime energy <COMMAND>

Commands:
  status       Show current energy balance for an identity
  set-balance  Update the current budget balance for a database
  help         Print this message or the help of the given subcommand(s)

Options:
  -h, --help  Print help
```

<details><summary>Sub Commands</summary>

<h3>status</h3>

Show current energy balance for an identity


```
Usage: spacetime energy status [OPTIONS] [identity]

Arguments:
  [identity]
          The identity to check the balance for. If no identity is provided, the default one will be used.

Options:
  -s, --server <server>
          The nickname, host name or URL of the server from which to request balance information

  -h, --help
          Print help (see a summary with '-h')
```

<h3>set-balance</h3>

Update the current budget balance for a database


```
Usage: spacetime energy set-balance [OPTIONS] <balance> [identity]

Arguments:
  <balance>
          The balance value to set

  [identity]
          The identity to set a balance for. If no identity is provided, the default one will be used.

Options:
  -s, --server <server>
          The nickname, host name or URL of the server on which to update the identity's balance

  -q, --quiet
          Runs command in silent mode

  -h, --help
          Print help (see a summary with '-h')
```
</details>
<h2>sql</h2>

Runs a SQL query on the database.


```
Usage: spacetime sql [OPTIONS] <--interactive|query> <database>

Arguments:
  <database>
          The domain or address of the database you would like to query

  <query>
          The SQL query to execute

Options:
      --interactive
          Runs an interactive command prompt for `SQL` expressions

  -i, --as-identity <as_identity>
          The identity to use for querying the database. If no identity is provided, the default one will be used.

  -a, --anon-identity
          If this flag is present, no identity will be provided when querying the database

  -s, --server <server>
          The nickname, host name or URL of the server hosting the database

  -h, --help
          Print help (see a summary with '-h')
```

<h2>dns</h2>

Create, manage and query domains


```
Usage: spacetime dns
       spacetime dns <COMMAND>

Commands:
  register-tld    Registers a new top level domain
  lookup          Resolves a domain to a database address
  reverse-lookup  Returns the domains for the provided database address
  set-name        Sets the domain of the database
  help            Print this message or the help of the given subcommand(s)

Options:
  -h, --help  Print help
```

<details><summary>Sub Commands</summary>

<h3>register-tld</h3>

Registers a new top level domain


```
Usage: spacetime dns register-tld [OPTIONS] <tld>

Arguments:
  <tld>  The top level domain that you would like to register

Options:
  -i, --identity <identity>  The identity that should own this tld. If no identity is specified, then the default identity is used
  -s, --server <server>      The nickname, host name or URL of the server on which to register the domain
  -h, --help                 Print help

Run `spacetime dns register-tld --help` for more detailed information.
```

<h3>lookup</h3>

Resolves a domain to a database address


```
Usage: spacetime dns lookup [OPTIONS] <domain>

Arguments:
  <domain>  The name of the domain to lookup

Options:
  -s, --server <server>  The nickname, host name or URL of the server on which to look up the domain name
  -h, --help             Print help

Run `spacetime dns lookup --help` for more detailed information
```

<h3>reverse-lookup</h3>

Returns the domains for the provided database address


```
Usage: spacetime dns reverse-lookup [OPTIONS] <address>

Arguments:
  <address>  The address you would like to find all of the known domains for

Options:
  -s, --server <server>  The nickname, host name or URL of the server on which to look up the address
  -h, --help             Print help

Run `spacetime dns reverse-lookup --help` for more detailed information.
```

<h3>set-name</h3>

Sets the domain of the database


```
Usage: spacetime dns set-name [OPTIONS] <domain> <address>

Arguments:
  <domain>
          The domain you would like to assign or create

  <address>
          The database address to assign to the domain

Options:
  -i, --identity <identity>
          The identity that owns the tld for this domain. If no identity is specified, the default identity is used.

  -s, --server <server>
          The nickname, host name or URL of the server on which to set the name

  -h, --help
          Print help (see a summary with '-h')

Run `spacetime dns set-name --help` for more detailed information.
```
</details>
<h2>generate</h2>

Generate client files for a spacetime module.


```
Usage: spacetime generate [OPTIONS] --out-dir <out_dir> --lang <lang>

Options:
  -w, --wasm-file <wasm_file>        The system path (absolute or relative) to the wasm file we should inspect
  -p, --project-path <project_path>  The path to the wasm project [default: .]
  -o, --out-dir <out_dir>            The system path (absolute or relative) to the generate output directory
  -n, --namespace <namespace>        The namespace that should be used (default is 'SpacetimeDB.Types') [default: SpacetimeDB.Types]
  -l, --lang <lang>                  The language to generate [possible values: csharp, typescript, python, rust]
  -s, --skip_clippy                  Skips running clippy on the module before generating (intended to speed up local iteration, not recommended for CI) [env: SPACETIME_SKIP_CLIPPY=]
  -d, --debug                        Builds the module using debug instead of release (intended to speed up local iteration, not recommended for CI)
  -h, --help                         Print help

Run `spacetime help publish` for more detailed information.
```

<h2>list</h2>

Lists the databases attached to an identity


```
Usage: spacetime list [OPTIONS] <identity>

Arguments:
  <identity>  The identity to list databases for

Options:
  -s, --server <server>  The nickname, host name or URL of the server from which to list databases
  -h, --help             Print help
```

<h2>init</h2>

Initializes a new spacetime project


```
Usage: spacetime init --lang <lang> [project-path]

Arguments:
  [project-path]  The path where we will create the spacetime project [default: .]

Options:
  -l, --lang <lang>  The spacetime module language. [possible values: csharp, rust]
  -h, --help         Print help
```

<h2>build</h2>

Builds a spacetime module.


```
Usage: spacetime build [OPTIONS] [project-path]

Arguments:
  [project-path]  The path of the project that you would like to build. [default: .]

Options:
  -s, --skip_clippy  Skips running clippy on the module before building (intended to speed up local iteration, not recommended for CI) [env: SPACETIME_SKIP_CLIPPY=]
  -d, --debug        Builds the module using debug instead of release (intended to speed up local iteration, not recommended for CI)
  -h, --help         Print help
```

<h2>server</h2>

Manage the connection to the SpacetimeDB server


```
Usage: spacetime server
       spacetime server <COMMAND>

Commands:
  list         List stored server configurations
  set-default  Set the default server for future operations
  add          Add a new server configuration
  remove       Remove a saved server configuration
  fingerprint  Show or update a saved server's fingerprint
  ping         Checks to see if a SpacetimeDB host is online
  edit         Update a saved server's nickname, host name or protocol
  help         Print this message or the help of the given subcommand(s)

Options:
  -h, --help  Print help
```

<details><summary>Sub Commands</summary>

<h3>list</h3>

List stored server configurations


```
Usage: spacetime server list

Options:
  -h, --help  Print help
```

<h3>set-default</h3>

Set the default server for future operations


```
Usage: spacetime server set-default <server>

Arguments:
  <server>  The nickname, host name or URL of the new default server

Options:
  -h, --help  Print help
```

<h3>add</h3>

Add a new server configuration


```
Usage: spacetime server add [OPTIONS] <url> <name>

Arguments:
  <url>   The URL of the server to add
  <name>  Nickname for this server

Options:
  -d, --default         Make the new server the default server for future operations
      --no-fingerprint  Skip fingerprinting the server
  -h, --help            Print help
```

<h3>remove</h3>

Remove a saved server configuration


```
Usage: spacetime server remove [OPTIONS] <server>

Arguments:
  <server>  The nickname, host name or URL of the server to remove

Options:
  -I, --delete-identities  Also delete all identities which apply to the server
  -f, --force              Do not prompt before deleting identities
  -h, --help               Print help
```

<h3>fingerprint</h3>

Show or update a saved server's fingerprint


```
Usage: spacetime server fingerprint [OPTIONS] [server]

Arguments:
  [server]  The nickname, host name or URL of the server

Options:
  -f, --force                       Save changes to the server's configuration without confirming
  -I, --delete-obsolete-identities  Delete obsoleted identities if the server's fingerprint has changed
  -h, --help                        Print help
```

<h3>ping</h3>

Checks to see if a SpacetimeDB host is online


```
Usage: spacetime server ping [server]

Arguments:
  [server]  The nickname, host name or URL of the server to ping

Options:
  -h, --help  Print help
```

<h3>edit</h3>

Update a saved server's nickname, host name or protocol


```
Usage: spacetime server edit [OPTIONS] [server]

Arguments:
  [server]  The nickname, host name or URL of the server

Options:
  -n, --nickname <nickname>         A new nickname to assign the server configuration
  -H, --host <host>                 A new hostname to assign the server configuration
  -p, --protocol <protocol>         A new protocol to assign the server configuration; http or https
      --no-fingerprint              Skip fingerprinting the server
  -I, --delete-obsolete-identities  Delete obsoleted identities if the server's fingerprint has changed
  -f, --force                       Do not prompt before saving the edited configuration
  -h, --help                        Print help
```
</details>
<h2>start</h2>

Starts a standalone SpacetimeDB instance. This command recognizes the following environment variables: 
- PACETIMEDB_LOG_CONFIG: The path to the log configuration file. 
- PACETIMEDB_LOGS_PATH: The path to the directory that should contain logs for SpacetimeDB. 
- TDB_PATH: The path to the directory that should contain the database files for SpacetimeDB. 
- PACETIMEDB_JWT_PUB_KEY: The path to the public jwt key for verifying identities. 
- PACETIMEDB_JWT_PRIV_KEY: The path to the private jwt key for issuing identities. 
- PACETIMEDB_TRACY: Set to 1 to enable Tracy profiling.

<br/>Warning: If you set a value on the command line, it will override the value set in the environment variable.


```
Usage: spacetime start [OPTIONS] [database_path]

Arguments:
  [database_path]
          The path to the directory that should contain the database files for SpacetimeDB (STDB_PATH)
          
          [default: C:\Users\user\.spacetime]

Options:
  -l, --listen-addr <listen_addr>
          The address and port where SpacetimeDB should listen for connections. This defaults to local connections only on port 3000. Use an IP address or 0.0.0.0 in order to allow remote connections to SpacetimeDB.
          
          [default: 127.0.0.1:3000]

      --log-conf-path <log_conf_path>
          The path of the file that contains the log configuration for SpacetimeDB (SPACETIMEDB_LOG_CONFIG)
          
          [default: C:\Users\user\.spacetime\conf\log.conf]

      --log-dir-path <log_dir_path>
          The path to the directory that should contain logs for SpacetimeDB (SPACETIMEDB_LOGS_PATH)
          
          [default: C:\Users\user\.spacetime\logs]

      --enable-tracy
          Enable Tracy profiling (SPACETIMEDB_TRACY)

      --jwt-pub-key-path <jwt_pub_key_path>
          The path to the public jwt key for verifying identities (SPACETIMEDB_JWT_PUB_KEY)
          
          [default: C:\Users\user\.spacetime\conf\id_ecdsa.pub]

      --jwt-priv-key-path <jwt_priv_key_path>
          The path to the private jwt key for issuing identities (SPACETIMEDB_JWT_PRIV_KEY)
          
          [default: C:\Users\user\.spacetime\conf\id_ecdsa]

      --in-memory
          If specified the database will run entirely in memory. After the process exits all data will be lost.

      --wal-fsync
          If specified the database will fsync on each commit.

  -h, --help
          Print help (see a summary with '-h')

Run `spacetime help start` for more information.
```
