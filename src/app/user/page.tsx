'use client'

import { useAuth } from '@/app/context/authContext'
import AuthCheck from '../component/Auth-check';
import { ArrowRight, CircleUserRound, LayoutDashboard, LogOut, ShieldCheck, ShoppingBag, Users } from 'lucide-react'

export default function UserPage() {
  const { user, userRole, logout } = useAuth()


  return (
    <AuthCheck requiredRole="USER">
      <main style={{ minHeight: 'calc(100vh - 72px)', background: 'var(--background)', padding: 'clamp(24px, 5vw, 64px) 20px' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '24px', marginBottom: '36px', flexWrap: 'wrap' }}>
            <div>
              <p style={{ color: '#a16207', fontSize: '12px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', margin: '0 0 10px' }}>Unikloh / My space</p>
              <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1, margin: 0, letterSpacing: '-0.04em' }}>Welcome back, {user?.name?.split(' ')[0] || 'there'}.</h1>
              <p style={{ color: '#6b6259', margin: '14px 0 0', fontSize: '16px' }}>Your account, profile, and store access in one place.</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.72)', border: '1px solid rgba(0,0,0,0.1)', padding: '10px 14px', borderRadius: '999px', fontSize: '13px', fontWeight: 700 }}>
              <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#16a34a', boxShadow: '0 0 0 4px #dcfce7' }} />
              Account active
            </div>
          </header>

          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '14px', marginBottom: '28px' }}>
            {[
              { label: 'Account status', value: 'Verified', icon: ShieldCheck, color: '#166534' },
              { label: 'Membership', value: userRole === 'ADMIN' ? 'Administrator' : 'Customer', icon: LayoutDashboard, color: '#a16207' },
              { label: 'Store access', value: 'Available', icon: ShoppingBag, color: '#9f1239' },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} style={{ background: 'rgba(255,255,255,0.76)', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '14px', padding: '20px' }}>
                <Icon size={21} color={color} />
                <p style={{ color: '#766e66', fontSize: '13px', margin: '18px 0 6px' }}>{label}</p>
                <strong style={{ fontSize: '18px' }}>{value}</strong>
              </div>
            ))}
          </section>

          <section style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(280px, 0.8fr)', gap: '20px', alignItems: 'stretch' }}>
            <div style={{ background: 'var(--foreground)', color: 'var(--background)', borderRadius: '18px', padding: 'clamp(24px, 4vw, 38px)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '26px' }}>
                  {user?.avatar ? <img src={user.avatar} alt="Profile" style={{ width: '58px', height: '58px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #059669' }} /> : <CircleUserRound size={58} strokeWidth={1.4} color="#34d399" />}
                  <div><p style={{ margin: 0, color: '#d1d5db', fontSize: '13px' }}>Your profile</p><h2 style={{ margin: '4px 0 0', fontSize: '24px' }}>{user?.name || 'User account'}</h2></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '20px', borderTop: '1px solid #374151', paddingTop: '22px' }}>
                  <div><p style={{ color: '#9ca3af', fontSize: '12px', margin: '0 0 6px' }}>EMAIL</p><strong style={{ fontSize: '14px', overflowWrap: 'anywhere' }}>{user?.email}</strong></div>
                  <div><p style={{ color: '#9ca3af', fontSize: '12px', margin: '0 0 6px' }}>ROLE</p><strong style={{ color: '#86efac' }}>{userRole?.toUpperCase()}</strong></div>
                  <div><p style={{ color: '#9ca3af', fontSize: '12px', margin: '0 0 6px' }}>ACCOUNT ID</p><strong style={{ fontSize: '14px' }}>{user?.id}</strong></div>
                </div>
                {userRole === 'ADMIN' && <p style={{ color: '#fbbf24', fontSize: '13px', margin: '18px 0 0' }}>You also have administrator access.</p>}
              </div>
              <div style={{ position: 'absolute', width: '220px', height: '220px', border: '1px solid #4b5563', borderRadius: '50%', right: '-80px', bottom: '-100px' }} />
            </div>

            <div style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '18px', padding: '26px' }}>
              <p style={{ color: '#a16207', fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 8px' }}>Quick actions</p>
              <h2 style={{ fontSize: '24px', margin: '0 0 22px' }}>Where next?</h2>
              <a href="/" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', color: 'var(--foreground)', textDecoration: 'none', borderTop: '1px solid #e5e7eb', padding: '16px 0', fontWeight: 700 }}><span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><ShoppingBag size={18} /> Browse the store</span><ArrowRight size={18} /></a>
              {userRole === 'ADMIN' && <a href="/admin" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', color: 'var(--foreground)', textDecoration: 'none', borderTop: '1px solid #e5e7eb', padding: '16px 0', fontWeight: 700 }}><span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Users size={18} /> Open admin centre</span><ArrowRight size={18} /></a>}
              <button onClick={logout} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', color: '#b91c1c', border: '0', borderTop: '1px solid #e5e7eb', padding: '16px 0', font: 'inherit', fontWeight: 700, cursor: 'pointer' }}><span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><LogOut size={18} /> Sign out</span><ArrowRight size={18} /></button>
            </div>
          </section>
        </div>
      </main>
    </AuthCheck>
  )
}