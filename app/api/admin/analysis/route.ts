
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { jwtVerify } from 'jose'

export async function POST(request: Request) {
    const cookieStore = (await headers()).get('cookie') || ''
    const token = cookieStore.match(/admin_token=([^;]+)/)?.[1]

    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    try {
        const secret = new TextEncoder().encode(process.env.ADMIN_SECRET || 'default-secret-change-me')
        await jwtVerify(token, secret)

        const { stats } = await request.json()
        const apiKey = process.env.GEMINI_API_KEY

        if (!apiKey || apiKey === 'placeholder') {
            return NextResponse.json({ analysis: "Gemini API Key is missing. Please configure it in .env.local." })
        }

        const prompt = `
       Analyze the following dental survey results and provide a structured JSON response for a research dashboard.
       
       Input Data:
       Total Participants: ${stats.total_participants}
       Role Distribution: ${JSON.stringify(stats.role_distribution)}
       Section Stats: ${JSON.stringify(stats.section_stats)}

       output strictly in valid JSON format with this schema (do not include markdown code blocks):
       {
         "summary": "A professional markdown-formatted summary string (without code blocks). Include Weaknesses, Strengths, and Conclusion.",
         "chart_title": "A title for a custom insight chart based on the data",
         "chart_description": "Brief description of what this chart shows",
         "chart_data": [ 
            { "label": "string (e.g., category or group)", "value": number (0-100), "fill": "hex color code (use teal/cyan/blue tones)" } 
         ]
       }
       
       Generate a chart that provides a unique insight, e.g., "Knowledge vs Practice Gap" or "Role Competency Comparison".
     `

        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                safetySettings: [
                    { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
                    { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
                    { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
                    { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
                ]
            })
        })

        const result = await res.json()

        if (result.error) {
            console.error("Gemini API Error details:", JSON.stringify(result.error, null, 2))
            if (result.error.code === 429 || result.error.status === 'RESOURCE_EXHAUSTED') {
                return NextResponse.json({
                    error: "AI Rate Limit Reached. Please wait a moment."
                })
            }
            throw new Error(result.error.message || 'Gemini API Error')
        }

        let text = result?.candidates?.[0]?.content?.parts?.[0]?.text

        if (!text) {
            return NextResponse.json({ error: "Analysis not available." })
        }

        // Clean markdown code blocks if present
        text = text.replace(/```json/g, '').replace(/```/g, '').trim()

        try {
            const jsonResponse = JSON.parse(text)
            return NextResponse.json(jsonResponse)
        } catch (e) {
            console.error("JSON Parse Error:", text)
            // Fallback for plain text
            return NextResponse.json({
                summary: text,
                chart_data: []
            })
        }

    } catch (err) {
        console.error("AI Error:", err)
        return NextResponse.json({ error: 'Analysis failed' }, { status: 500 })
    }
}
