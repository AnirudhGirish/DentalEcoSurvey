'use client'

import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, Tooltip } from 'recharts'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

interface Props {
    data: {
        chart_title?: string
        chart_description?: string
        chart_data: Array<{ label: string; value: number; fill: string }>
    }
}

export default function AiInsightChart({ data }: Props) {
    if (!data?.chart_data || data.chart_data.length === 0) return null

    // Transform data for RadialBar and ensure colors
    const chartData = data.chart_data.map((d, i) => ({
        name: d.label,
        value: d.value,
        fill: d.fill || ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'][i % 4]
    }))

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-premium p-8 border border-slate-100 bg-white shadow-xl shadow-slate-200/50"
        >
            <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-slate-900">{data.chart_title || 'Visual Insight'}</h3>
                <p className="text-slate-500 text-sm mt-1 max-w-lg mx-auto">{data.chart_description}</p>
            </div>

            <div className="h-[400px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                        innerRadius="20%"
                        outerRadius="100%"
                        data={chartData}
                        startAngle={180}
                        endAngle={0}
                        cy="70%"
                    >
                        <RadialBar
                            label={{ position: 'insideStart', fill: '#fff', fontWeight: 'bold' }}
                            background
                            dataKey="value"
                            cornerRadius={10}
                        />
                        <Legend
                            iconSize={10}
                            layout="horizontal"
                            verticalAlign="bottom"
                            align="center"
                            wrapperStyle={{ paddingTop: '20px' }}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                            cursor={false}
                        />
                    </RadialBarChart>
                </ResponsiveContainer>

                {/* Center label overlay */}
                <div className="absolute left-1/2 top-[65%] -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                    <Sparkles className="w-8 h-8 text-slate-300 mx-auto mb-1" />
                </div>
            </div>
        </motion.div>
    )
}
