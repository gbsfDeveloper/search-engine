import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@elastic/elasticsearch'
import * as fs from 'node:fs/promises';
import path from 'path';

// GET THE DOCUMENTS' MAPPING OF INDEX

export async function GET(request: NextRequest) {
  try {
    const client = new Client({
      node: process.env.ELASTIC_SEARCH_SERVER || 'http://localhost:9200/',
    })

    const indexMapping = await client.indices.getMapping({
      index: 'myindex'
    });

    return NextResponse.json({
      success: true,
      info: await client.info(),
      mapping: indexMapping,
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
