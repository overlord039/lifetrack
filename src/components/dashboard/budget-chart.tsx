'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

type BudgetChartProps = {
    data: {
        date: string;
        spent: number;
        budget: number;
    }[];
};

export function BudgetChart({ data }: BudgetChartProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Budget Overview</CardTitle>
                <CardDescription>Daily spending vs. allowed budget for the last 7 days.</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <XAxis
                            dataKey="date"
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `₹${value / 1000}k`}
                        />
                        <Tooltip
                            cursor={{ fill: 'hsl(var(--muted))' }}
                            contentStyle={{ 
                                background: 'hsl(var(--background))', 
                                border: '1px solid hsl(var(--border))',
                                borderRadius: 'var(--radius)',
                            }}
                        />
                        <Legend wrapperStyle={{fontSize: "0.8rem"}}/>
                        <Bar dataKey="budget" fill="hsl(var(--chart-2))" name="Budget" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="spent" fill="hsl(var(--chart-1))" name="Spent" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
