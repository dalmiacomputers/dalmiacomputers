
const API_BASE = '/api';
const REVIEW_URL = "https://www.google.com/maps?cid=4690025437030468228";

async function apiPost(endpoint, data){
  const headers = {'Content-Type':'application/json'};
  // Add CSRF token if available
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
  if(csrfToken) headers['X-CSRF-Token'] = csrfToken;
  
  const res = await fetch(API_BASE + endpoint, {
    method: 'POST', headers, body: JSON.stringify(data)
  });
  if(!res.ok) throw new Error(endpoint + ' ' + res.status);
  return await res.json();
}
async function apiUpload(endpoint, formData){
  const headers = {};
  // Add CSRF token if available
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
  if(csrfToken) headers['X-CSRF-Token'] = csrfToken;
  
  const res = await fetch(API_BASE + endpoint, { method: 'POST', headers, body: formData });
  if(!res.ok) throw new Error('UPLOAD ' + endpoint + ' ' + res.status);
  return await res.json();
}
function openReview(){ window.open(REVIEW_URL, '_blank', 'noopener'); }
function waShare(text){ window.open('https://wa.me/?text=' + encodeURIComponent(text),'_blank'); }

// Generic save hooked to universal DB as well
async function saveUniversalAPI(formEl, source){
  const fd = new FormData(formEl); 
  const data = {}; 
  fd.forEach((v,k) => {
    if(typeof v === 'string') data[k] = v.trim();
    else data[k] = v;
  });
  data._source = source || 'form';
  
  // Validate required fields
  if(!data.mobile || data.mobile.length < 10){ 
    alert('Valid mobile number is required'); 
    return false; 
  }
  
  try{ 
    await apiPost('/universal-leads.php', data); 
  }catch(e){ 
    console.error('API save failed:', e);
    alert('Failed to save data. Please try again.');
    return false;
  }
  
  // Handle file upload
  const file = fd.get('invoice'); 
  if(file && file.name){ 
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if(!allowedTypes.includes(file.type)){
      alert('Only PDF, JPG, and PNG files are allowed');
      return false;
    }
    
    const up = new FormData(); 
    up.append('mobile', data.mobile); 
    up.append('invoice', file); 
    try{ 
      await apiUpload('/upload.php', up);
    }catch(e){ 
      console.error('Upload failed:', e);
      alert('File upload failed. Please try again.');
    }
  }
  
  const link = location.origin + '/forms/profile.php?m=' + encodeURIComponent(data.mobile);
  const msg = `Hi! Update your details for best service & offers. ${link}`;
  const pl = document.getElementById('profileLink'); if(pl) pl.href = link;
  const sw = document.getElementById('shareWA'); if(sw) sw.href = 'https://wa.me/?text=' + encodeURIComponent(msg);
  return true;
}

// Prefill form from API based on mobile number in URL
async function prefillFromAPI(formId){
  const urlParams = new URLSearchParams(window.location.search);
  const mobile = urlParams.get('m');
  if(!mobile) return;
  
  try{
    const response = await fetch(`${API_BASE}/get_profile.php?m=${encodeURIComponent(mobile)}`);
    if(!response.ok) return;
    
    const result = await response.json();
    if(!result.ok || !result.row) return;
    
    const form = document.getElementById(formId);
    if(!form) return;
    
    const data = result.row;
    Object.keys(data).forEach(key => {
      const input = form.querySelector(`[name="${key}"]`);
      if(input && data[key]) {
        input.value = data[key];
      }
    });
  }catch(e){
    console.warn('Failed to prefill form:', e);
  }
}
