import { PROVIDERS } from '@/lib/providers';

export default function Home() {
  const providers = Object.entries(PROVIDERS).map(([id, config]) => ({
    id,
    name: config.displayName,
    prefixes: config.modelPrefixes,
    models: config.models || [],
  }));

  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '2rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
        ⚡ AI Relay
      </h1>
      <p style={{ color: '#888', fontSize: '1.1rem', marginBottom: '2rem' }}>
        OpenAI 兼容的轻量级 AI API 中转服务
      </p>

      <div style={{
        maxWidth: '700px',
        width: '100%',
        padding: '1.5rem',
        borderRadius: '12px',
        border: '1px solid #333',
        backgroundColor: '#111',
      }}>
        <h2 style={{ fontSize: '1.2rem', marginTop: 0 }}>📋 快速开始</h2>
        <pre style={{
          backgroundColor: '#1a1a1a',
          padding: '1rem',
          borderRadius: '8px',
          overflow: 'auto',
          fontSize: '0.85rem',
          lineHeight: 1.6,
        }}>
{`# 列出所有可用模型
curl https://airelay.izmw.me/v1/models \\
  -H "Authorization: Bearer YOUR_KEY"

# 调用模型
curl https://airelay.izmw.me/v1/chat/completions \\
  -H "Authorization: Bearer YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "mimo-v2.5-pro",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'`}
        </pre>

        <h2 style={{ fontSize: '1.2rem' }}>🔗 API 端点</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #444' }}>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>端点</th>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #222' }}>
              <td style={{ padding: '0.5rem', fontFamily: 'monospace' }}>GET /v1/models</td>
              <td style={{ padding: '0.5rem' }}>列出所有可用模型</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #222' }}>
              <td style={{ padding: '0.5rem', fontFamily: 'monospace' }}>GET /v1/models/:id</td>
              <td style={{ padding: '0.5rem' }}>查询单个模型信息</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #222' }}>
              <td style={{ padding: '0.5rem', fontFamily: 'monospace' }}>POST /v1/chat/completions</td>
              <td style={{ padding: '0.5rem' }}>Chat Completions（流式/非流式）</td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem', fontFamily: 'monospace' }}>GET /health</td>
              <td style={{ padding: '0.5rem' }}>健康检查（公开）</td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem', fontFamily: 'monospace' }}>GET /api/status</td>
              <td style={{ padding: '0.5rem' }}>服务状态详情</td>
            </tr>
          </tbody>
        </table>

        <h2 style={{ fontSize: '1.2rem' }}>🤖 支持的模型</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #444' }}>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>Provider</th>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>模型</th>
              <th style={{ textAlign: 'right', padding: '0.5rem' }}>上下文</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((p) =>
              p.models.length > 0 ? (
                p.models.map((m, i) => (
                  <tr key={m.id} style={{ borderBottom: '1px solid #222' }}>
                    <td style={{ padding: '0.5rem', color: '#888' }}>
                      {i === 0 ? p.name : ''}
                    </td>
                    <td style={{ padding: '0.5rem', fontFamily: 'monospace' }}>{m.id}</td>
                    <td style={{ padding: '0.5rem', textAlign: 'right', color: '#666' }}>
                      {(m.contextWindow / 1000).toFixed(0)}K
                    </td>
                  </tr>
                ))
              ) : (
                <tr key={p.id} style={{ borderBottom: '1px solid #222' }}>
                  <td style={{ padding: '0.5rem', color: '#888' }}>{p.name}</td>
                  <td style={{ padding: '0.5rem', fontFamily: 'monospace', color: '#555' }}>
                    {p.prefixes.join(', ')}*
                  </td>
                  <td style={{ padding: '0.5rem', textAlign: 'right', color: '#666' }}>-</td>
                </tr>
              )
            )}
          </tbody>
        </table>

        <h2 style={{ fontSize: '1.2rem' }}>✨ 功能特性</h2>
        <ul style={{ lineHeight: 1.8, paddingLeft: '1.2rem' }}>
          <li>🔄 多 Key 自动轮换 (Round-Robin)</li>
          <li>🔀 多 Provider 自动路由</li>
          <li>📊 用量追踪 (调用次数 + Token)</li>
          <li>🚨 错误追踪 (429/401/5xx 按 Key 统计)</li>
          <li>🔁 429/5xx 自动重试 + Key 退避</li>
          <li>📡 流式响应 (SSE) 透传</li>
          <li>🛡️ 100% OpenAI 兼容接口</li>
          <li>📋 /v1/models 模型发现</li>
        </ul>
      </div>

      <p style={{ color: '#555', marginTop: '2rem', fontSize: '0.85rem' }}>
        AI Relay v1.1 · Powered by Vercel Edge + KV
      </p>
    </main>
  );
}
