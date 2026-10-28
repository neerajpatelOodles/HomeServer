export const ROLE_HOME={client:'/client/dashboard',staff:'/staff/dashboard',caregiver:'/caregiver/dashboard',admin:'/admin/dashboard',hr:'/hr/dashboard'};
export const ROLE_LABEL={client:'Client',staff:'Staff',caregiver:'Caregiver',admin:'Admin',hr:'HR'};
export const NAV={
 admin:[{href:'/admin/dashboard',label:'Dashboard'},{href:'/admin/users',label:'Users & roles'},{href:'/hr/applicants',label:'Applicants'}],
 hr:[{href:'/hr/dashboard',label:'Dashboard'},{href:'/hr/applicants',label:'Applicants'}],
 staff:[{href:'/staff/dashboard',label:'Dashboard'}],
 caregiver:[{href:'/caregiver/dashboard',label:'Dashboard'}],
 client:[{href:'/client/dashboard',label:'Dashboard'}]
};
