import { redirect } from 'next/navigation'

/** Legacy route — use /help for detailed support contacts */
export default function EmergencyPage() {
  redirect('/help')
}
