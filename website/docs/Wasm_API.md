---
id: Wasm_API
title: Wasm API
sidebar_label: Wasm API
---

## Block API

### platon_block_hash()

```cpp
h256 platon::platon_block_hash(int64_t num)
```

Get the block hash based on the block height.

- **Parameters**
    - `num:` Height of block
- **Returns**
    - Hash of block.

### platon_block_number()

```cpp
uint64_t platon_block_number()
```

Get the height of the current block

- **Returns**
    - The height of the current block.

### platon_coinbase()

```cpp
Address platon::platon_coinbase()
```

Gets the Hash of miner nodes.

- **Returns**
    - Hash of miner nodes.

### platon_unix_timestamp()

```cpp
int64_t platon::platon_unix_timestamp()
```

Get the unix timestamp of the current block.

- **Returns**
    - The unix timestamp of the current block (second).

### platon_gas_limit()

```cpp
uint64_t platon_gas_limit()
```

Get the value of gas price limit.

- **Returns**
    - The value of gas price limit.

## Transaction API

### platon_gas_price()

```cpp
u128 platon::platon_gas_price()
```

Get the gas price of the transaction.

- **Returns**
    - The gas price of the transaction.

### platon_gas()

```cpp
uint64_t platon_gas()
```

Get the gas value of the transaction.

- **Returns**
    - The value of gas.

### platon_caller_nonce

```cpp
uint64_t platon_caller_nonce()
```

Get the value of the caller's nonce.

- **Returns**
    - The value of the caller's nonce.

### platon_call_value()

```cpp
u128 platon::platon_call_value()
```

Get the value of the current transaction value field.

- **Returns**
    - The value of the current transaction value field.

### platon_caller()

```cpp
Address platon::platon_caller()
```

Get the address of caller.

- **Returns**
    - The address of caller.

### platon_origin()

```cpp
Address platon::platon_origin()
```

Get the address of original caller.

- **Returns**
    - The address of original caller.

### platon_address()

```cpp
Address platon::platon_address()
```

Get the address of contract.

- **Returns**
    - The address of contract.

## Account API

### make_address() 1/2

```cpp
template <size_t M> std::pair<Address, bool> make_address(const char (&str)[M])
```

By default, the address recognized by CDT is the mainnet address, that is, the address prefix is atp. If you want to recognize the test network address prefix as atx, you need to define the macro TESTNET, and add #define TESTNET to the first line of the contract.

Convert a c-style string to an address object.

- **Parameters**
    - `str：` C-style string
- **Returns**
    - The return value is pair, whose second represents success or failure, and whose first represents an Address of type Address.

### make_address() 2/2

```cpp
std::pair<Address, bool> make_address(const std::string &str_address)
```

By default, the address recognized by CDT is the mainnet address, that is, the address prefix is atp. If you want to recognize the test network address prefix as atx, you need to define the macro TESTNET, and add #define TESTNET to the first line of the contract.

Converts a string to an address object.

- **Parameters**
    - `str：` string
- **Returns**
    - The return value is pair, whose second represents success or failure, and whose first represents an Address of type Address.

### platon_balance()

```cpp
Energon platon::platon_balance(const Address & addr)
```

Get the balance based on the address.

- **Parameters**
    - `addr:` address
- **Returns**
    - The balance of the address.

### platon_transfer()

```cpp
bool platon::platon_transfer(const Address &addr, const Energon &amount)
```

Transfer the amount of Energon to address.

- **Parameters**
    - `addr:` Accounts address
    - `amount:` The amount of Energon
- **Returns**
    - True if transfer succeeds, or false otherwise.

### platon::Energon Class

Energo is a currency-related operation class

- **Public Member Functions**

    - `Energon (u128 n)`
      Construct a new Energon.

    - `const u128 Get () const`
      Get a certain amount of Von.

    - `const bytes Bytes () const`
      Get the bytes of value. The bytes use big-end representations.

    - `Energon & Add (const u128 &v)`
      Add a certain amount of Von.

    - `Energon & Add (const Energon &rhs)`
      Add two Energon objects

    - `Energon & operator+= (const Energon &rhs)`
      Implement operator +=

