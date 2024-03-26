---
title: Containers
date: 2024-03-26
lastmod: 2024-03-26
author:
  - Jimmy Lin
tags: 
draft: false
---

```cpp
/*
序列式容器 ( Sequence containers ):
- 陣列 Array
- 向量 Vector
- 串列 List
- 雙端佇列 Deque

容器配接器 ( Sequence containers ):

- 堆疊 Stack
- 佇列 Queue

關聯性容器 ( Associative containers )

- 集合 Set
- 可重複集合 Multiset
- 映射 Map
- 可重複映射 Multimap
- 無排序關聯性容器 (Unordered associative containers)
- 無排序集合 Unordered_set
- 無排序可重複集合 Unordered_multiset
- 無排序映射 Unordered_map
- 無排序可重複映射 Unordered_multimap
*/

#include <array>
#include <vector>
#include <list>
#include <forward_list>
#include <deque>
#include <stack>
#include <queue>
#include <set>
#include <map>
#include <unordered_map>
#include <unordered_set>
```

## map & multimap

### Insert

For map:
```cpp

iterator insert(const_iterator __pos, _Pp&& __p)
	{return __tree_.__insert_unique(__pos.__i_, _VSTD::forward<_Pp>(__p));}

```

For multimap
```cpp
iterator insert(const_iterator __p, value_type&& __v)
	{return __tree_.__insert_multi(__p.__i_, _VSTD::move(__v));}

```

可觀察到在 map 和 multimap 當中，insert 都會回傳 iterator，而傳入的參數都是 iterator 和要 insert 的 value。對於 map 來說，常見的 insert 方式是可參考 [std::map::insert](https://cplusplus.com/reference/map/map/insert/)。而 `__tree` 就是 C++ 中的 Red Black Tree。

造成 map 不能有 duplicate key 而 multimap 可以的就是 `__insert_unique` 和 `__insert_multi` 的差別。

```cpp
iterator __insert_unique(const_iterator __p, _Vp&& __v) {
	return __emplace_hint_unique(__p, _VSTD::forward<_Vp>(__v));
}

iterator __insert_multi(const_iterator __p, __container_value_type&& __v) {
	return __emplace_hint_multi(__p, _VSTD::move(__v));
}
```
> hint 就是我們傳入的 iterator

`__insert_unique` 會回傳 `__emplace_hint_unique`，`__emplace_hint_unique`  會回傳`__emplace_hint_unique_extract_key`，`__emplace_hint_unique_extract_key` 會回傳 `__emplace_hint_unique_impl`：

```cpp
iterator __emplace_hint_unique(const_iterator __p, _Pp&& __x) {
        return __emplace_hint_unique_extract_key(__p, _VSTD::forward<_Pp>(__x), __can_extract_key<_Pp, key_type>());
}

iterator __emplace_hint_unique_extract_key(const_iterator __p, _Pp&& __x, __extract_key_fail_tag) {
	return __emplace_hint_unique_impl(__p, _VSTD::forward<_Pp>(__x));
}
```

重點在於 `__find_equal`：

```cpp
template <class _Tp, class _Compare, class _Allocator>
template <class... _Args>
typename __tree<_Tp, _Compare, _Allocator>::iterator
__tree<_Tp, _Compare, _Allocator>:: __emplace_hint_unique_impl(const_iterator __p, _Args&&... __args)
{
    __node_holder __h = __construct_node(_VSTD::forward<_Args>(__args)...);
    __parent_pointer __parent;
    __node_base_pointer __dummy;
    __node_base_pointer& __child = __find_equal(__p, __parent, __dummy, __h->__value_);
    __node_pointer __r = static_cast<__node_pointer>(__child);
    if (__child == nullptr)
    {
        __insert_node_at(__parent, __child, static_cast<__node_base_pointer>(__h.get()));
        __r = __h.release();
    }
    return iterator(__r);
}
```

而 `__emplace_hint_multi` 定義如下，重點在於 `__find_leaf`：

```cpp
template <class _Tp, class _Compare, class _Allocator>
template <class... _Args>
typename __tree<_Tp, _Compare, _Allocator>::iterator
__tree<_Tp, _Compare, _Allocator>::__emplace_hint_multi(const_iterator __p,
                                                        _Args&&... __args)
{
    __node_holder __h = __construct_node(_VSTD::forward<_Args>(__args)...);
    __parent_pointer __parent;
    __node_base_pointer& __child = __find_leaf(__p, __parent, _NodeTypes::__get_key(__h->__value_));
    __insert_node_at(__parent, __child, static_cast<__node_base_pointer>(__h.get()));
    return iterator(static_cast<__node_pointer>(__h.release()));
}
```