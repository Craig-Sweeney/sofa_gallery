import { useState } from 'react';
import { requestOtp, verifyOtp } from '../api/auth';

const LoginPage = () => {
  const [identifier, setIdentifier] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'request' | 'verify'>('request');
  const [message, setMessage] = useState('');

  const sendOtp = async () => {
    await requestOtp(identifier);
    setStep('verify');
    setMessage('验证码已发送，请查收短信或邮箱');
  };

  const confirm = async () => {
    await verifyOtp(identifier, code);
    setMessage('登录成功，即将跳转后台');
    window.location.href = '/admin';
  };

  return (
    <div className="container" style={{ maxWidth: 480 }}>
      <div className="card">
        <h2>管理员登录</h2>
        <p style={{ color: 'var(--muted)' }}>支持手机号或邮箱验证码登录</p>

        <label style={{ display: 'grid', gap: 8 }}>
          <span>手机号/邮箱</span>
          <input
            className="input"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="示例：+86 13800000000 或 admin@sofa.com"
          />
        </label>

        {step === 'verify' && (
          <label style={{ display: 'grid', gap: 8, marginTop: 12 }}>
            <span>验证码</span>
            <input
              className="input"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="输入收到的6位验证码"
            />
          </label>
        )}

        <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
          {step === 'request' ? (
            <button className="button" onClick={sendOtp} disabled={!identifier}>
              发送验证码
            </button>
          ) : (
            <button className="button" onClick={confirm} disabled={!code}>
              验证并登录
            </button>
          )}
          <a className="button secondary" href="/">返回首页</a>
        </div>

        {message && <p style={{ color: 'var(--muted)', marginTop: 12 }}>{message}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
