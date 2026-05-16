export const SCALE = 20;
export const SPRITES_PATH = "./assets/sprites.png";
export const PLAYER_PATH = "./assets/player.png";
export const PLAYER_X_OVERLAP = 4;

export function flipHorizontally(context, around) {
    context.translate(around, 0);
    context.scale(-1, 1);
    context.translate(-around, 0);
}