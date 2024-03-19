from collections import Counter


class Constitution:
    def __init__(self):
        self.constitution = []

    def __repr__(self):
        return f'Constitution contains: {self.constitution}'

    def add_rule(self, rule):
        self.constitution.append(rule)

    def remove_rule(self, rule):
        self.constitution.remove(rule)


def most_productive(legislators: dict):
    ministries = list(legislators.values())
    activation = Counter(ministries)
    most_active = activation.most_common(1)[0][0]
    return most_active


a = Constitution()
a.add_rule('aaa')
a.add_rule('bbb')
print(a)
a.remove_rule('aaa')
print(a)
t = {'a': 1, 'b': 2, 'c': 2}
print(most_productive(t))
