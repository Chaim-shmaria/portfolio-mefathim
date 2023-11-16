# finally done at 10.2.23
import math
import random
from MinHeapClass import MinHeap
from tqdm import tqdm
import time
import matplotlib.pyplot as plt


def insertion_sort(arr):
    for i in range(1, len(arr)):
        j = i
        while arr[j - 1] > arr[j] and j > 0:
            arr[j - 1], arr[j] = arr[j], arr[j - 1]
            j -= 1
    return arr


def counting_sort(unsorted_array):
    if not unsorted_array:
        return unsorted_array
    index_array = [0] * (max(unsorted_array) + 1 - min(unsorted_array))
    counter = 0
    sorted_array = [0] * (len(unsorted_array))
    for value in unsorted_array:
        index_array[value - min(unsorted_array)] += 1
    for i in range(len(index_array)):
        counter += index_array[i]
        index_array[i] = counter
    for value in reversed(unsorted_array):
        intended_place = index_array[value - min(unsorted_array)] - 1
        index_array[value - min(unsorted_array)] -= 1
        sorted_array[intended_place] = value
    return sorted_array


def partition(array, inception, end):
    pivot = array[end]
    j = inception - 1
    for i in range(inception, end):
        if array[i] <= pivot:
            j += 1
            array[i], array[j] = array[j], array[i]
    j += 1
    array[j], array[end] = array[end], array[j]
    return j
    # return array


def quick_sort_rec(unsroted_array, inception, end):
    if inception < end:
        pivot = partition(unsroted_array, inception, end)
        quick_sort_rec(unsroted_array, inception, pivot - 1)
        quick_sort_rec(unsroted_array, pivot + 1, end)


def quick_sort(array):
    quick_sort_rec(array, 0, len(array) - 1)
    return array


def merge_sort_operator(array):
    return merge_sort(array, 0, len(array) - 1)


def merge_sort(array, inception, end):
    if end > inception:
        merge_sort(array, inception, inception + ((end - inception) // 2))
        merge_sort(array, (inception + end + 1) // 2, end)
        l = inception
        r = (inception + end + 1) // 2
        temp_array = array[inception:end + 1]
        for i in range(len(temp_array)):
            if array[l] < array[r]:
                temp_array[i] = array[l]
                l += 1
                if l >= (inception + end + 1) // 2:
                    l -= 1
                    array[l] = +float("inf")
            else:
                temp_array[i] = array[r]
                r += 1
                if r > end:
                    r -= 1
                    array[r] = + float("inf")
        for value in temp_array:
            array[inception] = value
            inception += 1
    return array


def heap_sort(arr):
    heap_array = MinHeap(arr)
    return heap_array.heap_sort()


def bubble_sort(arr):
    for i in range(len(arr)):
        for idx in range(len(arr)):
            if idx + 1 <= len(arr) - 1 and arr[idx] > arr[idx + 1]:
                arr[idx + 1], arr[idx] = arr[idx], arr[idx + 1]
    return arr


def radix_sort(arr):
    negative = False
    if min(arr) < 0:
        negative = abs(min(arr))
        for idx in range(len(arr)):
            arr[idx] += negative
    digit_length = round(math.log10(max(arr)) // 1+1)
    for digit_idx in range(1, digit_length + 1):
        half_sorted = [0] * len(arr)
        buckets = [0] * 10
        for value in arr:
            buckets[value % 10 ** digit_idx // 10 ** (digit_idx - 1)] +=1
        sum = 0
        for idx in range(len(buckets)):
            if buckets[idx] != 0:
                sum += buckets[idx]
                buckets[idx] = sum
        for value in reversed(arr):
            half_sorted[buckets[value % 10 ** digit_idx // 10 ** (digit_idx - 1)] - 1] = value
            buckets[value % 10 ** digit_idx // 10 ** (digit_idx - 1)] -= 1
        arr = half_sorted
    if negative:
        for value in range(len(arr)):
            arr[value] -= negative
    return arr


def test(sorting_function, num_of_tests):
    for _ in tqdm(range(num_of_tests)):
        random_length = random.randint(0, 1000)
        #random_length = 10 # temo! used for debugging.
        random_list = [random.randint(-2000, 2000) for _ in range(random_length)]
        expected = sorted(random_list)
        to_test = sorting_function(random_list)
        if to_test != expected:
            print("FAIL!")
            print("your output is:", to_test)
            print("the expected output is:", expected)
            print("try debugging using this input:", random_list)
            return False

    print("You are a king!!")
    return True


def plot_sorting_performance(algorithms):
    # Define the lengths of arrays for performance testing
    lengths = [100, 500, 1_000, 5_000, 10_000, 15_000, 20_000]
    lengths = [50, 60, 100, 200]
    for algo_name, algo_func in tqdm(algorithms.items()):
        execution_times = []
        for length in lengths:
            arr = random.sample(range(length ** 3), length)
            start_time = time.time()
            algo_func(arr)
            end_time = time.time()
            execution_times.append(end_time - start_time)

        # Plot the execution times for each array length
        plt.plot(lengths, execution_times, label=algo_name)

    plt.xlabel("Array Length")
    plt.ylabel("Execution Time (seconds)")
    plt.legend()
    plt.show()


def main():
    algorithms = {
        "Insertion sort": insertion_sort,
        "Counting sort": counting_sort,
        "Quick sort": quick_sort,
        "merge sort": merge_sort_operator,
        "Heap sort": heap_sort,
        "Bubble sort": bubble_sort,
        "radix_sort": radix_sort
    }
    plot_sorting_performance(algorithms)
    #test(radix_sort, 100)


if __name__ == "__main__":
    main()
