import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Diana Loscos — Coaching profesional para momentos de cambio';
export const runtime = 'nodejs';

export default async function Image() {
  const portrait = await readFile(path.join(process.cwd(), 'public', 'perfil.jpg'));
  const imageUrl = `data:image/jpeg;base64,${portrait.toString('base64')}`;
  return new ImageResponse(<div style={{ display: 'flex', width: '100%', height: '100%', background: '#F7F3EB', color: '#182429', padding: 78, fontFamily: 'Georgia, serif' }}><div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1, paddingRight: 55 }}><div style={{ fontFamily: 'Arial, sans-serif', fontSize: 20, color: '#1E5153', letterSpacing: 4 }}>DIANA LOSCOS · COACHING PROFESIONAL</div><div style={{ display: 'flex', flexDirection: 'column', fontSize: 78, lineHeight: 1.02, letterSpacing: -3 }}><span>Aclara tu</span><span>siguiente paso</span><span>profesional.</span></div><div style={{ width: 530, height: 2, background: '#1E5153' }} /></div><div style={{ display: 'flex', width: 365, height: 475, overflow: 'hidden', border: '2px solid #1E5153' }}><img src={imageUrl} width="365" height="475" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div></div>, size);
}
