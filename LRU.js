class LRU {
    constructor(N) {
      this.N = N;
      this.map = new Map();
      this.tail_element = null;
      this.head_element = null;
    }
    
    get(key) {
      return this.map.get(key)?.value;
    }
    
    set(key, value) {
      // The new gonna be head_element;
      const element = { key, value, prev: null, next: null };
      // If the cache is emply
      if (this.map.size === 0) {
        this.tail_element = element;
        this.head_element = element;
        this.map.set(key, element);
        return;
      }
      // if element already exist in the Map
      // Set it to be the end of the chain.
      const existingElement = this.map.get(key);
      if (existingElement) {
        if (existingElement.prev) {
          existingElement.prev.next = existingElement.next;
        }
        if (existingElement.next) {
          existingElement.next.prev = existingElement.prev;
        }
        existingElement.prev = this.tail_element;
        existingElement.next = null;
        existingElement.value = value;
        this.tail_element.next = existingElement;
        this.tail_element = existingElement;
        return;
      }
      
      // If element does not exists add it to the map and set the tail element at it.
      this.tail_element.next = element;
      element.prev = this.tail_element;
      this.tail_element = element;
      this.map.set(key, element);
      
      // If Map reached the limit remove the head element from the map.
      if (this.map.size === (this.N + 1)) {
        this.map.delete(this.head_element.key);
        this.head_element = this.head_element.next;
        this.head_element.prev = null;
      }
    }
    
  }
  
  
  const cache = new LRU(3);
  
  console.log(cache.get(4) ?? "N/A");
  cache.set(4, "4");
  cache.set(5, "5");
  cache.set(6, "6");
  cache.set(7, "7");
  cache.set(4, "4");
  console.log(cache.get(4) ?? "N/A");
  console.log(cache.get(5) ?? "N/A");
  console.log(cache.get(7) ?? "N/A");
  console.log(cache.get(6) ?? "N/A");
  cache.set(5, "5");
  cache.set(5, "5");
  cache.set(5, "second");
  cache.set(5, "5");
  cache.set(5, "5");
  cache.set(5, "secondt");
  console.log("----------")
  console.log(cache.get(5) ?? "N/A");
  console.log(cache.get(7) ?? "N/A");
  console.log(cache.get(6) ?? "N/A");


  // class LRU {
//   constructor(N) {
//     this.N = N;
//     this.map = new Map();
//     this.arr = [];
//   }
  
//   set(key, value) {
//     if (this.map.get(key)) {
//       this.arr.splice(this.arr.indexOf(key), 1);
//     } else {
//       if (this.arr.length === this.N) {
//         const element = this.arr.pop();
//         this.map.delete(element);
//       }
//     }
//     this.arr.unshift(key);
//     this.map.set(key, value);
//   }
  
//   get(key) {
//     return this.map.get(key);
//   }
  
// }

// const cache = new LRU(3);

// console.log(cache.get(4) ?? "N/A");
// cache.set(4, "4");
// cache.set(5, "5");
// cache.set(6, "6");
// cache.set(7, "7");
// cache.set(7, "7");
// console.log(cache.get(4) ?? "N/A");
// console.log(cache.get(5) ?? "N/A");
// console.log(cache.get(7) ?? "N/A");
// console.log(cache.get(6) ?? "N/A");
// cache.set(5, "5");
// cache.set(5, "5");
// cache.set(5, "second");
// cache.set(5, "5");
// cache.set(5, "5");
// cache.set(5, "secondt");
// console.log("----------")
// console.log(cache.get(5) ?? "N/A");
// console.log(cache.get(7) ?? "N/A");
// console.log(cache.get(6) ?? "N/A");