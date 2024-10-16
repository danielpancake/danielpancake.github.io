---
title: spongebob-search
brief: A text searching tool for Spongebob episodes
period: 2020

flavour: command line application
banner: spongebob-search.webp
bannerPosition: right
---

<mark class="highlight">spongebob-search</mark> is a command line application written in [Go](https://go.dev/) for searching through transcripts of Spongebob episodes from the [Spongebob Wikia](https://spongebob.fandom.com/wiki/List_of_episodes).

**<!> NOTE:** As of 2023, the application has not been tested nor updated for a long time. It may not work as expected or may not work at all.

spongebob-search uses simple full text search algorithm to search given words or phrases in the transcripts. I think, I used [this article](https://artem.krylysov.com/blog/2020/07/28/lets-build-a-full-text-search-engine) as a guide.

In terms of efficiency, it is very inefficient, as no sufficient data structures are used. But it did (at least then) get the job done. Do not expect much, as it was simply a high school project.

You can find it on [\_github\_](https://github.com/danielpancake/spongebobsearch)
