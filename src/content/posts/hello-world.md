---
title: "Hello World - Draft Post"
date: 2026-03-27
description: "This is a draft post that should not appear on the home page."
draft: true
tags: ["draft", "test"]
category: "testing"
---

This is a draft post. It should NOT appear on the home page listing because `draft: true` is set in the frontmatter.

## Purpose

This post is used to verify that draft functionality works correctly. When browsing the home page, you should only see published posts.

## Verification Steps

1. Check the home page at `/`
2. This post should NOT appear in the post list
3. Only posts with `draft: false` should be visible

This demonstrates the draft functionality of the blog's content collection schema.
