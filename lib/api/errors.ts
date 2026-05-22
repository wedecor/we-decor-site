import { NextResponse } from 'next/server';
import type { ApiErrorBody, ApiErrorCode } from '@/lib/services/leads/types';

export function apiError(
  code: ApiErrorCode,
  message: string,
  status: number,
  details?: ApiErrorBody['error']['details']
): NextResponse<ApiErrorBody> {
  return NextResponse.json(
    {
      success: false,
      error: { code, message, ...(details?.length ? { details } : {}) },
    },
    { status, headers: { 'Cache-Control': 'no-store' } }
  );
}

export function apiSuccess<T extends Record<string, unknown>>(
  body: T,
  status = 200
): NextResponse<T> {
  return NextResponse.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  });
}
