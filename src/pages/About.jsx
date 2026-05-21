import PageHeader from '../components/ui/PageHeader'

const techStack = [
  'React',
  'Vite',
  'Tailwind CSS',
  'React Router',
  'Groq API',
  'AI Resume Analysis',
]

export default function About() {
  return (
    <div className="p-8 max-w-5xl">
      <PageHeader
        title="About ResumeIQ"
        subtitle="Modern AI-powered resume intelligence platform"
      />

      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6">
        {/* Main Card */}
        <div className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-[#13131c] p-7 md:p-8">
          {/* Glow */}
          <div className="absolute top-0 right-0 w-56 h-56 bg-indigo-500/10 blur-3xl rounded-full" />

          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center gap-5 mb-8">
              <div className="w-20 h-20 rounded-[1.8rem] bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-3xl font-bold shadow-2xl shadow-indigo-500/20 flex-shrink-0">
                IQ
              </div>

              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-white">
                  ResumeIQ
                </h2>

                <p className="text-indigo-300 text-sm mt-1">
                  AI Resume Intelligence Platform
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-5">
              <p className="text-[#c7c7d4] leading-relaxed">
                ResumeIQ is a modern AI-powered platform designed to help students,
                developers, and job seekers improve resume quality, ATS performance,
                and technical positioning for competitive hiring environments.
              </p>

              <p className="text-[#9b9bb0] leading-relaxed">
                The platform provides intelligent analysis for ATS compatibility,
                keyword optimization, resume structure, technical depth, and
                role-specific alignment using advanced AI-driven evaluation systems.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <FeatureCard
                title="ATS Optimization"
                desc="Improve resume parsing and recruiter visibility."
              />

              <FeatureCard
                title="JD Matching"
                desc="Measure resume alignment against target roles."
              />

              <FeatureCard
                title="Skill Gap Insights"
                desc="Discover missing technical skills and improvements."
              />

              <FeatureCard
                title="AI Recommendations"
                desc="Receive actionable suggestions for stronger resumes."
              />
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="flex flex-col gap-6">
          {/* Creator */}
          <div className="rounded-[2rem] border border-white/5 bg-[#13131c] p-6">
            <p className="text-[0.72rem] uppercase tracking-[0.22em] text-indigo-300 font-semibold mb-5">
              Creator
            </p>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/10 flex items-center justify-center text-indigo-300 text-xl font-bold">
                M
              </div>

              <div>
                <h3 className="text-white font-semibold">
                  Mahesh P
                </h3>

                <p className="text-sm text-[#8c8ca3] mt-1">
                  Software Engineering Student & Developer
                </p>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="rounded-[2rem] border border-white/5 bg-[#13131c] p-6">
            <p className="text-[0.72rem] uppercase tracking-[0.22em] text-indigo-300 font-semibold mb-5">
              Built With
            </p>

            <div className="flex flex-wrap gap-2">
              {techStack.map(tech => (
                <span
                  key={tech}
                  className="px-3 py-2 rounded-xl bg-white/5 border border-white/5 text-sm text-[#d7d7e0]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="rounded-[2rem] border border-white/5 bg-[#13131c] p-6">
            <p className="text-[0.72rem] uppercase tracking-[0.22em] text-indigo-300 font-semibold mb-5">
              Contact
            </p>

            <a
              href="mailto:maheshp2487@gmail.com"
              className="flex items-center gap-4 rounded-2xl bg-white/[0.03] border border-white/5 px-4 py-4 hover:border-indigo-500/10 hover:bg-indigo-500/[0.03] transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-indigo-500/10 text-indigo-300 flex items-center justify-center text-lg">
                ✉
              </div>

              <div>
                <p className="text-white text-sm font-medium">
                  Email Contact
                </p>

                <p className="text-[#8c8ca3] text-sm mt-1">
                  maheshp2487@gmail.com
                </p>
              </div>
            </a>
          </div>

          {/* Status */}
          <div className="rounded-[2rem] border border-emerald-500/10 bg-emerald-500/[0.03] p-5 flex items-center justify-between">
            <div>
              <p className="text-white font-medium">
                ResumeIQ v1.0
              </p>

              <p className="text-[#8c8ca3] text-sm mt-1">
                Active & continuously improving
              </p>
            </div>

            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ title, desc }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5 hover:border-indigo-500/10 hover:bg-indigo-500/[0.03] transition-all duration-300">
      <h3 className="text-white font-medium mb-2">
        {title}
      </h3>

      <p className="text-sm text-[#8c8ca3] leading-relaxed">
        {desc}
      </p>
    </div>
  )
}