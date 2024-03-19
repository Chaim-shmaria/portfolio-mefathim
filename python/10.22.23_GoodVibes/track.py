class Track:
    def __init__(self, name, duration, artist):
        self.name = name
        if duration > 0:
            self.duration = duration
        else:
            raise ValueError("Invalid track duration")
        self.artist = artist
        self.is_played = False

    def __repr__(self):
        return f"{self.name}: {self.duration}"

    def play(self):
        self.is_played = True

    def stop(self):
        self.is_played = False


def main():
    temp_track = Track('haim', 365, 'hashem')
    print(temp_track)


if __name__ == '__main__':
    main()
