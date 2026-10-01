import { Link, Route, Routes } from 'react-router-dom'
import { AppFrame, Protected } from '../layouts/DashboardLayout'
import { AuthPage } from '../features/auth/pages/AuthPage'
import { Dashboard } from '../features/dashboard/pages/Dashboard'
import { Profile } from '../features/profile/pages/Profile'
import { JobAnalyzer } from '../features/job-analysis/pages/JobAnalyzer'
import { SkillGap } from '../features/skill-gap/pages/SkillGap'
import { Roadmap } from '../features/roadmap/pages/Roadmap'
import { Resources } from '../features/resources/pages/Resources'
import { CareerGuidance } from '../features/career-guidance/pages/CareerGuidance'
import { ResumeReview } from '../features/resume/pages/ResumeReview'
import { MockInterview } from '../features/interview/pages/MockInterview'

function NotFound() { return <AppFrame title="Page not found" description="That page isn’t here. Choose a destination from the navigation."><Link className="button primary" to="/dashboard">Back to overview →</Link></AppFrame> }
export default function AppRoutes() { return <Routes><Route path="/login" element={<AuthPage/>}/><Route path="/register" element={<AuthPage register/>}/><Route path="/" element={<Protected><Dashboard/></Protected>}/><Route path="/dashboard" element={<Protected><Dashboard/></Protected>}/><Route path="/profile" element={<Protected><Profile/></Protected>}/><Route path="/job-analyzer" element={<Protected><JobAnalyzer/></Protected>}/><Route path="/skill-gap" element={<Protected><SkillGap/></Protected>}/><Route path="/learning-roadmap" element={<Protected><Roadmap/></Protected>}/><Route path="/resources" element={<Protected><Resources/></Protected>}/><Route path="/career-guidance" element={<Protected><CareerGuidance/></Protected>}/><Route path="/resume-improvement" element={<Protected><ResumeReview/></Protected>}/><Route path="/mock-interview" element={<Protected><MockInterview/></Protected>}/><Route path="*" element={<Protected><NotFound/></Protected>}/></Routes> }
