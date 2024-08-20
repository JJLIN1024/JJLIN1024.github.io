# Chapter 3: Storage and Retrieval

<aside>
📖 Databases need to do two things: store the data and give the data back to you. As a software developer, we only need to select a storage engine that is appropriate for your application

</aside>

## Log-Structured Storage Engines

### Simplest DB: append-only data file

- Many databases use a *log*, which is append-only data file.
- Real databases have more issues to deal with
    1. concurrency control
    2. maintaining disk space so the log doesn't grow forever
    3. handling errors and partially written records

```bash
#!/bin/bash
db_set () {
        echo "$1,$2" >> database
}
db_get () {
        grep "^$1," database | sed -e "s/^$1,//" | tail -n 1
}
```

```bash
jjlin@linjiajiadeMacBook-Air ~ % db_set jimmy lin
jjlin@linjiajiadeMacBook-Air ~ % db_set henhen stupid
jjlin@linjiajiadeMacBook-Air ~ % db_get jimmy
lin
jjlin@linjiajiadeMacBook-Air ~ % db_get j
jjlin@linjiajiadeMacBook-Air ~ % db_get henhen
stupid
jjlin@linjiajiadeMacBook-Air ~ % db_set henhen stupid
jjlin@linjiajiadeMacBook-Air ~ % cat database
jimmy,lin
henhen,stupid
henhen,stupid
```

