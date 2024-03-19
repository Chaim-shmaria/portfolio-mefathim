# all script finished at: 10.27.23
def max_subarray(array, k):
    subarray = [None]
    current_sum = 0
    start = 0
    for i in range(len(array)):
        current_sum += array[i]
        if current_sum == k and i - start > len(subarray):
            subarray = array[start:i + 1]
        elif current_sum < k:
            continue
        while current_sum > k:
            current_sum -= array[start]
            start += 1

    if subarray[0]:
        return subarray
    print("no subarray were founded")


# num = 18
# temp = [1, 2, 16, 3, 4, 5, 6, 7]
# print(max_subarray(temp, num))


def find_pair(array, k):
    unresolved_pairs = {}
    for i in range(len(array)):
        if array[i] in unresolved_pairs:
            return unresolved_pairs[array[i]], i
        if array[i] > k:
            continue
        else:
            complementary = k - array[i]
            unresolved_pairs[complementary] = i


# num = 71
# temp = [1, 2, 3, 4, 5, 6, 70, 8, 9, 50]
# i, j = find_pair(temp, num)
# print(temp[i], temp[j])

def largest_equal(array):
    max_sub = [None]
    digits_sum = 0
    start = 0
    hush = {}
    for i in range(len(array)):
        digits_sum += array[i] * 2 - 1
        if digits_sum == 0 and i + 1 - start > len(max_sub):
            max_sub = array[start:i + 1]
            start = i + 1

        elif digits_sum in hush and i - hush[digits_sum] > len(max_sub):
            max_sub = array[hush[digits_sum] + 1: i + 1]
            start = i + 1

        else:
            hush[digits_sum] = i

    if max_sub[0]:
        return max_sub

# temp = [0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1,
#         0, 0]
# print(largest_equal(temp))

def kadan_s_algorithm(array):
    current_sum = array[0]
    max_sum = array[0]
    indexes = (0, None)
    indexes2 = None
    for i in range(1, len(array)):
        if array[i] > current_sum+array[i]:
            current_sum = array[i]
            indexes = i, i
        elif array[i] <= current_sum+array[i]:
            current_sum += array[i]
            indexes = indexes[0],i
        if current_sum >= max_sum:
            max_sum = current_sum
            indexes2 = indexes
    return max_sum, indexes2


# temp = [1, 2, -4, 1, 2, -3, 1, 2, -2, 1, 2, -10, 1, 2]
# print(kadan_s_algorithm(temp))

def min_with_size_k(array, k):
    if len(array) < k:
        raise ValueError("array is too short")
    current = sum(array[:k + 1])
    min = sum(array)
    arr = array
    for i in range(k, len(array)):
        current+=array[i]
        current -= array[i - k]
        if current < min:
            min = current
            arr = array[i-k+1:i+1]
    return min,arr

# temp = [1, 2, -4, 1, 2, -3, 1, 2, -2, 1, 2, -10, 1, 2]
# print(min_with_size_k(temp, 5))