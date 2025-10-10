import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@elastic/elasticsearch'
import * as fs from 'node:fs/promises';
import path from 'path';

// CREATING AN INDEX

const insertDocument = async (client: Client, index: string, document: object) => {
  return await client.index({
    index,
    body: document
  });
}

export async function GET(request: NextRequest) {
  try {
    const client = new Client({
      node: 'http://localhost:9200/',
    })

    client.indices.delete({
      index:"myindex",
      ignore_unavailable:true
    })

    client.indices.create({
      index:"myindex",
    });

    const document = {
      title: "Sample Document",
      content: "This is a sample document for Elasticsearch.",
      timestamp: new Date()
    };

    const filePath = path.join(process.cwd(), 'public', 'jsons/dummy_data.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);

    for (const doc of data) {
      const response = await insertDocument(client, 'myindex', doc);
      console.log(response);
    }

    return NextResponse.json({
      success: true,
      info: await client.info(),
      data,
      message: ''
    }, { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: '',
      details: error instanceof Error ? error.message : ''
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    
    return NextResponse.json({
      success: true,
      data: {},
      message: ''
    }, { status: 201 });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: '',
      details: error instanceof Error ? error.message : ''
    }, { status: 500 });
  }
}
