
## Introduction

> *CPU power is rarely a limiting factor for these applications—bigger problems are*
*usually the amount of data, the complexity of data, and the speed at which it is*
*changing.*
> 

A data-intensive application is typically constructed from standard building blocks, which often include the following components and common tools:

- **Data Storage**: Databases for storing data, such as MySQL and MongoDB.
- **Read Optimization**: Caches to speed up data reads, such as Redis and Memcached.
- **Data Search**: Search indexes for efficient data retrieval, such as Elastic search and Apache Solr.
- **Asynchronous Messaging**: Stream processing for sending messages to other processes asynchronously, such as Apache Kafka and RabbitMQ.
- **Data Processing**: Batch processing for periodically crunching data, such as Apache Hadoop (HDFS) and Apache Spark.

<aside>
💡 How many CPU cycles do we need to access data?

- L1 Cache: 10
- Main Memory: 100
- Mechanical Hard Disk: 1M
</aside>

---

## Key Concerns in Designing Data-Intensive Systems

> *When designing a robust and efficient data-intensive system, we must address three primary concerns: reliability, scalability, and maintainability*
> 

### Reliability

Reliability in a data-intensive system means ensuring the system continues to function correctly even when faults occur. Faults can arise from hardware failures, software bugs, or human errors, and the system must be designed to handle these gracefully.

<aside>
💡 **Fault vs Failure**

- Fault: temporary or permanent deviations of a system component from its expected
- Failure: the system as a whole stops providing the required service to the user
</aside>

1. Hardware Failure
    - In a data center with millions of hard disks, where the mean time to failure (MTTF) of a hard disk is around 10 to 50 years, we can expect on average that more than one disk will fail every day.
        
        ![Untitled](Chapter%201%20Reliable,%20Scalable,%20and%20Maintainable%20App%20aead798de61e401bbab7405bb9bd939f/Untitled.png)
        
    - When there is a power outage, we may have batteries and diesel generators for backup power
    - Servers may have dual power supplies and hot-swappable CPUs
2. Software Errors
    
    A software bug that causes every instance of an application server to crash, such as the issue experienced with CrowdStrike.
    
3. Human Errors
    - Design for Fewer Errors
        - Careful Design: Create interfaces that guide correct use but aren’t overly restrictive
        - Separate Risks: Isolate error-prone areas from critical functions. Use safe test environments
        - Thorough Testing: Apply unit, integration, and automated tests to catch issues
    - Boost Reliability
        - Easy Recovery: Simplify rollback, gradual updates, and data recomputation.
        - Effective Monitoring: Track performance and errors to spot and diagnose issues early.
        - Strong Management: Use good management and training practices.

### Scalability

> *A scalable system should handle increased load with minimal performance degradation*
> 
- Describing performance (quantify system load)
    - In a batch processing system such as Hadoop, we usually care about *throughput*, or the number of records we can process per second.
    - In a real-time system, such as a streaming platform, we often focus on *latency*, or the time it takes to process a single record from ingestion to output.
    - For web applications, *response time* is key, measuring how quickly the system responds to user requests.
    - In databases, *transaction throughput* and *query performance* are crucial, indicating how many transactions or queries can be handled per unit of time and how quickly individual queries are processed.
- Twitter Example
    
    [Design Twitter - LeetCode](https://leetcode.com/problems/design-twitter/)
    
    - Main Operations
        - Post Tweet: Users publish messages to their followers (4.6k requests/sec, peaking over 12k requests/sec).
        - Home Timeline: Users view tweets from people they follow (300k requests/sec).
    - Possible Solutions
        1. **Global Collection**
            - Posting a tweet adds it to a global collection.
            - To display a user's home timeline, fetch tweets from users they follow and merge them, typically using a SQL JOIN.
            - **Challenge**: Systems struggled with the high load of home timeline queries.
        2. **User-Specific Caches**
            - Maintain a cache for each user’s home timeline.
            - When a tweet is posted, update the home timeline caches of all followers.
            - **Challenge**: Posting a tweet involves updating potentially millions of caches, especially for users with large followings.
    - **Current Approach:** Twitter uses a hybrid model
        
        > This hybrid approach balances the load of tweet publishing and home timeline retrieval
        > 
        - Continue fanning out tweets to most home timelines.
        - For users with very large followings, fetch their timelines separately and merge them when accessed, similar to Approach 1.

- **Approaches for coping with load**
    
    > *Since transitioning a stateful data system from a single node to a distributed setup adds significant complexity, it is generally advised to keep your database on a single node (vertical scaling) until scaling costs or high-availability requirements necessitate a distributed approach.*
    > 
    - Scaling up (vertical scaling): Moving to a more powerful machine
    - Scaling out (horizontal scaling): Distributing the load across multiple smaller machines
    - Elastic systems: Automatically add computing resources when detected load increase. Quite useful if load is unpredictable.
        
        ![Untitled](Chapter%201%20Reliable,%20Scalable,%20and%20Maintainable%20App%20aead798de61e401bbab7405bb9bd939f/Untitled%201.png)
        

### Maintainability

Ongoing software maintenance is a significant cost. Focus on these design principles:

- **Operability**: Make it easy for operations teams to keep the system running
    - Monitoring and restoring services promptly
    - Diagnosing and resolving issues
    - Anticipating and addressing future problems
- **Simplicity**: Simplify the system for easier understanding by new engineers
    - Reducing accidental complexity not related to the core problem
    - Using abstractions and clean APIs to simplify understanding and maintenance
- **Evolvability**: Ensure the system can be easily updated and modified in the future
    - Facilitate change by adopting agile practices for adaptability

---

### Appendix: Microsoft Azure Storage redundancy

- Locally redundant storage (11 nines)

![Untitled](Chapter%201%20Reliable,%20Scalable,%20and%20Maintainable%20App%20aead798de61e401bbab7405bb9bd939f/Untitled%202.png)

- Zone-redundant storage (12 nines)

![Untitled](Chapter%201%20Reliable,%20Scalable,%20and%20Maintainable%20App%20aead798de61e401bbab7405bb9bd939f/Untitled%203.png)

- Geo-redundant storage (16 nines)
    
    ![Untitled](Chapter%201%20Reliable,%20Scalable,%20and%20Maintainable%20App%20aead798de61e401bbab7405bb9bd939f/Untitled%204.png)
    
- Geo-zone-redundant storage (16 nines)
    
    ![Untitled](Chapter%201%20Reliable,%20Scalable,%20and%20Maintainable%20App%20aead798de61e401bbab7405bb9bd939f/Untitled%205.png)