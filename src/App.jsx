import { useEffect, useState } from 'react'
import zh from './data/resume.zh.json'
import en from './data/resume.en.json'
import Hero from './sections/Hero'
import About from './sections/About'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Education from './sections/Education'

const resumes = { zh, en }
const htmlLang = { zh: 'zh-Hant', en: 'en' }

function getInitialLang() {
  try {
    const saved = localStorage.getItem('lang')
    if (saved in resumes) return saved
  } catch {
    // localStorage 不可用時（如隱私模式）使用預設語言
  }
  return 'zh'
}

function App() {
  const [lang, setLang] = useState(getInitialLang)
  const { labels, basics, work, projects, skills, education } = resumes[lang]

  useEffect(() => {
    document.documentElement.lang = htmlLang[lang]
    document.title = `${basics.name} | ${basics.label}`
    try {
      localStorage.setItem('lang', lang)
    } catch {
      // 無法儲存時忽略，不影響畫面
    }
  }, [lang, basics])

  return (
    <main>
      <Hero
        basics={basics}
        switchLabel={labels.switchLang}
        onSwitchLang={() => setLang(lang === 'zh' ? 'en' : 'zh')}
      />
      <About title={labels.about} summary={basics.summary} />
      <Experience title={labels.experience} items={work} presentLabel={labels.present} />
      <Projects title={labels.projects} items={projects} />
      <Skills title={labels.skills} items={skills} />
      <Education title={labels.education} items={education} presentLabel={labels.present} />
    </main>
  )
}

export default App
