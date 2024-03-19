# nwxt code in O(n*k):
def k_bonacci(n, k):
    array = []
    for i in range(k):
        array.append(i)
    for i in range(k, n + 1):
        array.append(sum(array))
        array = array[1:]
    return array[k - 1]


# print(k_bonacci(7,3))


# next code is in O(n):
def fixed_k_bonacci(n, k):
    array = []
    current = 0
    for i in range(k):
        array.append(i)
        current += i
    for i in range(k, n + 1):
        array.append(current)
        current = current * 2 - array[0]
        array = array[1:]
    return array[k - 1]


print(fixed_k_bonacci(0, 2))
