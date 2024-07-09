export const revalidate = 3600;
import { BoardSection } from '@/features/game/components/BoardSection';
import { getGame } from '@/utils/game';
import { fetchHints } from '@/features/game/actions';
import { getHints } from '@/features/game/api';
export default async function Home() {
    const game = await getGame(new Date());

    const hints = await getHints([game.spangram, ...game.themeWords]);
    console.log(hints);
    return (
        <main className="font-body mx-auto flex min-h-screen w-full max-w-screen-sm flex-col items-center gap-4 p-4">
            <BoardSection game={game} hints={hints} />
        </main>
    );
}