- **Constructor & Destructor Documentation**

    - `platon::Energon::Energon(u128 n)`
      Construct a new Energon.
        - **Parameters**
            - `n:`Amount of Von

- **Member Function Documentation**

    - `Energon& platon::Energon::Add(const Energon & rhs)`
      Add a certain amount of Von.

        - **Parameters**
            - `rhs:`Amount of Von
        - **Returns**
            - The reference of Energon.

    - `Energon& platon::Energon::Add(const u128 & v)`
      Add a certain amount of Von.

        - **Parameters**
            - `v:` Amount of Von
        - **Returns**
            - The reference of Energon.

    - `const bytes platon::Energon::Bytes() const`

      Get the bytes of value. The bytes use big-end representations.

        - **Returns**
            - The bytes of value.

    - `const u128 platon::Energon::Get() const`

      Get a certain amount of Von.

        - **Returns**
            - The amount of Von.

    - `Energon& platon::Energon::operator+= ( const Energon & rhs)`

      Implement operator +=

        - **Parameters**
            - `rhs:` Energon object
        - **Returns**
            - The reference of Energon.

### platon::WhiteList< TableName > Class

```cpp
template<Name::Raw TableName>
class platon::WhiteList< TableName >
```

A tool to persistently store the whitelist.

- **Template Parameters**
- `Name:` Whitelist name. The name should be unique in the same contract
- **Constructor & Destructor Documentation**

    - `template<Name::Raw TableName> platon::WhiteList< TableName >::WhiteList ()`

      Construct a new whitelist.

- **public Member Functions**

    - `WhiteList ()`
      Construct a new whitelist.

    - `void Add (const std::string &addr)`
      Add the address to whitelist.

    - `void Add (const Address &addr)`
      Add the address to whitelist.

    - `void Delete (const std::string &addr)`
      Delete the address from whitelist.

    - `void Delete (const Address &addr)`
      Delete the address from whitelist.

    - `bool Exists (const std::string &addr)`
      Whether the address exists in whitelist.

    - `bool Exists (const Address &addr)`
      Whether the address exists in whitelist.

- **Member Function Documentation**

    - `template<Name::Raw TableName> void platon::WhiteList< TableName >::Add ( const Address & addr)`

      Add the address to whitelist.

        - **Parameters**
            - `addr:` Accounts address

    - `template<Name::Raw TableName> void platon::WhiteList< TableName >::Add ( const std::string & addr)`
      Add the address to whitelist.

        - **Parameters**
            - `addr:` Accounts address

    - `template<Name::Raw TableName> void platon::WhiteList< TableName >::Delete ( const Address & addr)`
      Delete the address from whitelist.

        - **Parameters**
            - `addr:` Accounts address

    - `template<Name::Raw TableName> void platon::WhiteList< TableName >::Delete ( const std::string & addr)`
      Delete the address from whitelist.

        - **Parameters**
            - `addr:` Accounts address

    - `template<Name::Raw TableName> bool platon::WhiteList< TableName >::Exists ( const Address & addr)`
      Whether the address exists in whitelist.

        - **Parameters**
            - `addr:` Accounts address
        - **Returns**
            - True if it exists, or false otherwise

    - `template<Name::Raw TableName> bool platon::WhiteList< TableName >::Exists ( const std::string & addr)`
      Whether the address exists in whitelist.

        - **Parameters**
            - `addr:` Accounts address
        - **Returns**
            - True if it exists, or false otherwise.

## Storage API

### platon_set_state()

```cpp
void platon_set_state(const uint8_t *key, size_t klen, const uint8_t *value, size_t vlen)
```

Set the state object.

- **Parameters**
    - `key:` Key
    - `Klen:` The length of key
    - `value:` Value
    - `vlen:` The length of value

### platon_get_state_length()

```cpp
size_t platon_get_state_length(const uint8_t *key, size_t klen)
```

Get the length of the value corresponding to the key.

- **Parameters** \*`key:` Key

    - `Klen:` The length of key

