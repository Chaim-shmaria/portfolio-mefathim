# created: 10.29.23
# done: 11.2.23
import pygame
from spase_invaders import Manager

# pygame setup
pygame.init()
pygame.font.init()
clock = pygame.time.Clock()
running = True
slowing = 0

# init program by calling the manager:
manager = Manager()

while running:

    # reload screen image:
    manager.screen.blit(pygame.image.load(manager.images['space']), (0, 0))

    # click on 'x' or press 'esc' to quit:
    for event in pygame.event.get():
        if (event.type == pygame.QUIT
                or (event.type == pygame.KEYDOWN and event.key == pygame.K_ESCAPE)):
            running = False

    # key press of spacecraft:
    key = pygame.key.get_pressed()
    if key[pygame.K_LEFT]:
        manager.spacecraft.move('right')
    elif key[pygame.K_RIGHT]:
        manager.spacecraft.move('left')
    if key[pygame.K_SPACE] and slowing > 30:
        slowing = 0
        manager.shots.add(manager.new_shot(manager.spacecraft))

    # check shots update:
    for shot in manager.shots:
        shot.move(manager)
    manager.shots.update()
    # random invader shots:
    if manager.invaders:
        manager.invaders_shot()

    # drawing:
    manager.drawing()

    # win/lose state:
    if manager.spacecraft.life_time < 1:
        manager.game_over()
    if len(manager.invaders) == 0:
        manager.victory()

    # display:
    pygame.display.flip()

    slowing += 1
    clock.tick(30)  # limits FPS to 30

pygame.quit()
