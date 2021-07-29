---
id: Solidity_Contract_security
title: Contract security
sidebar_label: Contract security
---

## Contract Security Development Guide

In Solidity, you can use smart contracts to handle tokens or, possibly, even more valuable things. Furthermore, every execution of a smart contract happens in public and, in addition to that, the source code is often available. In the blockchain world, contracts have always been the main point of attack for hackers, and they have also caused very large losses. Therefore, the security development of the contract is very important. You can consider the following aspects to improve the security of the contract.

### Compiler Bug

First, you must understand the bugs of the Solidity compiler itself, and try to avoid the version of the compiler in question or the use of the problem. Solidity compiler bug list: https://solidity.readthedocs.io/en/latest/bugs.html.

### Standard Contract Development Process

If you want to solve the security problem of smart contracts, you must develop contracts according to standard processes.

1. The detailed design must be completed first, taking into account various scenarios and abnormal situations. Avoid unclear and incompletely introduced bugs.
2. During development, to be modular and concise, complexity will increase the risk of errors.
3. Before the contract is deployed to the mainnet, the contract must be adequately reviewed and tested.
4. Keep an eye on the operation status of the contract. In an emergency, you can destroy the contract or provide a similar emergency freeze function.

### Common Pitfalls

#### Private Information and Randomness

Everything you use in a smart contract is publicly visible, even local variables and state variables marked `private`.

Using random numbers in smart contracts is quite tricky if you do not want miners to be able to cheat(The use of random numbers in smart contracts is difficult to ensure that nodes do not cheat. This is because random numbers in smart contracts generally rely on the local time of the computing node, and local time can be forged by malicious nodes. Therefore, this method is not safe. A common practice is to use off-chain third-party services such as Oraclize to obtain random numbers).

#### Re-Entrancy

Any interaction from a contract (A) with another contract (B) and any transfer of ATP/LAT hands over control to that contract (B). This makes it possible for B to call back into A before this interaction is completed. To give an example, the following code contains a bug (it is just a snippet and not a complete contract):

```
pragma solidity >=0.4.0 <0.7.0;

// THIS CONTRACT CONTAINS A BUG - DO NOT USE
contract Fund {
    /// Mapping of ATP/LAT shares of the contract.
    mapping(address => uint) shares;
    /// Withdraw your share.
    function withdraw() public {
        if (msg.sender.send(shares[msg.sender]))
            shares[msg.sender] = 0;
    }
}
```

The problem is not too serious here because of the limited gas as part of `send`, but it still exposes a weakness: ATP/LAT transfer can always include code execution, so the recipient could be a contract that calls back into `withdraw`. This would let it get multiple refunds and basically retrieve all the ATP/LAT in the contract. In particular, the following contract will allow an attacker to refund multiple times as it uses `call` which forwards all remaining gas by default:

```
pragma solidity >=0.4.0 <0.7.0;

// THIS CONTRACT CONTAINS A BUG - DO NOT USE
contract Fund {
    /// Mapping of ATP/LAT shares of the contract.
    mapping(address => uint) shares;
    /// Withdraw your share.
    function withdraw() public {
        (bool success,) = msg.sender.call.value(shares[msg.sender])("");
        if (success)
            shares[msg.sender] = 0;
    }
}
```

To avoid re-entrancy, you can use the Checks-Effects-Interactions pattern as outlined further below:

```
pragma solidity >=0.4.11 <0.7.0;

contract Fund {
    /// Mapping of ATP/LAT shares of the contract.
    mapping(address => uint) shares;
    /// Withdraw your share.
    function withdraw() public {
        uint share = shares[msg.sender];
        shares[msg.sender] = 0;
        msg.sender.transfer(share);
    }
}
```

Note that re-entrancy is not only an effect of ATP/LAT transfer but of any function call on another contract. Furthermore, you also have to take multi-contract situations into account. A called contract could modify the state of another contract you depend on.

#### Gas Limit and Loops