- **Returns**
    - The length of state object.

### platon_get_state()

```cpp
size_t platon_get_state(const uint8_t *key, size_t klen, uint8_t *value, size_t vlen);
```

Get the state object.

- **Parameters**

    - `key:` Key
    - `Klen:` The length of key
    - `value:` Value
    - `vlen:` The length of value

- **Returns**
    - The length of value.

### platon::StorageType< StorageName, T > Class Template

```cpp
template<Name::Raw StorageName, typename T>
class platon::StorageType< StorageName, T >
```

- **Template Parameters**

    - `StorageName:` Element value name. The name needs to be unique in the same contract
    - `T:` Element type

- **Public Member Functions**

    - `StorageType ()`
      Construct a new Storage Type object

    - `StorageType (const T &d)`
      Construct a new Storage Type object

    - `StorageType (const StorageType< StorageName, T > &)=delete`

    - `StorageType (const StorageType< StorageName, T > &&)=delete`

    - `~StorageType ()`
      Destroy the Storage Type object. Refresh to blockchain.

    - `T & operator= (const T &t)`

    - `template<typename P> bool operator== (const P &t) const`

    - `template<typename P> bool operator!= (const P &t) const`

    - `template<typename P> bool operator< (const P &t) const`

    - `template<typename P> bool operator>= (const P &t) const`

    - `template<typename P> bool operator<= (const P &t) const`

    - `template<typename P> bool operator> (const P &t) const`

    - `template<typename P> T & operator^= (const P &t) const`

    - `template<typename P> T operator^ (const P &t) const`

    - `template<typename P> T & operator|= (const P &t) const`

    - `template<typename P> T operator| (const P &t) const`

    - `template<typename P> T & operator&= (const P &t) const`

    - `template<typename P> T operator& (const P &t) const`

    - `T operator~ () const`

    - `T & operator<< (int offset)`

    - `T & operator>> (int offset)`

    - `T & operator++ ()`

    - `T operator++ (int)`

    - `T & operator[] (int i)`

    - `template<typename P> T & operator+= (const P &p)`

    - `template<typename P> T & operator-= (const P &p)`

    - `T & operator* ()`

    - `T * operator-> ()`

    - `operator bool () const`

    - `T get () const`

    - `T & self ()`

### platon::db::Array< TableName, Key, N > Class Template

```cpp
template<Name::Raw TableName, typename Key, unsigned N>
class platon::db::Array< TableName, Key, N >
```

- **Classes**

    - `class const_iterator Constant iterator.`

    - `class const_reverse_iterator Constant reverse iterator.`

    - `class iterator Iterator.`

- **Public Types**

    - `typedef std::reverse_iterator< iterator > reverse_iterator`

- **Public Member Functions**

    - `Array ()`

    - `Array (const Array< TableName, Key, N > &)=delete`

    - `Array (const Array< TableName, Key, N > &&)=delete`

    - `Array< TableName, Key, N > & operator= (const Array< TableName, Key, N > &)=delete`

    - `~Array ()`

    - `iterator begin ()`
      Start position of iterator

    - `iterator end ()`
      End position of iterator

    - `reverse_iterator rbegin ()`
      Start position of reverse iterator.

    - `reverse_iterator rend ()`
      End position of reverse iterator.

    - `const_iterator cbegin ()`
      Start position of constant iterator.

    - `const_iterator cend ()`
      End position of inverse constant iterator.

    - `const_reverse_iterator crbegin ()`
      Start position of inverse constant iterator.

    - `const_reverse_iterator crend ()`
      End position of inverse constant iterator.

    - `Key & at (size_t pos)`
      Get the specified position element.

    - `Key & operator[] (size_t pos)`
      Bracket operator.

    - `size_t size ()`
      array size

    - `Key get_const (size_t pos)`
      Get the Const object. Do not flush to cache.

    - `void set_const (size_t pos, const Key &key)`
      Set the Const object, Do not flush to cache.

- **Static Public Attributes**
    - `static const std::string kType = "__array__"`

### platon::db::Map< TableName, Key, Value > Class Template

