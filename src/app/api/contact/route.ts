import { NextRequest, NextResponse } from "next/server";

// In-memory storage for contact submissions (in production, use a database)
const submissions: Array<{
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  timestamp: string;
}> = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Name, email, subject, and message are required." },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // Create submission record
    const submission = {
      id: `MP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      email,
      phone: phone || "",
      company: company || "",
      subject,
      message,
      timestamp: new Date().toISOString(),
    };

    submissions.push(submission);

    console.log("New contact submission:", submission);

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for contacting Metal Packages. We will get back to you within 24 hours.",
        submissionId: submission.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "An error occurred. Please try again later." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      company: "Metal Packages",
      ceo: "Abdul Basit Khan",
      phone: "+923458222808",
      email: "metalpackages@hotmail.com",
      product: "Flexible Aluminium Collapsible Tubes",
      totalSubmissions: submissions.length,
    },
    { status: 200 }
  );
}
