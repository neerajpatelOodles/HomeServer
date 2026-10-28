'use client';
import Link from 'next/link';
import {useState} from 'react';
import {Field,Notice} from '@/components/ui';
import {api} from '@/lib/api';

const CAREGIVER_PROFESSIONS = ['RN', 'RPN', 'PSW', 'RSW'];

export default function ApplyPage(){
 const [form,setForm]=useState({firstName:'',lastName:'',email:'',phone:'',profession:'',licenseNumber:'',yearsExperience:'',city:'',region:'',coverNote:'',website:''});
 const [error,setError]=useState('');const [saving,setSaving]=useState(false);const [done,setDone]=useState('');
 const set=(k)=>(e)=>setForm(f=>({...f,[k]:e.target.value}));

 async function submit(e){
   e.preventDefault();
   setError('');
   if(!form.firstName.trim()||!form.lastName.trim()||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)||form.phone.trim().length<7||!form.profession){
     setError('Please enter first name, last name, valid email, phone and profession.');
     return;
   }

   setSaving(true);
   try{
    const payload = Object.fromEntries(
      Object.entries(form)
        .filter(([, value]) => value !== '')
        .map(([key, value]) => [key, key === 'yearsExperience' && value !== '' ? Number(value) : String(value).trim()])
    );

    const r = await api('/api/recruitment/applications', { method: 'POST', body: payload });
     setDone(r.data.reference);
   }catch(e){setError(e.message||'Unable to submit application.');}finally{setSaving(false)}}
 if(done)return <div className="apply-wrap"><div className="card success-box"><h1>Application received</h1><p>Your application has been submitted to HR.</p><p>Reference: <strong>{done}</strong></p><Link href="/login" className="link">Sign in</Link></div></div>;
 return <div className="apply-wrap"><form className="card" onSubmit={submit}><div className="brand brand-lg"><span className="brand-mark"/><span>Home-Care Central</span></div><h1>Apply to join our care team</h1><p className="muted">No account is needed to apply.</p><Notice kind="error">{error}</Notice><div className="grid-2">
 <Field id="firstName" label="First name"><input id="firstName" value={form.firstName} onChange={set('firstName')}/></Field><Field id="lastName" label="Last name"><input id="lastName" value={form.lastName} onChange={set('lastName')}/></Field>
 <Field id="email" label="Email"><input id="email" type="email" value={form.email} onChange={set('email')}/></Field><Field id="phone" label="Phone"><input id="phone" value={form.phone} onChange={set('phone')}/></Field>
 <Field id="profession" label="Profession"><select id="profession" value={form.profession} onChange={set('profession')}><option value="">Select…</option>{['RN','RPN','PSW','RSW'].map(x=><option key={x}>{x}</option>)}</select></Field>
 <Field id="licenseNumber" label="Licence number (optional)"><input id="licenseNumber" value={form.licenseNumber} onChange={set('licenseNumber')}/></Field><Field id="yearsExperience" label="Years of experience (optional)"><input id="yearsExperience" type="number" min="0" max="60" value={form.yearsExperience} onChange={set('yearsExperience')}/></Field><Field id="city" label="City (optional)"><input id="city" value={form.city} onChange={set('city')}/></Field>
 </div><Field id="region" label="Region (optional)"><input id="region" value={form.region} onChange={set('region')}/></Field><Field id="coverNote" label="Additional information (optional)"><textarea id="coverNote" value={form.coverNote} onChange={set('coverNote')}/></Field>
 <div aria-hidden="true" style={{position:'absolute',left:'-9999px'}}><label htmlFor="website">Website</label><input id="website" value={form.website} onChange={set('website')} tabIndex={-1}/></div><button className="btn btn-primary" disabled={saving}>{saving?'Submitting…':'Submit application'}</button><p className="switch-link">Already part of the team? <Link href="/login">Sign in</Link></p></form></div>
}
