class LNode 
     attr_accessor :key, :val, :nxt, :prev, :tail

  def initialize(val, key) @val, @key, @nxt, @prev = val, key, nil, nil; end
    
    def insert_self_before_node(node) @prev, @nxt = node.prev, node end
    def remove_self_ref; nxt, prev = nil, nil; end
end
class LRUCache
  attr_accessor :store, :capacity, :length
=begin
    :type capacity: Integer
=end
    def initialize(capacity)
        @store = {}
        @capacity = capacity
        @store[:tail] = LNode.new("tail node", :tail)
        @store[:head] = LNode.new("head node", :head)
        @store[:tail].prev, @store[:head].nxt = @store[:head], @store[:tail]
        @length = 0
    end


    def remove_node_from_store_links(node)
        if node && node.prev && node.prev.key
            @store[node.prev.key].nxt = node.nxt 
            @store[node.nxt.key].prev = @store[node.prev.key] if node.nxt && node.nxt.key
        end
    end
    def append_to_tail(node)
        node.remove_self_ref 
        t = @store[:tail]
        node.insert_self_before_node(t)
        @store[t.prev.key].nxt = node
        t.prev = node
    end
=begin
    :type key: Integer
    :rtype: Integer
=end
    def get(key)
        n = @store[key]
        if n
            remove_node_from_store_links(n)
            append_to_tail(n)
          n.val
        else
          -1
        end
    end

=begin
    :type key: Integer
    :type value: Integer
    :rtype: Void
=end
    def put(key, value)
      has_key = get(key)

      if has_key != -1
          @store[key].val = value
      elsif has_key == -1 && length < capacity
          n = @store[key] = LNode.new(value, key)
          append_to_tail(n)
          @length += 1
      else #if has_key == -1 && length >= capacity
        lru = @store[:head].nxt
        remove_node_from_store_links(lru)
        @store.delete(lru.key)
        n = @store[key] = LNode.new(value, key)
        append_to_tail(n)
      end
      nil
    end
end

# Your LRUCache object will be instantiated and called as such:
# obj = LRUCache.new(capacity)
# param_1 = obj.get(key)
# obj.put(key, value)

# ["LRUCache","put","put","get","put","get","put","get","get","get"]
# [[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]
# expected: # [null,null,null,1,null,-1,null,-1,3,4]
# 

obj = LRUCache.new(2)
obj.put(1, 1)
obj.put(2,2)
p obj.get(1) == 1
# p obj.store[2].nxt.val
# p obj.store[2].prev.val
p obj.store.map { |k,v| k}
obj.put(3,3)
p obj.store.map { |k,v| k}
p obj.get(2) == -1
obj.put(4,4)
p obj.get(1) == -1
p obj.get(3) == 3
p obj.get(4) == 4