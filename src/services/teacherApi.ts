import { Message } from '../types';

export interface TeacherResponse {
  content: string;
  codeExamples?: CodeExample[];
  relatedTopics?: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

export interface CodeExample {
  language: string;
  code: string;
  explanation: string;
}

export class AlgorithmTeacherAPI {
  private knowledgeBase: Map<string, any>;
  private conversationContext: Message[];

  constructor() {
    this.knowledgeBase = new Map();
    this.conversationContext = [];
    this.initializeKnowledgeBase();
  }

  private initializeKnowledgeBase() {
    // Sorting Algorithms
    this.knowledgeBase.set('sorting', {
      algorithms: {
        'bubble_sort': {
          timeComplexity: 'O(n²)',
          spaceComplexity: 'O(1)',
          stable: true,
          description: 'Simple comparison-based sorting algorithm',
          code: `function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}`,
          explanation: 'Bubble sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.'
        },
        'quick_sort': {
          timeComplexity: 'O(n log n) average, O(n²) worst',
          spaceComplexity: 'O(log n)',
          stable: false,
          description: 'Efficient divide-and-conquer sorting algorithm',
          code: `function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}`,
          explanation: 'Quick sort picks a pivot element and partitions the array around it, then recursively sorts the sub-arrays.'
        },
        'merge_sort': {
          timeComplexity: 'O(n log n)',
          spaceComplexity: 'O(n)',
          stable: true,
          description: 'Stable divide-and-conquer sorting algorithm',
          code: `function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }
    
    return result.concat(left.slice(i)).concat(right.slice(j));
}`,
          explanation: 'Merge sort divides the array into halves, recursively sorts them, then merges the sorted halves.'
        }
      }
    });

    // Search Algorithms
    this.knowledgeBase.set('searching', {
      algorithms: {
        'binary_search': {
          timeComplexity: 'O(log n)',
          spaceComplexity: 'O(1) iterative, O(log n) recursive',
          prerequisite: 'Array must be sorted',
          code: `function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1; // Not found
}`,
          explanation: 'Binary search efficiently finds a target value in a sorted array by repeatedly dividing the search interval in half.'
        },
        'linear_search': {
          timeComplexity: 'O(n)',
          spaceComplexity: 'O(1)',
          prerequisite: 'None',
          code: `function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    return -1; // Not found
}`,
          explanation: 'Linear search checks each element sequentially until the target is found or the array is exhausted.'
        }
      }
    });

    // Data Structures
    this.knowledgeBase.set('data_structures', {
      'array': {
        description: 'Collection of elements stored in contiguous memory locations',
        operations: {
          access: 'O(1)',
          search: 'O(n)',
          insertion: 'O(n)',
          deletion: 'O(n)'
        }
      },
      'linked_list': {
        description: 'Linear data structure where elements are stored in nodes',
        operations: {
          access: 'O(n)',
          search: 'O(n)',
          insertion: 'O(1)',
          deletion: 'O(1)'
        },
        code: `class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }
    
    append(val) {
        const newNode = new ListNode(val);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.size++;
    }
    
    prepend(val) {
        const newNode = new ListNode(val, this.head);
        this.head = newNode;
        this.size++;
    }
}`
      },
      'stack': {
        description: 'LIFO (Last In, First Out) data structure',
        operations: {
          push: 'O(1)',
          pop: 'O(1)',
          peek: 'O(1)'
        },
        code: `class Stack {
    constructor() {
        this.items = [];
    }
    
    push(element) {
        this.items.push(element);
    }
    
    pop() {
        if (this.isEmpty()) return null;
        return this.items.pop();
    }
    
    peek() {
        if (this.isEmpty()) return null;
        return this.items[this.items.length - 1];
    }
    
    isEmpty() {
        return this.items.length === 0;
    }
    
    size() {
        return this.items.length;
    }
}`
      },
      'queue': {
        description: 'FIFO (First In, First Out) data structure',
        operations: {
          enqueue: 'O(1)',
          dequeue: 'O(1)',
          front: 'O(1)'
        },
        code: `class Queue {
    constructor() {
        this.items = [];
    }
    
    enqueue(element) {
        this.items.push(element);
    }
    
    dequeue() {
        if (this.isEmpty()) return null;
        return this.items.shift();
    }
    
    front() {
        if (this.isEmpty()) return null;
        return this.items[0];
    }
    
    isEmpty() {
        return this.items.length === 0;
    }
    
    size() {
        return this.items.length;
    }
}`
      }
    });

    // Dynamic Programming
    this.knowledgeBase.set('dynamic_programming', {
      patterns: {
        'fibonacci': {
          description: 'Classic example of overlapping subproblems',
          approaches: {
            recursive: `function fibRecursive(n) {
    if (n <= 1) return n;
    return fibRecursive(n - 1) + fibRecursive(n - 2);
}`,
            memoized: `function fibMemoized(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    
    memo[n] = fibMemoized(n - 1, memo) + fibMemoized(n - 2, memo);
    return memo[n];
}`,
            tabulated: `function fibTabulated(n) {
    if (n <= 1) return n;
    
    const dp = [0, 1];
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}`
          }
        },
        'knapsack': {
          description: 'Optimization problem with resource constraints',
          code: `function knapsack(weights, values, capacity) {
    const n = weights.length;
    const dp = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));
    
    for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= capacity; w++) {
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(
                    values[i - 1] + dp[i - 1][w - weights[i - 1]],
                    dp[i - 1][w]
                );
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    
    return dp[n][capacity];
}`
        }
      }
    });

    // Graph Algorithms
    this.knowledgeBase.set('graphs', {
      traversal: {
        'dfs': {
          description: 'Depth-First Search explores as far as possible along each branch',
          code: `function dfs(graph, start, visited = new Set()) {
    visited.add(start);
    console.log(start);
    
    for (const neighbor of graph[start] || []) {
        if (!visited.has(neighbor)) {
            dfs(graph, neighbor, visited);
        }
    }
    
    return visited;
}`,
          timeComplexity: 'O(V + E)',
          spaceComplexity: 'O(V)'
        },
        'bfs': {
          description: 'Breadth-First Search explores neighbors before going deeper',
          code: `function bfs(graph, start) {
    const visited = new Set();
    const queue = [start];
    visited.add(start);
    
    while (queue.length > 0) {
        const vertex = queue.shift();
        console.log(vertex);
        
        for (const neighbor of graph[vertex] || []) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
    
    return visited;
}`,
          timeComplexity: 'O(V + E)',
          spaceComplexity: 'O(V)'
        }
      },
      'shortest_path': {
        'dijkstra': {
          description: 'Finds shortest path from source to all vertices in weighted graph',
          code: `function dijkstra(graph, start) {
    const distances = {};
    const visited = new Set();
    const pq = new PriorityQueue();
    
    // Initialize distances
    for (const vertex in graph) {
        distances[vertex] = vertex === start ? 0 : Infinity;
    }
    
    pq.enqueue(start, 0);
    
    while (!pq.isEmpty()) {
        const current = pq.dequeue().element;
        
        if (visited.has(current)) continue;
        visited.add(current);
        
        for (const neighbor in graph[current]) {
            const distance = distances[current] + graph[current][neighbor];
            
            if (distance < distances[neighbor]) {
                distances[neighbor] = distance;
                pq.enqueue(neighbor, distance);
            }
        }
    }
    
    return distances;
}`
        }
      }
    });
  }

