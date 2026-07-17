import { useState } from 'react'
import { useLocation, useOutlet, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useAuth } from '@hooks'
import { AdminFooter, AdminHeader } from '@organisms'
import type { AdminShellProps } from '@types'

function AnimatedOutlet() {
  const o = useOutlet()
  const [outlet] = useState(o)
  return <>{outlet}</>
}

export function AdminShell({ navItems, pageTitles }: AdminShellProps) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }
  return (
    <div className="flex min-h-screen flex-col bg-background-1">
      <AdminHeader title={pageTitles[pathname] ?? ''} navItems={navItems} onLogout={handleLogout} />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.1, ease: 'easeInOut' }}
          >
            <AnimatedOutlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <AdminFooter />
    </div>
  )
}
