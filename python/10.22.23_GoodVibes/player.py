from track import Track
from Commercial import Commercial
import random


class Player:
    def __init__(self, tracks: list):
        self.tracks = tracks
        self.current = None
        self.artists = set()
        for track in tracks:
            self.artists.add(track.artist)
        for artist in self.artists:
            tracks.append(Commercial(artist))

    def next(self, rand=False):
        if rand is True:
            random_song = random.randint(0, len(self.tracks) - 1)
            self.tracks[random_song].play()
        elif self.current:
            self.tracks[self.current].stop()
            self.tracks[self.current + 1].play()
        elif self.current == self.tracks[-1]:
            self.tracks[-1].stop()
            self.tracks[0].play()
        else:
            self.tracks[0].play()


def main():
    a = [Track('a', 50, 'c')]
    b = Player(a)
    print(b.tracks)


if __name__ == '__main__':
    main()
