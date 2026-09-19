import { components } from "@/lib/docs/catalog"
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site"
import { GITHUB_URL } from "@/lib/github"

const slugs = components.map((item) => item.slug)

const problemSchema = {
  type: "object",
  required: ["type", "title", "status", "detail", "code"],
  properties: {
    type: { type: "string", format: "uri" },
    title: { type: "string" },
    status: { type: "integer" },
    detail: { type: "string" },
    instance: { type: "string" },
    code: { type: "string" },
    hrefs: {
      type: "object",
      additionalProperties: { type: "string", format: "uri" },
    },
  },
} as const

const componentSchema = {
  type: "object",
  required: ["slug", "name", "title", "description", "registry", "docs"],
  properties: {
    slug: { type: "string", example: "graph-table" },
    name: { type: "string", example: "GraphTable" },
    title: { type: "string", example: "Table" },
    description: { type: "string" },
    registry: { type: "string" },
    docs: { type: "string", format: "uri" },
    when: { type: "string" },
    not: { type: "string" },
  },
} as const

const propSchema = {
  type: "object",
  required: ["name", "type", "description"],
  properties: {
    name: { type: "string" },
    type: { type: "string" },
    default: { type: "string" },
    description: { type: "string" },
  },
} as const

const componentDetailSchema = {
  allOf: [
    { $ref: "#/components/schemas/Component" },
    {
      type: "object",
      required: ["dependencies", "props"],
      properties: {
        dependencies: {
          type: "array",
          items: { type: "string" },
        },
        props: {
          type: "array",
          items: { $ref: "#/components/schemas/Prop" },
        },
      },
    },
  ],
} as const

const componentListSchema = {
  type: "object",
  required: ["components"],
  properties: {
    components: {
      type: "array",
      items: { $ref: "#/components/schemas/Component" },
    },
  },
} as const

const apiIndexSchema = {
  type: "object",
  required: ["version", "name", "description", "endpoints"],
  properties: {
    version: { type: "string", example: "1.0.0" },
    name: { type: "string", example: "mdxcn API" },
    description: { type: "string" },
    deprecation: { type: "string", format: "uri" },
    openapi: { type: "string", format: "uri" },
    endpoints: {
      type: "array",
      items: {
        type: "object",
        required: ["method", "path", "summary"],
        properties: {
          method: { type: "string", enum: ["GET"] },
          path: { type: "string" },
          summary: { type: "string" },
          operationId: { type: "string" },
        },
      },
    },
  },
} as const

const healthSchema = {
  type: "object",
  required: ["ok", "service", "version", "url"],
  properties: {
    ok: { type: "boolean", example: true },
    service: { type: "string", example: "mdxcn" },
    version: { type: "string", example: "1.0.0" },
    url: { type: "string", format: "uri" },
  },
} as const

const registryItemSchema = {
  type: "object",
  required: ["name", "type", "files"],
  properties: {
    name: { type: "string" },
    type: { type: "string", example: "registry:component" },
    title: { type: "string" },
    description: { type: "string" },
    files: {
      type: "array",
      items: {
        type: "object",
        required: ["path", "content"],
        properties: {
          path: { type: "string" },
          type: { type: "string" },
          content: { type: "string" },
        },
      },
    },
  },
} as const

function problemResponse(description: string) {
  return {
    description,
    content: {
      "application/problem+json": {
        schema: { $ref: "#/components/schemas/Problem" },
      },
    },
  }
}

function rateLimitResponse() {
  return {
    description: "Rate limit exceeded.",
    headers: {
      "Retry-After": {
        description: "Seconds until the client may retry.",
        schema: { type: "integer" },
      },
      "RateLimit-Limit": {
        description: "Requests allowed in the current window.",
        schema: { type: "integer" },
      },
      "RateLimit-Remaining": {
        description: "Requests left in the current window.",
        schema: { type: "integer" },
      },
      "RateLimit-Reset": {
        description: "Seconds until the window resets.",
        schema: { type: "integer" },
      },
    },
    content: {
      "application/problem+json": {
        schema: { $ref: "#/components/schemas/Problem" },
      },
    },
  }
}

function rateLimitHeaders() {
  return {
    "RateLimit-Policy": {
      description: "Quota policy: limit;w=window seconds.",
      schema: { type: "string", example: "1000;w=3600" },
    },
    "RateLimit-Limit": {
      description: "Requests allowed in the current window.",
      schema: { type: "integer", example: 1000 },
    },
    "RateLimit-Remaining": {
      description: "Requests left in the current window.",
      schema: { type: "integer" },
    },
    "RateLimit-Reset": {
      description: "Seconds until the window resets.",
      schema: { type: "integer" },
    },
  }
}

