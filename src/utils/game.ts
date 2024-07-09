import { DailyGameSchema } from '@/features/game/types';

export function getGame(date?: Date) {
    date ??= new Date();
    //https://www.nytimes.com/games-assets/strands/2024-07-08.json
    const fileName = date.toISOString().split('T')[0];
    const fullUrl = `https://www.nytimes.com/games-assets/strands/${fileName}.json`;
    return fetch(fullUrl)
        .then((res) => res.json())
        .then((data) => DailyGameSchema.parse(data));
}
