import type { DiaryEntry } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PenSquare } from "lucide-react";

type DiaryPromptProps = {
    entry: DiaryEntry | null;
};

export function DiaryPrompt({ entry }: DiaryPromptProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Daily Diary</CardTitle>
                <CardDescription>
                    {entry ? "Your entry for today is complete." : "Take a moment to reflect on your day."}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {entry ? (
                    <div className="space-y-2 text-sm text-muted-foreground">
                        <p><strong>What I did:</strong> {entry.didToday.substring(0, 50)}...</p>
                        <p><strong>What I learned:</strong> {entry.learned.substring(0, 50)}...</p>
                        <p><strong>Mood:</strong> {entry.mood}</p>
                    </div>
                ) : (
                    <div className="text-center p-4 border-2 border-dashed rounded-lg">
                        <PenSquare className="mx-auto h-8 w-8 text-muted-foreground mb-2"/>
                        <p className="text-sm text-muted-foreground mb-4">You haven't written your diary entry for today.</p>
                        <Button asChild>
                            <Link href="/diary">Write Entry</Link>
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
