import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, CheckCircle, XCircle, Filter, Search } from 'lucide-react';
import { AlgorithmProblem, TestCase } from '../types';
import { generateId } from '../utils/helpers';

const PracticeInterface: React.FC = () => {
  const [problems] = useState<AlgorithmProblem[]>(getSampleProblems());
  const [selectedProblem, setSelectedProblem] = useState<AlgorithmProblem | null>(null);
  const [code, setCode] = useState('');
  const [testResults, setTestResults] = useState<{ passed: boolean; input: string; expected: string; actual: string; }[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [filterDifficulty, setFilterDifficulty] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProblems = problems.filter(problem => {
    const matchesDifficulty = filterDifficulty === 'All' || problem.difficulty === filterDifficulty;
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         problem.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesDifficulty && matchesSearch;
  });

  useEffect(() => {
    if (selectedProblem && code === '') {
      setCode(getStarterCode(selectedProblem));
    }
  }, [selectedProblem]);

  const runTests = async () => {
    if (!selectedProblem) return;
    
    setIsRunning(true);
    setTestResults([]);
    
    // Simulate test execution
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const results = selectedProblem.examples.map(example => {
      // Simple mock test execution
      const passed = Math.random() > 0.3; // 70% pass rate for demo
      return {
        passed,
        input: example.input,
        expected: example.output,
        actual: passed ? example.output : "Wrong output"
      };
    });
    
    setTestResults(results);
    setIsRunning(false);
  };

  const resetCode = () => {
    if (selectedProblem) {
      setCode(getStarterCode(selectedProblem));
      setTestResults([]);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Hard': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  return (
    <div className="flex h-full bg-gray-900">
      {/* Problem List */}
      <div className="w-1/3 bg-gray-800 border-r border-gray-700 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">Practice Problems</h2>
          
          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search problems..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded text-white px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Levels</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>
        
        {/* Problems List */}
        <div className="flex-1 overflow-y-auto">
          {filteredProblems.map((problem) => (
            <div
              key={problem.id}
              onClick={() => setSelectedProblem(problem)}
              className={`p-4 border-b border-gray-700 cursor-pointer hover:bg-gray-700/50 transition-colors ${
                selectedProblem?.id === problem.id ? 'bg-blue-600/20 border-r-2 border-r-blue-600' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-white">{problem.title}</h3>
                <span className={`px-2 py-1 text-xs rounded border ${getDifficultyColor(problem.difficulty)}`}>
                  {problem.difficulty}
                </span>
              </div>
              <div className="flex flex-wrap gap-1 mb-2">
                {problem.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="px-2 py-0.5 text-xs bg-gray-600 text-gray-300 rounded">
                    {tag}
                  </span>
                ))}
                {problem.tags.length > 3 && (
                  <span className="px-2 py-0.5 text-xs text-gray-400">
                    +{problem.tags.length - 3}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-400 line-clamp-2">
                {problem.description.substring(0, 100)}...
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Problem Details & Code Editor */}
      <div className="flex-1 flex flex-col">
        {selectedProblem ? (
          <>
            {/* Problem Description */}
            <div className="h-1/2 overflow-y-auto p-6 bg-gray-800 border-b border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-white">{selectedProblem.title}</h1>
                <span className={`px-3 py-1 text-sm rounded border ${getDifficultyColor(selectedProblem.difficulty)}`}>
                  {selectedProblem.difficulty}
                </span>
              </div>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 mb-6">{selectedProblem.description}</p>
                
                <h3 className="text-lg font-semibold text-white mb-3">Examples:</h3>
                {selectedProblem.examples.map((example, index) => (
                  <div key={index} className="mb-4 bg-gray-900 rounded-lg p-4">
                    <p className="text-sm text-gray-400 mb-1">Example {index + 1}:</p>
                    <div className="font-mono text-sm">
                      <div className="text-gray-300">
                        <span className="text-blue-400">Input:</span> {example.input}
                      </div>
                      <div className="text-gray-300 mt-1">
                        <span className="text-green-400">Output:</span> {example.output}
                      </div>
                      {example.explanation && (
                        <div className="text-gray-400 mt-2">
                          <span className="text-yellow-400">Explanation:</span> {example.explanation}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                <h3 className="text-lg font-semibold text-white mb-3">Constraints:</h3>
                <ul className="list-disc list-inside text-gray-300 mb-4">
                  {selectedProblem.constraints.map((constraint, index) => (
                    <li key={index}>{constraint}</li>
                  ))}
                </ul>
                
                <div className="flex flex-wrap gap-2">
                  {selectedProblem.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs bg-blue-600/20 text-blue-400 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Code Editor & Tests */}
            <div className="h-1/2 flex">
              {/* Code Editor */}
              <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
                  <h3 className="font-semibold text-white">Code Editor</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={resetCode}
                      className="flex items-center space-x-1 px-3 py-1.5 bg-gray-600 hover:bg-gray-700 rounded text-sm transition-colors"
                    >
                      <RotateCcw className="h-3 w-3" />
                      <span>Reset</span>
                    </button>
                    <button
                      onClick={runTests}
                      disabled={isRunning}
                      className="flex items-center space-x-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded text-sm transition-colors"
                    >
                      <Play className="h-3 w-3" />
                      <span>{isRunning ? 'Running...' : 'Run Tests'}</span>
                    </button>
                  </div>
                </div>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="flex-1 p-4 bg-gray-900 text-gray-100 font-mono text-sm resize-none focus:outline-none"
                  placeholder="Write your solution here..."
                />
              </div>

              {/* Test Results */}
              <div className="w-80 bg-gray-800 border-l border-gray-700">
                <div className="px-4 py-3 border-b border-gray-700">
                  <h3 className="font-semibold text-white">Test Results</h3>
                </div>
                <div className="p-4 space-y-3">
                  {isRunning ? (
                    <div className="text-center py-8">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                      <p className="text-gray-400 mt-2">Running tests...</p>
                    </div>
                  ) : testResults.length > 0 ? (
                    testResults.map((result, index) => (
                      <div key={index} className={`p-3 rounded-lg border ${
                        result.passed ? 'bg-green-900/20 border-green-600/30' : 'bg-red-900/20 border-red-600/30'
                      }`}>
                        <div className="flex items-center space-x-2 mb-2">
                          {result.passed ? (
                            <CheckCircle className="h-4 w-4 text-green-400" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-400" />
                          )}
                          <span className="text-sm font-medium text-white">
                            Test {index + 1}
                          </span>
                        </div>
                        <div className="text-xs font-mono">
                          <div className="text-gray-300">Input: {result.input}</div>
                          <div className="text-gray-300">Expected: {result.expected}</div>
                          <div className={result.passed ? 'text-green-400' : 'text-red-400'}>
                            Actual: {result.actual}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      <Play className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>Run tests to see results</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-center">
            <div>
              <div className="h-16 w-16 bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Play className="h-8 w-8 text-gray-400" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">Select a Problem</h2>
              <p className="text-gray-400">Choose a problem from the list to start practicing</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function getSampleProblems(): AlgorithmProblem[] {
  return [
    {
      id: generateId(),
      title: "Two Sum",
      difficulty: "Easy",
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
      examples: [
        {
          input: "nums = [2,7,11,15], target = 9",
          output: "[0,1]",
          explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
        },
        {
          input: "nums = [3,2,4], target = 6",
          output: "[1,2]"
        }
      ],
      constraints: [
        "2 ≤ nums.length ≤ 10⁴",
        "-10⁹ ≤ nums[i] ≤ 10⁹",
        "-10⁹ ≤ target ≤ 10⁹",
        "Only one valid answer exists."
      ],
      tags: ["Array", "Hash Table"],
      hints: [
        "A really brute force way would be to search for all possible pairs of numbers but that would be too slow.",
        "The best way to maintain a mapping of each element in the array to its index is a hash map."
      ]
    },
    {
      id: generateId(),
      title: "Valid Parentheses",
      difficulty: "Easy",
      description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets. Open brackets must be closed in the correct order.",
      examples: [
        {
          input: "s = \"()\"",
          output: "true"
        },
        {
          input: "s = \"()[]{}\"",
          output: "true"
        },
        {
          input: "s = \"(]\"",
          output: "false"
        }
      ],
      constraints: [
        "1 ≤ s.length ≤ 10⁴",
        "s consists of parentheses only '()[]{}'."
      ],
      tags: ["String", "Stack"],
      hints: [
        "An interesting property about a valid parenthesis expression is that a sub-expression of a valid expression should also be a valid expression.",
        "We can use a stack to check validity."
      ]
    },
    {
      id: generateId(),
      title: "Merge Two Sorted Lists",
      difficulty: "Easy",
      description: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.",
      examples: [
        {
          input: "list1 = [1,2,4], list2 = [1,3,4]",
          output: "[1,1,2,3,4,4]"
        },
        {
          input: "list1 = [], list2 = []",
          output: "[]"
        }
      ],
      constraints: [
        "The number of nodes in both lists is in the range [0, 50].",
        "-100 ≤ Node.val ≤ 100",
        "Both list1 and list2 are sorted in non-decreasing order."
      ],
      tags: ["Linked List", "Recursion"],
      hints: [
        "Think about which list node should be the head of the merged list.",
        "The approach can be both iterative and recursive."
      ]
    },
    {
      id: generateId(),
      title: "Binary Tree Inorder Traversal",
      difficulty: "Medium",
      description: "Given the root of a binary tree, return the inorder traversal of its nodes' values. Follow up: Recursive solution is trivial, could you do it iteratively?",
      examples: [
        {
          input: "root = [1,null,2,3]",
          output: "[1,3,2]"
        },
        {
          input: "root = []",
          output: "[]"
        }
      ],
      constraints: [
        "The number of nodes in the tree is in the range [0, 100].",
        "-100 ≤ Node.val ≤ 100"
      ],
      tags: ["Stack", "Tree", "Depth-First Search", "Binary Tree"],
      hints: [
        "The recursive approach is straightforward. Try the iterative approach using a stack.",
        "In inorder traversal, we visit left subtree, then root, then right subtree."
      ]
    },
    {
      id: generateId(),
      title: "Maximum Subarray",
      difficulty: "Medium",
      description: "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum. A subarray is a contiguous part of an array.",
      examples: [
        {
          input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
          output: "6",
          explanation: "[4,-1,2,1] has the largest sum = 6."
        },
        {
          input: "nums = [1]",
          output: "1"
        }
      ],
      constraints: [
        "1 ≤ nums.length ≤ 10⁵",
        "-10⁴ ≤ nums[i] ≤ 10⁴"
      ],
      tags: ["Array", "Divide and Conquer", "Dynamic Programming"],
      hints: [
        "Think about the problem in terms of dynamic programming.",
        "Kadane's algorithm is the optimal solution."
      ]
    },
    {
      id: generateId(),
      title: "Word Break",
      difficulty: "Medium",
      description: "Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words. Note that the same word in the dictionary may be reused multiple times in the segmentation.",
      examples: [
        {
          input: "s = \"leetcode\", wordDict = [\"leet\",\"code\"]",
          output: "true",
          explanation: "Return true because \"leetcode\" can be segmented as \"leet code\"."
        },
        {
          input: "s = \"applepenapple\", wordDict = [\"apple\",\"pen\"]",
          output: "true",
          explanation: "Return true because \"applepenapple\" can be segmented as \"apple pen apple\"."
        }
      ],
      constraints: [
        "1 ≤ s.length ≤ 300",
        "1 ≤ wordDict.length ≤ 1000",
        "1 ≤ wordDict[i].length ≤ 20"
      ],
      tags: ["Hash Table", "String", "Dynamic Programming", "Trie", "Memoization"],
      hints: [
        "Think about how to check if a substring can be segmented.",
        "Dynamic programming can help avoid recomputing the same subproblems."
      ]
    },
    {
      id: generateId(),
      title: "Median of Two Sorted Arrays",
      difficulty: "Hard",
      description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two arrays. The overall run time complexity should be O(log (m+n)).",
      examples: [
        {
          input: "nums1 = [1,3], nums2 = [2]",
          output: "2.00000",
          explanation: "merged array = [1,2,3] and median is 2."
        },
        {
          input: "nums1 = [1,2], nums2 = [3,4]",
          output: "2.50000",
          explanation: "merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5."
        }
      ],
      constraints: [
        "nums1.length == m",
        "nums2.length == n",
        "0 ≤ m ≤ 1000",
        "0 ≤ n ≤ 1000",
        "1 ≤ m + n ≤ 2000"
      ],
      tags: ["Array", "Binary Search", "Divide and Conquer"],
      hints: [
        "The key is to find the correct partition of both arrays.",
        "Use binary search to find the partition efficiently."
      ]
    },
    {
      id: generateId(),
      title: "N-Queens",
      difficulty: "Hard",
      description: "The n-queens puzzle is the problem of placing n queens on an n×n chessboard such that no two queens attack each other. Given an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.",
      examples: [
        {
          input: "n = 4",
          output: "[[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],\"[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"]]",
          explanation: "There exist two distinct solutions to the 4-queens puzzle."
        },
        {
          input: "n = 1",
          output: "[[\"Q\"]]"
        }
      ],
      constraints: [
        "1 ≤ n ≤ 9"
      ],
      tags: ["Array", "Backtracking"],
      hints: [
        "Use backtracking to try placing queens one by one.",
        "Keep track of attacked positions to avoid conflicts."
      ]
    }
  ];
}

function getStarterCode(problem: AlgorithmProblem): string {
  const templates: { [key: string]: string } = {
    "Two Sum": `function twoSum(nums, target) {
    // Write your solution here
    // Return an array of two indices
    
}`,
    "Valid Parentheses": `function isValid(s) {
    // Write your solution here
    // Return true if valid, false otherwise
    
}`,
    "Merge Two Sorted Lists": `// Definition for singly-linked list
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

function mergeTwoLists(list1, list2) {
    // Write your solution here
    // Return the merged list head
    
}`,
    "Binary Tree Inorder Traversal": `// Definition for a binary tree node
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

function inorderTraversal(root) {
    // Write your solution here
    // Return array of values in inorder
    
}`,
    "Maximum Subarray": `function maxSubArray(nums) {
    // Write your solution here
    // Return the maximum sum
    
}`,
    "Word Break": `function wordBreak(s, wordDict) {
    // Write your solution here
    // Return true if s can be segmented
    
}`,
    "Median of Two Sorted Arrays": `function findMedianSortedArrays(nums1, nums2) {
    // Write your solution here
    // Return the median as a number
    
}`,
    "N-Queens": `function solveNQueens(n) {
    // Write your solution here
    // Return array of all solutions
    
}`
  };

  return templates[problem.title] || `// Write your solution for ${problem.title}
function solution() {
    // Your code here
    
}`;
}

export default PracticeInterface;