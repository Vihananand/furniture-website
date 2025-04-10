import { NextResponse } from 'next/server';
import pool from '@/utils/db';

// GET all tags
export async function GET() {
  try {
    console.log('Connecting to database...');
    const client = await pool.connect();
    try {
      console.log('Executing query...');
      const result = await client.query('SELECT * FROM tags ORDER BY name');
      console.log('Query result:', result.rows);
      return NextResponse.json({ tags: result.rows });
    } catch (queryError) {
      console.error('Query error:', queryError);
      return NextResponse.json(
        { error: 'Database query failed' },
        { status: 500 }
      );
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      { error: 'Failed to connect to database' },
      { status: 500 }
    );
  }
}

// Create a new tag
export async function POST(request) {
  try {
    const { name } = await request.json();
    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { error: 'Invalid tag name' },
        { status: 400 }
      );
    }

    const slug = name.toLowerCase().replace(/\s+/g, '-');
    
    const client = await pool.connect();
    try {
      const result = await client.query(
        'INSERT INTO tags (name, slug) VALUES ($1, $2) RETURNING *',
        [name, slug]
      );
      return NextResponse.json({ tag: result.rows[0] });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error creating tag:', error);
    return NextResponse.json(
      { error: 'Failed to create tag' },
      { status: 500 }
    );
  }
}

// Delete a tag
export async function DELETE(request) {
  try {
    const { id } = await request.json();
    if (!id || typeof id !== 'number') {
      return NextResponse.json(
        { error: 'Invalid tag ID' },
        { status: 400 }
      );
    }
    
    const client = await pool.connect();
    try {
      await client.query('DELETE FROM tags WHERE id = $1', [id]);
      return NextResponse.json({ success: true });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error deleting tag:', error);
    return NextResponse.json(
      { error: 'Failed to delete tag' },
      { status: 500 }
    );
  }
} 