- Pros: This append-only data file has the fastest write operations(sequential, append at the end)
- Cons: Slow read operations (# of records are huge; have to scan from scratch)

<aside>
💡 How can we improve read performance?

- Add an index to efficiently locate values associated with specific keys.
- An *index* is an additional data structure built from the primary dataset.
- Carefully selected indexes can significantly speed up read queries, but be aware that each index introduces some overhead, which can slow down write operations (nothing beats the speed of simply appending to a file).
</aside>

### Hash Indexes

- Speed up read operations by using a hash table that maps each key to a byte offset in the data file
- Keep in mind that the hash table must fit within RAM; otherwise, disk I/O will be needed to locate the corresponding byte offset, which can slow down performance
    
    ![截圖 2024-07-25 上午9.57.30.png](Chapter%203%20Storage%20and%20Retrieval%208a7a15e0104c4cb4981391e7c13d38c6/%25E6%2588%25AA%25E5%259C%2596_2024-07-25_%25E4%25B8%258A%25E5%258D%25889.57.30.png)
    

<aside>
❓ **When will this solution fail?**

- When there are too many distinct keys to fit in memory
- For example, in a system that generates short URLs, the number of unique keys can grow rapidly
- Once the hash table exceeds available RAM, it will rely on slower disk I/O for lookups, which can degrade performance
</aside>

### Compaction

<aside>
❓ What if the total size of the data exceeds that of the Disk?

- We can perform compaction and merging of the data
</aside>

1. When writing data to the disk, we first break data into variable-sized segments, and perform data compaction in a single segment to save space on disk.
2. Compaction in a single segment is intuitive, as the following diagram illustrates, simply merge the data with the same key, and leave only the newest one:
    
    ![截圖 2024-07-25 上午10.01.31.png](Chapter%203%20Storage%20and%20Retrieval%208a7a15e0104c4cb4981391e7c13d38c6/%25E6%2588%25AA%25E5%259C%2596_2024-07-25_%25E4%25B8%258A%25E5%258D%258810.01.31.png)
    
3. After a segment is compacted, we can follow the same process and merge two segment into a new one:
    
    ![截圖 2024-07-25 上午10.02.42.png](Chapter%203%20Storage%20and%20Retrieval%208a7a15e0104c4cb4981391e7c13d38c6/%25E6%2588%25AA%25E5%259C%2596_2024-07-25_%25E4%25B8%258A%25E5%258D%258810.02.42.png)
    

### Implementation Details

- **Delete Operation**
    - Use a tombstone (a special deletion record) to mark records for deletion, and remove them during the compaction process
- **Crash Recovery**
    - Store a snapshot of the hash table on disk and reload it upon machine restart
- **Preventing Partial Writes**
    - Implement data checksums to detect and prevent partial writes
- **Concurrency Control**
    - Allow only one write thread, while permitting multiple read threads for improved concurrency

The append-only file approach is fast because sequential writes are quicker on disk compared to random writes. Additionally, since the append-only format inherently includes time-series encoding, concurrency control and crash recovery are much simpler.

However, this approach has some drawbacks:

- The hash table must fit entirely in memory
- Range queries are slow, as they require scanning all data (e.g., summing values for keys within a range like 10 to 1000)

---

## Sorting String Table(SSTables) and Log-Structured Merge-Tree(LSM-Tree)

- Range query in an append-only data file is slow, what can we do to speed it up?
    
    → You can combine it with binary search, and what you get is SSTables.
    
- In SSTables, in each segment, the key is sorted, and in each merged segment, each key only appears once.
- The merge process is similar to that of a classic merge sort(keep the value from the most recent segment, assume we always merge adjacent segments).
    
    ![截圖 2024-07-25 上午10.23.21.png](Chapter%203%20Storage%20and%20Retrieval%208a7a15e0104c4cb4981391e7c13d38c6/%25E6%2588%25AA%25E5%259C%2596_2024-07-25_%25E4%25B8%258A%25E5%258D%258810.23.21.png)
    
- There’s no need to keep the whole hash table in memory anymore since the key value is sorted, this enables us to only keep a small set of it, which means the index is sparse.
- Due to the fact that the index is sparse, a read query has to scan over several keys in a given range, thus, we can compress the chunk and then write it to disk, which not only saves disk space but also reduces the I/O bandwidth used.
    
    ![截圖 2024-07-25 上午10.26.59.png](Chapter%203%20Storage%20and%20Retrieval%208a7a15e0104c4cb4981391e7c13d38c6/%25E6%2588%25AA%25E5%259C%2596_2024-07-25_%25E4%25B8%258A%25E5%258D%258810.26.59.png)
    
- How to maintain sorted in-memory key values? We can use any self-balanced binary search tree (AVL, Red-Black tree, etc.):
    1. Write key-value pair to RAM’s balanced binary tree
    2. When the tree size exceed pre-defined threshold, write it to disk. At the same time, we can continue writing data to RAM’s balanced binary tree.
    3. When we want to read some data, first search its key in the RAM, and then the first segment on disk, and so on.
    4. Perform merging in the background from time to time
- SSTalbes had its drawback: when the database crash, the tree in RAM is lost.
    
    → To remedy this, we can keep a write log on disk, use the log to restore in RAM’s tree (memtable).
    
- DB that uses the concept of SSTables typically called Log Structured-Merge Tree, such kind of DB includes LevelDB, RocksDB.
    
    > [https://leveldb-handbook.readthedocs.io/zh/latest/sstable.html](https://leveldb-handbook.readthedocs.io/zh/latest/sstable.html)
    > 

<aside>
💡 如我們之前提到的，leveldb是典型的LSM樹(Log Structured-Merge Tree)實現，即一次leveldb 的寫入過程並不是直接將資料持久化到磁碟檔案中，而是將寫入作業先寫入日誌檔案中，其次將寫入操作應用在memtable上。

當 leveldb 達到 checkpoint 點（memtable中的資料量超過了預設的閾值），會將目前memtable 凍結成一個不可更改的記憶體資料庫（immutable memory db），並且建立一個新的 memtable 供系統繼續使用。

immutable memory db會在背景進行一次minor compaction，將記憶體資料庫中的資料持久化到磁碟檔案。

</aside>

### Compaction Strategy

Different timing of SSTables compaction will affect its read and write performance

1. size-tiered compaction → HBase, Cassandra
    1.  triggered when the system has enough (four by default) similarly sized SSTables.
    - picture
        
        ![image.png](Chapter%203%20Storage%20and%20Retrieval%208a7a15e0104c4cb4981391e7c13d38c6/image.png)
        
        ![image.png](Chapter%203%20Storage%20and%20Retrieval%208a7a15e0104c4cb4981391e7c13d38c6/image%201.png)
        
    - Good Write Amplification, Good Space Amplification, Bad Read Amplification
2. leveled compaction → LevelDB, RocksEB, Cassandra
    1. the system uses small, fixed-size (by default 160 MB) SSTables distributed across different levels.
    - picture
        
        ![image.png](Chapter%203%20Storage%20and%20Retrieval%208a7a15e0104c4cb4981391e7c13d38c6/image%202.png)
        
    - Bad Write Amplification, Bad Space Amplification, Good Read Amplification

> https://opensource.docs.scylladb.com/stable/architecture/compaction/compaction-strategies.html
> 

<aside>
📎 The key difference between the two strategies is that leveled compaction tends to aggressively merge a smaller sorted run into a larger one, while "tiered" waits for several sorted runs with similar size and merge them together.

It is generally regarded that the second strategy provides far better write amplification with worse read amplification. 

An intuitive way to think about it: in tiered storage, every time an update is compacted, it tends to be moved from a smaller sorted run to a much larger one. Every compaction is likely to make the update exponentially closer to the final sorted run, which is the largest. 

In leveled compaction, however, an update is compacted more as a part of the larger sorted run where a smaller sorted run is merged into, than as a part of the smaller sorted run. As a result, in most of the times an update is compacted, it is not moved to a larger sorted run, so it doesn't make much progress towards the final largest run.

</aside>

> https://github.com/facebook/rocksdb/wiki/universal-compaction
> 

### Bloom Filters

LST-Tree Algorithm is slow when looking up a key that does not exist since we’re gonna have to check all segments, which means possibly reading them all back from the disk. This is where bloom filters come into play since bloom filters can guarantee us the key does not exist. 

- What is Bloom Filters
    
    [https://youtu.be/qZNJTh2NEiU?si=YfczhhPQWqz__z3T](https://youtu.be/qZNJTh2NEiU?si=YfczhhPQWqz__z3T)
    
    [https://youtu.be/kfFacplFY4Y?si=KSc1mzbVrGWZT5Yv](https://youtu.be/kfFacplFY4Y?si=KSc1mzbVrGWZT5Yv)
    

## B-Trees

The most commonly used index is not SSTables, but B-Tress. B-Trees updates the keys, while LSM-Trees append the keys and then compacts them.

While SSTable stores data in variable-size segments(typically several megabytes), B-Tree stores data in fixed-size blocks or pages, traditionally 4KB in size

B-Trees are designed for fast comparison(branching) in CPU, and low I/O for disk(hence multiple entries in a single node).

- What is B-Trees
    
    [https://www.geeksforgeeks.org/introduction-of-b-tree-2/](https://youtu.be/K1a2Bk8NrYQ?si=4toy0fEEcJwGZCQP)
    
    [https://youtu.be/K1a2Bk8NrYQ?si=4toy0fEEcJwGZCQP](https://youtu.be/K1a2Bk8NrYQ?si=4toy0fEEcJwGZCQP)
    

![截圖 2024-07-25 下午1.28.18.png](Chapter%203%20Storage%20and%20Retrieval%208a7a15e0104c4cb4981391e7c13d38c6/%25E6%2588%25AA%25E5%259C%2596_2024-07-25_%25E4%25B8%258B%25E5%258D%25881.28.18.png)

B-tree implementations includes a additional data structure on disk: write-ahead log(WAL), which is a append-only file to which every B-tree modification must be written before it can be applied to the pages of the tree itself.

B-tree solves the concurrency issue with protecting the tree with latches(lightweight locks).

> https://catkang.github.io/2022/01/27/btree-lock.html?spm=a2c6h.13046898.publish-article.32.65f86ffaNeaCYy
> 

For B-tree, it's hard to keep adjacent leaf pages appearing in sequential order on disk, while this is easy for LSM-trees.

## B-trees v.s. LSM-trees

LSM-trees are typically faster for writes, whereas B-trees are thought to be faster for reads.

Since LSM-trees sequentially write compact SSTable files while B-tree overwrite several pages(random write), LSM-trees typically have higher write throughput(especially on magnetic hard drives, where sequential write is much faster than random writes)

LSM-trees has lower storage overheads due to periodically rewrite SSTables and no page fragmentation.

The downside of LSM-trees is its background compacting job because it occupies disk bandwidth and may interfere with incoming write operations.

## Full-text Search and Fuzzy Index

A SSTable-like structure is used for its term dictionary. The in-memory index is a finite state automaton over the characters in the keys, similar to a trie, which is transformed into Levenshtein automaton.

## OLTP & OLAP

OLTP & OLAP have different access patterns for data, the indexing algorithm covered so far works well for OLTP but not OLAP, which has very different data access patterns.

![截圖 2024-08-11 下午2.29.41.png](Chapter%203%20Storage%20and%20Retrieval%208a7a15e0104c4cb4981391e7c13d38c6/%25E6%2588%25AA%25E5%259C%2596_2024-08-11_%25E4%25B8%258B%25E5%258D%25882.29.41.png)

Extract-Transform-Load(EFL): From OLTP(Online Transaction Processing) System to OLAP(Online Analytic Processing) System.

![截圖 2024-07-27 中午12.46.50.png](Chapter%203%20Storage%20and%20Retrieval%208a7a15e0104c4cb4981391e7c13d38c6/%25E6%2588%25AA%25E5%259C%2596_2024-07-27_%25E4%25B8%25AD%25E5%258D%258812.46.50.png)

## Star Schema

To efficiently process data in an OLAP system, the star schema(or snowflake schema) and fact table is applied.

![截圖 2024-08-11 下午2.31.18.png](Chapter%203%20Storage%20and%20Retrieval%208a7a15e0104c4cb4981391e7c13d38c6/%25E6%2588%25AA%25E5%259C%2596_2024-08-11_%25E4%25B8%258B%25E5%258D%25882.31.18.png)

pauquet column-oriented storage