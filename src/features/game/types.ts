import { z } from 'zod';

export const DailyGameSchema = z.object({
    id: z.number(),
    themeWords: z.array(z.string()),
    spangram: z.string(),
    clue: z.string(),
    startingBoard: z.array(z.string()),
    solutions: z.array(z.string()),
    themeCoords: z.record(
        z.string(),
        z.array(z.tuple([z.number(), z.number()]))
    ),
});

export const HintsSchema = z.record(z.string(), z.string());
export type Hints = z.infer<typeof HintsSchema>;

export type DailyGame = z.infer<typeof DailyGameSchema>;
type HintStatus = 'hidden' | 'word' | 'location';
type GameState = {
    spanGram: HintStatus;
    themeWords: Record<string, HintStatus>;
};
