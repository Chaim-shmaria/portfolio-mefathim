# date: 9.20.23
class MinHeap:

    def __init__(self, arr=None):
        self.array = arr
        if arr:
            self.init_min_heap(arr)

    def init_min_heap(self, array):
        for i in range(len(array) // 2, -1, -1):
            self.heapify_min_heap(i)

    def heapify_min_heap(self, idx):
        l = idx * 2 + 1
        r = idx * 2 + 2
        smallest = idx
        if l <= len(self.array) - 1 and self.array[idx] > self.array[l]:
            smallest = l
            if r <= len(self.array) - 1 and self.array[r] < self.array[l]:
                smallest = r
        elif r <= len(self.array) - 1 and self.array[idx] > self.array[r]:
            smallest = r
        if smallest != idx:
            self.array[idx], self.array[smallest] = self.array[smallest], self.array[idx]
            self.heapify_min_heap(smallest)

    def insertion(self, key):
        self.array.append(key)
        self.insertion_heapify(len(self.array) - 1)

    def insertion_heapify(self, idx):
        if idx > 0:
            if idx % 2 == 0:
                parent = (idx - 2) // 2
            else:
                parent = (idx - 1) // 2
            if self.array[idx] < self.array[parent]:
                self.array[idx], self.array[parent] = self.array[parent], self.array[idx]
                self.insertion_heapify(parent)

    def min(self):
        return self.array[0]

    def min_extraction(self):
        min = self.min()
        self.array[0] = self.array[- 1]
        self.array = self.array[:-1]
        self.heapify_min_heap(0)
        return min

    def is_empty(self) -> bool:
        return len(self.array) == 0

    def heap_sort(self, sorted_heap=None):
        if sorted_heap == None:
            sorted_heap = []
        while not self.is_empty():
            sorted_heap.append(self.min_extraction())
        return sorted_heap

