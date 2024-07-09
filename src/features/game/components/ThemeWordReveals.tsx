'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils';
import { PropsWithChildren, useState } from 'react';
import { Eye, Waypoints, Lightbulb } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
type ThemeWordRevealProps = {
    word: string;
    isSpangram?: boolean;
    revealLocation: (word: string) => void;
    hint: string;
};
export function ThemeWordReveal({
    word,
    isSpangram,
    revealLocation,
    hint,
}: ThemeWordRevealProps) {
    const chars = word.split('');
    const [hintShown, setHintShown] = useState(false);
    const [revealed, setRevealed] = useState(chars.map(() => false));
    return (
        <Card className="flex w-full flex-col gap-1 rounded-md bg-card text-lg">
            {isSpangram && (
                <CardHeader>
                    <CardTitle>Spangram</CardTitle>
                </CardHeader>
            )}
            <div
                className={cn(
                    'grow overflow-clip rounded-md transition-all',
                    revealed.some((r) => !r) && 'bg-primary/10'
                )}>
                {chars.map((char, i) => (
                    <ThemeCharReveal
                        revealed={revealed[i]}
                        key={`char-${i}`}
                        onClick={() =>
                            setRevealed((old) =>
                                old.map((value, j) => {
                                    if (i !== j) return value;
                                    return !value;
                                })
                            )
                        }>
                        {char}
                    </ThemeCharReveal>
                ))}
            </div>
            {hintShown && <div className="p-4 italic">{hint}</div>}
            <div className="flex gap-2">
                <Button
                    size="icon"
                    onClick={() => setRevealed((old) => old.map((v) => !v))}>
                    <Eye className="size-full p-1" />
                </Button>
                <Button size="icon" onClick={() => revealLocation(word)}>
                    <Waypoints className="size-full p-1" />
                </Button>
                <Button size="icon" onClick={() => setHintShown((v) => !v)}>
                    <Lightbulb className="size-full p-1" />
                </Button>
            </div>
        </Card>
    );
}

function ThemeCharReveal({
    revealed = false,
    children,
    onClick,
}: { revealed?: boolean; onClick: () => void } & PropsWithChildren) {
    return (
        <Button
            className={cn(
                'rounded-none opacity-0 transition-all last:rounded-r-md',
                revealed && 'opacity-100'
            )}
            onClick={onClick}>
            {children}
        </Button>
    );
}
