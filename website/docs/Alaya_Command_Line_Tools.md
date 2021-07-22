---
id: Command_Line_Tools
title: Alaya Command Line Tools
sidebar_label: Alaya Command line tools
---

## Introducing the program Alaya instructions 

```conf
NAME:
   alaya.exe - the alaya-go command line interface

   Copyright 2019 The Alaya-Go Authors

USAGE:
   alaya.exe [options] command [command options] [arguments...]

VERSION:
   0.14.0-unstable

COMMANDS:
   account           Manage accounts
   attach            Start an interactive JavaScript environment (connect to node)
   bug               opens a window to report a bug on the alaya repo
   console           Start an interactive JavaScript environment
   copydb            Create a local chain from a target chaindata folder
   dump              Dump a specific block from storage
   dumpconfig        Show configuration values
   export-preimages  Export the preimage database into an RLP stream
   import-preimages  Import the preimage database from an RLP stream
   init              Bootstrap and initialize a new genesis block
   js                Execute the specified JavaScript files
   license           Display license information
   removedb          Remove blockchain and state databases
   version           Print version numbers
   help, h           Shows a list of commands or help for one command

ALAYA OPTIONS:
  --config value                                        TOML configuration file
  --datadir "C:\Users\jungle\AppData\Roaming\ALAYA"  Data directory for the databases and keystore
  --keystore                                            Directory for the keystore (default = inside the datadir)
  --nousb                                               Disables monitoring for and managing USB hardware wallets
  --networkid value                                     Network identifier (integer, 1=Frontier, 2=Morden (disused), 3=Ropsten, 4=Rinkeby) (default: 1)
  --main                                                Mainnet network: pre-configured main network (default network)
  --testnet                                             Testnet network: pre-configured test network
  --alaya                                               alaya network: pre-configured alaya network
  --alayatestnet                                        alaya test network: pre-configured alaya test network
  --syncmode "full"                                     Blockchain sync mode ("fast", "full", or "light")
  --identity value                                      Custom node name
  --lightserv value                                     Maximum percentage of time allowed for serving LES requests (0-90) (default: 0)
  --lightpeers value                                    Maximum number of LES client peers (default: 100)
  --lightkdf                                            Reduce key-derivation RAM & CPU usage at some expense of KDF strength

DEVELOPER CHAIN OPTIONS:
  --dev.period value  Block period to use in developer mode (0 = mine only if transaction pending) (default: 0)

TRANSACTION POOL OPTIONS:
  --txpool.locals value         Comma separated accounts to treat as locals (no flush, priority inclusion)
  --txpool.nolocals             Disables price exemptions for locally submitted transactions
  --txpool.journal value        Disk journal for local transaction to survive node restarts (default: "transactions.rlp")
  --txpool.rejournal value      Time interval to regenerate the local transaction journal (default: 1h0m0s)
  --txpool.pricelimit value     Minimum gas price limit to enforce for acceptance into the pool (default: 1)
  --txpool.pricebump value      Price bump percentage to replace an already existing transaction (default: 10)
  --txpool.accountslots value   Minimum number of executable transaction slots guaranteed per account (default: 16)
  --txpool.globalslots value    Maximum number of executable transaction slots for all accounts (default: 16384)
  --txpool.accountqueue value   Maximum number of non-executable transaction slots permitted per account (default: 64)
  --txpool.globalqueue value    Maximum number of non-executable transaction slots for all accounts (default: 4096)
  --txpool.globaltxcount value  Maximum number of transactions for package (default: 3000)
  --txpool.lifetime value       Maximum amount of time non-executable transaction are queued (default: 3h0m0s)
  --txpool.cacheSize value      After receiving the specified number of transactions from the remote, move the transactions in the queen to pending (default: 0)

PERFORMANCE TUNING OPTIONS:
  --cache value           Megabytes of memory allocated to internal caching (default: 1024)
  --cache.database value  Percentage of cache memory allowance to use for database io (default: 75)
  --cache.gc value        Percentage of cache memory allowance to use for trie pruning (default: 25)
  --cache.triedb value    Megabytes of memory allocated to triedb internal caching (default: 512)

ACCOUNT OPTIONS:
  --unlock value    Comma separated list of accounts to unlock
  --password value  Password file to use for non-interactive password input

API AND CONSOLE OPTIONS:
  --rpc                  Enable the HTTP-RPC server
  --rpcaddr value        HTTP-RPC server listening interface (default: "localhost")
  --rpcport value        HTTP-RPC server listening port (default: 6789)
  --rpcapi value         API's offered over the HTTP-RPC interface
  --ws                   Enable the WS-RPC server
  --wsaddr value         WS-RPC server listening interface (default: "localhost")
  --wsport value         WS-RPC server listening port (default: 6790)
  --wsapi value          API's offered over the WS-RPC interface
  --wsorigins value      Origins from which to accept websockets requests
  --ipcdisable           Disable the IPC-RPC server
  --ipcpath              Filename for IPC socket/pipe within the datadir (explicit paths escape it)
  --rpccorsdomain value  Comma separated list of domains from which to accept cross origin requests (browser enforced)
  --rpcvhosts value      Comma separated list of virtual hostnames from which to accept requests (server enforced). Accepts '*' wildcard. (default: "localhost")
  --jspath loadScript    JavaScript root path for loadScript (default: ".")
  --exec value           Execute JavaScript statement
  --preload value        Comma separated list of JavaScript files to preload into the console

NETWORKING OPTIONS:
  --bootnodes value          Comma separated enode URLs for P2P discovery bootstrap (set v4+v5 instead for light servers)
  --bootnodesv4 value        Comma separated enode URLs for P2P v4 discovery bootstrap (light server, full nodes)
  --port value               Network listening port (default: 16789)
  --maxpeers value           Maximum number of network peers (network disabled if set to 0) (default: 50)
  --maxconsensuspeers value  Maximum number of network consensus peers (network disabled if set to 0) (default: 75)
  --maxpendpeers value       Maximum number of pending connection attempts (defaults used if set to 0) (default: 0)
  --nat value                NAT port mapping mechanism (any|none|upnp|pmp|extip:<IP>) (default: "any")
  --nodiscover               Disables the peer discovery mechanism (manual peer addition)
  --netrestrict value        Restricts network communication to the given IP networks (CIDR masks)
  --nodekey value            P2P node key file
  --nodekeyhex value         P2P node key as hex (for testing)

MINER OPTIONS:
  --miner.gasprice "1000000000"  Minimum gas price for mining a transaction
  --miner.gastarget value        Target gas floor for mined blocks (default: 4712388)

GAS PRICE ORACLE OPTIONS:
  --gpoblocks value      Number of recent blocks to check for gas prices (default: 20)
  --gpopercentile value  Suggested gas price is the given percentile of a set of recent transaction gas prices (default: 60)

LOGGING AND DEBUGGING OPTIONS:
  --nocompaction            Disables db compaction after import
  --verbosity value         Logging verbosity: 0=silent, 1=error, 2=warn, 3=info, 4=debug, 5=detail (default: 3)
  --vmodule value           Per-module verbosity: comma-separated list of <pattern>=<level> (e.g. eth/*=5,p2p=4)
  --backtrace value         Request a stack trace at a specific logging statement (e.g. "block.go:271")
  --debug                   Prepends log messages with call-site location (file and line number)
  --pprof                   Enable the pprof HTTP server
  --pprofaddr value         pprof HTTP server listening interface (default: "127.0.0.1")
  --pprofport value         pprof HTTP server listening port (default: 6060)
  --memprofilerate value    Turn on memory profiling with the given rate (default: 524288)
  --blockprofilerate value  Turn on block profiling with the given rate (default: 0)
  --cpuprofile value        Write CPU profile to the given file
  --trace value             Write execution trace to the given file
  --wasmlog value           output wasm contract log to file

METRICS AND STATS OPTIONS:
  --metrics                          Enable metrics collection and reporting
  --metrics.influxdb                 Enable metrics export/push to an external InfluxDB database
  --metrics.influxdb.endpoint value  InfluxDB API endpoint to report metrics to (default: "http://localhost:8086")
  --metrics.influxdb.database value  InfluxDB database name to push reported metrics to (default: "platon")
  --metrics.influxdb.username value  Username to authorize access to the database (default: "test")
  --metrics.influxdb.password value  Password to authorize access to the database (default: "test")
  --metrics.influxdb.host.tag host   InfluxDB host tag attached to all measurements (default: "localhost")

DEPRECATED OPTIONS:
  --targetgaslimit value   Target gas floor for mined blocks (deprecated, use --miner.gastarget) (default: 4712388)
  --gasprice "1000000000"  Minimum gas price for mining a transaction (deprecated, use --miner.gasprice)

CBFT OPTIONS:
  --cbft.msg_queue_size value      Message queue size (default: 1024)
  --cbft.wal.disabled              Disable the Wal server
  --cbft.max_ping_latency value    Maximum latency of ping (default: 2000)
  --cbft.blskey value              BLS key file
  --cbft.blacklist_deadline value  Blacklist effective time. uint:minute (default: "60")

DB OPTIONS:
  --db.nogc               Disables database garbage collection
  --db.gc_interval value  Block interval for garbage collection (default: 86400)
  --db.gc_timeout value   Maximum time for database garbage collection (default: 1m0s)
  --db.gc_mpt             Enables database garbage collection MPT
  --db.gc_block value     Number of cache block states, default 10 (default: 10)

VM OPTIONS:
  --vm.wasm_type value         The actual implementation type of the wasm instance (default: "wagon")
  --vm.timeout_duration value  The VM execution timeout duration (uint: ms) (default: 0)

MISC OPTIONS:
  --help, -h  show help


COPYRIGHT:
   Copyright 2019 The Alaya-Go Authors
```