  async generateResponse(message: string, context: Message[]): Promise<TeacherResponse> {
    this.conversationContext = context;
    const lowerMessage = message.toLowerCase();
    
    // Analyze the message to determine the topic and intent
    const analysis = this.analyzeMessage(lowerMessage);
    
    // Generate contextual response based on analysis
    return this.generateContextualResponse(analysis, message);
  }

  private analyzeMessage(message: string): {
    topic: string;
    subtopic?: string;
    intent: 'learn' | 'implement' | 'compare' | 'debug' | 'explain';
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    keywords: string[];
  } {
    const keywords = this.extractKeywords(message);
    
    let topic = 'general';
    let subtopic;
    let intent: 'learn' | 'implement' | 'compare' | 'debug' | 'explain' = 'learn';
    let difficulty: 'beginner' | 'intermediate' | 'advanced' = 'beginner';

    // Determine topic
    if (keywords.some(k => ['sort', 'sorting', 'bubble', 'quick', 'merge', 'heap'].includes(k))) {
      topic = 'sorting';
      if (keywords.includes('bubble')) subtopic = 'bubble_sort';
      else if (keywords.includes('quick')) subtopic = 'quick_sort';
      else if (keywords.includes('merge')) subtopic = 'merge_sort';
    } else if (keywords.some(k => ['search', 'binary', 'linear', 'find'].includes(k))) {
      topic = 'searching';
      if (keywords.includes('binary')) subtopic = 'binary_search';
      else if (keywords.includes('linear')) subtopic = 'linear_search';
    } else if (keywords.some(k => ['dynamic', 'dp', 'memoization', 'fibonacci', 'knapsack'].includes(k))) {
      topic = 'dynamic_programming';
      if (keywords.includes('fibonacci')) subtopic = 'fibonacci';
      else if (keywords.includes('knapsack')) subtopic = 'knapsack';
    } else if (keywords.some(k => ['graph', 'tree', 'dfs', 'bfs', 'dijkstra', 'traversal'].includes(k))) {
      topic = 'graphs';
      if (keywords.includes('dfs')) subtopic = 'dfs';
      else if (keywords.includes('bfs')) subtopic = 'bfs';
      else if (keywords.includes('dijkstra')) subtopic = 'dijkstra';
    } else if (keywords.some(k => ['array', 'list', 'stack', 'queue', 'structure'].includes(k))) {
      topic = 'data_structures';
      if (keywords.includes('stack')) subtopic = 'stack';
      else if (keywords.includes('queue')) subtopic = 'queue';
      else if (keywords.includes('list')) subtopic = 'linked_list';
    }

    // Determine intent
    if (keywords.some(k => ['implement', 'code', 'write', 'create'].includes(k))) {
      intent = 'implement';
    } else if (keywords.some(k => ['compare', 'difference', 'vs', 'versus'].includes(k))) {
      intent = 'compare';
    } else if (keywords.some(k => ['debug', 'error', 'wrong', 'fix'].includes(k))) {
      intent = 'debug';
    } else if (keywords.some(k => ['explain', 'how', 'why', 'what'].includes(k))) {
      intent = 'explain';
    }

    // Determine difficulty
    if (keywords.some(k => ['advanced', 'complex', 'optimization', 'efficient'].includes(k))) {
      difficulty = 'advanced';
    } else if (keywords.some(k => ['intermediate', 'medium', 'better'].includes(k))) {
      difficulty = 'intermediate';
    }

    return { topic, subtopic, intent, difficulty, keywords };
  }

