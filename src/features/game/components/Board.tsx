import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/utils';
import { PropsWithChildren } from 'react';

export function Board({
    title,
    children,
}: { title: string } & PropsWithChildren) {
    return (
        <Card className="sticky top-0 w-full">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="mx-auto grid w-fit grid-cols-6 grid-rows-6 place-content-center items-center justify-center text-center font-sans text-2xl">
                {children}
            </CardContent>
        </Card>
    );
}
type BoardCellProps = {
    revealed?: boolean;
    shift: number;
} & PropsWithChildren;
export function BoardCell({ children, revealed, shift }: BoardCellProps) {
    const filter = `hue-rotate(${shift}turn)`;
    return (
        <div
            className={cn('rounded-md p-2', revealed && 'bg-primary/50')}
            style={{ filter }}>
            {children}
        </div>
    );
}
