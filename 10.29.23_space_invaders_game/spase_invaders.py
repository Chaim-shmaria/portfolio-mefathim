# created: 10.29.23
# done: 11.2.23
import pygame
import random


class Attributes(pygame.sprite.Sprite):
    def __init__(self, img=None, pos=None, img2=None):
        pygame.sprite.Sprite.__init__(self)
        self.height = 720
        self.width = 1280
        if img:
            self.image = pygame.image.load(img)
            self.rect = self.image.get_rect()
            self.rect.center = pos
        if img2:
            self.img2 = pygame.image.load(img2)
        self.velocity = 3
        self.life_time = 3
        self.invaders_pos = None


class SpaceCraft(Attributes):
    def render(self, screen):
        if self.life_time > 0:
            screen.blit(self.image, self.rect)
        else:
            self.rect.y = 600
            screen.blit(self.img2, self.rect)

    def move(self, direction):
        if self.life_time > 0:
            x, y = self.rect.center
            if direction == 'right':
                self.rect.center = x - 6, y
            else:
                self.rect.center = x + 6, y

    def hit(self):
        if self.life_time > 0:
            self.life_time -= 1
        # if self.life_time == 0:
        #     self.game_over()


class SpaceInvader(Attributes):

    def update(self, flip):
        if flip:
            self.velocity *= -1
            self.rect.y += 5
        self.rect.x += self.velocity

    def get_group(self, img):
        array = []
        self.invaders_pos = []
        for i in range(4):
            for j in range(6):
                invader = SpaceInvader(img, (j * 120 + 500, i * 100 + 100))
                array.append(invader)
                self.invaders_pos.append(invader.rect)
        return array


class Walls(Attributes):
    pass

class Shot(Attributes):
    def __init__(self, img, pos, shooter, spacecraft, invaders, walls, shots, screen):
        super().__init__(img, pos)
        self.velocity = 10
        self.spacecraft = spacecraft
        self.invaders = invaders
        self.walls = walls
        self.screen = screen
        self.shooter = shooter
        self.shoots = shots
        if shooter == SpaceInvader:
            self.image = pygame.transform.scale(self.image, (100, 200))
            self.rect.x += 23

    def move(self, manager):
        if self.shooter == SpaceCraft and self.rect.y > 10:
            self.rect.y -= self.velocity
        elif self.shooter == SpaceInvader and self.height - 10 > self.rect.y:
            self.rect.y += self.velocity
        else:
            self.kill()

        if pygame.sprite.collide_mask(self, self.spacecraft) and self.shooter == SpaceInvader:
            self.spacecraft.hit()
            self.kill()

        for invader in self.invaders:
            if pygame.sprite.collide_mask(self, invader) and self.shooter == SpaceCraft:
                invader.kill()
                self.kill()
                manager.my_score += 10

        for wall in self.walls:
            if pygame.sprite.collide_mask(self, wall):
                self.kill()
                wall.kill()

        for shot in manager.shots:
            if pygame.sprite.collide_mask(self, shot) and shot != self:
                shot.kill()
                self.kill()
                manager.my_score += 30


class Manager:
    def __init__(self):
        self.height = 720
        self.width = 1280
        self.inv_amount = 24  # at least 6
        self.slowing = 0
        self.screen = pygame.display.set_mode((self.width, self.height))
        self.images = images = {
            'spacecraft': 'images//spacecraft.png',
            'alien': 'images//alien.png',
            'space': 'images//space.jpg',
            'rocket': 'images//rocket.png',
            'pitchfork': 'images//pitchfork2.ico',
            'skull': 'images//skull.png',
            'knife': 'images//knife.png'
        }

        self.spacecraft = SpaceCraft(images['spacecraft'], (700, 640), images['skull'])
        self.lives = [SpaceCraft(images['spacecraft'], (i * 50 + 20, 700)) for i in range(3)]
        self.invaders = (self.init_invaders_group(images['alien']))
        self.walls = self.init_walls()
        self.shots = pygame.sprite.Group()
        self.my_score = 0

    def init_invaders_group(self, img):
        array = pygame.sprite.Group()
        for i in range(self.inv_amount // 6):
            for j in range(self.inv_amount // 4):
                invader = SpaceInvader(img, (j * 120 + 500, i * 100 + 100))
                array.add(invader)
        return array

    def init_walls(self):
        walls = pygame.sprite.Group()
        for i in range(5, 33):
            walls.add(Walls(self.images['knife'], (i * 35, 525)))
        return walls

    def update_invaders(self, invaders):
        flip = False
        for invader in invaders:
            if invader.rect.x > self.width - 100 or invader.rect.x < 50:
                flip = True
                break
        invaders.update(flip)

    def new_shot(self, shooter):
        if type(shooter) is SpaceInvader:
            return Shot(self.images['pitchfork'], shooter.rect.center, type(shooter), self.spacecraft, self.invaders,
                        self.walls ,self.shots, self.screen)
        else:
            return Shot(self.images['rocket'], shooter.rect.center, type(shooter), self.spacecraft, self.invaders,
                        self.walls, self.shots, self.screen)

    def invaders_shot(self):
        if self.slowing % 35 == 10:
            random_invader = random.choice(self.invaders.sprites())
            # self.shots.add(self.new_shot(self.images['pitchfork'], random_invader.rect.center, 'Invader'))
            self.shots.add(self.new_shot(random_invader))

    def score(self):
        font = pygame.font.Font(None, 50)
        text_surface = font.render(f'score: {self.my_score}', True, (211,211,211))
        self.screen.blit(text_surface, (30,20))
    def victory(self):
        font = pygame.font.Font(None, 200)
        text_surface = font.render('you win!', True, (255, 255, 255))
        self.screen.blit(text_surface, (self.width // 2 - 225, self.height // 2 - 100))

    def game_over(self):
        font = pygame.font.Font(None, 200)
        text_surface = font.render('GAME - OVER', True, (255, 0, 0))
        self.screen.blit(text_surface, (self.width // 2 - 425, self.height // 2 - 100))

    def drawing(self):
        self.shots.draw(self.screen)
        self.spacecraft.render(self.screen)
        self.invaders.draw(self.screen)
        self.update_invaders(self.invaders)
        self.walls.draw(self.screen)
        self.score()
        for life in range(self.spacecraft.life_time):
            self.screen.blit(pygame.image.load(self.images['spacecraft']), self.lives[life].rect)
        self.slowing += 1
        if self.slowing > 1500:
            self.slowing = 0

