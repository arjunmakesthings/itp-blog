---
date: 2026-04-01
tags:
  - wip
  - writings
noteOrder: "298"
draft: "false"
---
writing draft for a note i want to publish: 

---

since 2021, i've produced a lot of work. most of it was haphazardly organized — and some of it lost — until i developed a meticulous system to archive work. this is that system:

work always starts locally, and each engagement usually lasts more than a few months. so, an engagement becomes a folder — /yy-yy_name — i.e: *26-27_itp*. this allows me to later access my work chronologically. 

each folder has sub-folders, usually for different projects made during the engagement. they are usually numbered — ./xx_name — i.e: *./1_vusearchbar*. this, again, allows me to access my work chronologically. 

sub-folders can be often messy. however, at the end of each project, i try to make time to organize files into one of two folders: 
- ././raw-files
- ././outputs
- ././media

work that i wish to make publicly-viewable has to be archived on my [website](https://arjunmakesthings.github.io). each project / note / teaching-activity has a separate folder — ././yyyy/title — i.e: *2021_dear-delhi*. this contains all media files (converted to .webp from my local 'outputs' folder), a write-up on page.html, and any other files that must be publicly-accessible (.pdfs, .txts, etc.). if code is meant to be shared, a folder called 'code' also exists inside. however, for accessibility, i make sure to make a new github-repository for each project, and redirect people there via the contents on page.html. 

all local folders (including github-repositories) are also backed up externally on password-protected portable ssds. mac-os is terrible at syncing between different volumes unless you use time-machine (and will often skip contents inside sub-folders, unless you copy-paste the whole thing again). since folders can be big in size, i use a built-in package called rsync instead. 

rsync allows you to sync files and directories between two hosts or machines. it works like so: 

``` zsh
rsync -avh /* host-directory */SPACE/* remote-directory */

```

using --progress will show you the progress as well. so, an actual script would look like this: 

``` zsh
rsync -avh --progress ~/data/github/ /Volumes/arjuns_itp/github/
```

finally, the state of my machine is preserved with biweekly backups to a password-protected 2tb hdd that never leaves the house. for this, i use time-machine. 

the passwords are stored locally, and i use an encrypted [keepass-database](https://keepassxc.org) for it. in case my machine goes corrupt, the keepass-database also has an encrypted virtual copy. 