  private extractKeywords(message: string): string[] {
    const commonWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'can', 'may', 'might', 'must']);
    
    return message
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 2 && !commonWords.has(word));
  }

  private async generateContextualResponse(analysis: any, originalMessage: string): Promise<TeacherResponse> {
    const { topic, subtopic, intent, difficulty } = analysis;
    
    let response: TeacherResponse = {
      content: '',
      codeExamples: [],
      relatedTopics: [],
      difficulty
    };

    if (topic === 'sorting') {
      response = await this.generateSortingResponse(subtopic, intent, difficulty);
    } else if (topic === 'searching') {
      response = await this.generateSearchingResponse(subtopic, intent, difficulty);
    } else if (topic === 'dynamic_programming') {
      response = await this.generateDPResponse(subtopic, intent, difficulty);
    } else if (topic === 'graphs') {
      response = await this.generateGraphResponse(subtopic, intent, difficulty);
    } else if (topic === 'data_structures') {
      response = await this.generateDataStructureResponse(subtopic, intent, difficulty);
    } else {
      response = await this.generateGeneralResponse(originalMessage, analysis);
    }

    return response;
  }

  private async generateSortingResponse(subtopic: string | undefined, intent: string, difficulty: string): Promise<TeacherResponse> {
    const sortingData = this.knowledgeBase.get('sorting');
    
    if (subtopic && sortingData.algorithms[subtopic]) {
      const algorithm = sortingData.algorithms[subtopic];
      
      return {
        content: `## ${subtopic.replace('_', ' ').toUpperCase()}

${algorithm.description}

**Time Complexity:** ${algorithm.timeComplexity}
**Space Complexity:** ${algorithm.spaceComplexity}
**Stable:** ${algorithm.stable ? 'Yes' : 'No'}

${algorithm.explanation}

${intent === 'implement' ? 'Here\'s a complete implementation:' : 'Would you like to see the implementation?'}`,
        codeExamples: intent === 'implement' ? [{
          language: 'javascript',
          code: algorithm.code,
          explanation: algorithm.explanation
        }] : [],
        relatedTopics: ['Time Complexity', 'Space Complexity', 'Stability in Sorting'],
        difficulty: difficulty as any
      };
    }

    return {
      content: `## Sorting Algorithms Overview

Sorting is fundamental in computer science! Here are the main categories:

**Simple Sorts (O(n²)):**
- Bubble Sort - Educational, rarely used in practice
- Selection Sort - Minimizes swaps
- Insertion Sort - Efficient for small datasets

**Efficient Sorts (O(n log n)):**
- Merge Sort - Stable, predictable performance
- Quick Sort - Fast average case, in-place
- Heap Sort - Guaranteed O(n log n), in-place

**Specialized Sorts:**
- Counting Sort - For integers in limited range
- Radix Sort - For fixed-width integers
- Bucket Sort - For uniformly distributed data

Which sorting algorithm would you like to explore in detail?`,
      relatedTopics: ['Algorithm Analysis', 'Divide and Conquer', 'Recursion'],
      difficulty: difficulty as any
    };
  }

  private async generateSearchingResponse(subtopic: string | undefined, intent: string, difficulty: string): Promise<TeacherResponse> {
    const searchingData = this.knowledgeBase.get('searching');
    
    if (subtopic && searchingData.algorithms[subtopic]) {
      const algorithm = searchingData.algorithms[subtopic];
      
      return {
        content: `## ${subtopic.replace('_', ' ').toUpperCase()}

${algorithm.explanation}

**Time Complexity:** ${algorithm.timeComplexity}
**Space Complexity:** ${algorithm.spaceComplexity}
**Prerequisite:** ${algorithm.prerequisite}

${intent === 'implement' ? 'Here\'s the implementation:' : 'Key points to remember:'}

${subtopic === 'binary_search' ? `
**Important Notes:**
- Array must be sorted beforehand
- Be careful with boundary conditions
- Consider integer overflow in other languages
- Can be implemented iteratively or recursively
` : ''}`,
        codeExamples: intent === 'implement' ? [{
          language: 'javascript',
          code: algorithm.code,
          explanation: algorithm.explanation
        }] : [],
        relatedTopics: subtopic === 'binary_search' ? ['Divide and Conquer', 'Logarithmic Time', 'Sorted Arrays'] : ['Linear Time', 'Sequential Access'],
        difficulty: difficulty as any
      };
    }

    return {
      content: `## Search Algorithms

Searching is about finding specific elements efficiently:

**Linear Search - O(n):**
- Checks each element sequentially
- Works on unsorted data
- Simple but slow for large datasets

**Binary Search - O(log n):**
- Requires sorted array
- Divides search space in half each iteration
- Much faster for large datasets

**Hash-based Search - O(1) average:**
- Uses hash tables/maps
- Fastest for lookups
- Requires extra space

**Tree-based Search - O(log n):**
- Binary Search Trees
- Balanced trees (AVL, Red-Black)
- Good for dynamic data

Which search technique interests you most?`,
      relatedTopics: ['Data Structures', 'Hash Tables', 'Binary Trees'],
      difficulty: difficulty as any
    };
  }

  private async generateDPResponse(subtopic: string | undefined, intent: string, difficulty: string): Promise<TeacherResponse> {
    const dpData = this.knowledgeBase.get('dynamic_programming');
    
    if (subtopic && dpData.patterns[subtopic]) {
      const pattern = dpData.patterns[subtopic];
      
      return {
        content: `## Dynamic Programming: ${subtopic.toUpperCase()}

${pattern.description}

Dynamic Programming solves this efficiently by:
1. **Identifying overlapping subproblems**
2. **Storing solutions to avoid recomputation**
3. **Building up from smaller to larger problems**

**Three approaches:**
- **Recursive (naive)** - Exponential time
- **Memoization (top-down)** - Optimal time with recursion
- **Tabulation (bottom-up)** - Optimal time, iterative

${intent === 'implement' ? 'Here are all three implementations:' : 'The key insight is recognizing the recurrence relation.'}`,
        codeExamples: intent === 'implement' ? Object.entries(pattern.approaches || {}).map(([approach, code]) => ({
          language: 'javascript',
          code: code as string,
          explanation: `${approach.charAt(0).toUpperCase() + approach.slice(1)} approach`
        })) : [],
        relatedTopics: ['Recursion', 'Memoization', 'Time Complexity', 'Space-Time Tradeoffs'],
        difficulty: difficulty as any
      };
    }

    return {
      content: `## Dynamic Programming

DP is a powerful technique for optimization problems with:

**1. Optimal Substructure**
- Solution can be constructed from optimal solutions of subproblems

**2. Overlapping Subproblems**
- Same subproblems are solved multiple times

**Common DP Patterns:**

**Linear DP:**
- Fibonacci, Climbing Stairs
- House Robber, Maximum Subarray

**2D DP:**
- Unique Paths, Edit Distance
- Longest Common Subsequence

**Knapsack Problems:**
- 0/1 Knapsack, Unbounded Knapsack
- Coin Change, Partition Problems

**String DP:**
- Palindrome problems
- String matching

**Approach:**
1. Define the state (what does dp[i] represent?)
2. Find the recurrence relation
3. Determine base cases
4. Decide on top-down vs bottom-up

Which DP pattern would you like to explore?`,
      relatedTopics: ['Recursion', 'Optimization', 'Problem Solving Patterns'],
      difficulty: difficulty as any
    };
  }

  private async generateGraphResponse(subtopic: string | undefined, intent: string, difficulty: string): Promise<TeacherResponse> {
    const graphData = this.knowledgeBase.get('graphs');
    
    if (subtopic) {
      let algorithm;
      let section = '';
      
      if (graphData.traversal[subtopic]) {
        algorithm = graphData.traversal[subtopic];
        section = 'Graph Traversal';
      } else if (graphData.shortest_path[subtopic]) {
        algorithm = graphData.shortest_path[subtopic];
        section = 'Shortest Path';
      }
      
      if (algorithm) {
        return {
          content: `## ${section}: ${subtopic.toUpperCase()}

${algorithm.description}

**Time Complexity:** ${algorithm.timeComplexity || 'Varies'}
**Space Complexity:** ${algorithm.spaceComplexity || 'Varies'}

${subtopic === 'dfs' ? `
**Applications:**
- Detecting cycles in graphs
- Topological sorting
- Finding connected components
- Solving maze problems
` : subtopic === 'bfs' ? `
**Applications:**
- Finding shortest path (unweighted)
- Level-order traversal
- Finding connected components
- Social network analysis
` : ''}

${intent === 'implement' ? 'Here\'s the implementation:' : 'Key characteristics:'}`,
          codeExamples: intent === 'implement' ? [{
            language: 'javascript',
            code: algorithm.code,
            explanation: algorithm.description
          }] : [],
          relatedTopics: subtopic === 'dfs' ? ['Recursion', 'Stack', 'Backtracking'] : subtopic === 'bfs' ? ['Queue', 'Level Order', 'Shortest Path'] : ['Weighted Graphs', 'Priority Queue'],
          difficulty: difficulty as any
        };
      }
    }

    return {
      content: `## Graph Algorithms

Graphs are versatile data structures representing relationships:

**Graph Representations:**
- **Adjacency Matrix** - O(V²) space, O(1) edge lookup
- **Adjacency List** - O(V+E) space, efficient for sparse graphs

**Traversal Algorithms:**
- **DFS (Depth-First Search)** - Explores deep, uses stack/recursion
- **BFS (Breadth-First Search)** - Explores wide, uses queue

**Shortest Path:**
- **Dijkstra's Algorithm** - Single source, non-negative weights
- **Bellman-Ford** - Single source, handles negative weights
- **Floyd-Warshall** - All pairs shortest paths

**Other Important Algorithms:**
- **Topological Sort** - Ordering with dependencies
- **Union-Find** - Disjoint set operations
- **Minimum Spanning Tree** - Kruskal's, Prim's

**Applications:**
- Social networks, GPS navigation
- Web crawling, dependency resolution
- Network routing, circuit design

Which graph algorithm would you like to explore?`,
      relatedTopics: ['Data Structures', 'Recursion', 'Greedy Algorithms'],
      difficulty: difficulty as any
    };
  }

  private async generateDataStructureResponse(subtopic: string | undefined, intent: string, difficulty: string): Promise<TeacherResponse> {
    const dsData = this.knowledgeBase.get('data_structures');
    
    if (subtopic && dsData[subtopic]) {
      const ds = dsData[subtopic];
      
      return {
        content: `## ${subtopic.replace('_', ' ').toUpperCase()}

${ds.description}

**Time Complexities:**
${Object.entries(ds.operations).map(([op, complexity]) => 
  `- **${op.charAt(0).toUpperCase() + op.slice(1)}:** ${complexity}`
).join('\n')}

${subtopic === 'linked_list' ? `
**Types:**
- **Singly Linked List** - One direction traversal
- **Doubly Linked List** - Bidirectional traversal
- **Circular Linked List** - Last node points to first

**Advantages:**
- Dynamic size
- Efficient insertion/deletion at beginning
- Memory efficient (no wasted space)

**Disadvantages:**
- No random access
- Extra memory for pointers
- Not cache-friendly
` : subtopic === 'stack' ? `
**Applications:**
- Function call management
- Expression evaluation
- Undo operations
- Browser history
- Backtracking algorithms

**Key Operations:**
- **Push** - Add to top
- **Pop** - Remove from top
- **Peek/Top** - View top element
` : subtopic === 'queue' ? `
**Applications:**
- Process scheduling
- BFS traversal
- Handling requests in web servers
- Print job management

**Variants:**
- **Simple Queue** - FIFO
- **Circular Queue** - Efficient space usage
- **Priority Queue** - Elements have priorities
- **Deque** - Double-ended queue
` : ''}

${intent === 'implement' ? 'Here\'s a complete implementation:' : 'Understanding when to use this structure is key.'}`,
        codeExamples: intent === 'implement' && ds.code ? [{
          language: 'javascript',
          code: ds.code,
          explanation: `Implementation of ${subtopic.replace('_', ' ')}`
        }] : [],
        relatedTopics: subtopic === 'linked_list' ? ['Pointers', 'Memory Management', 'Dynamic Arrays'] : 
                      subtopic === 'stack' ? ['Recursion', 'DFS', 'Expression Parsing'] :
                      subtopic === 'queue' ? ['BFS', 'Scheduling', 'Buffer Management'] : ['Arrays', 'Memory'],
        difficulty: difficulty as any
      };
    }

    return {
      content: `## Data Structures Overview

Data structures organize and store data efficiently:

**Linear Structures:**
- **Array** - Fixed size, random access O(1)
- **Dynamic Array** - Resizable, amortized O(1) append
- **Linked List** - Dynamic size, O(1) insertion/deletion
- **Stack** - LIFO, function calls, undo operations
- **Queue** - FIFO, scheduling, BFS

**Non-Linear Structures:**
- **Binary Tree** - Hierarchical, O(log n) operations
- **Hash Table** - Key-value pairs, O(1) average lookup
- **Heap** - Priority queue, O(log n) insert/delete
- **Graph** - Relationships, various algorithms

**Choosing the Right Structure:**
- **Frequent lookups?** → Hash Table
- **Ordered data?** → Binary Search Tree
- **LIFO operations?** → Stack
- **FIFO operations?** → Queue
- **Range queries?** → Segment Tree

**Trade-offs to Consider:**
- Time vs Space complexity
- Static vs Dynamic size
- Memory locality
- Implementation complexity

Which data structure would you like to explore in detail?`,
      relatedTopics: ['Algorithm Analysis', 'Memory Management', 'Abstract Data Types'],
      difficulty: difficulty as any
    };
  }

  private async generateGeneralResponse(message: string, analysis: any): Promise<TeacherResponse> {
    const responses = [
      {
        content: `Great question! Algorithm learning is all about understanding patterns and building problem-solving skills.

**Key Learning Strategies:**

1. **Start with Fundamentals**
   - Understand time and space complexity
   - Master basic data structures (arrays, lists, stacks, queues)
   - Learn common patterns (two pointers, sliding window)

2. **Practice Systematically**
   - Solve problems by category
   - Focus on understanding, not just memorizing
   - Implement algorithms from scratch

3. **Analyze and Optimize**
   - Always consider edge cases
   - Think about different approaches
   - Understand trade-offs between solutions

4. **Build Intuition**
   - Visualize how algorithms work
   - Trace through examples step by step
   - Connect new concepts to what you already know

**Common Algorithm Categories:**
- Searching and Sorting
- Graph Traversal
- Dynamic Programming
- Greedy Algorithms
- Divide and Conquer

What specific area would you like to focus on? I can provide detailed explanations, code examples, and practice problems!`,
        relatedTopics: ['Problem Solving', 'Data Structures', 'Complexity Analysis'],
        difficulty: 'beginner' as const
      },
      {
        content: `Excellent! Let's dive into algorithmic thinking. The key is to approach problems systematically:

**Problem-Solving Framework:**

1. **Understand the Problem**
   - What are the inputs and outputs?
   - What are the constraints?
   - Are there edge cases to consider?

2. **Plan Your Approach**
   - Can you solve it with a known pattern?
   - What data structures might help?
   - Is there a brute force solution first?

3. **Analyze Complexity**
   - What's the time complexity?
   - What's the space complexity?
   - Can you optimize further?

4. **Implement and Test**
   - Write clean, readable code
   - Test with examples and edge cases
   - Debug systematically

**Common Optimization Techniques:**
- **Hash Maps** for O(1) lookups
- **Two Pointers** for array problems
- **Sliding Window** for subarray problems
- **Binary Search** for sorted data
- **Dynamic Programming** for overlapping subproblems

Would you like to practice applying this framework to a specific problem?`,
        relatedTopics: ['Problem Solving Patterns', 'Code Optimization', 'Debugging'],
        difficulty: 'intermediate' as const
      }
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  }
}

export const teacherAPI = new AlgorithmTeacherAPI();