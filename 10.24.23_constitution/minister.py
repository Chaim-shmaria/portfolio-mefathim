# need to fix warnings
from constitution import Constitution


class Minister(Constitution):
    def __init__(self, name, party):
        super().__init__()
        self.name = name
        self.party = party

    def add_rule(self, rule, consitution):
        consitution.add_rule(rule)
        print(f"A new rule by {self.name} was accepted")

    def cancel_rule(self, rule, constitution):
        constitution.remove_rule(rule)
        print(f"Rule was canceled by {self.name}")


class ActingMinister(Minister):
    def __init__(self, name, party, ministry_name):
        super().__init__(name, party)
        self.ministry_name = str.upper(ministry_name)

    def add_rule(self, rule, consitution, votes):
        if sum(votes) * 2 > len(votes):
            super().add_rule(rule, consitution)
        else:
            print("Rule was not accepted")

    def cancel_rule(self, rule, constitution):
        for rule in constitution.constitution:
            print(self.ministry_name, rule)
            if self.ministry_name.casefold() in rule.casefold():
                print(1111111111)
                super().cancel_rule(rule, constitution)
                return

        raise ValueError('Changes in this part of the law are not under the responsibility of this minister')


def main():
    c = Constitution()
    haim = Minister('haim', c)
    yehuda = ActingMinister('yehuda', c, 'defence')
    votes = [1, 1, 1, 0, 0, 0, 1]
    haim.add_rule('aaa', c)
    haim.add_rule('bbb', c)
    haim.add_rule('ccc', c)
    haim.add_rule('ddd', c)
    print(c)
    haim.cancel_rule('aaa', c)
    print(c)
    print(yehuda.ministry_name)
    yehuda.add_rule('defence', c, votes)
    print(c)
    yehuda.cancel_rule('defence', c)
    print(c)


if __name__ == '__main__':
    main()
