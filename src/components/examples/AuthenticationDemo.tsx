"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Key, 
  User, 
  Mail,
  Lock,
  CheckCircle,
  AlertTriangle,
  Eye,
  EyeOff
} from "lucide-react";

interface AuthFormData {
  readonly email: string;
  readonly password: string;
  readonly confirmPassword?: string;
  readonly name?: string;
  readonly rememberMe?: boolean;
}

interface AuthState {
  readonly isLoggedIn: boolean;
  readonly user: {
    readonly name: string;
    readonly email: string;
    readonly role: "admin" | "user" | "moderator";
    readonly avatar: string;
  } | null;
  readonly sessionExpiry: Date | null;
}

const defaultAuthState: AuthState = {
  isLoggedIn: false,
  user: null,
  sessionExpiry: null
};

const mockUser = {
  name: "Max Mustermann",
  email: "max.mustermann@example.com",
  role: "admin" as const,
  avatar: "/avatars/user.png"
};

export function AuthenticationDemo() {
  const [authState, setAuthState] = useState<AuthState>(defaultAuthState);
  const [currentForm, setCurrentForm] = useState<"login" | "register" | "reset">("login");
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "E-Mail ist erforderlich";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Ungültige E-Mail-Adresse";
    }

    if (!formData.password) {
      newErrors.password = "Passwort ist erforderlich";
    } else if (formData.password.length < 8) {
      newErrors.password = "Passwort muss mindestens 8 Zeichen haben";
    }

    if (currentForm === "register") {
      if (!formData.name) {
        newErrors.name = "Name ist erforderlich";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwörter stimmen nicht überein";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (currentForm === "login" || currentForm === "register") {
      setAuthState({
        isLoggedIn: true,
        user: mockUser,
        sessionExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
      });
    }
    
    setIsLoading(false);
  };

  const handleLogout = () => {
    setAuthState(defaultAuthState);
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      rememberMe: false
    });
  };

  const updateFormData = (field: keyof AuthFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  if (authState.isLoggedIn && authState.user) {
    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-green-800 dark:text-green-200">
                  Erfolgreich angemeldet
                </CardTitle>
                <CardDescription className="text-green-600 dark:text-green-300">
                  Willkommen zurück, {authState.user.name}!
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Benutzerinformationen</h4>
                  <div className="text-sm space-y-1">
                    <p><strong>Name:</strong> {authState.user.name}</p>
                    <p><strong>E-Mail:</strong> {authState.user.email}</p>
                    <p><strong>Rolle:</strong> 
                      <Badge variant="outline" className="ml-2">
                        {authState.user.role === "admin" ? "Administrator" :
                         authState.user.role === "moderator" ? "Moderator" : "Benutzer"}
                      </Badge>
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Session-Details</h4>
                  <div className="text-sm space-y-1">
                    <p><strong>Status:</strong> 
                      <Badge variant="default" className="ml-2">Aktiv</Badge>
                    </p>
                    <p><strong>Läuft ab:</strong> {authState.sessionExpiry?.toLocaleString("de-DE")}</p>
                    <p><strong>Angemeldet seit:</strong> {new Date().toLocaleString("de-DE")}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2 pt-4">
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Profil bearbeiten
                </Button>
                <Button variant="outline" size="sm">
                  <Shield className="h-4 w-4 mr-2" />
                  Sicherheitseinstellungen
                </Button>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <Lock className="h-4 w-4 mr-2" />
                  Abmelden
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sicherheitsstatus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Zwei-Faktor-Auth</span>
                  <Badge variant="secondary">Aktiviert</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Starkes Passwort</span>
                  <Badge variant="default">Ja</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Letzte Aktivität</span>
                  <span className="text-sm text-muted-foreground">Jetzt</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Berechtigungen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {["Benutzer verwalten", "Inhalte moderieren", "System-Einstellungen", "Analytics einsehen"].map((permission, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{permission}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Schnellaktionen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Key className="h-4 w-4 mr-2" />
                  Passwort ändern
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  E-Mail ändern
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  2FA einrichten
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-bold">
                {currentForm === "login" ? "Anmelden" :
                 currentForm === "register" ? "Registrieren" : "Passwort zurücksetzen"}
              </h2>
            </div>
            <CardDescription className="text-center">
              {currentForm === "login" ? "Melden Sie sich mit Ihren Zugangsdaten an" :
               currentForm === "register" ? "Erstellen Sie ein neues Konto" :
               "Setzen Sie Ihr Passwort zurück"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {currentForm === "register" && (
                <div className="space-y-1">
                  <label className="text-sm font-medium">Name</label>
                  <input
                    type="text"
                    value={formData.name || ""}
                    onChange={(e) => updateFormData("name", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md bg-background ${
                      errors.name ? "border-red-500" : ""
                    }`}
                    placeholder="Ihr vollständiger Name"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500 flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      {errors.name}
                    </p>
                  )}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-sm font-medium">E-Mail</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md bg-background ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  placeholder="ihre.email@beispiel.de"
                />
                {errors.email && (
                  <p className="text-sm text-red-500 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>

              {currentForm !== "reset" && (
                <div className="space-y-1">
                  <label className="text-sm font-medium">Passwort</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => updateFormData("password", e.target.value)}
                      className={`w-full px-3 py-2 pr-10 border rounded-md bg-background ${
                        errors.password ? "border-red-500" : ""
                      }`}
                      placeholder="Mindestens 8 Zeichen"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-500 flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      {errors.password}
                    </p>
                  )}
                </div>
              )}

              {currentForm === "register" && (
                <div className="space-y-1">
                  <label className="text-sm font-medium">Passwort bestätigen</label>
                  <input
                    type="password"
                    value={formData.confirmPassword || ""}
                    onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md bg-background ${
                      errors.confirmPassword ? "border-red-500" : ""
                    }`}
                    placeholder="Passwort wiederholen"
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500 flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              )}

              {currentForm === "login" && (
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={formData.rememberMe || false}
                    onChange={(e) => updateFormData("rememberMe", e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="rememberMe" className="text-sm">
                    Angemeldet bleiben
                  </label>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Wird verarbeitet..." :
                 currentForm === "login" ? "Anmelden" :
                 currentForm === "register" ? "Konto erstellen" : "Reset-Link senden"}
              </Button>
            </form>

            <div className="mt-6 space-y-3">
              <div className="text-center text-sm">
                {currentForm === "login" ? (
                  <>
                    <span className="text-muted-foreground">Noch kein Konto? </span>
                    <button
                      onClick={() => setCurrentForm("register")}
                      className="text-primary hover:underline"
                    >
                      Jetzt registrieren
                    </button>
                  </>
                ) : currentForm === "register" ? (
                  <>
                    <span className="text-muted-foreground">Bereits ein Konto? </span>
                    <button
                      onClick={() => setCurrentForm("login")}
                      className="text-primary hover:underline"
                    >
                      Anmelden
                    </button>
                  </>
                ) : (
                  <>
                    <span className="text-muted-foreground">Zurück zur </span>
                    <button
                      onClick={() => setCurrentForm("login")}
                      className="text-primary hover:underline"
                    >
                      Anmeldung
                    </button>
                  </>
                )}
              </div>

              {currentForm === "login" && (
                <div className="text-center">
                  <button
                    onClick={() => setCurrentForm("reset")}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Passwort vergessen?
                  </button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Demo-Anmeldedaten</CardTitle>
          <CardDescription>
            Verwenden Sie diese Daten zum Testen der Authentifizierung
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Admin-Benutzer</h4>
              <p className="text-sm"><strong>E-Mail:</strong> admin@example.com</p>
              <p className="text-sm"><strong>Passwort:</strong> admin123</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Standard-Benutzer</h4>
              <p className="text-sm"><strong>E-Mail:</strong> user@example.com</p>
              <p className="text-sm"><strong>Passwort:</strong> user123</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
