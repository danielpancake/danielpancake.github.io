---
title: string_to_array
brief: Efficient conversion of strings to arrays
period: last updated Aug 2023

flavour: game asset
banner: string-to-array.webp
bannerPosition: right
---

An efficient method for converting GameMaker strings into character arrays.

It works by creating a buffer and copying the string into it, then reading the buffer byte by byte, encoding byte sequences into [correct UTF-8 characters](https://en.wikipedia.org/wiki/UTF-8).

This method is much faster than the built-in string_char_at function, especially for large strings.

<!-- Benchmarks are coming soon -->

Also comes with a lot of helper function for working with character arrays.

It is available on [\_github\_](https://github.com/danielpancake/string_to_array)
