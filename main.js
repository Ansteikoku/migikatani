import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
const supabaseUrl = 'https://jpsvwbhylwtgzydmqzeb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impwc3Z3Ymh5bHd0Z3p5ZG1xemViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1OTQ4OTksImV4cCI6MjA2NzE3MDg5OX0.8tc651ECcXUPtvZkEIc_khQWAVa26VM5KDmezWJAgc0';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export function escapeHtml(str) {
  return str?.replace(/&/g, '&amp;').replace(/</g, '&lt;')
             .replace(/>/g, '&gt;').replace(/"/g, '&quot;')
             .replace(/'/g, '&#39;') || '';
}
export function convertAnchors(str) {
  return str.replace(/&gt;&gt;(\d+)/g, '<span class="anchor" onclick="scrollToAnchor($1)">>>$1</span>');
}
window.scrollToAnchor = function(num) {
  const el = document.getElementById('res' + num);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
export function isAdmin() {
  return localStorage.getItem('admin') === 'true';
}

export async function uploadCommentImage(file) {
  const filePath = `comments/${Date.now()}_${file.name}`;
  const { data, error } = await supabase.storage
    .from('comment-images')
    .upload(filePath, file);
  if (error) {
    alert("画像アップロード失敗");
    return null;
  }
  return supabase.storage.from('comment-images').getPublicUrl(filePath).data.publicUrl;
}
