const searchRange = function (nums, target) {
    function search (nums, target, isLeft = true) {
        let start = 0;
        let end = nums.length - 1;
        let index = -1;

        while (start <= end) {
            const mid = Math.floor((start + end) / 2);

            if (target === nums[mid]) {
                index = mid;
                if (isLeft) {
                    end = mid - 1;
                } else {
                    start = mid + 1;
                }
                continue;
            }
            if (target < nums[mid]) {
                end = mid - 1;
            } else {
                start = mid + 1;
            }
        }
        return index;
    }

    const l = search(nums, target);
    const r = search(nums, target, false);

    return [l, r];
};

searchRange([5, 7, 7, 8, 8, 10], 8);

const searchMatrix = function (matrix, target) {
    if (!matrix.length) {
        return false;
    }
    const left = 0;
    const top = 0;
    const right = matrix[0].length - 1;
    const bottom = matrix.length - 1;

    function search (matrix, target, left, top, right, bottom) {
        let nleft = left;
        let nright = right;
        let ntop = top;
        let nbottom = bottom;

        while (left <= right || top <= bottom) {
            while (nleft <= nright) {
                const mid = Math.floor((nleft + nright) / 2);

                if (target < matrix[ntop][mid]) {
                    nright = mid - 1;
                } else if (target > matrix[ntop][mid]) {
                    nleft = mid + 1;
                } else {
                    return true;
                }
            }

            if (nright < left) {
                return false;
            }
            right = nright;
            nleft = left;

            while (ntop <= nbottom) {
                const mid = Math.floor((ntop + nbottom) / 2);

                if (target < matrix[mid][nleft]) {
                    nbottom = mid - 1;
                } else if (target > matrix[mid][nleft]) {
                    ntop = mid + 1;
                } else {
                    return true;
                }
            }

            if (nbottom < top) {
                return false;
            }
            bottom = nbottom;
            ntop = top;

            while (nleft <= nright) {
                const mid = Math.floor((nleft + nright) / 2);

                if (target < matrix[nbottom][mid]) {
                    nright = mid - 1;
                } else if (target > matrix[nbottom][mid]) {
                    nleft = mid + 1;
                } else {
                    return true;
                }
            }

            if (nleft > right) {
                return false;
            }
            left = nleft;
            nright = right;

            while (ntop <= nbottom) {
                const mid = Math.floor((ntop + nbottom) / 2);

                if (target < matrix[mid][nright]) {
                    nbottom = mid - 1;
                } else if (target > matrix[mid][nright]) {
                    ntop = mid + 1;
                } else {
                    return true;
                }
            }

            if (ntop > bottom) {
                return false;
            }
            top = ntop;
            nbottom = bottom;
        }
    }

    return search(matrix, target, left, top, right, bottom);
};

console.log(searchMatrix([[1, 1]], 2));

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
const exist = function (board, word) {
    const left = 0;
    const top = 0;
    const right = board[0].length - 1;
    const bottom = board.length - 1;
    const used = new Array(bottom + 1);

    // 二维矩阵used
    for (let i = 0; i <= bottom; i++) {
        used[i] = new Array(right + 1);
    }

    if (word.length > (right + 1) * (bottom + 1)) {
        return false;
    }

    // i j是当前点的坐标，index是当前考察的字符索引
    function find (i, j, index) {
        if (index >= word.length) {
            return true;
        }

        if (i < top || i > bottom || j < left || j > right) {
            return false;
        }

        if (used[i][j]) {
            return false;
        }

        if (word[index] !== board[i][j]) {
            return false;
        }

        used[i][j] = true;
        const flag =
            find(i - 1, j, index + 1) ||
            find(i, j - 1, index + 1) ||
            find(i + 1, j, index + 1) ||
            find(i, j + 1, index + 1);

        if (flag) {
            return true;
        }

        used[i][j] = false;
        return false;
    }

    for (let i = 0; i <= bottom; i++) {
        for (let j = 0; j <= right; j++) {
            if (find(i, j, 0)) {
                return true;
            }
        }
    }

    return false;
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */

function TreeNode (val) {
    this.val = val;
    this.left = this.right = null;
}
const buildTree = function (preorder, inorder) {
    const build = function (pStart, pEnd, iStart, iEnd) {
        if (pStart > pEnd || iStart > iEnd) {
            return null;
        }

        const val = preorder[pStart];
        const node = new TreeNode(val);
        const index = inorder.findIndex((item) => item === val);

        node.left = build(pStart + 1, pStart + index, iStart, index - 1);
        node.right = build(pStart + index + 1, pEnd, index + 1, iEnd);

        return node;
    };

    return build(0, preorder.length - 1, 0, inorder.length - 1);
};

console.log(buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]));

const obj = {
    _a: 1,
    set a (val) {
        this._a = val;
    }
};

Object.defineProperty(obj, 'a', {
    get () {
        console.log('ss');

        return this._a;
    }
});
const property = Object.getOwnPropertyDescriptor(obj, 'a');

console.log(property);

function quickSort (arr) {
    const sort = (left, right) => {
        if (left >= right) {
            return;
        }

        // 任意基准元素
        const base = Math.floor((left + right) / 2);
        const p = arr[base];
        let l = left;
        let r = right;

        while (l < r) {
            // 这里的 = 是必须的，因为处理了边界条件
            // 如果 l<r 就结束循环，那这里 l 最终会等于 r
            // 且无法知道 arr[r] 是放 base 元素的左边还是右边
            // 导致下面的交换 base 和 mid 元素出错
            // 加上 = ，l 要么大于 r 要么等于 r
            // 最终 arr[r] 一定在 base 元素左边
            while (arr[l] <= p && l <= r) {
                l++;
            }

            while (arr[r] >= p && l <= r) {
                r--;
            }

            if (l < r) {
                [arr[l], arr[r]] = [arr[r], arr[l]];
            }
        }

        // 首先在上面的 arr[l] <= p 和 arr[r] >= p 的判断中
        // base 元素不会被交换走，即 base 元素始终在数组中位置固定
        // 包括 r 的左部分，在 base 元素的左边，另外部分在 base 元素的右边
        // 所以要根据 base 和 r 的位置关系，来确定 base 和哪个元素交换
        const mid = base > r ? r + 1 : r;

        [arr[base], arr[mid]] = [arr[mid], arr[base]];

        sort(left, mid - 1);
        sort(mid + 1, right);
    };

    sort(0, arr.length - 1);

    return arr;
}

console.log(quickSort([5, 4, 1, 1, 8, 2, 1, 4, 12, 53, 25]));
