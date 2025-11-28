'use client';

/**
 * Simple Test - Does This Show?
 * If you see "DEBUG TEST VISIBLE" then React is working
 */
export function DebugTest() {
  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: 'red',
        color: 'white',
        padding: '20px',
        borderRadius: '10px',
        fontSize: '20px',
        fontWeight: 'bold',
        zIndex: 99999,
      }}
    >
      🐛 DEBUG TEST VISIBLE
    </div>
  );
}
