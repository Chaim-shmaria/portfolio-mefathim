from track import Track


class Commercial(Track):
    def __init__(self, artist):
        super().__init__('Commercial', 60, artist)
        self.artist = artist

    def __repr__(self) -> str:
        return super().__repr__()

    def play(self):
        super().play()
        print(f'For more songs by {self.artist}, go to GoodVibes website')

    def stop(self):
        super().stop()


def main():
    a = Commercial('Harry')
    print(a)
    a.play()


if __name__ == '__main__':
    main()
