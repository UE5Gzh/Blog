---
title: "Code Examples: Syntax Highlighting Demo"
date: 2026-03-28
description: "Demonstrating code syntax highlighting with multiple programming languages including JavaScript, Python, Go, and Rust."
draft: false
tags: ["code", "tutorial", "syntax-highlighting"]
category: "development"
---

This post demonstrates the code syntax highlighting capabilities of this blog. All code blocks use the VS Code Dark+ theme for a consistent developer experience.

## JavaScript Example

Here's a modern JavaScript async/await pattern for fetching data:

```javascript
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
}

// Usage
const user = await fetchUserData(123);
console.log(user.name);
```

## Python Example

A Python class demonstrating type hints and data validation:

```python
from dataclasses import dataclass
from typing import Optional
from datetime import datetime

@dataclass
class Post:
    title: str
    content: str
    author: str
    created_at: datetime
    tags: list[str] = field(default_factory=list)
    draft: bool = False

    def publish(self) -> None:
        if self.draft:
            self.draft = False
            print(f"Published: {self.title}")

    @property
    def is_published(self) -> bool:
        return not self.draft

# Example usage
post = Post(
    title="Hello World",
    content="My first post",
    author="dev",
    created_at=datetime.now()
)
```

## Go Example

A Go HTTP server with graceful shutdown handling:

```go
package main

import (
    "context"
    "fmt"
    "net/http"
    "os"
    "os/signal"
    "syscall"
    "time"
)

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello, World!")
    })

    server := &http.Server{
        Addr:    ":8080",
        Handler: mux,
    }

    // Start server in goroutine
    go func() {
        fmt.Println("Server starting on :8080")
        if err := server.ListenAndServe(); err != http.ErrServerClosed {
            fmt.Printf("Server error: %v\n", err)
        }
    }()

    // Wait for interrupt signal
    quit := make(chan os.Signal, 1)
    signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
    <-quit

    fmt.Println("Shutting down server...")

    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()

    if err := server.Shutdown(ctx); err != nil {
        fmt.Printf("Server forced to shutdown: %v\n", err)
    }

    fmt.Println("Server exited")
}
```

## Rust Example

A Rust implementation of a simple thread-safe counter:

```rust
use std::sync::Arc;
use std::thread;
use std::sync::Mutex;

struct Counter {
    count: u64,
}

impl Counter {
    fn new() -> Self {
        Counter { count: 0 }
    }

    fn increment(&mut self) {
        self.count += 1;
    }

    fn get(&self) -> u64 {
        self.count
    }
}

fn main() {
    let counter = Arc::new(Mutex::new(Counter::new()));
    let mut handles = vec![];

    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut counter = counter.lock().unwrap();
            counter.increment();
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Final count: {}", counter.lock().unwrap().get());
}
```

## Conclusion

The syntax highlighting makes reading code much easier, especially for complex examples. The VS Code Dark+ theme provides excellent contrast and familiar coloring for developers.