```cpp
template<Name::Raw TableName, typename Key, typename Value>
class platon::db::Map< TableName, Key, Value >
```

Implement map operations, Map templates.

- **Template Parameters**

    - `TableName:` The name of the Map. The name of the Map should be unique within each contract.
    - `Key:` key type
    - `Value:` value type

  MapType::Traverse The default is Traverse, when Traverse needs extra data structure to operate, set to NoTraverse when no traversal operation is needed.

- **Public Member Functions**

    - `Map ()`

    - `Map(const Map&lt; TableName, Key, Value &gt; &amp;)=delete`

    - `Map(const Map&lt; TableName, Key, Value &gt; &amp;&amp;)=delete`

    - `Map&lt; TableName, Key, Value &gt; &amp; operator= (const Map&lt; TableName, Key, Value &gt; &amp;)=delete`

    - `~Map ()`
      Destroy the Map object Refresh data to the blockchain.

    - `bool insert (const Key &k, const Value &v)`
      Insert a new key-value pair, Update to cache.

    - `bool insert_const (const Key &k, const Value &v)`
      The insert will not update the new key-value pair to the cache. It is suitable for a large number of inserts, with no need to update after inserting.

    - `Value get_const (const Key &k)`
      Get the Const object, will not join the cache.

    - `Value & at (const Key &k)`
      Get value, will be added to the cache.

    - `void erase (const Key &k)`
      Delete key-value pairs.

    - `Value & operator[] (const Key &k)`
      Bracket operator.

    - `boolcontains (const Key &key)`
      Checks if there is an element with key equivalent to key in the container.

    - `void flush ()`
      Refresh the modified data in memory to the blockchain.

- **Static Public Attributes**

    `static const std::string kType = "__map__"`
- **Constructor & Destructor Documentation**

    - `template<Name::Raw TableName, typename Key , typename Value > platon::db::Map< TableName, Key, Value >::Map ()`

    - `template<Name::Raw TableName, typename Key , typename Value > platon::db::Map< TableName, Key, Value >::Map (const Map< TableName, Key, Value > & )`

    - `template<Name::Raw TableName, typename Key , typename Value > platon::db::Map< TableName, Key, Value >::Map (const Map< TableName, Key, Value > && )`

    - `template<Name::Raw TableName, typename Key , typename Value > platon::db::Map< TableName, Key, Value >::~Map ()`

Destroy the Map object, and refresh the data to the blockchain.

