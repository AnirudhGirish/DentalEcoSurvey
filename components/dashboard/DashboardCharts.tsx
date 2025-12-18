
'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const COLORS = ['#0891b2', '#0ea5e9', '#22d3ee', '#67e8f9']

export default function DashboardCharts({ data }: { data: any }) {
    const sectionData = data.section_stats.map((s: any) => ({
        name: s.section,
        Correct: s.correct_count,
        Total: s.total_count,
        Accuracy: Math.round((s.correct_count / s.total_count) * 100) || 0
    }))

    const roleData = data.role_distribution || []

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
            <div className="card-premium p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-6">Section Performance</h3>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={sectionData}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Legend />
                            <Bar dataKey="Correct" fill="#0891b2" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="Total" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="card-premium p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-6">Participant Roles</h3>
                <div className="h-80 w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={roleData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                                nameKey="role"
                                label
                            >
                                {roleData.map((entry: any, index: number) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}
