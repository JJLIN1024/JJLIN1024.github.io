# Chapter 4: Encoding and Evolution

## Introduction

First of all, what is encoding(serialization) and decoding(deserialization)?

According to Wiki:

<aside>
📎 In computing, **serialization** (or **serialization**) is the process of translating a [data structure](https://en.wikipedia.org/wiki/Data_structure) or [object](https://en.wikipedia.org/wiki/Object_(computer_science)) state into a format that can be stored (e.g. [files](https://en.wikipedia.org/wiki/Computer_file) in [secondary storage devices](https://en.wikipedia.org/wiki/Secondary_storage_devices), [data buffers](https://en.wikipedia.org/wiki/Data_buffer) in primary storage devices) or transmitted (e.g. [data streams](https://en.wikipedia.org/wiki/Data_stream) over [computer networks](https://en.wikipedia.org/wiki/Computer_networks)) and reconstructed later (possibly in a different computer environment).

</aside>

In short:

- Before serialization
    - Data exists as complex in-memory structures specific to a particular programming language or system.
- After serialization
    - Data is converted into a standardized format (like JSON, XML, or binary formats) that can be easily stored, transmitted, or understood by different systems.

<aside>
💡 Here the “Encoding”(or “serialization or “marshalling”) means transform data structures used in memory such as Red Black Tree  into a “sequence-of-bytes” in order to write data to file or send it over the network. The reverse process is called “decoding”(”parsing”, “deserialization”, or “unmarshalling”)

</aside>

Note that all data are represented as binary 0 and 1 before being sent across the network, and before transmission, binary 0 and 1 are encoded into different waveforms, this process is also called encoding.

## Language built-in encoding

- Java → java.io.Serializable, Python → pickle, Ruby → Marshal
- less efficient
- language lock-in
- lack of forward and backward compatibility

## JSON & XML & CSV

- textual format, human-readable, but not space-efficient
- https://github.com/nlohmann/json
- https://pkg.go.dev/encoding/json

## Binary Encoding

Binary encoding consumes less space compared to textual format, here are some example

### MessagePack

https://msgpack.org/

```json
{"henhen":"person","stupid":true}
```

This JSON object is encoded into the following byte stream:

```json
82 a6 68 65 6e 68 65 6e a6 70 65 72 73 6f 6e a6 73 74 75 70 69 64 c3
```

Let’s break it down:

- `82` means an object with 2 fields
- `a6` means a 6-byte long string
- `68 65 6e 68 65 6e` means `henhen`
- `a6` means a 6-byte long string
- `70 65 72 73 6f 6e` means `person`
- `a6` means a 6-byte long string
- `c3` means `true`

This byte stream only takes up 23 bytes, compared to the original 33 bytes JSON object, a 30% reduction in space.

Let’s look at another JSON object encoded using MessagePack:

```json
{
    "userName": "Martin",
    "favoriteNumber": 1337,
    "interests": ["daydreaming", "hacking"]
}
```

![截圖 2024-07-27 下午6.35.26.png](Chapter%204%20Encoding%20and%20Evolution%2014ab59405842411a8323022a410d429c/%25E6%2588%25AA%25E5%259C%2596_2024-07-27_%25E4%25B8%258B%25E5%258D%25886.35.26.png)

### Apache Thrift(Facebook)

Thrift requires schema for any data encoded, which can be defined using Thrift interface definition language (IDL).

```json
{
    "userName": "Martin",
    "favoriteNumber": 1337,
    "interests": ["daydreaming", "hacking"]
}
```

```scheme
struct Person {
	1: required string userName,
	2: optional i64 favoriteNumber, 
	3: optional list<string> interests
}
```

Thrift has two different binary encoding formats: Binary Protocol & Compact Protocol.

![截圖 2024-07-27 下午6.38.34.png](Chapter%204%20Encoding%20and%20Evolution%2014ab59405842411a8323022a410d429c/%25E6%2588%25AA%25E5%259C%2596_2024-07-27_%25E4%25B8%258B%25E5%258D%25886.38.34.png)

> Notice the field tag, which is defined in the schema
> 

![截圖 2024-07-27 下午6.39.49.png](Chapter%204%20Encoding%20and%20Evolution%2014ab59405842411a8323022a410d429c/%25E6%2588%25AA%25E5%259C%2596_2024-07-27_%25E4%25B8%258B%25E5%258D%25886.39.49.png)

> The field tag and type are packed into a single byte, which further decrease total bytes used, and also notice that instead of using 8 bytes to represent `1137`, `1137` is encoded using only 2 bytes.
> 

### Protocol Buffers(protocol buffer) (google)

Protocol Buffers are similar to that of Compact Protocol when it comes to encoding data.

```json
{
    "userName": "Martin",
    "favoriteNumber": 1337,
    "interests": ["daydreaming", "hacking"]
}
```

```scheme
message Person {
        required string user_name       = 1;
        optional int64  favorite_number = 2;
        repeated string interests       = 3;
}
```

![截圖 2024-07-27 下午6.40.01.png](Chapter%204%20Encoding%20and%20Evolution%2014ab59405842411a8323022a410d429c/%25E6%2588%25AA%25E5%259C%2596_2024-07-27_%25E4%25B8%258B%25E5%258D%25886.40.01.png)

> In protocol buffers, whether a field is marked required or optional does not affect the encoding, it simply act as a runtime check for catching bugs.
> 

## Protocol Buffers V.S. Thrift

- Protocol Buffers do not have a list or array datatypes, instead, it has a “repeated” marker for fields(which is a third option alongside “required” and “optional”)
- Thrift has a dedicated list datatype

## Schema Evolution

Schema will inevitably change over time. So there are two problems:

1. Forward Compatibility
    1. How does old code read new data generated by new schema?
2. Backward Compatibility
    1. How does new code read stored data generated by old schema?

Forward compatibility is simpler, when old code reads a field in the schema which it does not recognize, it simply ignore it.

Backward compatibility requires us programmers to be careful: when adding a new field, the new field must be marked as optional(or has a default value) but not required, because if it is marked as required, when new code reads the old record, it will fail to find the corresponding new field, and fails.

What about removing a field? Removing a field is just like adding a field, with backward and forward compatibility concerns reversed. That means you can only remove a field that is optional (a required field can never be removed), and you can never use the same tag number again (because you may still have data written somewhere that includes the old tag number, and that field must be ignored by new code).

## Apache Avro

![截圖 2024-08-11 晚上9.09.18.png](Chapter%204%20Encoding%20and%20Evolution%2014ab59405842411a8323022a410d429c/%25E6%2588%25AA%25E5%259C%2596_2024-08-11_%25E6%2599%259A%25E4%25B8%258A9.09.18.png)

a good fit for Hadoop

## Modes of Dataflow

Here we’re gonna investigate three different mode for sending and receiving data, simply put: who sends and receives data through services like protocol buffers.

### databases

process write data to database, essentially sending a message to the future self(or others)

![截圖 2024-07-27 晚上7.30.50.png](Chapter%204%20Encoding%20and%20Evolution%2014ab59405842411a8323022a410d429c/%25E6%2588%25AA%25E5%259C%2596_2024-07-27_%25E6%2599%259A%25E4%25B8%258A7.30.50.png)

we call this **data outlives code,** so be careful

### service calls(REST and RPC)

client & server

server can be a client to other services → service-oriented architecture(SOA) → microservices architecture

REST: a design philosophy that builds upon the principles of HTTP

SOAP: XML-based protocol

not human readable, relies on automate tooling, less common, less favorite by small companies

RPCs(Remote Procedure Calls)

https://github.com/twitter/finagle

https://github.com/linkedin/rest.li

https://grpc.io/

we can make a assumption that all servers will be updated first, and all the clients second, thus, you only need backward compatibility on requests, and forward compatibility on responses

it’s hard to force clients to upgrade(you have no control over them), so servers tends to maintain multiple versions of the service API

### asynchronous message passing

client’s request(message) is sent to a **message broker(message queue or message-oriented middleware),** and does not expected a response to this message(thus asynchronous)

https://www.rabbitmq.com/

https://activemq.apache.org/

https://nats.io/

https://kafka.apache.org/

client(a process) sends a message to a **named queue** or **topic**, and then the broker ensures that the message is delivered to one or more consumers of or subscribers to that queue or topic.

the consumer can send message to another queue

Actor Model: a programming model for concurrency in a single process

one actor communicates with other actors by sending and receiving asynchronous messages

distributed actor framework: Actor Model + message broker

https://akka.io/

https://learn.microsoft.com/en-us/dotnet/orleans/resources/best-practices

When to use RPC and when to use REST.