## Common rpc commands

- Description
  - The rpc port is changed according to the actual startup command and the default is 6789

### admin

- View the data directory of the current node

  ```bash
  alaya attach http://localhost:6789 -exec admin.datadir
  ```

- View the ChainID of the current node

  ```bash
  alaya attach http://localhost:6789 -exec admin.nodeInfo.protocols.platon.config.chainId
  ```

- View the id of the current node

  ```bash
  alaya attach http://localhost:6789 -exec admin.nodeInfo.id
  ```

- View the blsPubKey of the current node

  ```bash
  alaya attach http://localhost:6789 -exec admin.nodeInfo.blsPubKey
  ```

- View the p2p port number of the current node

  ```
  alaya attach http://localhost:6789 -exec admin.nodeInfo.ports.listener
  ```

- View the connection information of peers of the current node

  ```bash
  alaya attach http://localhost:6789 -exec admin.peers
  ```

- View the genesis block hash of the current node

  ```bash
  alaya attach http://localhost:6789 -exec admin.nodeInfo.protocols.platon.genesis
  ```

- View the maximum number of blocks ($amount) of a single node in each consensus round of cbft consensus

  ```bash
  alaya attach http://localhost:6789 -exec admin.nodeInfo.protocols.platon.config.cbft.amount
  ```

