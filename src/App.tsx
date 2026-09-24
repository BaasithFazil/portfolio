import { MotionConfig } from "framer-motion"
import Navbar from "./components/Navbar"
import ScrollProgress from "./components/ScrollProgress"
import CustomCursor from "./components/CustomCursor"
import BackToTop from "./components/BackToTop"
import Footer from "./components/Footer"
import Home from "./pages/Home"

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-ink-950 text-mist-100">
        <ScrollProgress />
        <CustomCursor />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent-400 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink-950"
        >
          Skip to content
        </a>
        <Navbar />
        <div id="main">
          <Home />
        </div>
        <Footer />
        <BackToTop />
      </div>
    </MotionConfig>
  )
}