- **Member Function Documentation**

    - `template<Name::Raw TableName, typename Key , typename Value > Value& platon::db::Map< TableName, Key, Value >::at ( const Key & k )`
      Get value, will be added to the cache.

        - **Parameters**

            - `k:` Key

        - **Returns**

            - Value&
        - **Example:**

          ```cpp
          typedef platon::db::Map<"map_str"_n, std::string, std::string> MapStr;
          MapStr map;
          map.insert("hello", "world");
          assert(map.at["hello"] == "world");
          ```

    - `template<Name::Raw TableName, typename Key , typename Value > bool platon::db::Map< TableName, Key, Value >::contains ( const Key & key )`
      Checks if there is an element with key equivalent to key in the container.

        - **Parameters**

            - `k:` Key

        - **Returns**

            - True if there is such an element; otherwise false.
        - **Example:**

          ```cpp
           typedef platon::db::Map<"map_str"_n, std::string, std::string> MapStr;
           MapStr map;
           map.["hello"] = "world";
          assert(map.contains("hello"));
          ```

    - `template<Name::Raw TableName, typename Key , typename Value > void platon::db::Map< TableName, Key, Value >::erase ( const Key & k )`
      Delete key-value pairs.

        - **Parameters**

            - `k:` Key

        - **Example:**
          ```cpp
             typedef platon::db::Map<"map_str"_n, std::string, std::string> MapStr;
             MapStr map;
             map.insert("hello", "world");
             map.erase("hello");
             ```

     

    - `template<Name::Raw TableName, typename Key , typename Value > void platon::db::Map< TableName, Key, Value >::flush ()`
      Refresh the modified data in memory to the blockchain.

    - `template<Name::Raw TableName, typename Key , typename Value > Value platon::db::Map< TableName, Key, Value >::get_const ( const Key & k)`
      Get the Const object, will not join the cache.

        - **Parameters**

            - `k:` Key

        - **Returns**

            - Value
        - **Example:**

          ```cpp
          typedef platon::db::Map<"map_str"_n, std::string, std::string> MapStr;
          MapStr map;
          map.insert("hello", "world");
          assert(map.get_const["hello"] == "world");
          ```

    - `template<Name::Raw TableName, typename Key , typename Value > bool platon::db::Map< TableName, Key, Value >::insert ( const Key & k, const Value & v)`
      Insert a new key-value pair, Update to cache.

        - **Parameters**

            - `k:` Key

            - `v:` Value
        - **Returns**

            - True if inserted successfully, or false otherwise.

        - **Example:**

          ```cpp
          typedef platon::db::Map<"map_str"_n, std::string, std::string> MapStr;
          MapStr map;
          map.insert("hello", "world");
          assert(map["hello"] == "world");
          ```

    - `template<Name::Raw TableName, typename Key , typename Value > bool platon::db::Map< TableName, Key, Value >::insert_const ( const Key & k, const Value & v)`
      The insert will not update the new key-value pair to the cache. It is suitable for a large number of inserts, with no need to update after insertion.

        - **Parameters**

            - `k:` Key

            - `v:` Value
        - **Returns**

            - True if inserted successfully, or false otherwise.

        - **Example:**

          ```cpp
          typedef platon::db::Map<"map_str"_n, std::string, std::string> MapStr;
          MapStr map;
          map.insert_const("hello", "world");
          assert(map["hello"] == "world");
          ```

    - `template<Name::Raw TableName, typename Key , typename Value > Map<TableName, Key, Value>& platon::db::Map< TableName, Key, Value >::operator= ( const Map< TableName, Key, Value > & )`

    - `template<Name::Raw TableName, typename Key , typename Value > Value& platon::db::Map< TableName, Key, Value >::operator[] ( const Key & k)`
      Bracket operator.

        - **Parameters**

            - `k:` Key

        - **Returns**

            - Value& Get Value.
        - **Example:**

          ```cpp
          typedef platon::db::Map<"map_str"_n, std::string, std::string> MapStr;
          MapStr map;
          map.["hello"] = "world";
          ```

- **Member Data Documentation**
    
    - `template<Name::Raw TableName, typename Key , typename Value > const std::string platon::db::Map< TableName, Key, Value >::kType = "__map__"`

### template<Name::Raw TableName, typename T, typename... Indices> class platon::db::MultiIndex< TableName, T, Indices >

MultiIndex supports unique indexes and ordinary indexes. The unique index should be placed first in the parameter. The structure needs to provide the get function corresponding to the index field.

