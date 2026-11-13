"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "A bar chart"

const chartConfig = {
  // desktop: {
  //   label: "Desktop",
  //   color: "var(--chart-1)",
  // },
} satisfies ChartConfig

interface ChartBarProps {
  chartData: {year:string, interest: number}[] 
}

export function ChartBar({chartData}:ChartBarProps) {

  const formatYAxis = (v: number) => {
    if (v === 0) return "₹0"
    if (v >= 10000000) return `₹${(v / 10000000).toFixed(1)}Cr`
    if (v >= 100000) return `₹${(v / 100000).toFixed(1)}L`
    return `₹${v}`
  }

  return (
    <Card className="bg-[#FFFEFF]">
      <CardHeader>
        {/* <CardTitle>Bar Chart</CardTitle> */}
        <CardDescription>
            <div className="flex gap-[15px]">
                <div className="flex items-center gap-[5px]">
                    <div className="w-[10px] h-[10px] bg-[#6A5D53]"></div>
                    <span>Selected Year</span>
                </div>
                <div className="flex items-center gap-[5px]">
                    <div className="w-[10px] h-[10px] bg-[#E6CDBA]"></div>
                    <span>Other Years</span>
                </div>
            </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              tickMargin={8}
              axisLine={false}
                tick={{fill: "#6e665f", fontSize: 12}}
            />
            <YAxis
              domain={[0,'auto']}
              tickCount={5}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatYAxis}
              tick={{fill: "#6e665f", fontSize: 12}}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="interest" fill="#E6CDBA" radius={8} className="cursor-pointer"/>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
