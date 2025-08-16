import React from 'react';
import { useAuth } from '../context/AuthContext';

function ErrorFallback({ error, resetErrorBoundary }) {
  const auth = useAuth(); // ✅ called at the top level
  const logout = auth?.logout; // ✅ safe access

  return (
    <div role="alert" style={{ padding: 20 }}>
      <h2>Something went wrong:</h2>
      <pre>{error?.message || 'Unknown error'}</pre>
      {logout && <button onClick={logout}>Logout</button>}
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  );
}

export default ErrorFallback;