- **Member Function Documentation**

    - `template<Name::Raw TableName, typename T , typename... Indices>const_iterator platon::db::MultiIndex< TableName, T, Indices >::cbegin()`

      Start iterator

        - **Returns**
            - const_iterator.
        - **Example:**

      ```cpp
        struct Member {
        std::string name;
        uint8_t age;
        uint8_t sex;
        uint64_t $seq_;
        std::string Name() const { return name; }
        uint8_t Age() const { return age; }
        PLATON_SERIALIZE(Member, (name)(age)(sex))
      };
      MultiIndex<
        "table"_n, Member,
        IndexedBy<"index"_n, IndexMemberFun<Member, std::string, &Member::Name,
                                            IndexType::UniqueIndex>>,
        IndexedBy<"index2"_n, IndexMemberFun<Member, uint8_t, &Member::Age,
                                            IndexType::NormalIndex>>>
        member_table;
      for (auto it = member_table.cbegin(); it != it_end; ++it){}
      ```

    - `template<Name::Raw TableName, typename T , typename... Indices> const_iterator platon::db::MultiIndex< TableName, T, Indices >::cend()`

      End iterator

      - **Returns**
        - const_iterator.

      - **Example:**

      ```cpp
        struct Member {
        std::string name;
        uint8_t age;
        uint8_t sex;
        uint64_t $seq_;
        std::string Name() const { return name; }
        uint8_t Age() const { return age; }
        PLATON_SERIALIZE(Member, (name)(age)(sex))
      };
      MultiIndex<
        "table"_n, Member,
        IndexedBy<"index"_n, IndexMemberFun<Member, std::string, &Member::Name,
                                            IndexType::UniqueIndex>>,
        IndexedBy<"index2"_n, IndexMemberFun<Member, uint8_t, &Member::Age,
                                            IndexType::NormalIndex>>>
        member_table;
      for (auto it = member_table.cbegin(); it != it_end; ++it){}
      ```

    - `template<Name::Raw TableName, typename T , typename... Indices> template<Name::Raw IndexName, typename KEY > size_t platon::db::MultiIndex< TableName, T, Indices >::count(const KEY &key)`

        - **Returns**
            - Gets the number of data corresponding to the index value.
        - **Example:**

      ```cpp
      struct Member {
      std::string name;
      uint8_t age;
      uint8_t sex;
      uint64_t $seq_;
      std::string Name() const { return name; }
      uint8_t Age() const { return age; }
      PLATON_SERIALIZE(Member, (name)(age)(sex))
      };
      MultiIndex<
      "table"_n, Member,
        IndexedBy<"index"_n, IndexMemberFun<Member, std::string, &Member::Name,
                                          IndexType::UniqueIndex>>,
      IndexedBy<"index2"_n, IndexMemberFun<Member, uint8_t, &Member::Age,
                                            IndexType::NormalIndex>>>
      member_table;
      auto count = member_table.count<"index2"_n>(uint8_t(10));
      ```

    - `template<Name::Raw TableName, typename T , typename... Indices> template<typename Lambda> std::pair<const_iterator, bool> platon::db::MultiIndex< TableName, T, Indices >::emplace(Lambda &constructor)`

        - **Parameters**
            - Data item processing function
        - **Returns**
            - Returns an iterator that indicates whether the insertion was successful with the bool type. If unique index conflicts, the insertion fails.
        - **Example:**

      ```cpp
      struct Member {
        std::string name;
        uint8_t age;
        uint8_t sex;
        uint64_t $seq_;
        std::string Name() const { return name; }
        uint8_t Age() const { return age; }
        PLATON_SERIALIZE(Member, (name)(age)(sex))
      };
      MultiIndex<
        "table"_n, Member,
        IndexedBy<"index"_n, IndexMemberFun<Member, std::string, &Member::Name,
                                            IndexType::UniqueIndex>>,
        IndexedBy<"index2"_n, IndexMemberFun<Member, uint8_t, &Member::Age,
                                            IndexType::NormalIndex>>>
        member_table;
      member_table.emplace([&](auto &m) {
        m.age = 10;
        m.name = "hello";
        m.sex = 1;
      });
      ```

    - `template<Name::Raw TableName, typename T , typename... Indices> void platon::db::MultiIndex< TableName, T, Indices >::erase(const_iterator position)`
      Erase data based on iterator
      - **Parameters**
           - `position:` position of iterator
      - **Example:**
       ```cpp
        struct Member {
        std::string name;
        uint8_t age;
        uint8_t sex;
        uint64_t $seq_;
        std::string Name() const { return name; }
        uint8_t Age() const { return age; }
        PLATON_SERIALIZE(Member, (name)(age)(sex))
        };
        MultiIndex<
        "table"_n, Member,
        IndexedBy<"index"_n, IndexMemberFun<Member, std::string, &Member::Name,
                                        IndexType::UniqueIndex>>,
        IndexedBy<"index2"_n, IndexMemberFun<Member, uint8_t, &Member::Age,
                                          IndexType::NormalIndex>>>
        member_table;
        auto vect_iter = member_table.find<"index"_n>(std::string("use to find data"));
        member_table.erase(vect_iter[0]);
       ```
      
    - `template<Name::Raw TableName, typename T , typename... Indices> template<Name::Raw IndexName, typename KEY > const_iterator platon::db::MultiIndex< TableName, T, Indices >::find(const KEY & key)`  
      Find the data, Only a unique index is available.
      - **Parameters**
           - `key:` key of index
      - **Returns**
           - The result iterator. If not found, the value is cend().
      - **Example:**
       ```cpp
        struct Member {
        std::string name;
        uint8_t age;
        uint8_t sex;
        uint64_t $seq_;
        std::string Name() const { return name; }
        uint8_t Age() const { return age; }
        PLATON_SERIALIZE(Member, (name)(age)(sex))
        };
        MultiIndex<
        "table"_n, Member,
        IndexedBy<"index"_n, IndexMemberFun<Member, std::string, &Member::Name,
                                          IndexType::UniqueIndex>>,
        IndexedBy<"index2"_n, IndexMemberFun<Member, uint8_t, &Member::Age,
                                            IndexType::NormalIndex>>>
        member_table;
        auto vect_iter = member_table.find<"index"_n>(std::string("use to find data"));
       ```
      
    - `template<Name::Raw TableName, typename T , typename... Indices> template<Name::Raw IndexName>auto platon::db::MultiIndex< TableName, T, Indices >::get_index()`
      Get the index object of a non-unique index.
      - **Returns**
           - index object.
      - **Example:**
       ```cpp
        struct Member {
        std::string name;
        uint8_t age;
        uint8_t sex;
        uint64_t $seq_;
        std::string Name() const { return name; }
        uint8_t Age() const { return age; }
        PLATON_SERIALIZE(Member, (name)(age)(sex))
        };
        MultiIndex<
        "table"_n, Member,
        IndexedBy<"index"_n, IndexMemberFun<Member, std::string, &Member::Name,
                                          IndexType::UniqueIndex>>,
        IndexedBy<"index2"_n, IndexMemberFun<Member, uint8_t, &Member::Age,
                                             IndexType::NormalIndex>>>
        member_table;
        auto index = member_table.get_index<"index2"_n>();
       ```
      
    - `template<Name::Raw TableName, typename T , typename... Indices> template<typename Lambda >void platon::db::MultiIndex< TableName, T, Indices >::modify(const_iterator position,Lambda && constructor)`
      Modify data based on iterators, but not all fields related to the index.
       - **Parameters**
            - `position:` Iterator
            - `constructor:` lambda function that updates the target object
       - **Example:**
        ```cpp
         struct Member {
         std::string name;
         uint8_t age;
         uint8_t sex;
         uint64_t $seq_;
         std::string Name() const { return name; }
         uint8_t Age() const { return age; }
         PLATON_SERIALIZE(Member, (name)(age)(sex))
         };
         MultiIndex<
         "table"_n, Member,
         IndexedBy<"index"_n, IndexMemberFun<Member, std::string, &Member::Name,
                                          IndexType::UniqueIndex>>,
         IndexedBy<"index2"_n, IndexMemberFun<Member, uint8_t, &Member::Age,
                                            IndexType::NormalIndex>>>
         member_table;
         member_table.modify(r.first, [&](auto &m) { m.sex = 15; });
        ```

