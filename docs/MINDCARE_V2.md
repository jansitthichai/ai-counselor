# STRMindCare Version 2.0 — Concept & Research Alignment

## ชื่อโครงงาน

- **ชื่อระบบ:** STRMindCare : AI เพื่อส่งเสริมสุขภาวะทางอารมณ์และการดูแลสุขภาพจิตสำหรับนักเรียน
- **อังกฤษ:** Development of an AI-powered Student Wellbeing Platform for Emotional Wellness and Mental Health Support

## จาก Chatbot → Wellbeing Platform

ระบบไม่ได้อ้างว่า AI วินิจฉัยโรค แต่เน้น:

- ส่งเสริมสุขภาวะทางอารมณ์ (Emotional Wellness)
- คัดกรอง/ประเมินความเสี่ยงเบื้องต้น
- แนะนำการดูแลตนเอง
- เชื่อมต่อครู ผู้ปกครอง และสายด่วนเมื่อเหมาะสม

## Agentic AI Workflow

```
User message
  → Emotion Classification
  → Stress Detection
  → Risk Level (Low/Medium/High) + disclaimer
  → Mood log (on-device)
  → Recommendations (music/meditation/book/video/activity)
  → Motivation
  → Emergency surface (if needed)
  → Conversational reply (Gemini)
```

## ประเด็นงานวิจัยที่สอดแทรก

| Theme | การออกแบบในระบบ |
|-------|------------------|
| Privacy by Design | ไดอารี่/mood เก็บ localStorage · Teacher dashboard ไม่ระบุตัวตน |
| PDPA | ไม่บังคับแชร์ข้อมูลส่วนตัวกับผู้ปกครองอัตโนมัติ |
| AI Ethics / Responsible AI | ขอบเขตชัด · disclaimer · crisis escalation |
| Prompt Engineering | expert prompts + ไม่ตัดสิน / ให้กำลังใจ |
| LLM | Gemini เป็น AI หลักของระบบ |
| Emotion Classification / Sentiment Analysis | `lib/emotion.ts` |
| RAG (ต่อยอด) | บทความ wellness เป็น knowledge base เริ่มต้น |
| Agentic AI | `lib/agent.ts` + `/api/chat` |

## เทคโนโลยี (สื่อสารกับกรรมการ)

- **AI ของระบบ:** Gemini API (หลัก) และขยายสู่ GPT / Claude / DeepSeek / Llama / Ollama ได้
- **Cursor:** AI Coding Assistant สำหรับพัฒนา — ไม่ใช่ AI ที่ให้บริการนักเรียน