- View the time window of block generation by a single node in each consensus round of cbft consensus ($period, unit: ms)

  ```bash
  alaya attach http://localhost:6789 -exec admin.nodeInfo.protocols.platon.config.cbft.period
  ```

  > **Blocking time interval = period / 1000 / amount**

- Get the binary version number and signature information

  ```bash
  alaya attach http://localhost:6789 -exec 'admin.getProgramVersion()'
  ```

- Obtain zero- knowledge proof information (use the node's private key to prove whether the certificate issued by the interface is correct and used for node pledge)

  ```bash
  alaya attach http://localhost:6789 -exec 'admin.getSchnorrNIZKProve()'
  ```

- View the type of virtual machine used at the bottom (EVM / WASM)

  ```bash
  alaya attach http://localhost:6789 -exec admin.nodeInfo.protocols.platon.config.interpreter
  ```

### platon

- View all wallet addresses under the current node

  ```bash
  alaya attach http://localhost:6789 -exec platon.accounts
  ```

- View the block height of the current node

  ```bash
  alaya attach http://localhost:6789 -exec platon.blockNumber
  ```

- Check the balance of the specified account ($account is the account address)

  ```bash
  alaya attach http://localhost:6789 -exec 'platon.getBalance("$account")'
  ```

- Query the number of transactions in the specified block ($blockNumber is the block height or block hash of the specified block)

  ```bash
  alaya attach http://localhost:6789 -exec 'platon.getBlockTransactionCount($blockNumber)'
  ```

- Query transaction information ($txHash is transaction hash)

  ```bash
  alaya attach http://localhost:6789 -exec 'platon.getTransaction("$txHash")'
  ```

- Query transaction receipt ($txHash is transaction hash)

  ```bash
  alaya attach http://localhost:6789 -exec 'platon.getTransactionReceipt("$txHash")'
  ```

- Query the number of transactions in the specified account (parameter $address is the account address, used to specify the nonce of the transaction when sending the transaction)

  ```bash
  alaya attach http://localhost:6789 -exec 'platon.getTransactionCount("$address")'
  ```

- Query the pending transaction of the current node

  ```bash
  alaya attach http://localhost:6789 -exec platon.pendingTransactions
  ```

- View the default gasPrice of the current node (unit: von)

  ```bash
  alaya attach http://localhost:6789 -exec platon.gasPrice
  ```

- Estimate the gas of the transaction (parameter $transaction is the transaction details, unit: von)

  ```bash
  alaya attach http://localhost:6789 -exec 'platon.estimateGas($transaction)'
  ```

  For example:

  ```bash
  alaya attach http://localhost:6789 -exec 'platon.estimateGas({from:"atp1fyeszufxwxk62p46djncj86rd553skpparksa6",to:"atp1zhllhqu72wz66cdwly8983xhla2sann7zpwwf2",value:"0x10000000000000",data:"0x11",gas:"0x88888",gasprice:"0x333333",nonce:"11"})'
  ```

- View the p2p protocol number of the underlying version of the current node

  ```bash
  alaya attach http://localhost:6789 -exec 'web3.toDecimal(platon.protocolVersion)'
  ```

- See if the current node is in sync

  ```bash
  alaya attach http://localhost:6789 -exec platon.syncing
  ```

- Get details of specified block

  ```bash
  alaya attach http://localhost:6789 -exec 'platon.getBlock($blockNumber)'
  ```

### personal

- Generate wallet (parameter is wallet password)

  ```bash
  alaya attach http://localhost:6789 -exec 'personal.newAccount("88888888")'
  ```

- Import private key to generate wallet

  ```bash
  alaya attach http://localhost:6789 -exec 'personal.importRawKey($privateKey, $password)'
  ```

  > Parameters:
  >
  >- privateKey: private key, remove the leading 0x
  >- password: wallet password
  >
  > Back to:
  >
  >- Wallet address

  For example:

  ```bash
  alaya attach http://localhost:6789 -exec 'personal.importRawKey ("842d943dbb50a8d3fe63af2f82fda3d8f0ca817fe8d47e61698142bac7c24212", "88888888")'
  ```

- View account address

  ```bash
  alaya attach http://localhost:6789 -exec 'personal.listAccounts'
  ```

- View local wallet information, including wallet address, wallet file path and wallet status

  ```bash
  alaya attach http://localhost:6789 -exec 'personal.listWallets'
  ```

- Lock account

  ```bash
  alaya attach http://localhost:6789 -exec 'personal.lockAccount(platon.accounts[0])'
  ```

- Unlock account

  ```bash
  alaya attach http://localhost:6789 -exec 'personal.unlockAccount(platon.accounts[0], "88888888", 24*3600)'
  ```

  > Parameters:
  >
  > - Account address
  > - Wallet password
  > - Unlock time in seconds

- Send unsigned transactions
  ```shell
  alaya attach http://localhost:6789 -exec 'personal.sendTransaction({from: platon.accounts[2], to: platon.accounts[0], value:web3.toVon("0.1","lat"), nonce: platon.getTransactionCount(platon.accounts[2])}, "88888888") '
  ```

### net

- View the networkid of the current node

  ```bash
  alaya attach http://localhost:6789 -exec net.version
  ```

- Check whether the p2p port of the current node is in the listening state

  ```bash
  alaya attach http://localhost:6789 -exec net.listening
  ```

- View the number of peer connections of the current node

  ```bash
  alaya attach http://localhost:6789 -exec net.peerCount
  ```

### debug

- Query the economic model configuration parameters of the current node

  ```bash
  alaya attach http://localhost:6789 -exec 'debug.economicConfig()'
  ```

- Set log level

  ```shell
  alaya attach http://localhost:6789 -exec 'debug.verbosity(4)'
  ```

  > Log level description:
  >
  > 0: CRIT
  >
  > 1: ERROR
  >
  > 2: WARN
  >
  > 3: INFO
  >
  > 4: DEBUG
  >
  > 5: TRACE

## alayakey tool instructiona

```conf
alayakey [global options] command [command options] [arguments...]

VERSION:
   0.14.0-unstable-16aced7d

COMMANDS:
   generate generate new keyfile
   inspect inspect a keyfile
   changepassphrase change the passphrase on a keyfile
   signmessage sign a message
   verifymessage verify the signature of a signed message
   genkeypair generate new private key pair
   genblskeypair generate new bls private key pair
   updateaddress update hex/bech32 address to mainnet/testnet bech32 address
   help Shows a list of commands or help for one command

GLOBAL OPTIONS:
   --help, -h show help
   --version, -v print the version
```


### Common commands

- Generate wallet

```conf
NAME:
   alayakey generate - generate new keyfile

USAGE:
   alayakey generate [command options] [<keyfile>]

DESCRIPTION:

Generate a new keyfile.

If you want to encrypt an existing private key, it can be specified by setting
--privatekey with the location of the file containing the private key.


OPTIONS:
   --passwordfile value the file that contains the passphrase for the keyfile
   --json output JSON instead of human-readable format
   --privatekey value file containing a raw private key to encrypt
```

- A new wallet can be generated by the following command

```shell
alayakey generate
```

- You can also use the following command to encrypt a privatekey in plaintext to generate a wallet file

```shell
alayakey generate --privatekey ./prikey --json
```

- Generate a public and private key pair
```
NAME:
   alayakey genkeypair - generate new private key pair

USAGE:
   alayakey genkeypair [command options] [ ]

DESCRIPTION:
   
Generate a new private key pair.


OPTIONS:
   --json  output JSON instead of human-readable format
```



- Generate node BLS public and private key

```
NAME:
   alayakey genblskeypair-generate new bls private key pair

USAGE:
   alayakey genblskeypair [command options] []

DESCRIPTION:

Generate a new bls private key pair.


OPTIONS:
   --json output JSON instead of human-readable format
```

- Convert any EIP55/bech32 address to alaya address

```conf
NAME:
   alayakey updateaddress-update hex/bech32 address to mainnet/testnet bech32 address

USAGE:
   alayakey updateaddress [command options] [<address> <address>...]

DESCRIPTION:

update hex/bech32 address to mainnet/testnet bech32 address.


OPTIONS:
   --json output JSON instead of human-readable format
   --hexAddressFile value file bech32/hex accounts want to update to mainnet/testnet bech32 address,file like [hex,hex...]
```

- The following command converts EIP55 address to alaya address

```shell
alayakey updateaddress 0x1000000000000000000000000000000000000001
```

- This command supports converting any bech32 address to alaya address, such as:

```conf
alayakey updateaddress lax19phpafljm0mgu2fj8mrwyarftpafynxvj0d7lh
originAddress: lax19phpafljm0mgu2fj8mrwyarftpafynxvj0d7lh
main net Address: atp19phpafljm0mgu2fj8mrwyarftpafynxvyuffwh
other net Address: atx19phpafljm0mgu2fj8mrwyarftpafynxvw64raa
```
