import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
    const filePath = path.join(process.cwd(), 'public', 'images', filename);
    
    const dirPath = path.join(process.cwd(), 'public', 'images');
    if (!fs.existsSync(dirPath)) {
       fs.mkdirSync(dirPath, { recursive: true });
    }

    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({ path: `/images/${filename}` });
  } catch(e) {
    console.error(e);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