## Contract API

### platon_destroy()

```cpp
bool platon::platon_destroy ( const Address & addr)
```

Destroy the contract.

- **Parameters**
    - `addr:` Address of the contract
- **Returns**
    - True if the contract is destroyed successfully, or false otherwise.

### platon_migrate_contract()

```cpp
template<typename value_type , typename gas_type >
bool platon::platon_migrate_contract ( Address & addr,
const bytes & init_args,
value_type  value,
gas_type  gas)
```

Migrate the contract.

- **Parameters**
    - `addr:` The address of new contract
    - `init_args:` The input arguments
    - `value:` Transfer amount
    - `gas:` Pay amount of gas for this transaction
- **Returns**
    - True if the contract is migrated successfully, or false otherwise.

### cross_call_args()

```cpp
template<typename... Args>
bytes platon::cross_call_args ( const std::string & method,
const Args &...  args)
```

Construct cross-contract call parameters.

- **Parameters**
    - `method:` The method name of the called contract
    - `args:` The parameters corresponding to the contract method
- **Returns**
    - Parameter byte array

### platon_call() 1/2

```cpp
template<typename value_type , typename gas_type >
bool platon::platon_call ( const Address & addr,
const bytes & paras,
const value_type & value,
const gas_type & gas)
```

Normal cross-contract call.

