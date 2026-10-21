---
date: 2026-10-20
tags:
  - lectures
noteOrder: "547"
draft: "false"
---
processes running already on a droplet: 

``` zsh
root           1  0.0  2.3  22584 10928 ?        Ss   Oct07   2:55 /usr/lib/systemd/systemd --system --deserialize=77
root           2  0.0  0.0      0     0 ?        S    Oct07   0:00 [kthreadd]
root           3  0.0  0.0      0     0 ?        S    Oct07   0:00 [pool_workqueue_release]
root           4  0.0  0.0      0     0 ?        I<   Oct07   0:00 [kworker/R-rcu_g]
root           5  0.0  0.0      0     0 ?        I<   Oct07   0:00 [kworker/R-rcu_p]
root           6  0.0  0.0      0     0 ?        I<   Oct07   0:00 [kworker/R-slub_]
root           7  0.0  0.0      0     0 ?        I<   Oct07   0:00 [kworker/R-netns]
root          12  0.0  0.0      0     0 ?        I<   Oct07   0:00 [kworker/R-mm_pe]
root          13  0.0  0.0      0     0 ?        I    Oct07   0:00 [rcu_tasks_kthread]
root          14  0.0  0.0      0     0 ?        I    Oct07   0:00 [rcu_tasks_rude_kthread]
root          15  0.0  0.0      0     0 ?        I    Oct07   0:00 [rcu_tasks_trace_kthread]
root          16  0.0  0.0      0     0 ?        S    Oct07   0:42 [ksoftirqd/0]
root          17  0.0  0.0      0     0 ?        I    Oct07   1:07 [rcu_preempt]
root          18  0.0  0.0      0     0 ?        S    Oct07   0:08 [migration/0]
root          19  0.0  0.0      0     0 ?        S    Oct07   0:00 [idle_inject/0]
root          20  0.0  0.0      0     0 ?        S    Oct07   0:00 [cpuhp/0]
root          21  0.0  0.0      0     0 ?        S    Oct07   0:00 [kdevtmpfs]
root          22  0.0  0.0      0     0 ?        I<   Oct07   0:00 [kworker/R-inet_]
root          23  0.0  0.0      0     0 ?        S    Oct07   0:00 [kauditd]
root          24  0.0  0.0      0     0 ?        S    Oct07   0:00 [khungtaskd]
root          26  0.0  0.0      0     0 ?        S    Oct07   0:00 [oom_reaper]
root          28  0.0  0.0      0     0 ?        I<   Oct07   0:00 [kworker/R-write]
root          29  0.0  0.0      0     0 ?        S    Oct07   1:16 [kcompactd0]
root          30  0.0  0.0      0     0 ?        SN   Oct07   0:00 [ksmd]
root          31  0.0  0.0      0     0 ?        I<   Oct07   0:00 [kworker/R-kinte]
root          32  0.0  0.0      0     0 ?        I<   Oct07   0:00 [kworker/R-kbloc]
root          33  0.0  0.0      0     0 ?        I<   Oct07   0:00 [kworker/R-blkcg]
root          34  0.0  0.0      0     0 ?        S    Oct07   0:00 [irq/9-acpi]
root          35  0.0  0.0      0     0 ?        I<   Oct07   0:00 [kworker/R-tpm_d]
root          36  0.0  0.0      0     0 ?        I<   Oct07   0:00 [kworker/R-ata_s]
root          37  0.0  0.0      0     0 ?        I<   Oct07   0:00 [kworker/R-md]
root          38  0.0  0.0      0     0 ?        I<   Oct07   0:00 [kworker/R-md_bi]
root          39  0.0  0.0      0     0 ?        I<   Oct07   0:00 [kworker/R-edac-]
root          40  0.0  0.0      0     0 ?        I<   Oct07   0:00 [kworker/R-devfr]
root          41  0.0  0.0      0     0 ?        S    Oct07   0:00 [watchdogd]
root          42  0.0  0.0      0     0 ?        I<   Oct07   0:00 [kworker/R-quota]
root          44  0.0  0.0      0     0 ?        S    Oct07  18:56 [kswapd0]
root          45  0.0  0.0      0     0 ?        S    Oct07   0:00 [ecryptfs-kthread]
root          46  0.0  0.0      0     0 ?        I<   Oct07   0:00 [kworker/R-kthro]
root          47  0.0  0.0      0     0 ?        I<   Oct07   0:00 [kworker/R-acpi_]
root          48  0.0  0.0      0     0 ?        S    Oct07   0:00 [scsi_eh_0]
root          49  0.0  0.0      0     0 ?        I<   Oct07   0:00 [kworker/R-scsi_]
root          50  0.0  0.0      0     0 ?        S    Oct07   0:00 [scsi_eh_1]
root          51  0.0  0.0      0     0 ?        I<   Oct07   0:00 [kworker/R-scsi_]
root          52  0.0  0.0      0     0 ?        S    Oct07   0:00 [scsi_eh_2]
root          53  0.0  0.0      0     0 ?        I<   Oct07   0:00 [kworker/R-scsi_]
root          56  0.0  0.0      0     0 ?        I<   Oct07   0:00 [kworker/R-mld]
root          57  0.0  0.0      0     0 ?        I<   Oct07   0:00 [kworker/R-ipv6_]
root          64  0.0  0.0      0     0 ?        I<   Oct07   0:00 [kworker/R-kstrp]
root          66  0.0  0.0      0     0 ?        I<   Oct07   0:00 [kworker/u3:0]
root          71  0.0  0.0      0     0 ?        I<   Oct07   0:00 [kworker/R-crypt]
root          81  0.0  0.0      0     0 ?        I<   Oct07   0:00 [kworker/R-charg]
root         163  0.0  0.0      0     0 ?        I<   Oct07   0:00 [kworker/R-raid5]
root         203  0.0  0.0      0     0 ?        S    Oct07   0:12 [jbd2/vda1-8]
root         204  0.0  0.0      0     0 ?        I<   Oct07   0:00 [kworker/R-ext4-]
root         303  0.0  0.0      0     0 ?        I<   Oct07   0:00 [kworker/R-kmpat]
root         304  0.0  0.0      0     0 ?        I<   Oct07   0:00 [kworker/R-kmpat]
root         403  0.0  0.0      0     0 ?        S    Oct07   0:00 [jbd2/vda16-8]
root         404  0.0  0.0      0     0 ?        I<   Oct07   0:00 [kworker/R-ext4-]
root         799  0.0  0.5   7228  2360 ?        Ss   Oct07   0:04 /usr/sbin/cron -f -P
message+     800  0.0  0.9  10064  4632 ?        Ss   Oct07   0:10 @dbus-daemon --system --address=systemd: --nofork --no
root         803  0.0  0.5 1265124 2504 ?        Ssl  Oct07   0:05 /opt/digitalocean/bin/droplet-agent
root         853  0.0  1.6  19092  7736 ?        Ss   Oct07   0:04 /usr/lib/systemd/systemd-logind
root         965  0.0  2.6 110036 12616 ?        Ssl  Oct07   0:00 /usr/bin/python3 /usr/share/unattended-upgrades/unatte
root        1011  0.0  0.3   6152  1832 ttyS0    Ss+  Oct07   0:00 /sbin/agetty -o -p -- \u --keep-baud 115200,57600,3840
root        1015  0.0  0.3   6108  1764 tty1     Ss+  Oct07   0:00 /sbin/agetty -o -p -- \u --noclear - linux
non-root    1040  0.0  1.0  20056  5060 ?        Ss   Oct07   0:00 /usr/lib/systemd/systemd --user --deserialize=8
non-root    1041  0.0  0.5  21168  2716 ?        S    Oct07   0:00 (sd-pam)
root        1157  0.0  0.0      0     0 ?        I<   Oct07   0:00 [kworker/R-tls-s]
non-root    6486  0.0 11.0 1265008 51988 ?       Ssl  Oct07   5:34 PM2 v7.0.4: God Daemon (/home/non-root/.pm2)
root       17537  0.0  0.0      0     0 ?        I<   Oct07   0:27 [kworker/0:2H-kblockd]
root       19997  0.0  0.0      0     0 ?        I<   Oct07   0:01 [kworker/0:1H-kblockd]
systemd+  246049  0.0  0.9  19028  4496 ?        Ss   Oct15   0:00 /usr/lib/systemd/systemd-networkd
root      246059  0.0 13.0 128364 61144 ?        S<s  Oct15   1:55 /usr/lib/systemd/systemd-journald
systemd+  246124  0.0  1.0  91036  4776 ?        Ssl  Oct15   0:02 /usr/lib/systemd/systemd-timesyncd
root      246186  0.0  1.1  25956  5552 ?        Ss   Oct15   0:00 /usr/lib/systemd/systemd-udevd
root      246187  0.0  0.0      0     0 ?        S    Oct15   0:00 [psimon]
systemd+  246250  0.0  1.4  21720  6680 ?        Ss   Oct15   0:01 /usr/lib/systemd/systemd-resolved
root      249923  0.0  5.7 223424 27168 ?        SLsl Oct15   0:46 /sbin/multipathd -d -s
root      249935  0.0  1.6 468976  7528 ?        Ssl  Oct15   0:07 /usr/libexec/udisks2/udisksd
polkitd   249939  0.0  1.1 308180  5268 ?        Ssl  Oct15   0:10 /usr/lib/polkit-1/polkitd --no-debug
root      249956  0.0  0.3  11168  1688 ?        Ss   Oct15   0:00 nginx: master process /usr/sbin/nginx -g daemon on; ma
www-data  249957  0.0  0.9  13024  4584 ?        S    Oct15   0:06 nginx: worker process
root      249971  0.0  1.5 392100  7428 ?        Ssl  Oct15   0:00 /usr/sbin/ModemManager
syslog    249980  0.0  1.2 222516  5708 ?        Ssl  Oct15   0:25 /usr/sbin/rsyslogd -n -iNONE
root      250501  0.0  0.0      0     0 ?        S    Oct15   0:00 [psimon]
root      250743  0.0  3.3 573216 15640 ?        Ssl  Oct15   0:21 /usr/libexec/fwupd/fwupd
root      251152  0.0  1.0  12152  4844 ?        Ss   Oct15   0:39 sshd: /usr/sbin/sshd -D [listener] 2 of 10-100 startup
root      362636  0.0  0.0      0     0 ?        I    14:20   0:02 [kworker/0:2-cgroup_free]
root      362690  0.0  0.0      0     0 ?        I    14:28   0:00 [kworker/u2:1-events_power_efficient]
root      363005  0.0  0.0      0     0 ?        I    14:40   0:00 [kworker/u2:2-events_unbound]
root      363233  0.1  0.0      0     0 ?        I    14:50   0:02 [kworker/0:1-events]
root      363525  0.0  0.0      0     0 ?        I    15:00   0:00 [kworker/u2:3-events_unbound]
root      364060  0.0  0.0      0     0 ?        I    15:15   0:00 [kworker/u2:4-events_unbound]
root      364160  0.0  0.0      0     0 ?        I    15:20   0:00 [kworker/0:0]
root      364242  0.5  2.2  14940 10620 ?        Ss   15:23   0:00 sshd: non-root [priv]
root      364244  0.0  2.0  14680  9852 ?        Ss   15:23   0:00 sshd: unknown [priv]
sshd      364245  0.0  1.3  12156  6272 ?        S    15:23   0:00 sshd: unknown [net]
root      364247  0.2  1.7  12156  8440 ?        Ss   15:23   0:00 sshd: [accepted]
non-root  364248  0.6  1.5  14940  7124 ?        S    15:23   0:00 sshd: non-root@pts/0
non-root  364249  0.8  1.1   9064  5404 pts/0    Ss   15:23   0:00 -bash
sshd      364256  0.0  1.2  12156  6056 ?        S    15:23   0:00 sshd: [net]
non-root  364258  0.0  0.9  11328  4408 pts/0    R+   15:23   0:00 ps aux

```

config for all directories: 

``` zsh
ls /etc/

```

