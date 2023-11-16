import random
class Clip:
    def __init__(self, name, year):
        self.name = str(name)
        if year < 0:
            raise ValueError("year must be greater than 0")
        self.year = int(year)
        self.is_played = False

    # @property
    # def name(self):
    #     return self._name
    #
    # def name(self, name):
    #     if type(name) != str:
    #         raise ValueError("wrong type")
    #     else:
    #         self._name = name
    #
    # def year(self):
    #     return self._year
    #
    # def year(self, year):
    #     if type(year) != int or year < 0:
    #         raise ValueError("wrong type")
    #     else:
    #         self._year = year

    def __repr__(self):
        return f"{self.name}: {self.year}"

    def play(self):
        self.is_played = True

    def stop(self):
        self.is_played = False


class ArtClip(Clip):
    def __init__(self, name, year, time):
        super().__init__(name, year)
        if year <= 0 or time <= 0:
            raise ValueError("year or time are incorrect")
        self.time = int(time)

    def __repr__(self):
        return f"{self.name}: {self.year} ({self.time})"

    def is_valid_for_euro(self):
        return self.time < 3


class Player:
    def __init__(self, clips):
        for clip in clips:
            clip.stop()
        self.current = None
        self.clips = clips

    def __repr__(self):
        if self.current:
            return f"{self.current} is played now"
        else:
            return "no clip is played now"

    def __next__(self):
        if self.current:
            idx = self.clips.index(self.current)
            self.clips[idx].stop()
            self.clips[idx+1].play()
            self.current = self.clips[idx+1]
        elif self.current == self.clips[-1]:
            self.clips[-1].stop()
            self.clips[0].play()
            self.current = self.clips[0]
        elif not self.current:
            self.clips[0].play()
            self.current = self.clips[0]

    def shuffle(self):
        for i in range(len(self.clips)):
            idx = random.randint(i, len(self.clips)-1)
            self.clips[i], self.clips[idx] = self.clips[idx], self.clips[i]




a = Clip('haim',1997)
b = Clip('pinchas',2001)
c = Clip('ani-maamin',2000)
d = [a,b,c]
z = Player(d)
print(z)
z.__next__()
print(z)
z.__next__()
print(z)
z.shuffle()
print(d)