- **Parameters**
    - `addr:` The contract address to be called
    - `paras:` A contract parameter constructed using the function cross_call_args
    - `gas:` The estimated gas consumed by the corresponding contract method
    - `value:` The amount transferred to the contract
- **Returns**
    - The call succeed or failed.

### platon_call() 2/2

```cpp
template<typename return_type , typename value_type , typename gas_type , typename... Args>
decltype(auto) platon::platon_call ( const Address & addr,
const value_type & value,
const gas_type & gas,
const std::string & method,
const Args &...  args
)
```

Normal cross-contract call.

- **Parameters**
    - `addr:` The contract address to be called
    - `value:` The amount transferred to the contract
    - `gas:` The estimated gas consumed by the corresponding contract method
    - `method:` The method name of the called contract
    - `args:` The parameters corresponding to the contract method
- **Returns**

    - The contract method \* **Returns** and whether the execution was successful.

- **Example:**

  ```cpp
  auto result =
  platon_call<int>(Address("0xEC081ab45BE978A4A630eB8cbcBffA50E747971B"),
  uint32_t(100), uint32_t(100), "add", 1,2,3);
  if(!result.secod){
    platon_throw("cross call fail");
  }
  ```

### platon_delegate_call() 1/2

```cpp
template<typename gas_type >
bool platon::platon_delegate_call ( const Address & addr,
const bytes & paras,
const gas_type & gas
)
```

Cross-contract proxy call.

- **Parameters**
    - `addr:` The contract address to be called
    - `paras:` A contract parameter constructed using the function cross_call_args
    - `gas:` The estimated gas consumed by the corresponding contract method
- **Returns**
    - The call succeed or failed.

### platon_delegate_call() 2/2

```cpp
template<typename return_type , typename gas_type , typename... Args>
decltype(auto) platon::platon_delegate_call ( const Address & addr,
const gas_type & gas,
const std::string & method,
const Args &...  args)
```

Cross-contract proxy call.

- **Parameters**

    - `addr:` The contract address to be called
    - `gas:` The estimated gas consumed by the corresponding contract method
    - `method:` The method name of the called contract
    - `args:` The parameters corresponding to the contract method
- **Returns**

    - The contract method \* **Returns** the value and whether the execution was successful

- **Example:**

  ```cpp
  auto result =
  platon_delegate_call<int>(Address("0xEC081ab45BE978A4A630eB8cbcBffA50E747971B"),
   uint32_t(100), "add", 1,2,3);
   if(!result.secod){
     platon_throw("cross call fail");
   }
  ```

### get_call_output()

```cpp
template<typename T >
void platon::get_call_output ( T & t)
```

Get the return value of the cross-contract method of calling contract.

- **Template Parameters**
    - `T:` The output value type
- **Parameters**
    - `t:` The value returned by the contract method

### platon_event()

```cpp
void platon_event(const uint8_t *topic, size_t topic_len, const uint8_t *args,
                  size_t args_len);
```

Post event to VM

- **Parameters**
    - `topic:` The topic of event
    - `topic_len:` The length of topic
    - `args:` The arguments
    - `args_len:` The length of arguments

## Exception API

### platon_panic()

```cpp
void platon_panic(void);
```

Terminate transaction, and deduct all gas of the transaction

### platon_revert()

```cpp
void platon_revert(void);
```

Terminate the transaction and deduct the gas consumed

## Other API

### platon_sha3()

```cpp
h256 platon::platon_sha3 ( const bytes & data )
```

Sh3 algorithm.

- **Parameters**
    - `data:` Binary data
- **Returns**
    - The Hash of the data