export function apiIndex(origin = SITE_URL) {
  const host = origin || SITE_URL

  return {
    version: "1.0.0",
    name: "mdxcn API",
    description:
      "Read-only JSON catalog for mdxcn. No authentication. URL versioned under /api/v1/.",
    deprecation: `${host}/developers/deprecation`,
    openapi: `${host}/openapi.json`,
    endpoints: [
      {
        method: "GET" as const,
        path: "/api/v1/health",
        summary: "Health check",
        operationId: "getHealth",
      },
      {
        method: "GET" as const,
        path: "/api/v1/components",
        summary: "List every graph",
        operationId: "listComponents",
      },
      {
        method: "GET" as const,
        path: "/api/v1/components/{slug}",
        summary: "Get one graph",
        operationId: "getComponent",
      },
      {
        method: "GET" as const,
        path: "/llms.txt",
        summary: "Chooser, ASCII, Comark, and Knap",
        operationId: "getLlmsTxt",
      },
      {
        method: "GET" as const,
        path: "/agents.md",
        summary: "Agents page as markdown",
        operationId: "getAgentsMd",
      },
      {
        method: "GET" as const,
        path: "/skill.md",
        summary: "Agent skill file",
        operationId: "getSkill",
      },
      {
        method: "GET" as const,
        path: "/skill/recipes.md",
        summary: "Skill recipes",
        operationId: "getSkillRecipes",
      },
      {
        method: "GET" as const,
        path: "/r/{name}.json",
        summary: "shadcn registry item",
        operationId: "getRegistryItem",
      },
      {
        method: "GET" as const,
        path: "/openapi.json",
        summary: "This OpenAPI document",
        operationId: "getOpenApi",
      },
    ],
  }
}

