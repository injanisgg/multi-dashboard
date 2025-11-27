import { 
    LineChart,
    Line, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer, 
    Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import type { CryptoChartData } from "@/services/api/types/crypto";

interface CryptoPriceChartProps {
    data: CryptoChartData[];
    coinName: string;
    currency?: string;
}

export function CryptoPriceChart({
    data,
    coinName,
    currency = 'USD',
}: CryptoPriceChartProps) {
    // custom tooltip
    const CustomTooltip = ({ active, payload }: any) => {
        if(active && payload && payload.length) {
            return (
                <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                    <p className="text-sm font-medium">{payload[0].payload.date}</p>
                    <p className="text-sm text-primary font-semibold">
                        Price: ${payload[0].value.toLocaleString()}
                    </p>
                    {payload[0].payload.volume && (
                        <p className="text-xs text-muted-foreground">
                            Volume: ${(payload[0].payload.volume / 1e9).toFixed(2)}B
                        </p>
                    )}
                </div>
            );
        }
        return null;
    }

    // format nilai y axis
    const formatYAxis = (value: number) => {
        if (value >= 1000) {
            return `$${(value / 1000).toFixed(0)}k`;
        }
        return `$${value}`;
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{coinName} Price Chart</CardTitle>
                <CardDescription>
                    Historical price in {currency}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart
                     data={data}
                     margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted"/>
                        <XAxis
                         dataKey="date"
                         className="text-xs"
                         tick={{ fill: 'hsl(var(--muted-foreground))' }}
                        />
                        <YAxis 
                         tickFormatter={formatYAxis}
                         className="text-xs"
                         tick={{ fill: 'hsl(var(--muted-foreground))' }}
                        />
                        <Tooltip content={<CustomTooltip />}/>
                        <Legend />
                        <Line 
                         type="monotone"
                         dataKey="price"
                         stroke="hsl(var(--primary))"
                         strokeWidth={2}
                         dot={false}
                         name="Price"
                         activeDot={{ r:6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}