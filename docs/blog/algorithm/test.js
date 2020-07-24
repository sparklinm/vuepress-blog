const searchRange = function (nums, target) {
  function search (nums, target, isLeft = true) {
    let start = 0
    let end = nums.length - 1
    let index = -1

    while (start <= end) {
      const mid = Math.floor((start + end) / 2)

      if (target === nums[mid]) {
        index = mid
        if (isLeft) {
          end = mid - 1
        } else {
          start = mid + 1
        }
        continue
      }
      if (target < nums[mid]) {
        end = mid - 1
      } else {
        start = mid + 1
      }
    }
    return index
  }

  const l = search(nums, target)
  const r = search(nums, target, false)

  return [l, r]
}

searchRange([5, 7, 7, 8, 8, 10], 8)

const searchMatrix = function (matrix, target) {
  if (!matrix.length) {
    return false
  }
  const left = 0
  const top = 0
  const right = matrix[0].length - 1
  const bottom = matrix.length - 1

  function search (matrix, target, left, top, right, bottom) {
    let nleft = left
    let nright = right
    let ntop = top
    let nbottom = bottom

    while (left <= right || top <= bottom) {
      while (nleft <= nright) {
        const mid = Math.floor((nleft + nright) / 2)

        if (target < matrix[ntop][mid]) {
          nright = mid - 1
        } else if (target > matrix[ntop][mid]) {
          nleft = mid + 1
        } else {
          return true
        }
      }

      if (nright < left) {
        return false
      }
      right = nright
      nleft = left

      while (ntop <= nbottom) {
        const mid = Math.floor((ntop + nbottom) / 2)

        if (target < matrix[mid][nleft]) {
          nbottom = mid - 1
        } else if (target > matrix[mid][nleft]) {
          ntop = mid + 1
        } else {
          return true
        }
      }

      if (nbottom < top) {
        return false
      }
      bottom = nbottom
      ntop = top

      while (nleft <= nright) {
        const mid = Math.floor((nleft + nright) / 2)

        if (target < matrix[nbottom][mid]) {
          nright = mid - 1
        } else if (target > matrix[nbottom][mid]) {
          nleft = mid + 1
        } else {
          return true
        }
      }

      if (nleft > right) {
        return false
      }
      left = nleft
      nright = right

      while (ntop <= nbottom) {
        const mid = Math.floor((ntop + nbottom) / 2)

        if (target < matrix[mid][nright]) {
          nbottom = mid - 1
        } else if (target > matrix[mid][nright]) {
          ntop = mid + 1
        } else {
          return true
        }
      }

      if (ntop > bottom) {
        return false
      }
      top = ntop
      nbottom = bottom
    }
  }

  return search(matrix, target, left, top, right, bottom)
}

console.log(searchMatrix([[1, 1]], 2))



/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
const exist = function (board, word) {
  const left = 0
  const top = 0
  const right = board[0].length - 1
  const bottom = board.length - 1
  const used = new Array(bottom + 1)

  // 二维矩阵used
  for (let i = 0; i <= bottom; i++) {
    used[i] = new Array(right + 1)
  }

  if (word.length > (right + 1) * (bottom + 1)) {
    return false
  }

  // i j是当前点的坐标，index是当前考察的字符索引
  function find (i, j, index) {
    if (index >= word.length) {
      return true
    }

    if (i < top || i > bottom || j < left || j > right) {
      return false
    }

    if (used[i][j]) {
      return false
    }

    if (word[index] !== board[i][j]) {
      return false
    }

    used[i][j] = true
    const flag =
      find(i - 1, j, index + 1) ||
      find(i, j - 1, index + 1) ||
      find(i + 1, j, index + 1) ||
      find(i, j + 1, index + 1)

    if (flag) {
      return true
    }

    used[i][j] = false
    return false
  }

  for (let i = 0; i <= bottom; i++) {
    for (let j = 0; j <= right; j++) {
      if (find(i, j, 0)) {
        return true
      }
    }
  }

  return false
}
