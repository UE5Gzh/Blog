---
title: 深入理解二叉搜索树
date: 2026-03-28
description: 全面解析二叉搜索树的各种操作和时间复杂度
draft: false
tags:
  - Algorithm
  - 数据结构
  - BST
category: Algorithm
---

# 深入理解二叉搜索树

## 什么是BST

二叉搜索树（Binary Search Tree）是一种特殊二叉树：

```
        8
       / \
      3   10
     / \    \
    1   6    14
```

**性质**：左子树所有节点 < 根节点 < 右子树所有节点

## 节点定义

```cpp
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};
```

## 基础操作

### 查找

```cpp
TreeNode* search(TreeNode* root, int target) {
    if (!root || root->val == target) return root;
    if (target < root->val) return search(root->left, target);
    return search(root->right, target);
}
// 时间: O(h), 空间: O(h) 递归栈
```

### 插入

```cpp
TreeNode* insert(TreeNode* root, int val) {
    if (!root) return new TreeNode(val);
    if (val < root->val) root->left = insert(root->left, val);
    else root->right = insert(root->right, val);
    return root;
}
```

### 删除

```cpp
TreeNode* deleteNode(TreeNode* root, int key) {
    if (!root) return nullptr;
    
    if (key < root->val) {
        root->left = deleteNode(root->left, key);
    } else if (key > root->val) {
        root->right = deleteNode(root->right, key);
    } else {
        // 找到目标
        if (!root->left) return root->right;
        if (!root->right) return root->left;
        
        // 双子节点：找后继
        TreeNode* successor = minValue(root->right);
        root->val = successor->val;
        root->right = deleteNode(root->right, successor->val);
    }
    return root;
}
```

## 树的遍历

### 递归版本

```cpp
// 前序
void preorder(TreeNode* root) {
    if (!root) return;
    cout << root->val << " ";
    preorder(root->left);
    preorder(root->right);
}

// 中序 (BST中序遍历得到有序序列)
void inorder(TreeNode* root) {
    if (!root) return;
    inorder(root->left);
    cout << root->val << " ";
    inorder(root->right);
}

// 后序
void postorder(TreeNode* root) {
    if (!root) return;
    postorder(root->left);
    postorder(root->right);
    cout << root->val << " ";
}
```

### 迭代版本

```cpp
vector<int> inorderIter(TreeNode* root) {
    vector<int> result;
    stack<TreeNode*> st;
    TreeNode* cur = root;
    
    while (cur || !st.empty()) {
        while (cur) {
            st.push(cur);
            cur = cur->left;
        }
        cur = st.top(); st.pop();
        result.push_back(cur->val);
        cur = cur->right;
    }
    return result;
}
```

## 平衡树

BST最坏情况会退化成链表(O(n))，需要平衡：

| 树类型 | 说明 |
|--------|------|
| AVL | 严格平衡，高度差≤1 |
| Red-Black | 近似平衡 |
| Splay | 经常访问的节点靠近根 |
| Treap | 利用随机化的BST |

### AVL旋转

```cpp
// 左左情况：单右旋
TreeNode* rotateRight(TreeNode* y) {
    TreeNode* x = y->left;
    y->left = x->right;
    x->right = y;
    return x;
}

// 右右情况：单左旋
TreeNode* rotateLeft(TreeNode* x) {
    TreeNode* y = x->right;
    x->right = y->left;
    y->left = x;
    return y;
}
```

## 总结

| 操作 | 平均 | 最坏 |
|------|------|------|
| 查找 | O(logn) | O(n) |
| 插入 | O(logn) | O(n) |
| 删除 | O(logn) | O(n) |

使用平衡树可保证最坏情况也是O(logn)。
