// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Datos de ejemplo (en un caso real, esto vendría de una base de datos)
let users = [
  { id: 1, name: 'Juan Pérez', email: 'juan@example.com' },
  { id: 2, name: 'María García', email: 'maria@example.com' },
];

// GET - Obtener todos los usuarios
export async function GET(request: NextRequest) {
  try {
    // Puedes obtener query parameters si los necesitas
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');
    
    let filteredUsers = users;
    
    // Filtrar usuarios si se proporciona un nombre
    if (name) {
      filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(name.toLowerCase())
      );
    }
    
    return NextResponse.json({
      success: true,
      data: filteredUsers,
      count: filteredUsers.length,
      message: 'Usuarios obtenidos correctamente'
    }, { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Error al obtener los usuarios',
      details: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}

// POST - Crear un nuevo usuario
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar campos requeridos
    if (!body.name || !body.email) {
      return NextResponse.json({
        success: false,
        error: 'Nombre y email son requeridos'
      }, { status: 400 });
    }
    
    // Validar que el email no exista
    const existingUser = users.find(user => user.email === body.email);
    if (existingUser) {
      return NextResponse.json({
        success: false,
        error: 'El email ya está registrado'
      }, { status: 409 });
    }
    
    // Crear nuevo usuario
    const newUser = {
      id: users.length + 1,
      name: body.name,
      email: body.email,
    };
    
    users.push(newUser);
    
    return NextResponse.json({
      success: true,
      data: newUser,
      message: 'Usuario creado correctamente'
    }, { status: 201 });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Error al crear el usuario',
      details: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}
