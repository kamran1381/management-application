import { supabase } from "@/utitls/supabaseClient";

export async function POST(req) {
  try {
    const { name, email ,  gender,  } = await req.json();

  
    const { data, error } = await supabase
      .from("users")
      .insert([{ name, email , gender }])
      .select();

    if (error) throw error;

    return new Response(JSON.stringify({ success: true, data }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}



export async function GET() {
  try {
    const { data, error } = await supabase.from("users").select("*");

    if (error) throw error;

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}


export async function DELETE(req) {
  try {
    const { id } = await req.json(); // Get the user ID from the request

    const { data, error } = await supabase
      .from("users")
      .delete()
      .match({ id }) // Match the user with the given ID

    if (error) throw error;

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}