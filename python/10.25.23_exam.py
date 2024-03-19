# changes in lines: 3, 25, 27, 29, 45, 47, 59, 61, 63, 65, 68.
class Product:
    # change from 'bought_with={}' to bought_with=None.
    def __init__(self, name, bought_with=None):
        if len(name) < 2:
            raise ValueError("Invalid name")
        self.name = str(name)
        self.bought_with = {}
        if bought_with:
            keys = bought_with.keys()
            for key in keys:
                self.bought_with[key] = bought_with[key]

    def __repr__(self):
        return self.name

    def update(self, products_names):
        for product in products_names:
            if product in self.bought_with:
                self.bought_with[product] += 1
            else:
                self.bought_with[product] = 1

    def get_recommendations(self, k) -> list:
        # a critic change from 'sort' to 'sorted'
        all_reco = sorted(self.bought_with, key=lambda x: self.bought_with[x])
        # next line changed from ' = reversed(all_reco)' to 'all_reco[::-1]'
        all_reco = all_reco[::-1]
        # next line changed by adding the first condition
        if all_reco and len(all_reco) > k:
            return all_reco[:k]
        else:
            return all_reco


# b = {'b': 3, 'c': 1, 'd': 9}
# a = Product('aaa', b)
# print(a.bought_with)
# z = ['b', 'c', 'd', 'e']
# a.update(z)
# print(a.bought_with)
# print(a.get_recommendations(3))

class GoldProduct(Product):
    # added '=None' in next line
    def __init__(self, name, amount, bought_with=None):
        # added an "()" after the word "super" and removed an ':' from the end of the next line
        super().__init__(name, bought_with)
        self.amount = amount

    def __repr__(self):
        return f"{self.name}({self.amount} units left)"

    def update(self, products_names):
        self.amount -= 1
        return super().update(products_names)

    def get_recommendations(self, k):
        # next line is all added
        all_reco = {key: value for key, value in self.bought_with.items() if value >= 10}
        # in next line, changed from 'sort' to 'sorted'
        all_reco = sorted(all_reco, key=lambda x: all_reco[x])
        # next line changed from ' = reversed(all_reco)' to 'all_reco[::-1]'
        all_reco = all_reco[::-1]
        # in next line added len to 'all_reco' parameter
        for product in all_reco:
            print(all_reco)
            # substantial change in next line. from 'all_reco[product]' to 'self.bought_with[product]'
            if self.bought_with[product] > 10:
                continue
            all_reco = all_reco[:product]
            break
        if len(all_reco) > k:
            return all_reco[:k]
        else:
            return all_reco
# next code is totally changed !!!
    def fixed_get_recommendations(self, k):
        temp = self.bought_with
        self.bought_with = {key: value for key, value in self.bought_with.items() if value >= 10}
        bought_with2 = super().get_recommendations(k)
        self.bought_with = temp
        return bought_with2


# a = GoldProduct('gold', 5)
# print(a)
# a.update({'aaa', 'bbb'})
# a.update({'aaa', 'bbb'})
# a.update({'aaa', 'bbb'})
# a.update({'aaa', 'bbb'})
# a.update({'aaa', 'bbb'})
# a.update({'aaa', 'bbb'})
# a.update({'aaa', 'bbb'})
# a.update({'aaa', 'bbb'})
# a.update({'aaa', 'bbb'})
# a.update({'aaa', 'bbb'})
# a.update({'aaa', 'bbb'})
# a.update({'aaa', 'bbb'})
# a.update({'aaa', 'bbb'})
# a.update({'aaa', 'bbb'})
# print(a.bought_with)
# print(a.get_recommendations(2))
