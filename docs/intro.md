---
title: 介绍
sidebar_position: 1
---

# TabooLib 简介

欢迎来到 **TabooLib 非官方用户手册**。本文档旨在帮助您快速了解和使用 TabooLib 进行 Minecraft 插件开发。

## 什么是 TabooLib？

TabooLib 是一个基于 Kotlin 的 Minecraft 插件开发框架，旨在简化插件开发流程，提高开发效率。它提供了丰富的 API 和工具，使您能够专注于业务逻辑的实现，而不是重复的样板代码。

TabooLib 具有以下特点：

- **跨平台支持**：支持 Bukkit、BungeeCord、Velocity 等多种平台
- **基于 Kotlin**：利用 Kotlin 语言的强大特性
- **体积小巧**：仅占约 30+ KB 的插件体积
- **功能丰富**：提供大量实用工具和 API

## 开始使用

在开始使用 TabooLib 之前，您需要：

- [JDK](https://adoptium.net/) 8 或更高版本
- [Gradle](https://gradle.org/) 或 [Maven](https://maven.apache.org/)（推荐使用 Gradle）
- 一个支持 Kotlin 的 IDE（推荐 [IntelliJ IDEA](https://www.jetbrains.com/idea/)）

## 创建新项目

TabooLib 使用 Gradle 进行项目构建。以下是创建新项目的基本步骤：

1. 在 `build.gradle.kts` 中添加 TabooLib 依赖：

```kotlin
plugins {
    id("io.izzel.taboolib") version "最新版本"
}

taboolib {
    version { taboolib = "最新版本" }
}
```

2. 创建第一个插件类：

```kotlin
package your.package

import taboolib.common.platform.Plugin
import taboolib.common.platform.function.info

object YourPlugin : Plugin() {
    override fun onEnable() {
        info("插件已启用！")
    }
}
```

## 注意事项

在使用 TabooLib 开发之前，请注意：

- 请始终使用最新稳定版本
- 了解基本的 Kotlin 语法将有助于更好地使用 TabooLib
- 查阅官方文档和示例以了解更多高级功能

希望这份指南能帮助您快速上手 TabooLib 开发。更多详细内容请继续阅读本文档的其他章节。
