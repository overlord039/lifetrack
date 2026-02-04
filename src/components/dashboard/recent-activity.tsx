import type { Expense } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type RecentActivityProps = {
    expenses: Expense[];
};

export function RecentActivity({ expenses }: RecentActivityProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Expenses</CardTitle>
                <CardDescription>A log of your most recent transactions.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Category</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {expenses.slice(0, 5).map((expense) => (
                            <TableRow key={expense.id}>
                                <TableCell>
                                    <div className="font-medium">{expense.category}</div>
                                    <div className="text-sm text-muted-foreground">{expense.note}</div>
                                </TableCell>
                                <TableCell className="text-right">₹{expense.amount.toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
