import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const data = [
  {
    date: '10/12',
    revenue: 1200,
  },
  {
    date: '11/12',
    revenue: 900,
  },
  {
    date: '10/12',
    revenue: 260,
  },
  {
    date: '12/12',
    revenue: 1800,
  },
  {
    date: '13/12',
    revenue: 1200,
  },
  {
    date: '14/12',
    revenue: 640,
  },
  {
    date: '15/12',
    revenue: 820,
  },
]
export function RevenueChart() {
  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium ">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width={'100%'} height={248}>
          <LineChart data={data} style={{ fontSize: 12 }}>
            <XAxis dataKey={'date'} axisLine={true} tickLine={false} dy={16} />
            <YAxis
              axisLine={true}
              tickLine={false}
              className="stroke-muted"
              width={80}
              stroke="#888"
              tickFormatter={(value: number) =>
                value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })
              }
            />
            <CartesianGrid className="stroke-muted" />
            <Line
              type={'linear'}
              strokeWidth={2}
              dataKey={'revenue'}
              stroke={colors.violet[500]}
            ></Line>
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