Loops that do not have a fixed number of iterations, for example, loops that depend on storage values, have to be used carefully: Due to the block gas limit, transactions can only consume a certain amount of gas. Either explicitly or just due to normal operation, the number of iterations in a loop can grow beyond the block gas limit which can cause the complete contract to be stalled at a certain point. This may not apply to `view` functions that are only executed to read data from the blockchain. Still, such functions may be called by other contracts as part of on-chain operations and stall those. Please be explicit about such cases in the documentation of your contracts.

#### Sending and Receiving ATP/LAT

- Neither contracts nor “external accounts” are currently able to prevent that someone sends them ATP/LAT. Contracts can react on and reject a regular transfer, but there are ways to move ATP/LAT without creating a message call. One way is to simply “mine to” the contract address and the second way is using `selfdestruct(x)`.
- If a contract receives ATP/LAT (without a function being called), either the receive ATP/LAT or the fallback function is executed. If it does not have a receive nor a fallback function, the ATP/LAT will be rejected (by throwing an exception). During the execution of one of these functions, the contract can only rely on the “gas stipend” it is passed (2300 gas) being available to it at that time. This stipend is not enough to modify storage (do not take this for granted though, the stipend might change with future hard forks). To be sure that your contract can receive ATP/LAT in that way, check the gas requirements of the receive and fallback functions.
- There is a way to forward more gas to the receiving contract using `addr.call{value: x}("")`. This is essentially the same as `addr.transfer(x)`, only that it forwards all remaining gas and opens up the ability for the recipient to perform more expensive actions (and it returns a failure code instead of automatically propagating the error). This might include calling back into the sending contract or other state changes you might not have thought of. So it allows for great flexibility for honest users but also for malicious actors.
- Use the most precise units to represent the wei amount as possible, as you lose any that is rounded due to a lack of precision.
- If you want to send ATP/LAT using `address.transfer`, there are certain details to be aware of:
    1. If the recipient is a contract, it causes its receive or fallback function to be executed which can, in turn, call back the sending contract.
    2. Sending ATP/LAT can fail due to the call depth going above 1024. Since the caller is in total control of the call depth, they can force the transfer to fail; take this possibility into account or use `send` and make sure to always check its return value. Better yet, write your contract using a pattern where the recipient can withdraw ATP/LAT instead.
    3. Sending ATP/LAT can also fail because the execution of the recipient contract requires more than the allotted amount of gas (explicitly by using `require`, `assert`, `revert` or because the operation is too expensive) - it “runs out of gas” (OOG). If you use `transfer` or `send` with a return value check, this might provide a means for the recipient to block progress in the sending contract. Again, the best practice here is to use a [“withdraw” pattern instead of a “send” pattern](https://solidity.readthedocs.io/en/latest/common-patterns.html#withdrawal-pattern)。

#### Callstack Depth

External function calls can fail any time because they exceed the maximum call stack of 1024. In such situations, Solidity throws an exception. Malicious actors might be able to force the call stack to a high value before they interact with your contract.

Note that `.send()` does **not** throw an exception if the call stack is depleted but rather returns `false` in that case. The low-level functions `.call()`, `.delegatecall()` and `.staticcall()` behave in the same way.

#### tx.origin

Never use tx.origin for authorization. Let’s say you have a wallet contract like this:

```
pragma solidity >=0.5.0 <0.7.0;

// THIS CONTRACT CONTAINS A BUG - DO NOT USE
contract TxUserWallet {
    address owner;

    constructor() public {
        owner = msg.sender;
    }

    function transferTo(address payable dest, uint amount) public {
        require(tx.origin == owner);
        dest.transfer(amount);
    }
}
```

Now someone tricks you into sending ATP/LAT to the address of this attack wallet:

```
pragma solidity >=0.5.0 <0.7.0;

interface TxUserWallet {
    function transferTo(address payable dest, uint amount) external;
}

contract TxAttackWallet {
    address payable owner;

    constructor() public {
        owner = msg.sender;
    }

    function() external {
        TxUserWallet(msg.sender).transferTo(owner, msg.sender.balance);
    }
}
```

If your wallet had checked `msg.sender` for authorization, it would get the address of the attack wallet, instead of the owner address. But by checking `tx.origin`, it gets the original address that kicked off the transaction, which is still the owner address. The attack wallet instantly drains all your funds.

#### Two’s Complement / Underflows / Overflows

As in many programming languages, Solidity’s integer types are not actually integers. They resemble integers when the values are small, but behave differently if the numbers are larger. For example, the following is true: `uint8(255) + uint8(1) == 0`. This situation is called an *overflow*. It occurs when an operation is performed that requires a fixed size variable to store a number (or piece of data) that is outside the range of the variable’s data type. An *underflow* is the converse situation: `uint8(0) - uint8(1) == 255`.

In general, read about the limits of two’s complement representation, which even has some more special edge cases for signed numbers.

Try to use `require` to limit the size of inputs to a reasonable range and use the [SMT checker](https://solidity.readthedocs.io/en/latest/layout-of-source-files.html#smt-checker) to find potential overflows, or use a library like [SafeMath](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/math/SafeMath.sol) if you want all overflows to cause a revert.

Code such as `require((balanceOf[_to] + _value) >= balanceOf[_to])` can also help you check if values are what you expect.

#### Clearing Mappings

The Solidity type `mapping` (see [Mapping Types](https://solidity.readthedocs.io/en/latest/types.html#mapping-types)) is a storage-only key-value data structure that does not keep track of the keys that were assigned a non-zero value. Because of that, cleaning a mapping without extra information about the written keys is not possible. If a `mapping` is used as the base type of a dynamic storage array, deleting or popping the array will have no effect over the `mapping` elements. The same happens, for example, if a `mapping` is used as the type of a member field of a `struct` that is the base type of a dynamic storage array. The `mapping` is also ignored in assignments of structs or arrays that containing a `mapping`.

```
pragma solidity >=0.5.0 <0.7.0;

contract Map {
    mapping (uint => uint)[] array;

    function allocate(uint _newMaps) public {
        for (uint i = 0; i < _newMaps; i++)
            array.push();
    }

    function writeMap(uint _map, uint _key, uint _value) public {
        array[_map][_key] = _value;
    }

    function readMap(uint _map, uint _key) public view returns (uint) {
        return array[_map][_key];
    }

    function eraseMaps() public {
        delete array;
    }
}
```

Consider the example above and the following sequence of calls: `allocate(10)`, `writeMap(4, 128, 256)`. At this point, calling `readMap(4, 128)` returns 256. If we call `eraseMaps`, the length of state variable `array` is zeroed, but since its `mapping` elements cannot be zeroed, their information stays alive in the contract’s storage. After deleting `array`, calling `allocate(5)` allows us to access `array[4]` again, and calling `readMap(4, 128)` returns 256 even without another call to `writeMap`.

If your `mapping` information must be deleted, consider using a library similar to [iterable mapping](https://github.com/ethereum/dapp-bin/blob/master/library/iterable_mapping.sol), which allows you to traverse the keys and delete their values in the appropriate `mapping`.

#### Permission Control Error

In smart contracts, contract developers usually set some permission for the contract owner, but if the developer negligently writes wrong function permissions, it may lead to serious consequences such as transfer of the owner.

```
function initContract() public {
    owner = msg.reader;
}
```

The above code function needs to be set onlyOwner.

Reasonable permissions should be set for different functions in the contract.

#### Address Initialization Problem

In EVM, all address-related initializations are given an initial value of 0.

If an address variable is equal to 0, the variable may not be initialized or an unknown error may occur.

If the developer initializes an address variable in the code but does not assign an initial value, or the user does not assign the address variable by mistake when initiating an operation, but this variable needs to be handled in the following code, it is possible Cause unnecessary security risks.

For functions that involve addresses, it is recommended to add require (_to! = Address (uint160(0))) verification to effectively avoid unnecessary losses caused by user misoperations or unknown errors.

#### Transaction Order Dependent

Since transactions are first stored in mempool in a short period of time, it is possible to know what action will take place before miners package them into blocks. This is troublesome for a decentralized market, because the transaction information of the token can be viewed, and the transaction order can be changed before it is packaged into a block. Avoiding this is difficult because it comes down to the specific contract itself.

For example, in the market, it is best to implement batch auctions (this also prevents high frequency trading issues). Another method is using a pre-commit scheme.

#### Minor Details

Types that do not occupy the full 32 bytes might contain “dirty higher order bits”. This is especially important if you access `msg.data` - it poses a malleability risk: You can craft transactions that call a function `f(uint8 x)` with a raw byte argument of `0xff000001` and with `0x00000001`. Both are fed to the contract and both will look like the number `1` as far as `x` is concerned, but `msg.data` will be different, so if you use `keccak256(msg.data)` for anything, you will get different results.

### Security Recommendations

#### Take Warnings Seriously

If the compiler warns you about something, you should better change it. Even if you do not think that this particular warning has security implications, there might be another issue buried beneath it. Any compiler warning we issue can be silenced by slight changes to the code.

Always use the latest version of the compiler to be notified about all recently introduced warnings.

#### Restrict the Amount of ATP/LAT

Restrict the amount of ATP/LAT (or other tokens) that can be stored in a smart contract. If your source code, the compiler or the platform has a bug, these funds may be lost. If you want to limit your loss, limit the amount of ATP/LAT.

#### Simple and Modular

Keep your contracts small and easily understandable. Single out unrelated functionality in other contracts or into libraries. General recommendations about source code quality of course apply: Limit the amount of local variables, the length of functions and so on. Document your functions so that others can see what your intention was and whether it is different than what the code does.

#### Use the Checks-Effects-Interactions Pattern

Most functions will first perform some checks (who called the function, are the arguments in range, did they send enough ATP/LAT, does the person have tokens, etc.). These checks should be done first.

As the second step, if all checks passed, effects to the state variables of the current contract should be made. Interaction with other contracts should be the very last step in any function.

Early contracts delayed some effects and waited for external function calls to return in a non-error state. This is often a serious mistake because of the re-entrancy problem explained above.

Note that, also, calls to known contracts might in turn cause calls to unknown contracts, so it is probably better to just always apply this pattern.

#### Include a Fail-Safe Mode

While making your system fully decentralised will remove any intermediary, it might be a good idea, especially for new code, to include some kind of fail-safe mechanism:

You can add a function in your smart contract that performs some self-checks like “Has any ATP/LAT leaked?”, “Is the sum of the tokens equal to the balance of the contract?” or similar things. Keep in mind that you cannot use too much gas for that, so help through off-chain computations might be needed there.

If the self-check fails, the contract automatically switches into some kind of “failsafe” mode, which, for example, disables most of the features, hands over control to a fixed and trusted third party or just converts the contract into a simple “give me back my money” contract.

#### Check Function Permissions Carefully

Reasonable permissions should be set for different functions in the contract.

Check whether the functions in the contract use public and private keywords for visibility modification. Check whether the contract is correctly defined and uses modifiers to restrict access to key functions to avoid problems caused by unauthorized use.

```
function initContract() public OnlyOwner {
    owner = msg.reader;
}
```

#### Ask for Peer Review

The more people examine a piece of code, the more issues are found. Asking people to review your code also helps as a cross-check to find out whether your code is easy to understand - a very important criterion for good smart contracts.

#### Other

1. [More Security Recommendations ](https://github.com/guylando/KnowledgeLists/blob/master/EthereumSmartContracts.md)
2. [Contract Best Practices](https://consensys.github.io/smart-contract-best-practices/)

### Security Tools

1. Ethereum formal verification tool [SMT checker](https://solidity.readthedocs.io/en/latest/layout-of-source-files.html#smt-checker) .
2. Formal verification tools: [offline VS Code plugin](https://marketplace.visualstudio.com/items?itemName=Beosin.beosin-vaas-eth)，and [Online version](https://beosin.com/vaas/index.html#/audit/ptsj) .
3. Remix integrated security scan plugin: [MythX](https://docs.mythx.io/en/latest/)。

### Third Party Audit

You can find a professional third-party audit company for security audits, such as：[slow mist](https://www.slowmist.com/en/service-smart-contract-security-audit.html)。
