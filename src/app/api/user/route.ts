import {NextResponse} from "next/server";

export async function GET() {
    const headers = new Headers();
    headers.append('Authorization', "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmbGFnIiwibmFtZSI6InNpZ24taXMtbm90LXNhZmUuXiYqKCIsImlhdCI6MTcyOTc4NTU5OSwiZXhwIjoxNzI5Nzg1NTk5fQ.NmxnUoXS18NPdzvC6VB2iPPJKXzrnZQy7ne-03P7tgk");
    return NextResponse.json({hint: "不合时令的请求，也许它不该出现。"}, {headers});
}
