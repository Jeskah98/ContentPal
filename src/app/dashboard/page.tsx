'use client'
import { useAuth } from '@/context/AuthContext'
import SubscriptionStatus from '@/components/SubscriptionStatus'
import ContentGenerator from '@/components/ContentGenerator'
import FileUploader from '@/components/FileUploader'
import AnalyticsOverview from '@/components/AnalyticsOverview'

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <div className="dashboard-container">
      <header>
        <h1>Welcome, {user?.displayName || user?.email}</h1>
        <SubscriptionStatus />
      </header>
      
      <section className="content-section">
        <div className="generator-panel">
          <ContentGenerator />
          <FileUploader />
        </div>
        
        <div className="analytics-panel">
          <AnalyticsOverview />
        </div>
      </section>
    </div>
  )
}