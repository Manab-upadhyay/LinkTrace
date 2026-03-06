import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { Copy, Check } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

const BASE_URL = "http://localhost:5000/api/v1/links";

interface CodeBlockProps {
  code: string;
  language?: string;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-7 w-7 text-muted-foreground hover:text-foreground"
      onClick={handleCopy}
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
    </Button>
  );
}

function CodeBlock({ code }: CodeBlockProps) {
  return (
    <div className="relative group">
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <CopyButton text={code} />
      </div>
      <pre className="bg-zinc-950 text-zinc-100 rounded-lg p-4 overflow-x-auto text-sm font-mono leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function MethodBadge({ method }: { method: string }) {
  const colors: Record<string, string> = {
    GET: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30",
    POST: "bg-blue-500/15 text-blue-600 border-blue-500/30",
    PUT: "bg-amber-500/15 text-amber-600 border-amber-500/30",
    DELETE: "bg-red-500/15 text-red-600 border-red-500/30",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold border ${colors[method] || ""}`}>
      {method}
    </span>
  );
}

function ParamTable({ params }: { params: { name: string; type: string; required: boolean; description: string }[] }) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted/50 border-b">
            <th className="text-left p-3 font-medium">Parameter</th>
            <th className="text-left p-3 font-medium">Type</th>
            <th className="text-left p-3 font-medium">Required</th>
            <th className="text-left p-3 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {params.map((param) => (
            <tr key={param.name} className="border-b last:border-b-0">
              <td className="p-3 font-mono text-xs">{param.name}</td>
              <td className="p-3">
                <Badge variant="outline" className="font-mono text-xs">{param.type}</Badge>
              </td>
              <td className="p-3">
                {param.required ? (
                  <Badge variant="destructive" className="text-xs">Required</Badge>
                ) : (
                  <span className="text-muted-foreground text-xs">Optional</span>
                )}
              </td>
              <td className="p-3 text-muted-foreground">{param.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface EndpointProps {
  method: string;
  path: string;
  title: string;
  description: string;
  params?: { name: string; type: string; required: boolean; description: string }[];
  requestBody?: string;
  responseExample: string;
  curlExample: string;
}

function EndpointCard({ method, path, title, description, params, requestBody, responseExample, curlExample }: EndpointProps) {
  return (
    <Card id={`${method.toLowerCase()}-${path.replace(/[/:]/g, "-")}`}>
      <CardHeader>
        <div className="flex items-center gap-3 flex-wrap">
          <MethodBadge method={method} />
          <code className="text-sm font-mono bg-muted px-2 py-1 rounded">{path}</code>
        </div>
        <CardTitle className="text-lg mt-2">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {params && params.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Parameters</h4>
            <ParamTable params={params} />
          </div>
        )}

        {requestBody && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Request Body</h4>
            <CodeBlock code={requestBody} language="json" />
          </div>
        )}

        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Example Request</h4>
          <CodeBlock code={curlExample} />
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Response</h4>
          <CodeBlock code={responseExample} language="json" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function ApiDocs() {
  return (
    <div className="container  p-4 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">API Documentation</h1>
        <p className="text-muted-foreground text-lg">
          Integrate LinkTrace into your applications with our REST API.
        </p>
      </div>

      <Separator />

      {/* Authentication */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🔐 Authentication
          </CardTitle>
          <CardDescription>
            All API requests require authentication via an API key. Include your key in the request header.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <CodeBlock
            code={`// Include in every request header
Authorization: Bearer YOUR_API_KEY`}
          />
          <p className="text-sm text-muted-foreground">
            You can generate API keys from the{" "}
            <a href="/api-keys" className="text-primary underline underline-offset-4 hover:text-primary/80">
              API Keys
            </a>{" "}
            page in your dashboard.
          </p>
        </CardContent>
      </Card>

      {/* Base URL */}
      <Card>
        <CardHeader>
          <CardTitle>📡 Base URL</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <code className="bg-muted px-3 py-2 rounded-lg text-sm font-mono flex-1">
              {BASE_URL}
            </code>
            <CopyButton text={BASE_URL} />
          </div>
          <p className="text-sm text-muted-foreground">
            All endpoints are relative to this base URL. Rate limiting is applied per API key.
          </p>
        </CardContent>
      </Card>

      {/* Rate Limiting */}
      <Card>
        <CardHeader>
          <CardTitle>⚡ Rate Limiting</CardTitle>
          <CardDescription>
            API requests are rate limited to ensure fair usage across all users.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-muted/50 rounded-lg p-4 text-center space-y-1">
              <p className="text-2xl font-bold">300</p>
              <p className="text-xs text-muted-foreground">Requests / hour</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center space-y-1">
              <p className="text-2xl font-bold">429</p>
              <p className="text-xs text-muted-foreground">Status when exceeded</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center space-y-1">
              <p className="text-2xl font-bold">60s</p>
              <p className="text-xs text-muted-foreground">Cooldown period</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Endpoints */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Endpoints</h2>
        <p className="text-muted-foreground">
          Available API endpoints for managing your short links.
        </p>
      </div>

      {/* Quick Reference */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Quick Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <a href="#post--addlinks" className="flex items-center gap-3 p-2 rounded-md hover:bg-muted transition-colors group">
              <MethodBadge method="POST" />
              <code className="text-sm font-mono text-muted-foreground group-hover:text-foreground transition-colors">/addLinks</code>
              <span className="text-sm text-muted-foreground ml-auto hidden sm:inline">Create a short link</span>
            </a>
            <a href="#get--getmylinks" className="flex items-center gap-3 p-2 rounded-md hover:bg-muted transition-colors group">
              <MethodBadge method="GET" />
              <code className="text-sm font-mono text-muted-foreground group-hover:text-foreground transition-colors">/getMyLinks</code>
              <span className="text-sm text-muted-foreground ml-auto hidden sm:inline">Get all your links</span>
            </a>
            <a href="#get--links-shortcode" className="flex items-center gap-3 p-2 rounded-md hover:bg-muted transition-colors group">
              <MethodBadge method="GET" />
              <code className="text-sm font-mono text-muted-foreground group-hover:text-foreground transition-colors">/links/:shortCode</code>
              <span className="text-sm text-muted-foreground ml-auto hidden sm:inline">Get link info</span>
            </a>
            <a href="#delete--links-linkid" className="flex items-center gap-3 p-2 rounded-md hover:bg-muted transition-colors group">
              <MethodBadge method="DELETE" />
              <code className="text-sm font-mono text-muted-foreground group-hover:text-foreground transition-colors">/links/:linkId</code>
              <span className="text-sm text-muted-foreground ml-auto hidden sm:inline">Delete a link</span>
            </a>
          </div>
        </CardContent>
      </Card>

      {/* POST /addLinks */}
      <EndpointCard
        method="POST"
        path="/addLinks"
        title="Create a Short Link"
        description="Create a new shortened URL. The system generates a unique short code and returns the full short link."
        params={[
          { name: "name", type: "string", required: true, description: "A descriptive name for the link (for your reference)" },
          { name: "url", type: "string", required: true, description: "The original URL to shorten. Must be a valid URL." },
          { name: "customAlias", type: "string", required: false, description: "A custom alias for the short link (e.g. \"devFolio\"). Must be unique. If not provided, a random short code will be generated." },
        ]}
        requestBody={`{
  "name": "My Portfolio",
  "url": "https://example.com/my-very-long-url-that-needs-shortening",
  "customAlias": "devFolio"   // optional
}`}
        curlExample={`curl -X POST ${BASE_URL}/addLinks \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "name": "My Portfolio",
    "url": "https://example.com/my-very-long-url",
    "customAlias": "devFolio"
  }'`}
        responseExample={`// With customAlias provided:
{
  "success": true,
  "data": {
    "id": "664f1a2b3c4d5e6f7a8b9c0d",
    "name": "My Portfolio",
    "url": "https://example.com/my-very-long-url",
    "shortCode": "devFolio",
    "shortUrl": "http://localhost:5000/devFolio",
    "clicks": 0,
    "createdAt": "2025-03-03T10:30:00.000Z",
    "status": "active"
  }
}

// Without customAlias (random code generated):
{
  "success": true,
  "data": {
    "shortCode": "abc123",
    "shortUrl": "http://localhost:5000/abc123",
    ...
  }
}`}
      />

      {/* GET /getMyLinks */}
      <EndpointCard
        method="GET"
        path="/getMyLinks"
        title="Get All Your Links"
        description="Retrieve all short links created by the authenticated user. Returns an array of link objects."
        curlExample={`curl -X GET ${BASE_URL}/getMyLinks \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
        responseExample={`{
  "success": true,
  "data": [
    {
      "id": "664f1a2b3c4d5e6f7a8b9c0d",
      "name": "My Portfolio",
      "url": "https://example.com/my-very-long-url",
      "shortCode": "devFolio",
      "shortUrl": "http://localhost:5000/devFolio",
      "clicks": 42,
      "createdAt": "2025-03-03T10:30:00.000Z",
      "status": "active"
    },
    {
      "id": "775a2b3c4d5e6f7a8b9c0e1f",
      "name": "Blog Post",
      "url": "https://example.com/blog/my-latest-post",
      "shortCode": "abc123",
      "shortUrl": "http://localhost:5000/abc123",
      "clicks": 7,
      "createdAt": "2025-03-04T14:20:00.000Z",
      "status": "active"
    }
  ]
}`}
      />

      {/* GET /links/:shortCode */}
      <EndpointCard
        method="GET"
        path="/links/:shortCode"
        title="Get Link Information"
        description="Retrieve details about a specific short link using its short code."
        params={[
          { name: "shortCode", type: "string", required: true, description: "The unique short code of the link (URL parameter)" },
        ]}
        curlExample={`curl -X GET ${BASE_URL}/links/abc123 \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
        responseExample={`{
  "success": true,
  "data": {
    "id": "664f1a2b3c4d5e6f7a8b9c0d",
    "name": "My Portfolio",
    "url": "https://example.com/my-very-long-url",
    "shortCode": "abc123",
    "shortUrl": "http://localhost:5000/abc123",
    "clicks": 42,
    "createdAt": "2025-03-03T10:30:00.000Z",
    "status": "active"
  }
}`}
      />

      {/* DELETE /links/:linkId */}
      <EndpointCard
        method="DELETE"
        path="/links/:linkId"
        title="Delete a Link"
        description="Permanently delete a short link. This action cannot be undone — all associated analytics data will also be removed."
        params={[
          { name: "linkId", type: "string", required: true, description: "The unique ID of the link to delete (URL parameter)" },
        ]}
        curlExample={`curl -X DELETE ${BASE_URL}/links/664f1a2b3c4d5e6f7a8b9c0d \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
        responseExample={`{
  "success": true,
  "message": "Link deleted successfully"
}`}
      />

      <Separator />

      {/* Error Codes */}
      <Card>
        <CardHeader>
          <CardTitle>❌ Error Codes</CardTitle>
          <CardDescription>Common HTTP status codes returned by the API.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b">
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Meaning</th>
                  <th className="text-left p-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { code: "200", meaning: "OK", desc: "Request succeeded" },
                  { code: "201", meaning: "Created", desc: "Resource created successfully" },
                  { code: "400", meaning: "Bad Request", desc: "Invalid request body or parameters" },
                  { code: "401", meaning: "Unauthorized", desc: "Missing or invalid API key" },
                  { code: "404", meaning: "Not Found", desc: "Resource does not exist" },
                  { code: "429", meaning: "Too Many Requests", desc: "Rate limit exceeded" },
                  { code: "500", meaning: "Server Error", desc: "Something went wrong on our end" },
                ].map((row) => (
                  <tr key={row.code} className="border-b last:border-b-0">
                    <td className="p-3">
                      <Badge variant="outline" className="font-mono">{row.code}</Badge>
                    </td>
                    <td className="p-3 font-medium">{row.meaning}</td>
                    <td className="p-3 text-muted-foreground">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center py-8 text-muted-foreground text-sm">
        <p>
          Need help? Reach out on{" "}
          <a href="https://github.com/Manab-upadhyay" className="text-primary underline underline-offset-4 hover:text-primary/80">
            GitHub
          </a>{" "}
          or contact support.
        </p>
      </div>
    </div>
  );
}
