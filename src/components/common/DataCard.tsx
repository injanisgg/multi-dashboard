import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import type { LucideIcon } from "lucide-react";

interface DataCardProps {
    title: string;
    value: string | number;
    description?: string;
    icon?: LucideIcon;
    trend?: {
        value: number;
        isPositive?: boolean;
    };
    className?: string;
}

export function DataCard({
    title,
    value,
    description,
    icon: Icon,
    trend,
    className = '',
}: DataCardProps) {
    return(
        <Card className={className}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {Icon && <Icon className="h-4 w-4 text-muted-foreground"/>}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {(description || trend) && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        {trend && (
                            <span
                             className={`font-medium ${
                                    trend.isPositive ? 'text-green-600' : 'text-red-600'
                                }`}
                            >
                                {trend.isPositive ? '+' : '-'}
                                {trend.value.toFixed(2)}%
                            </span>
                        )}
                        {description && <CardDescription>{description}</CardDescription>}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}