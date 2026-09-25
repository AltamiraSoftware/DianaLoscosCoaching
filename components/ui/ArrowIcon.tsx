export function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" className="arrow-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={diagonal ? 'M4 14 14 4M6 4h8v8' : 'M3 9h12m-5-5 5 5-5 5'} /></svg>;
}
