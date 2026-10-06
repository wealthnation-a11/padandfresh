import { createMiddleware, createStart } from '@tanstack/react-start';
import { supabase } from '@/integrations/supabase/client';

const attachSupabaseAuth = createMiddleware({ type: 'function' }).client(
  async ({ next }) => {
    if (typeof window === 'undefined') return next();
    const { data } = await supabase.auth.getSession();
    const accessToken = data.session?.access_token;
    return next({
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    });
  },
);

export const startInstance = createStart(() => ({
  functionMiddleware: [attachSupabaseAuth],
}));
