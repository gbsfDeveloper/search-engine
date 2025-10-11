import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@elastic/elasticsearch'

// CREATING A DOCUMENT
export async function GET(request: NextRequest) {
  try {
    const client = new Client({
      node: process.env.ELASTIC_SEARCH_SERVER || 'http://localhost:9200/',
    })
    console.log(await client.info());
    
    client.indices.create({
      index:"myindex",
      settings:{
        index:{
          number_of_shards: 3,
          number_of_replicas: 2
        }
      }
    })

    return NextResponse.json({
      success: true,
      info: await client.info(),
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
