export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let pathname = url.pathname;

    // 根路径映射到 index.html
    if (pathname === '/') pathname = '/index.html';

    // ✅ 改为使用 .fetch() —— Miniflare 和 生产环境都支持！
    try {
      const resp = await env.ASSETS.fetch(new Request(`https://example.com${pathname}`));
      if (resp.ok) {
        return resp;
      }
    } catch (e) {
      console.warn('ASSETS.fetch failed:', e);
    }

    // 回退：404
    return new Response('Not Found', { status: 404 });
  }
};