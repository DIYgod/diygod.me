---
title: 💡 Unidata - 提供人类友好的 Web3 数据的便捷访问
date: 2022-05-06 23:27:01
tags:
---
Web3 的魅力在于数据属于用户自己，但由于区块链低效的效率和设计，再加上数据格式标准的缺失，访问和展示自己或用户的 Web3 数据是一件极度困难的事情。所以我做了开源项目 [Unidata](https://unidata.app/)，给 Web3 开发者提供人类友好的 Web3 数据的便捷访问。

Ethereum NFT 数据是目前 Web3 最常使用的数据，所以我使用 Ethereum NFT 来举例。<!--more-->

1. Ethereum NFT 使用 EIP-721 标准，它的数据格式非常“灵活”，比如一个 NFT 的图片可能根据发布者不同的喜好使用 `image` `image_url` 或 `animation_url` 等各种不统一的字段，甚至根本不是一个图片，还可能是视频、3D 模型等，这给前端展示带来了很多麻烦。

2. 获取一个地址拥有的全部 Ethereum NFT 也非常麻烦，由于 Ethereum 的设计，想要获取它需要读取这个地址的全部交易记录，而且 Ethereum 不止主网，还有 Polygon、BSC、Arbitrum、fantom、Gnosis 等各种侧链，这对前端是一个不可能的工作，目前各种各样的数据索引服务可以部分解决这个问题，但这些服务返回的数据格式各不相同、功能各有优劣、各支持了不同的链，应该如何选择呢？

针对第一个问题，Unidata 设计了一系列友好和统一的数据格式，分为 Profiles、Links、Assets、Notes 四个部分。Ethereum NFT 属于 Assets 的格式。通过 Unidata 返回的固定的数据格式，前端不再需要做麻烦的适配混乱的数据格式的工作。

另外值得一提的是不止 Ethereum NFT，Unidata 目前还支持了 Solana NFT，Ethereum NFT 和 Solana NFT 的数据格式也是统一的，Unidata 还将继续支持更多的 Assets 来源，他们的格式也都会是统一的。

解决完第一个问题，第二个问题也就很容易解决了。Unidata 的做法是把各个服务返回的数据统一成相同的格式并做聚合。比如 OpenSea 服务支持了主网，Alchemy 服务支持了 Polygon，Moralis 服务支持了 BSC、Arbitrum、fantom，POAP 服务支持了 Gnosis 链的 POAP NFT。通过 Unidata 一行代码就可以同时使用这些服务同时获取到主网、Polygon、BSC、Arbitrum、fantom、POAP 的所有 NFT 了。可以[在这里看在线演示](https://unidata.app/guide/assets/ethereum-nft/#live-demo)。

![](/images/unidata-1.png)

除了 Assets，Unidata 还有 Profiles、Links、Notes 三个部分。

[Assets](https://unidata.app/guide/assets/) 目前支持了 Ethereum NFT（Mainnet、Polygon、BSC、Arbitrum、Fantom、Gnosis、POAP）、Solana NFT、Alchemy、Solscan、Moralis、OpenSea。

[Notes](https://unidata.app/guide/notes/) 目前支持了 Mirror Entry、Ethereum NFT Activity（Mainnet、Polygon、BSC、Arbitrum、Fantom、Gnosis、POAP）、RSS3。

[Profiles](https://unidata.app/guide/profiles/) 目前支持了 ENS、Crossbell、Infura。

[Links](https://unidata.app/guide/links/) 目前支持了 CyberConnect。

还有很多正在不断添加中，可以[在文档看目前支持的所有服务和数据源](https://unidata.app/guide/#supported-sources)。

[![GitHub Org's stars](https://img.shields.io/github/stars/DIYgod/Unidata?style=social)](https://github.com/DIYgod/Unidata) [![Discord](https://img.shields.io/discord/968954680514342973?label=Discord&logo=discord&style=social)](https://discord.gg/ggrfhdS9Fe) [![Twitter Follow](https://img.shields.io/twitter/follow/Unidata_?style=social)](https://twitter.com/Unidata_)

![](/images/unidata-2.jpeg)
