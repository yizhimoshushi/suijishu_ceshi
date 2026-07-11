export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // 处理根路径 / → 返回 index.html
    if (pathname === '/' || pathname === '/index.html') {
      const html = await env.ASSETS.get('index.html');
      if (!html) {
        return new Response('404 Not Found', { status: 404 });
      }
      return new Response(html, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }

    // 其他路径：尝试按原路径获取文件
    const asset = await env.ASSETS.get(pathname);
    if (asset) {
      // 简单推断 Content-Type
      let contentType = 'application/octet-stream';
      if (pathname.endsWith('.css')) contentType = 'text/css';
      else if (pathname.endsWith('.js')) contentType = 'application/javascript';
      else if (pathname.endsWith('.png')) contentType = 'image/png';
      else if (pathname.endsWith('.jpg') || pathname.endsWith('.jpeg')) contentType = 'image/jpeg';
      else if (pathname.endsWith('.svg')) contentType = 'image/svg+xml';
      else if (pathname.endsWith('.json')) contentType = 'application/json';

      return new Response(asset, {
        headers: { 'Content-Type': contentType }
      });
    }

    // 文件不存在
    return new Response('404 Not Found', { status: 404 });
  }
};