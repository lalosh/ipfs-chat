# ipfs-chat version 2

# Distributed peer-to-peer chat client(in browser) using IPFS(InterPlanetary File System) protocol


The client can be served now at this link: https://ipfs-chat.web.app/


# Peer(client) Architecture

This peer application is built using **React** and it need no server to connect through, totally distributed between peers, yet have to have a gateway to make peers discover each others and that's the only central thing this peer use.


**Sending Messages**

The peers send text messages to each others by using the publish/subscribe communication pattern which is considered an experimental feature in IPFS so far(using IPFS@0.35.0).

**Sending Files**

Sending Files depends on IPFS node add file API, adding the file, getting the hash value of that file after being added to the IPFS node, sending the hash after forming the public link(by adding https://ipfs.io/ipfs/${hash}) forming a public link dependent on the IPFS public gateway to access the file and get assured that the file is uploaded successfully to the IPFS world.



-----------------------------

This project is based on IPFS (InterPlanetary File System), so we make a full study of IPFS then use its implementation for building the distributed peer-to-peer chat application.

# Abstract

The InterPlanetary File System (IPFS) is a peer-to-peer distributed file system that seeks to connect all computing devices with the same system of files. In some ways, IPFS is similar to the Web, but IPFS could be seen as a single BitTorrent swarm, exchanging objects within one Git repository. In other words, IPFS provides a high throughput content-addressed block storage model, with content-addressed hyperlinks. 
This forms a generalized Merkle DAG, a data structure upon which one can build versioned file systems, blockchains, and even a Permanent Web. 

IPFS combines a distributed hash table, an incentivized block exchange, and a self-certifying namespace. IPFS has no single point of failure, and nodes do not need to trust each other.

# Introduction
IPFS is a new network protocol that enable you to have distributed peer-to-peer file system, basically it allows you to share flies in a peer-to-peer network through making the files versioned controlled(like how git does), transferring the files in blocks by the help of all people(like how bit-torrent does), where the peers find each other on the world wide web using DHT(Distributed hash tables), and finally making the files links self-certified(like how SFS does).
All of these technologies work together to form what really is IPFS.

It’s success comes from many successful protocols and technologies that did really succeeded in the last many years making robust foundation for IPFS with careful interface integration with these technologies and protocols.

IPFS can replace the older way of transferring and accessing files using “HTTP” protocol, building a new permanent web where we can deal with lots of data, available everywhere, or you can think of it as the new way of making file system for the future.


# IPFS combine:

* DHT, Distributed hash tables
* BitSwap, BitTorrent like protocol
* Merkle DAG (Directed Acyclic Graph), git merkle tree like data structure
* SFS (self-certified file system) like key management 

As you can see we have many old great solid robust technologies and protocols that IPFS is build upon, along with the careful design of IPFS it looks like this protocol going to affect the way we live in the future, but what it lacks so far is the transparent deployment model(where users can’t feel of any change accessing the same applications and websites) because IPFS has no official built in support in browsers and systems yet.

To give you the big picture of IPFS, imagine a single BitTorrent swarm where peers are exchanging objects within one git repository.

# Why IPFS(Is not HTTP just enough)?

HTTP has been working for a long time not using the new files distribution techniques that have been alive for the last fifteen years, having problems with large data being moved inefficiently. Heres IPFS enter as a new solution where it’s suitable for:
Moving, computing, linking large data (PetaByte sizes).
High volume, High definition, on-demand real time media streams.
Versioning and linking of massive data.
Preventing accidental loss of data.
Leading to lots of data, available everywhere.

What we are missing is the deployment model that should be transparent preventing users from having any trouble using the new protocol.


# IPFS compared to HTTP
Let’s compare how HTTP currently works and compare it to what we want:

## Centralized versus Decentralized versus Distributed:
The web when created has the goal of being a distributed network of shareable files and information, but the world we are living in now has been more focused into certain companies not the others leading to being decentralized at the best case and even completely centralized most of the time. 
Think of big companies like Google, Facebook, Twitter ...etc. We use them everyday, much of our content is at their servers, all or almost all of our connections are made between us and them and nowhere else.
All of these leads to many serious problems as time move on, imagine them blocking you simply then you cannot reach your friends, family or even business, imagine them go bankrupt and they need to shutdown, your content is gone forever, imagine someone somehow could break into their systems and delete a part of your content, unless they have a backup of everything, that part of your content is gone.

Location-based addressing vs Content-based addressing:
In HTTP we access our content through the location of our content like

http://example.com/foo/bar/baz.png

				will be resolved to

http://172.217.19.36/foo/bar/baz.png

Which means if anybody in the world has the same file I can’t get it from them and I have to get it from the given server. Moreover there’s no way I can know what this file really contains, if it was named car.png I may download it to find out that it has no cars in it, this can happen. And if you thought about it we may exchange important files with the ability for anyone changing the content of that file without anyone knowing about it.

Compare what we have to what IPFS introduce, it introduces content-based addressed where the address of some content is the cryptographic hash of that content, so if I have any file, for example car.png, the link to the picture will be the crypto hash of this file

/ipfs/QmV9tSDx9UiPeWExXEeH6aoDvmihvx6jD5eLb4jbTaKGps

This already guarantees the authenticity of the file(which means the file didn’t change even in one bit) and guarantees that the file I’m requesting contains what I expect it to have.
Of Course IPFS came with a naming system called IPNS(InterPlanetary naming system) which allow us to have one fixed link in case our content is always updating(which means we always have a new crypto hash) along with the use of DNS TXT records which allow us to have human names instead of just hashes, enabling us to have a link like
	
/ipns/example.com/foo/bar/baz.png

	be resolved to 

/ipfs/QmV9tSDx9UiPeWExXEeH6aoDvmihvx6jD5eLb4jbTaKGps

## IPFS solutions
Here comes the IPFS benefits of finding a solution for all what HTTP have always had:

* No censorship

Making the content distributed between peers, no company, no authority can prevent you from accessing it anymore.

* Protecting the Data not the wire

In the old HTTP model security is achieved by the means of implementing SSL protocol which leads to HTTPS where the wire (the route) between you and the server is safe, but no one really thought about the data being saved. 
What if someone breaks into the server security? Your data is not safe from being changed or being read. IPFS solve this by making a cryptographic hash of your content that assure you that the data didn’t change even a bit, and can use your key to encrypt the data you want to preserve it from being read by anyone.


* Data authentication and encryption

As we have mentioned IPFS use a cryptographic hash of your content which assure you that the data didn’t change even a bit, and it can use your key to encrypt the data you want to preserve it from being read by anyone.

* Less bandwidth and less cost

In the old HTTP model of moving files imagine we are moving a big file like a video file all over the network. These scenarios had happened like on youtube when we have more than 1billion watched video clip. Can you calculate how much bandwidth is wasted just moving the file across the network all the ways to users? What if someone is watching it for many times? He will endup moving the same file to the same device over and over again. Can you now calculate how much this big wasted bandwidth cost? It can lead to millions wasted for the users all over the world and even for companies when they have to strive to maintain big data movement just for a short time period.
Having IPFS as protocol to share files in a distributed manner we can have the file downloaded one time for each network and start having peers exchanging the bits of files in that network until they all have it, not wasting bandwidth of global network, and not wasting money on data moving many many times.

* Small latencies 

As the web of today all our connections to the servers is basically centralized, moving far away from the servers no doubts will lead to slower connection which means long latencies, compare it to having a distributed web where the content we want is at some peers around us. Now latency is not a problem anymore.

* Distribute your content

As a normal company you don’t have the capabilities of distributing your content all over the world, it cost a lot and almost never affordable. With IPFS you can easily share your content and distribute it all over the world like how big companies like Google does.

* Working offline

In the old web if the server goes off or the network has stopped you’re offline and there’s no way you can reach the content you want, but in the new distributed web you can still access the content simply because the content is basically distributed and you yourself have a copy of the content.

* Permanent data

The knowledge the mankind has achieved means everything, history teaches us that we need to secure our information in libraries just how we secure our money in banks. Imagine a big long lasted war where some data center can be damaged completely losing all the data forever. Having IPFS as a way to distribute our content, our content is now permanent and safe even if some data center went down forever.

Check the list of destroyed libraries in history at wikipedia (https://en.wikipedia.org/wiki/List_of_destroyed_libraries)


### Why we cannot move now to IPFS?
Unfortunately it’s not officially supported by browsers yet (some news telling that one major browser company will start support it soon).



# IPFS components overview
IPFS is built upon many components that work together forming IPFS:
* DHT - Distributed hash table
Coordinate and maintain metadata of peers in the network.
IPFS uses:

  * Kademlia DHT - To provide efficient,and low coordination overhead.
  * Coral DSHT - Which provide peers addressing (not storing the data in DHT), clusters, and relaxed API.
  * S/Kademlia DHT - To provide better security (secure node ID generation, and create PKI pairs for identity and signing messages).

* BitSwap protocol
It’s a BitTorrent like protocol used for exchanging blocks between nodes efficiently. So it provide efficient sharing strategies and can deal with untrusted peers.
Merkle DAG
Merkle tree like data structure that is used in git (the version control file system) providing IPFS with very crucial properties for storing immutable,versioned, content-addressed, and content-linked objects representing files, directories, and changes.

> ## Merkle Tree(Hash tree)
>A hash tree or Merkle tree is a tree in which every leaf node is labelled with the hash of a data block, and every non-leaf node >is labelled with the cryptographic hash of the labels of its child nodes. Hash trees allow efficient and secure verification of >the contents of large data structures.
>
>
>* Each leaf node is a data-block with its crypto hash value.
>* Each non-leaf node is a hash of a concatenation of it’s two child hashes.
>* Hash trees are not like hash lists because you can download only one branch without downloading the whole tree.
>
>Benefits:
>* In a peer-to-peer network you download the root hash from a trusted source, then you can get the tree(or a branch) from any >untrusted peer and use the root hash to verify it’s not tampered.
>* You can verify L2 integrity if the tree already contains only L1 and H1.

* SFS - self-certified file system
IPFS use the same scheme of SFS to provide built in key management, having the objects links as
/sfs/Location:HostID
Where Location is the node IP/hostname, and HostID is the hash of the node public key and location.
This scheme enables IPFS to have:
Global (not centralized) namespace
Avoid internal key management
File Names effectively contain the public key making them self-certified path names
	Which all leads to the great built-in key management

* Components summary 
  As you can see each part provide one inevitable and crucial property in making the best to know peer-to-peer distributed protocol   for file sharing system which leads to a new way of making file systems or the new way of accessing data online replacing the old   HTTP protocol.

  You can see how the system can be painted in broad strokes, where you can (as a node in a network) find other nodes and what they   have using DHT, move these data efficiently between you and other peers using the BitSwap protocol, store the data you have as  content-addressed objects that can be cheaply versioned or changed and distributed between peers using the merkle DAG, and finally   accessing this data using the secure link scheme where the node public key is already found in the link making certifying the node  we are talking to direct and automatic.





# The internet stack of today
The internet we use everyday is just a group of many protocols that work together, which is remarkable, but what is unique in the stack of protocols is that you notice how we are heavily dependent over IP protocol (whether it’s version 4 or 6) and the IP protocol is the only non-replaceable piece of this stack.




# The new stack
Compare the internet stack previously mentioned to the new stack of building a new distributed web, you can see how we also heavily dependent on the one data structure that link everything together: The Merkle tree data structure that allows the content-addressed and the content-addressing links between these data structures.




# IPFS Design - protocol stack

Identities ~ public key   
-----------------------------------
Network                   
-----------------------------------
Routing ~ DHT             
-----------------------------------
Block-Exchange ~ BitSwap  
-----------------------------------
Objects ~ Merkle DAG      
-----------------------------------
Files                     
-----------------------------------
Naming ~ IPNS, DNS        
-----------------------------------

* Identities - node ID generation and verification
  Each node on initialization generates a key pair (public and private key) and store them(encrypting them with a passphrase) then the node is identified by the node ID which is the cryptographic hash of its own public key.

  Upon node connecting to another node they exchange their public keys and each node check if cryptographic hash of the node public key equals or not the node ID that it’s connecting to.

  Note:
  IPFS use multi-hash format instead of specific fixed hash function, this enables the easy switch between many hash functions choosing the most appropriate, where performance (very fast) vs security (slow and take time) decision is important.

  >Multi-hash format example:
  > \<function code> \<digest length> \<digest bytes>

* Network - use underlying protocols
  IPFS nodes communicate regularly with hundreds of other
  nodes in the network, potentially across the wide internet.
  IPFS stack features: 
  * Transport - use webRTC Data channel or UTP.
  * Reliability - use UTP or SCTP.
  * Connectivity - use ICE NAT traversal technique.
  * Integrity (optional) - check messages integrity with hash digest
  * Authenticity (optional) - check authenticity using HMAC with sender’s public key
  You can easily switch between various choices for the underlying protocols.

* Routing - locate peers and objects
  Where IPFS can:
  * Find other peers’ network addresses
  * Find peers who can serve particular object
  IPFS achieve this using DSHT based on S/Kademlia and Coral where small values (smaller than or equal to 1KB) are stored directly in the DHT and big values stored as reference.

* Block-Exchange - BitSwap protocol (inspired by BitTorrent)
  Each node has a want_list (what the node want) and have_list (what the node have).

  If a node didn’t share anything because it doesn't have anything to share it must help other nodes searching for their files too in order to start receiving their wanted files.

  * BitSwap credit

    Nodes send data to other nodes optimistically even if these data are not wanted expecting debt to be repaid and they protect themselves against leechers by keeping a balance of what they send and receive according to a probability function where sending decrease as debt increases.

  * BitSwap strategy

    Choosing strategy is what directly affect performance and is what make BitSwap different than BitTorrent, while we have     tit-for-tat in BitTorrent we have many strategies in BitSwap like BitTyrant, BitTheif, propshare.

    Sending to other nodes happens according to a probability function that has sigmoid properties where we have r as debt ratio:

    r = bytes sentbytes received + 1

    So the probability of sending to a debtor would be:

    P(send | r) =1 - 11 + e6 - 3r

    The probability of sending to my peer node decrease as debt ratio r increase


    Lenient to debtors with node previously exchanged a lot of data successfully, merciless to unknown untrusted nodes.

  * BitSwap ledger

    Nodes keep a ledger with their partners that contain how much they transfer of data and is used on initializing the connection between the two nodes letting the node know if the other node has big debt and it can decide to send to it or not accordingly.

  * BitSwap specification

    Define BitSwap, Peer data structure and define Peer interface:
    Peer.open(NodeId, Ledger)
    Peer.send_want_list(WantList)
    Peer.send_block(Block)
    Peer.close(Bool)

* Objects - a merkle DAG of content-addressed immutable objects with links
  Merkle DAG provide:
  * Content addressing: The content address is represented by the crypto hash of the content itself.
  * Tamper resistance: Impossible to change the content without anybody know about it because changing the content will change the hash address of this content which means it’s impossible to tamper any data in IPFS.
  * Deduplication: While each piece of data is saved along with its crypto hash, if we had two pieces with the same content they have the same crypto hash result leading to IPFS storing them once instead of storing them twice.
	
  Data stored in objects where the key to this data is the hash result of the data itself leading to objects  path like

  /ipfs/\<hash-of-object>/\<name-path-to-object>
	
  Objects concepts:

  * Local objects

  Disk space to store IPFS objects. Eventually all shareable data in IPFS is sitting on some node local storage.

  * Object pinning

  Ensure objects are kept in nodes local storage to make them permanent, because the content the node requested is kept in local storage while it’s used and upon garbage collection this content will be removed unless it’s pinned.

  * Publishing objects steps
    * Add the object key to the DHT.
    * Add yourself as a peer.
    * Give others the object’s path.

  * Object level cryptography
    * IPFS can handle encryption or signing of objects.
    * Crypto operations change the object’s hash.
    * IPFS auto verify signature.
    * IPFS  auto decrypt data with user-specified keychains.
    * Traversing encrypted links is protected making it impossible without the decryption key.

* Files - versioned fs hierarchy inspired by Git
  IPFS build a versioned fs using objects building it on top of the merkle DAG data structure.

  These objects are similar to git’s corresponding objects (similar but not exactly the same, though we can use tools to convert from and to their corresponding git objects)
    * Block or blob ~ represent data.
    * List ~ represent a collection of blocks or lists (many blobs concatenated).
    * Tree ~ represent a collection of blocks, lists, or trees (directory like).
    * Commit ~ represent a snapshot of a tree.

	* File System path:
  
  IPFS objects can be traversed with a string API so we can easily be mounted on unix (where they restrict trees to have no data to be mapped as directories)

	* Splitting files into lists and blobs:
  
  It’s not easy to decide where we can split a file or how so IPFS has many alternatives:
    * Use Robin FingerPrints as in LBFS
    * Use rsync rolling-checksum algorithm
    * Use custom algorithm

	* Path lookup performance:
		Remember that looking up a file include
    * Lookup the key DHT
    * Connecting to a peer
    * Retrieve the file

		So to improve the performance IPFS use:
      * Tree caching because it’s cheap compared to other objects caching
      * Flattened trees where we can list all objects accessible from this tree

* Naming - self-certifying mutable name system
  The merkle DAG (immutable content-addressed objects) and naming (mutable pointer to the merkle DAG) initiate a dichotomy(contrast) present in many successful distributed system.

  * IPNS
  Here we introduce IPNS for naming.
  Since objects in IPFS are content-addressed, their address changes every time their content does. That’s useful for a variety of things, but it makes it hard to get the latest version of something.
  A name in IPNS is the hash of a public key. It is associated with a record containing information about the hash it links to that is signed by the corresponding private key. New records can be signed and published at any time.

  So we now have self-certified names:
  IPFS uses SFS naming scheme where each node has node ID which is the hash of its public key, so we have
  
  /ipns/\<NodeID>

  * DNS

  DNSLink uses DNS TXT records to map a domain name (like ipfs.io) to an IPFS address. Because you can edit your DNS records, you can use them to always point to the latest version of an object in IPFS (remember that an IPFS object’s address changes if you modify the object). Because DNSLink uses DNS records, the names it produces are also usually easy to type and read.

  A DNSLink address looks like an IPNS address, but it uses a domain name in place of a hashed public key


# IPFS concepts

  * Content Identifiers (CIDs)
  
  A content identifier, or CID, is a label used to point to material in IPFS. It doesn’t indicate where the content is stored, but it forms a kind of address based on the content itself. CIDs are short, regardless of the size of their underlying content.

  CIDs are based on the content’s cryptographic hash. That means:

  Any difference in content will produce a different CID 
  The same piece of content added to two different IPFS nodes using the same settings will produce exactly the same CID.

  CID formats

    * Version 0
    When IPFS was first designed, it used base 58-encoded multi hashes as the content identifiers. If a CID is 46 characters starting with “Qm”, it’s a CIDv0. 

    * Version 1
    CID v1 contains some leading identifiers that clarify exactly which representation is used, along with the 
    
    content-hash itself. These include:

    * A multibase prefix, specifying the encoding used for the remainder of the CID.
    * A CID version identifier, which indicates which version of CID used.
    * A multi codec identifier, indicating the format of the target content ,  it helps people and software to know how to interpret that content after the content is fetched

    These leading identifiers also provide forward-compatibility, supporting different formats to be used in future versions of CID.
    You can use the first few bytes of the CID to interpret the remainder of the content address and know how to decode the content after it’s fetched from IPFS.



* DNSLink

  DNSLink uses DNS TXT records to map a domain name (like ipfs.io) to an IPFS address. Because you can edit your DNS records, you can use them to always point to the latest version of an object in IPFS (remember that an IPFS object’s address changes if you modify the object). Because DNSLink uses DNS records, the names it produces are also usually easy to type and read.

  A DNSLink address looks like an IPNS address, but it uses a domain name in place of a hashed public key

  So for example if we asked what TXT Records does ipfs.io website have?

  ```sh
  $ dig +noall +answer TXT ipfs.io
  ipfs.io.		59	IN	TXT	"dnslink=/ipfs/QmYNQJoKGNHTpPxCBPh9KkDpaExgd2duMa3aF6ytMpHdao"
  ```

  Based on that, this address:

  /ipns/ipfs.io/media/

  Will get you this

  /ipfs/QmYNQJoKGNHTpPxCBPh9KkDpaExgd2duMa3aF6ytMpHdao/media/

* Hashes

  Hashes are functions that take some arbitrary input and return a fixed-length value. The particular value depends on the given hash algorithm in use, such as SHA-1 (used by Git), SHA-256, or BLAKE2, but a given hash algorithm always returns the same value for a given input. Have a look at the full list of hash functions for more.
  
  As an example, the input:
  
  Hello world

  would be represented by SHA-1 as

  0x7B502C3A1F48C8609AE212CDFB639DEE39673F5E

  However, the exact same input generates the following output using SHA-256:

  0x64EC88CA00B268E5BA1A35678A1B5316D212F4F366B2477232534A8AECA37F3C

  Notice that the second hash is longer than the first one. This is because SHA-1 creates a 160 bit hash, while SHA-256 creates a 256 bit hash. Also, the prepended 0x is just an indicator that tells us that the following hash is represented as a base 16 (or hexadecimal) number.

  Hashes can be represented in different bases (base2, base16, base32, etc.). In fact, IPFS makes use of that as part of its Content Identifiers and supports multiple base representations at the same time, using the Multibase protocol.

  For example, the SHA-256 hash of “Hello World” from above can be represented as base 32 as:
  
  mtwirsqawjuoloq2gvtyug2tc3jbf5htm2zeo4rsknfiv3fdp46a

  Characteristics of cryptographic hashes
  Cryptographic hashes come with a couple of very important characteristics:
  * deterministic - the same input message always returns exactly the same output hash.
  * uncorrelated - a small change in the message should generate a completely different hash.
  * unique - it’s infeasible to generate the same hash from two different messages.
  * one-way - it’s infeasible to guess or calculate the input message from its hash.

  It turns out these features also mean we can use a cryptographic hash to identify any piece of data: the hash is unique to the data we calculated it from and it’s not too long(a hash is a fixed length, so the SHA-256 hash of a 1 Gigabyte video file is still only 32 bytes), so sending it around the network doesn’t take up a lot of resources.

  That’s critical for a distributed system like IPFS, where we want to be able to store and retrieve data from many places. A computer running IPFS can ask all the peers it’s connected to whether they have a file with a particular hash and, if one of them does, they send back the whole file. Without a short, unique identifier like a cryptographic hash, that wouldn’t be possible. This technique is called “content addressing” — because the content itself is used to form an address, rather than information about the computer and disk location it’s stored at.



* IPNS
  Inter-Planetary Name System (IPNS) is a system for creating and updating mutable links to IPFS content. Since objects in IPFS are content-addressed, their address changes every time their content does. That’s useful for a variety of things, but it makes it hard to get the latest version of something.

  A name in IPNS is the hash of a public key. It is associated with a record containing information about the hash it links to that is signed by the corresponding private key. New records can be signed and published at any time.

  When looking up an IPNS address, use the /ipns/ prefix:

  /ipns/QmSrPmbaUKA3ZodhzPWZnpFgcPMFWF4QsxXbkWfEptTBJd

  IPNS is not the only way to create mutable addresses on IPFS. You can also use DNSLink (which is currently much faster than IPNS and also uses more readable names).

  Example:
  Imagine you want to publish your website under IPFS. You can use the Files API to publish your static website and then you’ll get a CID you can link to. But when you need to make a change, a problem arises: you get a new CID because you now have a different content. And it is not possible for you to be always giving others the new address.

  Here’s where the Name API comes in handy. With it, you can create a single, stable IPNS address that points to the CID for the latest version of your website.

* Pinning

  IPFS nodes treat the data they store like a cache, meaning that there is no guarantee that the data will continue to be stored. Pinning a CID tells an IPFS server that the data is important and mustn’t be thrown away.

  You should pin any content you consider important, to ensure that content is retained long-term. Since data important to someone else may not be important to you, pinning lets you have control over the disk space and data retention you need.

  Context

  Your IPFS node can store data based on different kinds of user events. For instance, you can add a file with ipfs add .... It will also store data you request, such as by loading a web page through the gateway (http://localhost:8080/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco) or with ipfs cat .... Your node will consult with other IPFS peers to find these requested data, and will store the results in the local cache. ipfs add will automatically pin the content, but other IPFS commands do not include automatic pinning.

  When garbage collection is triggered on a node, any pinned content is automatically exempt from deletion. Non-pinned data may be deleted; if you request it again later, the data can be retrieved from another node.

  Pinning Services
  To ensure that your important data is retained, you may want to use a pinning service. Such a service normally trades money for the service of guaranteeing they’ll keep your data pinned. Some cases where this might be important to you:
  You don’t have a lot of disk space, but you want to ensure some data sticks around.
  Your computer is a laptop, phone, or tablet that will have intermittent connectivity to the network, but you want to be able to access your data on IPFS from anywhere at any time, even when the device you added it from is offline.
  You want a backup that ensures your data is always available from another computer on the network in case you accidentally delete or garbage-collect on your own computer.

* UnixFS
  UnixFS is a protocol-buffers-based format
  A file in IPFS isn’t just content. It might be too big to fit in a single block, so it needs metadata to link all its blocks together. It might be a symlink or a directory, so it needs metadata to link to other files. UnixFS is the data format used to represent files and all their links and metadata in IPFS, and is loosely based on how files work in Unix. When you add a file to IPFS, you are creating a block (or a tree of blocks) in the UnixFS format.



# IPFS installation
IPFS is available for free as pre-built package in the official IPFS website and can be built from source, where the source code is available on GitHub at https://github.com/ipfs.

# IPFS implementation
IPFS currently available in two programming languages: go, JS. We will use the JS implementation in order to build our app in for the browser which make access to it so easy.

The IPFS implementations target:
an IPFS library to import in your own applications.
command line tools to manipulate objects directly.
mounted file systems, using FUSE or as kernel modules.

# IPFS CLI mini guide

# Building the chat application

#Possible future work using IPFS

  IPFS is designed to be used in a number of different ways. Here are just some of the use cases I will be pursuing:
  * As a mounted global filesystem, under /ipfs and /ipns.
  * As a mounted personal sync folder that automatically versions, publishes, and backs up any writes.
  * As an encrypted file or data sharing system.
  * As a versioned package manager for all software.
  * As the root filesystem of a Virtual Machine.
  * As the boot filesystem of a VM (under a hypervisor).
  * As a database: applications can write directly to the Merkle DAG data model and get all the versioning, caching, and distribution IPFS provides.
  * As a linked (and encrypted) communications platform.
  * As an integrity checked CDN for large files (without SSL).
  * As an encrypted CDN.
  * On webpages, as a web CDN.
  * As a new Permanent Web where links do not die.



# References	

* IPFS white paper
  https://github.com/ipfs/papers/raw/master/ipfs-cap2pfs/ipfs-p2p-file-system.pdf

* ProtoSchool
  https://proto.school

* IPFS youtube channel
  https://www.youtube.com/channel/UCdjsUXJ3QawK4O5L1kqqsew

* Merkle tree
  https://en.wikipedia.org/wiki/Merkle_tree
