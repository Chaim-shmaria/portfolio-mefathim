#include <memory>
#include <iostream>


template <typename Data>
class LinkedList {

private:
    struct Node {
        Data m_data;
        std::unique_ptr<Node> m_next;

        Node(Data data, std::unique_ptr<Node> next)
        : m_data(data), m_next(std::move(next))
        {
        }
    };

    struct Iterator {
        explicit Iterator(Node* node) : current(node) {}
        Data& operator*() const { return current->m_data; }
        Iterator& operator++()
        {
            current = current->m_next.get();
            return *this;
        }
        bool operator!=(const Iterator& other) const
        {
            return current != other.current;
        }
        Iterator& operator=(Data& data)
        {
            current->m_data = data;
            return *this;
        }
        using iterator_category = std::forward_iterator_tag;
        using difference_type = std::ptrdiff_t;
        using value_type = Data;
        using pointer = Data*;
        using reference = Data&;

    private:
        Node* current;
    };

public:
    explicit LinkedList(size_t size);
    ~LinkedList();
    LinkedList(LinkedList& list);
    LinkedList& operator=(const LinkedList& list);
    size_t size() const { return m_size; };
    size_t max_size() const { return m_maxSize; };
    Node* head() const { return m_head.get(); };
    void insert(Data data);
    Node* push_back(Data data, Node* tail = nullptr);
    Data head_value() const;
    void remove_head();
    void print() const;
    Iterator begin() const { return Iterator(m_head.get()); }
    Iterator end() const { return Iterator(nullptr); }
    bool operator==(const LinkedList<Data>&other) const;
    LinkedList<Data>& operator=(const std::initializer_list<Data>& list);

private:
    size_t m_size;
    size_t m_maxSize;
    std::unique_ptr<Node> m_head;
};

template <typename Data>
LinkedList<Data>::LinkedList(size_t size)
: m_size(0)
, m_maxSize(size)
, m_head(nullptr)
{
}

template <typename Data>
LinkedList<Data>::LinkedList(LinkedList& list)
: m_size(0)
, m_maxSize(list.m_maxSize)
, m_head(nullptr)
{
    if (!list.m_head) { return; }

    Node* tail = m_head.get();
    Node* source = list.m_head.get();

    while (source) {
        tail = push_back(source->m_data, tail);
        source = source->m_next.get();
    }
}

template <typename Data>
LinkedList<Data>& LinkedList<Data>::operator=(const LinkedList& list)
{
    LinkedList<Data> temp(list);
    swap(*this, temp);
    return *this;
}

template <typename Data>
void LinkedList<Data>::insert(Data data)
{
    if (m_size >= m_maxSize) { std::cout << "List OverFlow"; return;}
    m_size++;
    m_head = std::make_unique<Node>(data, move(m_head));
}

template<typename Data>
typename LinkedList<Data>::Node* LinkedList<Data>::push_back(Data data, Node* tail)
{
    if (m_size >= m_maxSize) { std::cout << "List OverFlow" << "\n"; return tail; }

    m_size++;
    if (!m_head) {
        m_head = std::make_unique<Node>(data, nullptr);
        return m_head.get();
    }
    if (!tail) {
        tail = m_head.get();
    }

    while (tail->m_next) {
        tail = tail->m_next.get();
    }
    tail->m_next = std::make_unique<Node>(data, nullptr);
    return tail->m_next.get();
}

template <typename Data>
Data LinkedList<Data>::head_value() const
{
    if (!m_head) { std::cout<< "List is empty!"; return Data(); }
    return m_head->m_data;
}

template <typename Data>
void LinkedList<Data>::remove_head()
{
    if (!m_head) { std::cout<< "List is empty!"; return; }
    m_size--;
    m_head = std::move(m_head->m_next);
}

template <typename Data>
void LinkedList<Data>::print() const
{
    Node* node = m_head.get();
    while (node) {
        std::cout << node->m_data << ", ";
        node = node->m_next.get();
    }
    std::cout << std::endl;
}

template <typename Data>
bool LinkedList<Data>::operator==(const LinkedList<Data>& other) const
{
    if (m_size != other.m_size) { return false; }
    Iterator this_it = this->begin(), other_it = other.begin();

    while (this_it != this->end()) {
        if (*this_it != *other_it) { return false; }
        ++this_it;
        ++other_it;
    }
    return true;
}

template <typename Data>
LinkedList<Data>& LinkedList<Data>::operator=(const std::initializer_list<Data>& list)
{
    if (list.size() > m_maxSize) {std::cout << " not enough memory"; return *this; }
    m_size = 0;
    m_head = nullptr;
    for (auto& data : list) {
        this->insert(data);
    }
    return *this;
}

template <typename Data>
LinkedList<Data>::~LinkedList()
{
    while (m_head) {
        m_head = move(m_head->m_next);
    }
}

template<typename Data>
std::ostream& operator<<(std::ostream&, LinkedList<Data>& list)
{
    list.print();
    return std::cout;
}

// TODO:
//  get rid of iterator class's using namespaces...
//  follow privet/public and const's