export function openApiSpec(origin = SITE_URL) {
  const host = origin || SITE_URL

  return {
    openapi: "3.1.0",
    info: {
      title: "mdxcn API",
      summary: SITE_DESCRIPTION,
      description: `Public read API for ${SITE_NAME}. Version 1 is URL-prefixed at /api/v1/. Breaking changes ship as /api/v2/ with at least six months notice. Deprecation policy: ${host}/developers/deprecation. Rate limit: 1000 GET requests per hour per client; see RateLimit-* response headers. No authentication. Graph source files are copied with the shadcn CLI; this API does not install them.`,
      version: "1.0.0",
      license: {
        name: "MIT",
        url: `${GITHUB_URL}/blob/main/LICENSE`,
      },
      contact: {
        name: "Keshav Bagaade",
        email: "hi@kshv.me",
        url: host,
      },
      "x-api-version": "1",
      "x-deprecation-policy": `${host}/developers/deprecation`,
    },
    servers: [{ url: host, description: "Production" }],
    tags: [
      { name: "meta", description: "Health and API index." },
      { name: "catalog", description: "Graph list and one graph." },
      { name: "machine", description: "Skill, chooser, registry, OpenAPI." },
    ],
    paths: {
      "/api/v1": {
        get: {
          operationId: "getApiIndex",
          tags: ["meta"],
          summary: "API index",
          description:
            "Lists every public GET endpoint with operationId values for function calling.",
          responses: {
            "200": {
              description: "API index.",
              headers: rateLimitHeaders(),
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ApiIndex" },
                },
              },
            },
            "429": rateLimitResponse(),
          },
        },
      },
      "/api/v1/health": {
        get: {
          operationId: "getHealth",
          tags: ["meta"],
          summary: "Health check",
          description: "Returns ok when the mdxcn API is reachable.",
          responses: {
            "200": {
              description: "Healthy.",
              headers: rateLimitHeaders(),
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Health" },
                },
              },
            },
            "429": rateLimitResponse(),
          },
        },
      },
      "/api/v1/components": {
        get: {
          operationId: "listComponents",
          tags: ["catalog"],
          summary: "List every graph",
          description:
            "Returns the catalog: slug, export name, docs URL, and when/not hints for agents picking a figure.",
          responses: {
            "200": {
              description: "Catalog.",
              headers: rateLimitHeaders(),
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ComponentList" },
                },
              },
            },
            "429": rateLimitResponse(),
          },
        },
      },
      "/api/v1/components/{slug}": {
        get: {
          operationId: "getComponent",
          tags: ["catalog"],
          summary: "Get one graph",
          description:
            "One catalog row plus props. 404 if the slug is not a graph.",
          parameters: [
            {
              name: "slug",
              in: "path",
              required: true,
              description: "Registry slug, like graph-table.",
              schema: {
                type: "string",
                enum: slugs,
              },
            },
          ],
          responses: {
            "200": {
              description: "One graph.",
              headers: rateLimitHeaders(),
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ComponentDetail" },
                },
              },
            },
            "404": problemResponse("Unknown slug."),
            "429": rateLimitResponse(),
          },
        },
      },
      "/llms.txt": {
        get: {
          operationId: "getLlmsTxt",
          tags: ["machine"],
          summary: "Chooser, ASCII, Comark, and Knap",
          description:
            "When-to-use, host rules, chooser table, official fenced ASCIIs, Comark blocks, Knap filters, and recipes. Fetch this if the skill is not installed.",
          responses: {
            "200": {
              description: "Markdown.",
              headers: rateLimitHeaders(),
              content: {
                "text/markdown": {
                  schema: { $ref: "#/components/schemas/MarkdownDocument" },
                },
                "text/plain": {
                  schema: { $ref: "#/components/schemas/MarkdownDocument" },
                },
              },
            },
            "429": rateLimitResponse(),
          },
        },
      },
      "/agents.md": {
        get: {
          operationId: "getAgentsMd",
          tags: ["machine"],
          summary: "Agents page as markdown",
          description:
            "Same content as /agents in markdown for agents that prefer a .md URL.",
          responses: {
            "200": {
              description: "Markdown.",
              headers: rateLimitHeaders(),
              content: {
                "text/markdown": {
                  schema: { $ref: "#/components/schemas/MarkdownDocument" },
                },
                "text/plain": {
                  schema: { $ref: "#/components/schemas/MarkdownDocument" },
                },
              },
            },
            "429": rateLimitResponse(),
          },
        },
      },
      "/skill.md": {
        get: {
          operationId: "getSkill",
          tags: ["machine"],
          summary: "SKILL.md",
          description:
            "The Agent Skill file. Copy it into .cursor/skills, .claude/skills, .agents/skills, or .opencode/skills.",
          responses: {
            "200": {
              description: "The skill.",
              headers: rateLimitHeaders(),
              content: {
                "text/markdown": {
                  schema: { $ref: "#/components/schemas/MarkdownDocument" },
                },
                "text/plain": {
                  schema: { $ref: "#/components/schemas/MarkdownDocument" },
                },
              },
            },
            "429": rateLimitResponse(),
          },
        },
      },
      "/skill/recipes.md": {
        get: {
          operationId: "getSkillRecipes",
          tags: ["machine"],
          summary: "Skill recipes",
          description: "Worked JSX for the skill to copy.",
          responses: {
            "200": {
              description: "Recipes.",
              headers: rateLimitHeaders(),
              content: {
                "text/markdown": {
                  schema: { $ref: "#/components/schemas/MarkdownDocument" },
                },
                "text/plain": {
                  schema: { $ref: "#/components/schemas/MarkdownDocument" },
                },
              },
            },
            "429": rateLimitResponse(),
          },
        },
      },
      "/r/{name}.json": {
        get: {
          operationId: "getRegistryItem",
          tags: ["machine"],
          summary: "shadcn registry item",
          description:
            "JSON the shadcn CLI copies into the project. name is a graph slug or all.",
          parameters: [
            {
              name: "name",
              in: "path",
              required: true,
              description: "graph-table, all, or another registry name.",
              schema: { type: "string" },
            },
          ],
          responses: {
            "200": {
              description: "Registry item.",
              headers: rateLimitHeaders(),
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/RegistryItem" },
                },
              },
            },
            "404": problemResponse("Unknown registry name."),
            "429": rateLimitResponse(),
          },
        },
      },
      "/openapi.json": {
        get: {
          operationId: "getOpenApi",
          tags: ["machine"],
          summary: "This OpenAPI document",
          description: "OpenAPI 3.1 for the public read surface.",
          responses: {
            "200": {
              description: "OpenAPI 3.1.",
              headers: rateLimitHeaders(),
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/OpenApiDocument" },
                },
              },
            },
            "429": rateLimitResponse(),
          },
        },
      },
    },
    components: {
      schemas: {
        Problem: problemSchema,
        Prop: propSchema,
        Component: componentSchema,
        ComponentDetail: componentDetailSchema,
        ComponentList: componentListSchema,
        ApiIndex: apiIndexSchema,
        Health: healthSchema,
        RegistryItem: registryItemSchema,
        MarkdownDocument: {
          type: "string",
          description: "UTF-8 markdown body.",
        },
        OpenApiDocument: {
          type: "object",
          required: ["openapi", "info", "paths"],
          properties: {
            openapi: { type: "string", example: "3.1.0" },
            info: { type: "object" },
            paths: { type: "object" },
            components: { type: "object" },
          },
        },
      },
    },
  }
}

export function apiCatalog(origin = SITE_URL) {
  const host = origin || SITE_URL

  return {
    linkset: [
      {
        anchor: `${host}/`,
        "service-desc": [
          {
            href: `${host}/openapi.json`,
            type: "application/json",
          },
        ],
        item: [
          { href: `${host}/api/v1` },
          { href: `${host}/api/v1/health` },
          { href: `${host}/api/v1/components` },
          { href: `${host}/developers` },
          { href: `${host}/llms.txt` },
          { href: `${host}/skill.md` },
        ],
      },
    ],
  }
}

export function toComponentJson(item: (typeof components)[number]) {
  return {
    slug: item.slug,
    name: item.name,
    title: item.title,
    description: item.description,
    registry: item.registry,
    docs: `${SITE_URL}/docs/${item.slug}`,
    ...(item.when ? { when: item.when } : {}),
    ...(item.not ? { not: item.not } : {}),
  }
}

export function toComponentDetail(item: (typeof components)[number]) {
  return {
    ...toComponentJson(item),
    dependencies: item.dependencies,
    props: item.props,
  }
}
