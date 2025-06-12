// worker.js  (deploy once per drop)
import manifest from './manifest.json'  assert { type: 'json' };
const BOT = '7624575417:AAHHUE...';

export default {
  async fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === '/m') {
      return new Response(JSON.stringify({
        total: manifest.total
      }), {headers:{'Content-Type':'application/json'}});
    }

    // /c?n=123   → one encrypted chunk
    if (url.pathname === '/c') {
      const n = +url.searchParams.get('n');
      if (isNaN(n) || n >= manifest.total) return new Response('no', {status:404});
      const id = manifest.map[n].id;

      // getFile → file_path
      const meta = await fetch(
        `https://api.telegram.org/bot${BOT}/getFile?file_id=${id}`
      ).then(r=>r.json());
      const path = meta.result.file_path;
      return Response.redirect(
        `https://api.telegram.org/file/bot${BOT}/${path}`, 302
      );
    }

    return new Response('ok', {status:200});
  }
}
