// app/api/contact/route.js
// Receives POST from contact form, sends email to Matthew via Resend.
//
// Setup (one-time, free):
// 1. Go to resend.com → Sign up (no CC needed)
// 2. Get your API key from Dashboard → API Keys
// 3. Add to Vercel: Settings → Environment Variables
//    RESEND_API_KEY = re_xxxxxxxxxxxx
//
// Free tier: 3,000 emails/month, 100/day — more than enough for a portfolio.

import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req) {
  try {
    const { name, email, subject, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // default sender (works without custom domain)
      to: ['mattchris16@gmail.com'],
      replyTo: email,
      subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] New message from ${name}`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a2e;">
          <div style="background: #f5f5f7; border-radius: 12px; padding: 32px; margin-bottom: 24px;">
            <h2 style="margin: 0 0 4px; font-size: 20px; font-weight: 600;">New message from your portfolio</h2>
            <p style="margin: 0; color: #666; font-size: 14px;">Someone reached out via mattcahyadi.vercel.app</p>
          </div>

          <div style="padding: 0 8px;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; font-size: 13px; width: 100px;">Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px; font-weight: 500;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; font-size: 13px;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;">
                  <a href="mailto:${email}" style="color: #6c63ff;">${email}</a>
                </td>
              </tr>
              ${subject ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; font-size: 13px;">Subject</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;">${subject}</td>
              </tr>` : ''}
            </table>

            <div style="background: #fafafa; border-left: 3px solid #6c63ff; border-radius: 4px; padding: 16px 20px; margin-bottom: 24px;">
              <p style="margin: 0; font-size: 14px; line-height: 1.7; color: #333; white-space: pre-wrap;">${message}</p>
            </div>

            <a href="mailto:${email}?subject=Re: ${subject || `Your message`}"
               style="display: inline-block; background: #6c63ff; color: white; text-decoration: none;
                      padding: 12px 28px; border-radius: 8px; font-size: 14px; font-weight: 500;">
              Reply to ${name} →
            </a>
          </div>

          <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #eee; color: #aaa; font-size: 12px;">
            Sent from your portfolio contact form
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: data?.id })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
