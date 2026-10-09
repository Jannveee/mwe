/**
 * src/app/api/images/[filename]/route.js
 * ─────────────────────────────────────────────────────────────────────────
 * Public image serving endpoint for SEO images.
 *
 * GET /api/images/:filename
 *
 * Supported images:
 *  - sumitsir1.jpeg
 *  - sumitsir2.jpeg
 *  - sumitsir3.jpeg
 */

import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { getCorsHeaders, handleOptions } from '../../../../middleware/cors.js';

const ALLOWED_IMAGES = {
  'sumitsir1.jpeg': 'sumitsir1.jpeg',
  'sumitsir1.jpg': 'sumitsir1.jpeg',
  'sumitsir2.jpeg': 'sumitsir2.jpeg',
  'sumitsir2.jpg': 'sumitsir2.jpeg',
  'sumitsir3.jpeg': 'sumitsir3.jpeg',
  'sumitsir3.jpg': 'sumitsir3.jpeg',
};

function resolveImagePath(filename) {
  const directPath = path.join(process.cwd(), 'public', filename);
  if (fs.existsSync(/*turbopackIgnore: true*/ directPath)) {
    return directPath;
  }
  const nestedPath = path.join(process.cwd(), 'backend', 'public', filename);
  if (fs.existsSync(/*turbopackIgnore: true*/ nestedPath)) {
    return nestedPath;
  }
  return directPath;
}

export async function OPTIONS(req) {
  return handleOptions(req);
}

export async function GET(req, context) {
  const resolvedParams = context?.params ? await context.params : {};
  const requestedFilename = resolvedParams?.filename;

  const targetFilename = ALLOWED_IMAGES[requestedFilename];

  if (!targetFilename) {
    return NextResponse.json(
      {
        success: false,
        message: 'Image not found.',
      },
      {
        status: 404,
        headers: getCorsHeaders(req),
      }
    );
  }

  const filePath = resolveImagePath(targetFilename);

  try {
    const fileBuffer = await fs.promises.readFile(/*turbopackIgnore: true*/ filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
        'Content-Length': fileBuffer.length.toString(),
        ...getCorsHeaders(req),
      },
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: 'Image not found.',
      },
      {
        status: 404,
        headers: getCorsHeaders(req),
      }
    );
  }
}
