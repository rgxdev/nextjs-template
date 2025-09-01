# Next.js Template mit TanStack

Ein modernes, sicheres Next.js Template mit TanStack-Bibliotheken, TypeScript und sicheren Coding-Praktiken.

## 🚀 Features

### TanStack Integration
- **TanStack Query**: Datenabfrage, Caching und Synchronisation
- **TanStack Form**: Typsichere Formular-Validierung mit Zod
- **TanStack Table**: Leistungsstarke Datentabellen mit Sortierung und Paginierung

### Sicherheit & Best Practices
- **TypeScript Strict Mode**: Vollständige Typisierung mit strengen Konfigurationen
- **Zod Schema Validation**: Runtime-Validierung aller Eingaben
- **Content Security Policy**: Schutz vor XSS und Code-Injection
- **Security Headers**: Umfassende Sicherheitsheader
- **ESLint Security Plugin**: Automatische Erkennung von Sicherheitslücken

### Development Experience
- **Prettier**: Automatische Code-Formatierung
- **ESLint**: Strenge Linting-Regeln
- **TypeScript**: Modernste TypeScript-Konfiguration
- **Tailwind CSS**: Utility-first CSS Framework
- **shadcn/ui**: Hochwertige UI-Komponenten

## 📦 Installation

```bash
# Repository klonen
git clone <repository-url>
cd nextjs-template

# Abhängigkeiten installieren
npm install

# Development Server starten
npm run dev
```

## 🛠️ Scripts

```bash
npm run dev        # Development Server mit Turbopack
npm run build      # Production Build
npm run start      # Production Server
npm run lint       # ESLint ausführen
npm run typecheck  # TypeScript Check
npm run format     # Code formatieren
```

## 🏗️ Projektstruktur

```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API Routes
│   ├── globals.css     # Globale Styles
│   ├── layout.tsx      # Root Layout
│   ├── page.tsx        # Homepage
│   └── providers.tsx   # React Context Providers
├── components/
│   ├── examples/       # Beispiel-Komponenten
│   ├── providers/      # Provider-Komponenten
│   ├── ui/            # shadcn/ui Komponenten
│   └── core/          # Core-Komponenten
├── hooks/             # Custom React Hooks
├── lib/               # Utilities und Konfiguration
│   ├── constants.ts   # App-Konstanten
│   ├── schemas.ts     # Zod Schemas
│   └── utils.ts       # Utility Functions
```

## 🔒 Sicherheits-Features

### TypeScript Konfiguration
- `strict: true`
- `noImplicitAny: true`
- `noUncheckedIndexedAccess: true`
- `exactOptionalPropertyTypes: true`

### Content Security Policy
- Strict CSP mit Nonce-based Script Loading
- Blockierung von unsafe-inline und unsafe-eval
- Schutz vor XSS-Angriffen

### Security Headers
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Strict-Transport-Security`

### Zod Schema Validation
```typescript
// Beispiel Schema
const userSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(2).max(50),
  email: z.string().email(),
});
```

## 📚 TanStack Beispiele

### TanStack Query
```typescript
// Custom Hook für Benutzer
export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000,
  });
}
```

### TanStack Form
```typescript
// Formular mit Zod Validation
const form = useForm({
  defaultValues: { name: "", email: "" },
  validatorAdapter: zodValidator,
  onSubmit: async ({ value }) => {
    // Submit Logic
  },
});
```

### TanStack Table
```typescript
// Sortierbare Tabelle
const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
});
```

## 🎨 Styling

Das Template verwendet Tailwind CSS mit einem angepassten Design-System:

### Theme-Konfiguration
- Dark/Light Mode Support
- Responsive Design
- Accessibility-optimierte Farben
- Custom CSS Variables

### shadcn/ui Komponenten
- Button, Card, Input, Textarea
- Form-Komponenten
- Layout-Komponenten

## 🧪 API-Beispiele

### Sichere API Routes
```typescript
// /api/users/route.ts
export async function GET(request: NextRequest) {
  try {
    const validatedData = userSchema.array().parse(data);
    return NextResponse.json(validatedData);
  } catch (error) {
    return NextResponse.json(
      { error: "Validation Error" },
      { status: 400 }
    );
  }
}
```

## 🔧 Konfiguration

### Environment Variables
```env
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### VS Code Extensions (Empfohlen)
- TypeScript Importer
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Error Lens

## 🚀 Deployment

### Vercel (Empfohlen)
```bash
npm run build
vercel --prod
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📝 Lizenz

MIT License - siehe [LICENSE](LICENSE) für Details.

## 🤝 Beitragen

1. Fork das Repository
2. Erstelle einen Feature Branch (`git checkout -b feature/amazing-feature`)
3. Committe deine Änderungen (`git commit -m 'Add amazing feature'`)
4. Push zum Branch (`git push origin feature/amazing-feature`)
5. Öffne eine Pull Request

## 📞 Support

Bei Fragen oder Problemen öffne bitte ein Issue im Repository.

---

**Gebaut mit ❤️ und modernsten Web-Technologien**
