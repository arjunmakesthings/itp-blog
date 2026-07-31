---
date: 2026-07-31
tags:
  - experiments
noteOrder: "411"
draft: "false"
---
following [crafting interpreters](https://craftinginterpreters.com), by robert nystrom. recommended by [[nikolai]] & [[ty overby]] at [[recurse-center]]. work done is in this repo: https://github.com/arjunmakesthings/crafting-interpreters

---

# scanning: 
from a file provided, we take all the bytes and covert them into strings: 

``` java
    private static void run_file(String path) throws IOException {
        System.out.println("file: " + path); 
        byte[] bytes = Files.readAllBytes(Paths.get(path));
        System.out.println("raw bytes: " + bytes);
        System.out.println("bytes -> string: " + new String (bytes, Charset.defaultCharset()));
        run(new String(bytes, Charset.defaultCharset()));

        // if there's an error, indicate in the exit code:
        if (had_error)
            System.exit(65);
    }
```

^: 

``` txt
file: test.lox
raw bytes: [B@8bcc55f
bytes -> string: var a = 5;

```

